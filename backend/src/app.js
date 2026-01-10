import express from "express";
import cors from "cors";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import shipmentRoutes from "./routes/shipment.routes.js";
import trackingRoutes from "./routes/tracking.routes.js";
import quoteRoutes from "./routes/quote.routes.js";
import adminRoutes from "./routes/admin.routes.js"; // 👈 admin
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import adminInboxRoutes from "./routes/adminInbox.routes.js";
import aiRoutes from "./routes/ai.routes.js";

// ============================
// INITIALIZE APP FIRST
// ============================
const app = express();

// ============================
// GLOBAL MIDDLEWARE
// ============================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://sf-style-logistics.vercel.app"

    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// ============================
// ROUTES
// ============================
app.use("/api/auth", authRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/admin", adminRoutes); // ✅ SAFE NOW
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/inbox", adminInboxRoutes);
app.use("/api/ai", aiRoutes);

// ============================
// HEALTH CHECK
// ============================
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Dovic Express API",
    version: "1.0.0",
  });
});

export default app;
