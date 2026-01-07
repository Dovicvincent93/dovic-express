import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import app from "./app.js";

/* =========================
   FIX __dirname FOR ES MODULES
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   LOAD ENV FROM ROOT
========================= */
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

/* =========================
   DEBUG (TEMPORARY)
========================= */
console.log("📦 MONGO_URI:", process.env.MONGO_URI);
console.log("📧 RESEND_API_KEY:", process.env.RESEND_API_KEY ? "LOADED" : "MISSING");


const PORT = process.env.PORT || 5000;

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Dovic Express API running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
