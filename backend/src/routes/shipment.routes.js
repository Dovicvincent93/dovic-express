import express from "express";
import {
  getShipments,
  createShipment,
  updateShipmentStatus,
  deleteShipment, // ✅ FIX: IMPORT ADDED
} from "../controllers/shipment.controller.js";

import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ======================================================
   ADMIN — SHIPMENTS
====================================================== */

/**
 * GET ALL SHIPMENTS
 */
router.get("/", protect, adminOnly, getShipments);

/**
 * CREATE SHIPMENT (ADMIN ORDER)
 */
router.post("/", protect, adminOnly, createShipment);

/**
 * UPDATE SHIPMENT STATUS
 * (Admin-updatable statuses only)
 */
router.patch("/:id/status", protect, adminOnly, updateShipmentStatus);

/**
 * DELETE SHIPMENT
 * ✔ Deletes shipment
 * ✔ Deletes tracking history
 */
router.delete("/:id", protect, adminOnly, deleteShipment);

export default router;
