import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= FIX LEAFLET ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Track() {
  const location = useLocation();

  const [trackingNumber, setTrackingNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shipment, setShipment] = useState(null);
  const [history, setHistory] = useState([]);
  const [coords, setCoords] = useState([]);

  /* ================= AUTO-FILL FROM MY QUOTES ================= */
  useEffect(() => {
    if (location.state?.trackingNumber) {
      setTrackingNumber(location.state.trackingNumber);
    }
  }, [location.state]);

  /* ================= CITY → COORDINATES ================= */
  const geocodeCity = async (city) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      );
      const data = await res.json();
      if (!data.length) return null;
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } catch {
      return null;
    }
  };

  /* ================= TRACK SHIPMENT ================= */
  const trackShipment = async () => {
    if (!trackingNumber) {
      setError("Please enter a tracking number");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setShipment(null);
      setHistory([]);
      setCoords([]);

      const res = await api.get(`/tracking/${trackingNumber}`);

      setShipment(res.data.shipment);
      setHistory(res.data.history);

      /* ================= BUILD MAP ROUTE ================= */
      const points = [];
      for (const h of res.data.history) {
        const c = await geocodeCity(h.city);
        if (c) points.push(c);
      }
      setCoords(points);
    } catch (err) {
      setError(
        err.response?.data?.message || "Tracking number not found"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= AUTO-TRACK WHEN NUMBER EXISTS ================= */
  useEffect(() => {
    if (trackingNumber) {
      trackShipment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackingNumber]);

  return (
    <section
      style={{
        minHeight: "80vh",
        padding: "60px 20px",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1100px" }}>
        <h1 style={{ textAlign: "center", marginBottom: 10 }}>
          Track Your Shipment
        </h1>

        <p style={{ textAlign: "center", color: "#64748b" }}>
          Enter your Dovic Express tracking number to view shipment progress
        </p>

        {/* ================= INPUT ================= */}
        <div className="card">
          <input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Tracking Number"
          />
          <button onClick={trackShipment} disabled={loading}>
            {loading ? "Tracking..." : "Track Shipment"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        {/* ================= MAP ================= */}
        {coords.length > 0 && (
          <div className="map-card">
            <MapContainer
              center={coords[coords.length - 1]}
              zoom={4}
              style={{ height: "420px" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {coords.map((c, i) => (
                <Marker key={i} position={c}>
                  <Popup>
                    <strong>{history[i]?.status}</strong>
                    <br />
                    {history[i]?.city}
                  </Popup>
                </Marker>
              ))}

              <Polyline
                positions={coords}
                pathOptions={{
                  color: "#ffd400",
                  weight: 4,
                  dashArray: "8 12",
                }}
              />
            </MapContainer>
          </div>
        )}

        {/* ================= SHIPMENT DETAILS ================= */}
        {shipment && (
          <div className="card">
            <h3>Shipment Information</h3>

            <p><strong>Tracking Number:</strong> {shipment.trackingNumber}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>Origin:</strong> {shipment.origin}</p>
            <p><strong>Destination:</strong> {shipment.destination}</p>
            <p><strong>Estimated Delivery:</strong> {shipment.estimatedDelivery}</p>
            <p><strong>Weight:</strong> {shipment.weight} kg</p>
            <p><strong>Quantity:</strong> {shipment.quantity}</p>
            <p><strong>Shipping Cost:</strong> ${shipment.price}</p>

            <hr />

            <h4>Sender</h4>
            <p>{shipment.sender.name}</p>
            <p>{shipment.sender.phone}</p>
            <p>{shipment.sender.address}</p>

            <h4>Receiver</h4>
            <p>{shipment.receiver.name}</p>
            <p>{shipment.receiver.phone}</p>
            <p>{shipment.receiver.address}</p>
          </div>
        )}

        {/* ================= TRACKING HISTORY ================= */}
        {history.length > 0 && (
          <div className="card">
            <h3>Shipment Timeline</h3>

            {history.map((h, i) => (
              <div key={i} className="history-item">
                <strong>{h.status}</strong>
                <div style={{ color: "#64748b" }}>{h.city}</div>
                {h.message && (
                  <p style={{ marginTop: 4 }}>{h.message}</p>
                )}
                <small>
                  {new Date(h.createdAt).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
