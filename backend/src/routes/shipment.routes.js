import express from "express";
import {
  getShipments,
  createShipment,
  updateShipmentStatus,
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
 * CREATE SHIPMENT (CREATE ORDER)
 */
router.post("/", protect, adminOnly, createShipment);

/**
 * UPDATE SHIPMENT STATUS + CITY
 * Locks automatically when Delivered
 */
router.put("/:id/status", protect, adminOnly, updateShipmentStatus);

export default router;
