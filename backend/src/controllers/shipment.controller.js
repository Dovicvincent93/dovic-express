import mongoose from "mongoose";
import Shipment from "../models/Shipment.js";
import Tracking from "../models/Tracking.js";
import generateTracking from "../utils/generateTracking.js";

/* ======================================================
   🌍 SIMPLE GEOCODING HELPER (OpenStreetMap)
====================================================== */
const geocodeLocation = async (city, country) => {
  try {
    const query = encodeURIComponent(`${city}, ${country}`);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent": "DovicExpress/1.0 (admin@dovicexpress.com)",
      },
    });

    const data = await res.json();

    if (data && data.length > 0) {
      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };
    }

    return { lat: null, lng: null };
  } catch (err) {
    console.error("Geocoding failed:", err);
    return { lat: null, lng: null };
  }
};

/* ======================================================
   GET ALL SHIPMENTS (ADMIN)
====================================================== */
export const getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find()
      .populate("customer", "name email")
      .populate("quote")
      .sort({ createdAt: -1 });

    res.json(shipments);
  } catch (error) {
    console.error("Fetch shipments error:", error);
    res.status(500).json({ message: "Failed to fetch shipments" });
  }
};

/* ======================================================
   CREATE SHIPMENT (ADMIN / WALK-IN ORDER)
   ✔ Creates Booked status automatically
   ✔ Creates initial tracking (Booked)
====================================================== */
export const createShipment = async (req, res) => {
  try {
    const {
      customer,
      sender,
      receiver,
      origin,
      destination,
      weight,
      quantity,
      estimatedDelivery,
      price,
      city,
      country,
      message,
    } = req.body;

    if (
      !sender?.name ||
      !sender?.email ||
      !sender?.phone ||
      !sender?.address ||
      !receiver?.name ||
      !receiver?.email ||
      !receiver?.phone ||
      !receiver?.address ||
      !origin ||
      !destination ||
      !weight ||
      !estimatedDelivery ||
      price === undefined ||
      !city ||
      !country
    ) {
      return res.status(400).json({
        message: "Missing required shipment details",
      });
    }

    if (customer && !mongoose.Types.ObjectId.isValid(customer)) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    const trackingNumber = generateTracking();

    const shipment = await Shipment.create({
      trackingNumber,
      customer: customer || null,
      quote: null, // walk-in order
      sender,
      receiver,
      origin,
      destination,
      weight: Number(weight),
      quantity: quantity ? Number(quantity) : 1,
      estimatedDelivery,
      price: Number(price),
      status: "Booked",
      isDelivered: false,
    });

    /* 🌍 GEOCODE INITIAL LOCATION */
    const { lat, lng } = await geocodeLocation(city, country);

    /* 📍 SYSTEM TRACKING: BOOKED */
    await Tracking.create({
      shipment: shipment._id,
      trackingNumber,
      status: "Booked",
      city,
      country,
      lat,
      lng,
      message: message || "Shipment booked",
    });

    res.status(201).json({
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({ message: "Failed to create shipment" });
  }
};

/* ======================================================
   UPDATE SHIPMENT STATUS (ADMIN)
   RULES:
   ❌ Booked / Picked Up / Delivered → BLOCKED
   ✅ Other statuses → allowed anytime
   ✔ Auto-creates tracking event
====================================================== */
export const updateShipmentStatus = async (req, res) => {
  try {
    const { status, city, country, message, lat, lng } = req.body;

    if (!status || !city || !country) {
      return res.status(400).json({
        message: "Status, city and country are required",
      });
    }

    /* 🔒 SYSTEM-ONLY STATUSES */
    const blockedStatuses = ["Booked", "Picked Up", "Delivered"];

    if (blockedStatuses.includes(status)) {
      return res.status(400).json({
        message: `"${status}" is system-controlled and cannot be updated manually`,
      });
    }

    const allowedStatuses = [
      "In Transit",
      "Customs Clearance",
      "On Hold",
      "Out for Delivery",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid shipment status" });
    }

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    /* 🧠 CREATE TRACKING EVENT (NO OVERWRITE) */
    const coordinates =
      lat !== undefined && lng !== undefined
        ? { lat, lng }
        : await geocodeLocation(city, country);

    await Tracking.create({
      shipment: shipment._id,
      trackingNumber: shipment.trackingNumber,
      status,
      city,
      country,
      lat: coordinates.lat,
      lng: coordinates.lng,
      message: message || `${status} — ${city}, ${country}`,
    });

    /* 🔄 SYNC SHIPMENT STATUS */
    shipment.status = status;
    await shipment.save();

    res.json({
      message: "Shipment status updated successfully",
      shipment,
    });
  } catch (error) {
    console.error("Update shipment error:", error);

    /* 🔁 DUPLICATE SYSTEM STATUS SAFETY */
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This status has already been recorded for this shipment",
      });
    }

    res.status(500).json({ message: "Failed to update shipment" });
  }
};

/* ======================================================
   DELETE SHIPMENT (ADMIN)
   ✔ Deletes shipment
   ✔ Deletes tracking history
====================================================== */
export const deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    await Tracking.deleteMany({ shipment: shipment._id });
    await shipment.deleteOne();

    res.json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.error("Delete shipment error:", error);
    res.status(500).json({ message: "Failed to delete shipment" });
  }
};
