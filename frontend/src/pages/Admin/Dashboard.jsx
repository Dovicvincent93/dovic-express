import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Admin.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data.stats);
        setShipments(res.data.recentShipments);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-page">
      <h2>Operations Overview</h2>
      <p className="admin-subtitle">
        Monitor logistics activity, customer demand, and shipment flow in real time.
      </p>

      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Quotes" value={stats.totalQuotes} />
        <StatCard title="Total Shipments" value={stats.totalShipments} />
        <StatCard title="Delivered" value={stats.deliveredShipments} />
      </div>

      {/* ================= RECENT SHIPMENTS ================= */}
      <div className="admin-card">
        <h3>Recent Shipments</h3>

        {shipments.length === 0 ? (
          <p>No shipments yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tracking</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((s) => (
                <tr key={s._id}>
                  <td>
                    <strong>{s.trackingNumber}</strong>
                  </td>

                  <td>
                    {s.sender?.name || "—"}
                  </td>

                  <td>
                    {s.receiver?.name || "—"}
                  </td>

                  <td>{s.destination}</td>

                  <td>
                    <span
                      className={`status ${s.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td>
                    {new Date(s.createdAt).toLocaleDateString()}
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

/* ================= SMALL STAT CARD ================= */
function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <strong>{value}</strong>
    </div>
  );
}
