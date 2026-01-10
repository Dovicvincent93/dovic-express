import Quote from "../models/Quote.js";
import Shipment from "../models/Shipment.js";
import Tracking from "../models/Tracking.js";
import generateTracking from "../utils/generateTracking.js";

/* ======================================================
   CREATE QUOTE (PUBLIC / CUSTOMER)
====================================================== */
export const createQuote = async (req, res) => {
  try {
    const { pickup, destination, weight, name, email } = req.body;

    if (!pickup || !destination || !weight) {
      return res.status(400).json({
        message: "Pickup, destination and weight are required",
      });
    }

    let customer = null;
    let guest = null;

    if (req.user) {
      customer = req.user._id;
    } else {
      if (!name || !email) {
        return res.status(400).json({
          message: "Name and email are required for guest quotes",
        });
      }
      guest = { name, email };
    }

    const quote = await Quote.create({
      customer,
      guest,
      pickup,
      destination,
      weight,
      status: "Pending",
    });

    res.status(201).json({
      message: "Quote submitted successfully",
      quote,
    });
  } catch (error) {
    console.error("Create quote error:", error);
    res.status(500).json({ message: "Failed to submit quote" });
  }
};

/* ======================================================
   GET ALL QUOTES (ADMIN)
====================================================== */
export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find()
      .populate("customer", "name email")
      .populate("shipment")
      .sort({ createdAt: -1 });

    res.json(quotes);
  } catch {
    res.status(500).json({ message: "Failed to fetch quotes" });
  }
};

/* ======================================================
   PRICE QUOTE (ADMIN)
====================================================== */
export const priceQuote = async (req, res) => {
  try {
    const { price, estimatedDelivery } = req.body;

    if (!price || Number(price) <= 0) {
      return res.status(400).json({ message: "Invalid price" });
    }

    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (quote.status !== "Pending") {
      return res
        .status(400)
        .json({ message: "Only pending quotes can be priced" });
    }

    quote.price = Number(price);
    quote.estimatedDelivery = estimatedDelivery || "5–7 business days";
    quote.status = "Priced";
    quote.pricedBy = req.user._id;
    quote.pricedAt = new Date();

    await quote.save();

    res.json({ message: "Quote priced successfully", quote });
  } catch {
    res.status(500).json({ message: "Failed to price quote" });
  }
};

/* ======================================================
   ACCEPT QUOTE (CUSTOMER)
====================================================== */
export const acceptQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (quote.status !== "Priced") {
      return res
        .status(400)
        .json({ message: "Only priced quotes can be accepted" });
    }

    quote.status = "Accepted";
    quote.acceptedAt = new Date();
    await quote.save();

    res.json({ message: "Quote accepted successfully", quote });
  } catch {
    res.status(500).json({ message: "Failed to accept quote" });
  }
};

/* ======================================================
   DECLINE QUOTE (CUSTOMER)
====================================================== */
export const declineQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (quote.status !== "Priced") {
      return res
        .status(400)
        .json({ message: "Only priced quotes can be declined" });
    }

    quote.status = "Declined";
    await quote.save();

    res.json({ message: "Quote declined", quote });
  } catch {
    res.status(500).json({ message: "Failed to decline quote" });
  }
};

/* ======================================================
   REJECT QUOTE (ADMIN)
====================================================== */
export const rejectQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (!["Pending", "Priced"].includes(quote.status)) {
      return res.status(400).json({ message: "Quote already processed" });
    }

    quote.status = "Rejected";
    await quote.save();

    res.json({ message: "Quote rejected", quote });
  } catch {
    res.status(500).json({ message: "Rejection failed" });
  }
};

/* ======================================================
   CONVERT ACCEPTED QUOTE → SHIPMENT (ADMIN)
====================================================== */
export const convertToShipment = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id).populate("customer");

    if (!quote) return res.status(404).json({ message: "Quote not found" });

    if (quote.status !== "Accepted") {
      return res.status(400).json({
        message: "Quote must be accepted before conversion",
      });
    }

    if (quote.shipment) {
      return res.status(400).json({ message: "Quote already converted" });
    }

    const trackingNumber = generateTracking();

    const senderEmail =
      quote.customer?.email ||
      quote.guest?.email ||
      "sender@dovicexpress.com";

    /* ================= CREATE SHIPMENT ================= */
    const shipment = await Shipment.create({
      trackingNumber,
      customer: quote.customer || null,
      quote: quote._id,

      sender: {
        name: quote.customer?.name || quote.guest?.name || "Sender",
        email: senderEmail,
        phone: "0000000000",
        address: quote.pickup,
      },

      receiver: {
        name: "Receiver",
        email: senderEmail,
        phone: "0000000000",
        address: quote.destination,
      },

      origin: quote.pickup,
      destination: quote.destination,
      weight: quote.weight,
      quantity: 1,
      estimatedDelivery: quote.estimatedDelivery,
      price: quote.price,

      status: "Booked",
      isDelivered: false,
    });

    /* ================= TRACKING ================= */
    await Tracking.create({
      shipment: shipment._id,
      trackingNumber,
      status: "Booked",
      city: quote.pickup,
      country: "Nigeria",
      message: "Shipment booked from accepted quote",
    });

    quote.status = "Converted";
    quote.shipment = shipment._id;
    await quote.save();

    res.json({
      message: "Quote converted to shipment successfully",
      shipment,
    });
  } catch (error) {
    console.error("Conversion failed:", error);
    res.status(500).json({ message: "Conversion failed" });
  }
};

/* ======================================================
   GET MY QUOTES (CUSTOMER)
====================================================== */
export const getMyQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ customer: req.user._id })
      .populate("shipment")
      .sort({ createdAt: -1 });

    res.json(quotes);
  } catch {
    res.status(500).json({ message: "Failed to fetch your quotes" });
  }
};
