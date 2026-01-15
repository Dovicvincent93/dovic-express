import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RouteScrollToTop from "./components/RouteScrollToTop";
import ScrollToHash from "./components/ScrollToHash";

import Home from "./pages/Home";
import Track from "./pages/Track";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyQuotes from "./pages/MyQuotes";
import QuoteShipmentDetails from "./pages/QuoteShipmentDetails";

import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Quotes from "./pages/Admin/Quotes";
import Shipments from "./pages/Admin/Shipments";
import ShipmentDetails from "./pages/Admin/ShipmentDetails";
import Inbox from "./pages/Admin/Inbox";

import Careers from "./pages/Careers";
import Sustainability from "./pages/Sustainability";
import Investors from "./pages/Investors";
import FAQs from "./pages/FAQs";
import Claims from "./pages/Claims";
import Terms from "./pages/Terms";
import Compliance from "./pages/Compliance";
import Privacy from "./pages/Privacy";

// ============================
// AUTH ROUTE GUARD (CUSTOMER)
// ============================
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

// ============================
// ADMIN ROUTE GUARD
// ============================
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />

      {/* SCROLL HANDLERS */}
      <ScrollToHash />

<main className="app-main full-bleed">
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* ===== CUSTOMER ROUTES ===== */}
          <Route
            path="/my-quotes"
            element={
              <ProtectedRoute>
                <MyQuotes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quotes/:id/shipment-details"
            element={
              <ProtectedRoute>
                <QuoteShipmentDetails />
              </ProtectedRoute>
            }
          />

          {/* ===== ADMIN ROUTES ===== */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="quotes" element={<Quotes />} />
            <Route path="shipments" element={<Shipments />} />
            <Route path="shipments/:id" element={<ShipmentDetails />} />
            <Route path="inbox" element={<Inbox />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

