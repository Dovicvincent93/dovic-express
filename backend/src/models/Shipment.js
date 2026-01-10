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

    /* ================= LINKED CUSTOMER =================
       Present if shipment was created from a registered user
    */
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    /* ================= SOURCE QUOTE =================
       Shipment MUST come from an accepted quote
    */
    quote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quote",
      required: true, // ✅ ENFORCED
      index: true,
    },

    /* ================= SENDER DETAILS ================= */
    sender: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
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
      email: {
        type: String,
        required: true,
        lowercase: true,
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
      min: 0.1,
    },

    quantity: {
      type: Number,
      min: 1,
      default: 1,
    },

    /* ================= DELIVERY ETA ================= */
    estimatedDelivery: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= FINAL PRICE ================= */
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    /* ================= SHIPMENT STATUS ================= */
    status: {
      type: String,
      enum: [
        "Booked",          // created from accepted quote
        "Picked Up",
        "In Transit",
        "Customs Clearance",
        "On Hold",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Booked",
      index: true,
    },

    /* ================= DELIVERY CONFIRMATION ================= */
    isDelivered: {
      type: Boolean,
      default: false,
    },

    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shipment", shipmentSchema);
