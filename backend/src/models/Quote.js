import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    /* ================= REGISTERED USER ================= */
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    /* ================= GUEST INFO ================= */
    guest: {
      name: String,
      email: String,
    },

    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    weight: { type: Number, required: true },
    price: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected", "Converted"],
      default: "Pending",
      index: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    approvedAt: Date,

    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
