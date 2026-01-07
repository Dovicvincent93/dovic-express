import mongoose from "mongoose";
import Shipment from "../models/Shipment.js";
import Tracking from "../models/Tracking.js";
import generateTracking from "../utils/generateTracking.js";

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
    res.status(500).json({
      message: "Failed to fetch shipments",
    });
  }
};

/* ======================================================
   CREATE SHIPMENT / ORDER (ADMIN)
   ✔ Works with:
     - registered customer
     - walk-in (no customer)
     - with or without quote
====================================================== */
export const createShipment = async (req, res) => {
  try {
    const {
      customer, // optional
      quote, // optional

      sender,
      receiver,

      origin,
      destination,
      weight,
      quantity,
      estimatedDelivery,

      price,
      city,
      message,
    } = req.body;

    /* ================= VALIDATION ================= */
    if (
      !sender?.name ||
      !sender?.phone ||
      !sender?.address ||
      !receiver?.name ||
      !receiver?.phone ||
      !receiver?.address ||
      !origin ||
      !destination ||
      !weight ||
      !estimatedDelivery ||
      price === undefined ||
      !city
    ) {
      return res.status(400).json({
        message: "Missing required shipment details",
      });
    }

    // OPTIONAL customer (registered users only)
    if (customer && !mongoose.Types.ObjectId.isValid(customer)) {
      return res.status(400).json({
        message: "Invalid customer ID",
      });
    }

    // OPTIONAL quote
    if (quote && !mongoose.Types.ObjectId.isValid(quote)) {
      return res.status(400).json({
        message: "Invalid quote ID",
      });
    }

    /* ================= CREATE SHIPMENT ================= */
    const shipment = await Shipment.create({
      trackingNumber: generateTracking(),

      customer: customer || null,
      quote: quote || null,

      sender: {
        name: sender.name,
        phone: sender.phone,
        address: sender.address,
      },

      receiver: {
        name: receiver.name,
        phone: receiver.phone,
        address: receiver.address,
      },

      origin,
      destination,
      weight: Number(weight),
      quantity: quantity ? Number(quantity) : 1,
      estimatedDelivery,

      price: Number(price),

      status: "Pending",
      isDelivered: false,
    });

    /* ================= FIRST TRACKING EVENT ================= */
    await Tracking.create({
      shipment: shipment._id,
      trackingNumber: shipment.trackingNumber,
      status: "Pending",
      city,
      message:
        message ||
        "Shipment has been created and is awaiting dispatch",
    });

    res.status(201).json({
      message: "Shipment created successfully",
      shipment,
    });
  } catch (error) {
    console.error("Create shipment error:", error);
    res.status(500).json({
      message: "Failed to create shipment",
    });
  }
};

/* ======================================================
   UPDATE SHIPMENT STATUS + LOCATION + NOTE (ADMIN)
   🔒 Locks permanently after Delivered
====================================================== */
export const updateShipmentStatus = async (req, res) => {
  try {
    const { status, city, message } = req.body;

    const allowedStatuses = [
      "Pending",
      "In Transit",
      "Custom Clearance",
      "On Hold",
      "Out for Delivery",
      "Delivered",
    ];

    /* ================= VALIDATION ================= */
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid shipment status",
      });
    }

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({
        message: "Shipment not found",
      });
    }

    /* ================= DELIVERY LOCK ================= */
    if (shipment.isDelivered) {
      return res.status(400).json({
        message:
          "Shipment has already been delivered. Further updates are not allowed.",
      });
    }

    /* ================= UPDATE SHIPMENT ================= */
    shipment.status = status;

    if (status === "Delivered") {
      shipment.isDelivered = true;
    }

    await shipment.save();

    /* ================= TRACKING HISTORY (AUDIT LOG) ================= */
    await Tracking.create({
      shipment: shipment._id,
      trackingNumber: shipment.trackingNumber,
      status,
      city,
      message:
        message ||
        `${status} — ${city}`,
    });

    res.json({
      message: "Shipment status updated successfully",
      shipment,
    });
  } catch (error) {
    console.error("Update shipment error:", error);
    res.status(500).json({
      message: "Failed to update shipment",
    });
  }
};
