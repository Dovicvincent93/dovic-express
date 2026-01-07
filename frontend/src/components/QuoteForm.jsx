import { useState } from "react";
import api from "../api/axios";

export default function QuoteForm() {
  /* ================= AUTH CHECK ================= */
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(localStorage.getItem("user")) : null;

  /* ================= FORM STATE ================= */
  const [form, setForm] = useState({
    name: "",
    email: "",
    pickup: "",
    destination: "",
    weight: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT QUOTE ================= */
  const submitQuote = async (e) => {
    e.preventDefault();
    setMessage("");

    /* ===== VALIDATION ===== */
    if (!form.pickup || !form.destination || !form.weight) {
      setMessage("Origin, destination, and weight are required.");
      return;
    }

    if (!user && (!form.name || !form.email)) {
      setMessage("Name and email are required for guest quotes.");
      return;
    }

    try {
      setLoading(true);

      /* ===== PAYLOAD ===== */
      const payload = {
        pickup: form.pickup,
        destination: form.destination,
        weight: Number(form.weight),
        description: form.description,
      };

      // 👇 Guest users must send name + email
      if (!user) {
        payload.name = form.name;
        payload.email = form.email;
      }

      await api.post("/quotes", payload);

      setMessage("✅ Quote request submitted successfully.");

      setForm({
        name: "",
        email: "",
        pickup: "",
        destination: "",
        weight: "",
        description: "",
      });
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to submit quote."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        padding: "80px 24px",
        background: "#f8fafc",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h2>Request a Shipping Quote</h2>
      <p>Transparent pricing. Enterprise-grade logistics.</p>

      <form
        onSubmit={submitQuote}
        style={{
          display: "grid",
          gap: "14px",
          marginTop: "24px",
        }}
      >
        {/* ===== GUEST ONLY ===== */}
        {!user && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          name="pickup"
          placeholder="Origin"
          value={form.pickup}
          onChange={handleChange}
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />

        <input
          name="weight"
          type="number"
          placeholder="Weight (kg)"
          value={form.weight}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Shipment description (optional)"
          rows="4"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>

        {message && (
          <p style={{ color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
