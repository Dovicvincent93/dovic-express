import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    /* ================= LINKED SHIPMENT ================= */
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
      index: true,
    },

    trackingNumber: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },

    /* ================= STATUS EVENT ================= */
    status: {
      type: String,
      enum: [
        "Booked",            // system-only (once)
        "Picked Up",         // system-only (once)
        "In Transit",        // repeatable
        "Customs Clearance", // repeatable
        "On Hold",           // repeatable
        "Out for Delivery",  // repeatable
        "Delivered",         // system-only (once, final)
      ],
      required: true,
    },

    /* ================= LOCATION ================= */
    city: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= OPTIONAL GEO ================= */
    lat: {
      type: Number,
      default: null,
    },

    lng: {
      type: Number,
      default: null,
    },

    /* ================= MESSAGE ================= */
    message: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ======================================================
   MODEL-LEVEL SAFETY RULES (VERY IMPORTANT)
====================================================== */

/*
  Prevent multiple "Booked", "Picked Up", or "Delivered"
  for the same shipment.
*/
trackingSchema.index(
  { shipment: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["Booked", "Picked Up", "Delivered"] },
    },
  }
);

export default mongoose.model("Tracking", trackingSchema);
