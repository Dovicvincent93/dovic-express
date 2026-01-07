import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    /* ================= TRACKING ================= */
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    /* ================= CUSTOMER (OPTIONAL) =================
       Registered users only.
       Walk-in admin orders use sender/receiver instead.
    */
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    /* ================= OPTIONAL QUOTE LINK ================= */
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
      default: null,
      index: true,
    },

    /* ================= SENDER DETAILS ================= */
    sender: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
    },

    /* ================= RECEIVER DETAILS ================= */
    receiver: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
    },

    /* ================= ROUTE ================= */
    origin: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= CARGO ================= */
    weight: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    /* ================= DELIVERY TIME (ETA) ================= */
    estimatedDelivery: {
      type: String, // e.g. "6–10 business days"
      required: true,
      trim: true,
    },

    /* ================= FINAL PRICE ================= */
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    /* ================= CURRENT STATUS ================= */
    status: {
      type: String,
      enum: [
        "Pending",
        "In Transit",
        "Custom Clearance",
        "On Hold",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Pending",
      index: true,
    },

    /* ================= DELIVERY LOCK ================= */
    isDelivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

export default mongoose.model("Shipment", shipmentSchema);
