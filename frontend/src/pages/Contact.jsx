import { useState } from "react";
import api from "../api/axios";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT FORM ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/contact", form);

      setSuccess("✅ Message sent successfully. We’ll get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Failed to send message. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page">
      {/* ================= HERO ================= */}
      <div className="contact-hero">
        <h1>Contact Dovic Express</h1>
        <p>
          We’re here to help with your shipping, tracking, and logistics needs.
          Reach out to our support team anytime.
        </p>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div className="contact-info-grid">
        <div className="contact-card">
          <h3>📞 Call Us</h3>
          <p>Customer Support</p>
          <strong>+234 000 000 0000</strong>
          <span>Mon – Sat, 8:00am – 6:00pm</span>
        </div>

        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>General Inquiries</p>
          <strong>support@dovicexpress.com</strong>
          <span>We reply within 24 hours</span>
        </div>

        <div className="contact-card">
          <h3>📍 Office</h3>
          <p>Head Office</p>
          <strong>Lagos, Nigeria</strong>
          <span>Worldwide operations</span>
        </div>

        <div className="contact-card">
          <h3>⏱ Business Hours</h3>
          <p>Operating Time</p>
          <strong>Mon – Sat</strong>
          <span>8:00am – 6:00pm</span>
        </div>
      </div>

      {/* ================= CONTACT FORM ================= */}
      <div className="contact-form-section">
        <h2>Send Us a Message</h2>
        <p>
          Fill out the form below and our logistics team will get back to you.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>

      {/* ================= MAP SECTION ================= */}
      <div className="contact-map-section">
        <h2>Our Location</h2>
        <p>Visit our head office in Lagos, Nigeria</p>

        <div className="map-wrapper">
          <iframe
            title="Dovic Express Location"
            src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* ================= TRUST BLOCK ================= */}
      <div className="contact-trust">
        <h3>Why Contact Dovic Express?</h3>
        <ul>
          <li>✔ Fast & reliable delivery support</li>
          <li>✔ Real-time shipment tracking</li>
          <li>✔ Dedicated customer service</li>
          <li>✔ International & domestic logistics experts</li>
        </ul>
      </div>
    </section>
  );
}
