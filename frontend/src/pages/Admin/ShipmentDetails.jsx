import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function ShipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shipment, setShipment] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/shipments/${id}/details`);

      setShipment(res.data.shipment);
      setHistory(res.data.trackingHistory);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load shipment details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  if (loading) {
    return <p>Loading shipment details...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="admin-page">
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: 20 }}
      >
        ← Back to Shipments
      </button>

      {/* ================= SHIPMENT SUMMARY ================= */}
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          marginBottom: 30,
        }}
      >
        <h2>Shipment Summary</h2>

        <p>
          <strong>Tracking Number:</strong>{" "}
          {shipment.trackingNumber}
        </p>

        <p>
          <strong>Destination:</strong>{" "}
          {shipment.destination}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {shipment.status}
        </p>

        <p>
          <strong>Price:</strong> ${shipment.price}
        </p>

        {shipment.isDelivered && (
          <p style={{ color: "green", fontWeight: 600 }}>
            Delivered (Locked)
          </p>
        )}
      </div>

      {/* ================= TRACKING HISTORY ================= */}
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Tracking & Update History</h2>

        {history.length === 0 ? (
          <p>No tracking history available.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>City</th>
                <th>Message</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {history.map((h) => (
                <tr key={h._id}>
                  <td>
                    <strong>{h.status}</strong>
                  </td>
                  <td>{h.city}</td>
                  <td>{h.message || "-"}</td>
                  <td>
                    {new Date(h.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
