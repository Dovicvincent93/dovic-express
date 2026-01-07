import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import {
  createQuote,
  approveQuote,
  updateQuotePrice,
  rejectQuote,
  convertToShipment,
  getAllQuotes,
  getMyQuotes,
} from "../controllers/quote.controller.js";

const router = express.Router();

/* ======================
   PUBLIC (GUEST + USER)
====================== */
router.post("/", createQuote);

/* ======================
   LOGGED-IN USER
====================== */
router.get("/my", protect, getMyQuotes);

/* ======================
   ADMIN
====================== */
router.get("/", protect, adminOnly, getAllQuotes);
router.patch("/:id/approve", protect, adminOnly, approveQuote);
router.patch("/:id/reject", protect, adminOnly, rejectQuote);
router.post("/:id/convert", protect, adminOnly, convertToShipment);
router.patch("/:id", protect, adminOnly, updateQuotePrice);

export default router;
