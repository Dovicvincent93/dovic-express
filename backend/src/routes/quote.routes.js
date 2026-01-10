import express from "express";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import {
  createQuote,
  getAllQuotes,
  getMyQuotes,

  priceQuote,        // admin sets price
  rejectQuote,       // admin rejects quote

  acceptQuote,       // customer accepts
  declineQuote,      // customer declines

  convertToShipment, // system/admin converts accepted quote
} from "../controllers/quote.controller.js";

const router = express.Router();

/* ======================================================
   PUBLIC (GUEST + AUTHENTICATED USER)
====================================================== */
router.post("/", createQuote);

/* ======================================================
   LOGGED-IN CUSTOMER
====================================================== */
router.get("/my", protect, getMyQuotes);
router.post("/:id/accept", protect, acceptQuote);
router.post("/:id/decline", protect, declineQuote);

/* ======================================================
   ADMIN
====================================================== */
router.get("/", protect, adminOnly, getAllQuotes);
router.patch("/:id/price", protect, adminOnly, priceQuote);
router.patch("/:id/reject", protect, adminOnly, rejectQuote);

/* ======================================================
   SYSTEM / ADMIN
   (ONLY AFTER CUSTOMER ACCEPTANCE)
====================================================== */
router.post("/:id/convert", protect, adminOnly, convertToShipment);

export default router;
