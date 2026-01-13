import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./QuoteShipmentDetails.css";

export default function QuoteShipmentDetails() {
  const { id } = useParams(); // quote id
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    sender: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    receiver: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    city: "",
    country: "",
    quantity: 1,
    adminNote: "",
  });

  /* ===============================
     HANDLE CHANGE
  =============================== */
  const handleChange = (section, field, value) => {
    setForm((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], [field]: value }
          : value,
    }));
  };

  /* ===============================
     SUBMIT SHIPMENT DETAILS
  =============================== */
  const submitDetails = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post(`/quotes/${id}/shipment-details`, form);

      alert("Shipment details submitted successfully");

      navigate("/my-quotes");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to submit shipment details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="shipment-details-page">
      <div className="shipment-details-container">
        <h2>Complete Shipment Details</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={submitDetails}>
          {/* ================= SENDER ================= */}
          <h3>Sender Information</h3>

          <input
            placeholder="Sender Name"
            value={form.sender.name}
            onChange={(e) =>
              handleChange("sender", "name", e.target.value)
            }
            required
          />

          <input
            placeholder="Sender Email"
            type="email"
            value={form.sender.email}
            onChange={(e) =>
              handleChange("sender", "email", e.target.value)
            }
            required
          />

          <input
            placeholder="Sender Phone"
            value={form.sender.phone}
            onChange={(e) =>
              handleChange("sender", "phone", e.target.value)
            }
            required
          />

          <textarea
            placeholder="Sender Address"
            value={form.sender.address}
            onChange={(e) =>
              handleChange("sender", "address", e.target.value)
            }
            required
          />

          {/* ================= RECEIVER ================= */}
          <h3>Receiver Information</h3>

          <input
            placeholder="Receiver Name"
            value={form.receiver.name}
            onChange={(e) =>
              handleChange("receiver", "name", e.target.value)
            }
            required
          />

          <input
            placeholder="Receiver Email"
            type="email"
            value={form.receiver.email}
            onChange={(e) =>
              handleChange("receiver", "email", e.target.value)
            }
            required
          />

          <input
            placeholder="Receiver Phone"
            value={form.receiver.phone}
            onChange={(e) =>
              handleChange("receiver", "phone", e.target.value)
            }
            required
          />

          <textarea
            placeholder="Receiver Address"
            value={form.receiver.address}
            onChange={(e) =>
              handleChange("receiver", "address", e.target.value)
            }
            required
          />

          {/* ================= SHIPMENT INFO ================= */}
          <h3>Shipment Information</h3>

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              handleChange("city", null, e.target.value)
            }
            required
          />

          <input
            placeholder="Country"
            value={form.country}
            onChange={(e) =>
              handleChange("country", null, e.target.value)
            }
            required
          />

          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) =>
              handleChange(
                "quantity",
                null,
                Number(e.target.value)
              )
            }
          />

          <textarea
            placeholder="Admin note (optional)"
            value={form.adminNote}
            onChange={(e) =>
              handleChange("adminNote", null, e.target.value)
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Shipment Details"}
          </button>
        </form>
      </div>
    </section>
  );
}
