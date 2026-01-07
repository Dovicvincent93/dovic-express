import Quote from "../models/Quote.js";
import Shipment from "../models/Shipment.js";
import Tracking from "../models/Tracking.js";
import generateTracking from "../utils/generateTracking.js";

/* ======================================================
   CREATE QUOTE (PUBLIC / CUSTOMER)
   ✅ WORKS FOR LOGGED-IN & GUEST USERS
====================================================== */
export const createQuote = async (req, res) => {
  try {
    const {
      pickup,
      destination,
      weight,
      price = 0,
      name,
      email,
    } = req.body;

    if (!pickup || !destination || !weight) {
      return res.status(400).json({
        message: "Pickup, destination and weight are required",
      });
    }

    let customerId = null;
    let guestInfo = null;

    // LOGGED-IN USER
    if (req.user) {
      customerId = req.user._id;
    } 
    // GUEST USER
    else {
      if (!name || !email) {
        return res.status(400).json({
          message: "Name and email are required for guest quotes",
        });
      }

      guestInfo = { name, email };
    }

    const quote = await Quote.create({
      customer: customerId,
      guest: guestInfo,
      pickup,
      destination,
      weight,
      price,
      status: "Pending",
    });

    res.status(201).json({
      message: "Quote submitted successfully",
      quote,
    });
  } catch (error) {
    console.error("Create quote error:", error);
    res.status(500).json({
      message: "Failed to submit quote",
    });
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
  } catch (error) {
    console.error("Fetch quotes error:", error);
    res.status(500).json({
      message: "Failed to fetch quotes",
    });
  }
};

/* ======================================================
   APPROVE QUOTE (ADMIN)
====================================================== */
export const approveQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    if (quote.status !== "Pending") {
      return res.status(400).json({
        message: "Quote already processed",
      });
    }

    if (!quote.price || quote.price <= 0) {
      return res.status(400).json({
        message: "Quote price not set",
      });
    }

    quote.status = "Approved";
    quote.approvedBy = req.user._id;
    quote.approvedAt = new Date();

    await quote.save();

    res.json({
      message: "Quote approved successfully",
    });
  } catch (error) {
    console.error("Approval failed:", error);
    res.status(500).json({
      message: "Approval failed",
    });
  }
};

/* ======================================================
   REJECT QUOTE (ADMIN)
====================================================== */
export const rejectQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    if (quote.status !== "Pending") {
      return res.status(400).json({
        message: "Quote already processed",
      });
    }

    quote.status = "Rejected";
    quote.approvedBy = req.user._id;
    quote.approvedAt = new Date();

    await quote.save();

    res.json({
      message: "Quote rejected",
    });
  } catch (error) {
    console.error("Rejection failed:", error);
    res.status(500).json({
      message: "Rejection failed",
    });
  }
};

/* ======================================================
   CONVERT APPROVED QUOTE → SHIPMENT (ADMIN)
====================================================== */
export const convertToShipment = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    if (quote.status !== "Approved") {
      return res.status(400).json({
        message: "Quote must be approved first",
      });
    }

    if (!quote.price || quote.price <= 0) {
      return res.status(400).json({
        message: "Quote price not set",
      });
    }

    /* ================= CREATE SHIPMENT ================= */
    const shipment = await Shipment.create({
      trackingNumber: generateTracking(),
      customer: quote.customer || null,
      destination: quote.destination,
      price: quote.price,
      quote: quote._id,
      status: "Pending",
      isDelivered: false,
    });

    /* ================= FIRST TRACKING EVENT ================= */
    await Tracking.create({
      shipment: shipment._id,
      trackingNumber: shipment.trackingNumber,
      status: "Pending",
      city: quote.pickup,
      message: "Shipment created from approved quote",
    });

    /* ================= UPDATE QUOTE ================= */
    quote.status = "Converted";
    quote.shipment = shipment._id;
    await quote.save();

    res.json({
      message: "Quote converted to shipment successfully",
      shipment,
    });
  } catch (error) {
    console.error("Conversion failed:", error);
    res.status(500).json({
      message: "Conversion failed",
    });
  }
};

/* ======================================================
   UPDATE QUOTE PRICE (ADMIN)
====================================================== */
export const updateQuotePrice = async (req, res) => {
  try {
    const { price } = req.body;

    if (!price || Number(price) <= 0) {
      return res.status(400).json({
        message: "Invalid price",
      });
    }

    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found",
      });
    }

    if (quote.status !== "Pending") {
      return res.status(400).json({
        message: "Cannot update price after processing",
      });
    }

    quote.price = Number(price);
    await quote.save();

    res.json({
      message: "Quote price updated successfully",
      quote,
    });
  } catch (error) {
    console.error("Update price error:", error);
    res.status(500).json({
      message: "Failed to update price",
    });
  }
};

/* ======================================================
   GET MY QUOTES (LOGGED-IN CUSTOMER)
====================================================== */
export const getMyQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({
      customer: req.user._id,
    })
      .populate("shipment")
      .sort({ createdAt: -1 });

    res.json(quotes);
  } catch (error) {
    console.error("Get my quotes error:", error);
    res.status(500).json({
      message: "Failed to fetch your quotes",
    });
  }
};
