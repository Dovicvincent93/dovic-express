import mongoose from "mongoose";

const trackingSchema = new mongoose.Schema(
  {
    /* ================= SHIPMENT LINK ================= */
    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
      index: true,
    },

    /* ================= TRACKING NUMBER ================= */
    trackingNumber: {
      type: String,
      required: true,
      index: true,
    },

    /* ================= STATUS =================
       Controlled vocabulary for logistics flow
    */
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
      required: true,
    },

    /* ================= LOCATION =================
       City / Country / Hub
       Used for maps + history
    */
    city: {
      type: String,
      required: true,
      trim: true,
    },

    /* ================= ADMIN NOTE =================
       Optional professional message
       Examples:
       "Shipment departed regional hub"
       "Arrived at customs facility"
    */
    message: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt = timeline
  }
);

export default mongoose.model("Tracking", trackingSchema);
