import express from "express";
import { trackShipment } from "../controllers/tracking.controller.js";

const router = express.Router();

/**
 * PUBLIC TRACKING
 */
router.get("/:trackingNumber", trackShipment);

export default router;
