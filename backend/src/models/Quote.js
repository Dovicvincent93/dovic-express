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
      name: { type: String },
      email: { type: String },
    },

    /* ================= QUOTE DETAILS ================= */
    pickup: {
      type: String,
      required: true,
      trim: true,
    },

    destination: {
      type: String,
      required: true,
      trim: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 0.1,
    },

    /* ================= PRICING ================= */
    price: {
      type: Number,
      default: null, // ✅ price is NOT known at creation
      min: 0,
    },

    estimatedDelivery: {
      type: String,
      default: null,
    },

    /* ================= QUOTE STATUS ================= */
    status: {
      type: String,
      enum: [
        "Pending",   // customer submitted
        "Priced",    // admin set price
        "Accepted",  // customer accepted
        "Declined",  // customer declined
        "Converted", // shipment created
        "Rejected",  // admin rejected
      ],
      default: "Pending",
      index: true,
    },

    /* ================= ADMIN ACTIONS ================= */
    pricedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    pricedAt: {
      type: Date,
      default: null,
    },

    /* ================= CUSTOMER ACTION ================= */
    acceptedAt: {
      type: Date,
      default: null,
    },

    /* ================= SHIPMENT LINK ================= */
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quote", quoteSchema);
