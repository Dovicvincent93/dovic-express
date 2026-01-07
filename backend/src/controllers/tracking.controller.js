import Shipment from "../models/Shipment.js";
import Tracking from "../models/Tracking.js";

/* ======================================================
   TRACK SHIPMENT (PUBLIC)
====================================================== */
export const trackShipment = async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    if (!trackingNumber) {
      return res.status(400).json({
        message: "Tracking number is required",
      });
    }

    /* ================= FIND SHIPMENT ================= */
    const shipment = await Shipment.findOne({ trackingNumber })
      .populate("customer", "name email");

    if (!shipment) {
      return res.status(404).json({
        message: "Shipment not found",
      });
    }

    /* ================= FETCH TRACKING HISTORY ================= */
    const history = await Tracking.find({ trackingNumber })
      .sort({ createdAt: 1 });

    /* ================= RESPONSE ================= */
    res.json({
      shipment: {
        trackingNumber: shipment.trackingNumber,

        /* ---------- CUSTOMER (OPTIONAL) ---------- */
        customer: shipment.customer
          ? {
              name: shipment.customer.name,
              email: shipment.customer.email,
            }
          : null,

        /* ---------- SENDER ---------- */
        sender: {
          name: shipment.sender?.name || "",
          phone: shipment.sender?.phone || "",
          address: shipment.sender?.address || "",
        },

        /* ---------- RECEIVER ---------- */
        receiver: {
          name: shipment.receiver?.name || "",
          phone: shipment.receiver?.phone || "",
          address: shipment.receiver?.address || "",
        },

        /* ---------- ROUTE ---------- */
        origin: shipment.origin,
        destination: shipment.destination,

        /* ---------- CARGO ---------- */
        weight: shipment.weight,
        quantity: shipment.quantity,

        /* ---------- DELIVERY ---------- */
        estimatedDelivery: shipment.estimatedDelivery,

        /* ---------- PAYMENT ---------- */
        price: shipment.price,

        /* ---------- STATUS ---------- */
        status: shipment.status,
        isDelivered: shipment.isDelivered,

        /* ---------- METADATA ---------- */
        createdAt: shipment.createdAt,
      },

      /* ================= TRACKING HISTORY ================= */
      history: history.map((h) => ({
        status: h.status,               // "In Transit"
        location: h.city,               // Kigali, Rwanda
        note:
          h.message ||
          `${h.status}`,                // clean professional fallback
        createdAt: h.createdAt,
      })),
    });
  } catch (error) {
    console.error("Tracking error:", error);
    res.status(500).json({
      message: "Failed to track shipment",
    });
  }
};
