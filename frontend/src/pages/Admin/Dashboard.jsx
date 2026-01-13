import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Admin.css";

export default function Dashboard() {
  // ✅ FIX 1: initialize stats safely (NOT null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuotes: 0,
    totalShipments: 0,
    deliveredShipments: 0,
  });

  const [shipments, setShipments] = useState([]); // already correct
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");

        /*
          ✅ FIX 2: defensive parsing
          Backend may return:
          { stats: {...}, recentShipments: [...] }
          OR something slightly different later
        */
        const statsData =
          res.data?.stats || {
            totalUsers: 0,
            totalQuotes: 0,
            totalShipments: 0,
            deliveredShipments: 0,
          };

        const recentShipments = Array.isArray(res.data?.recentShipments)
          ? res.data.recentShipments
          : [];

        setStats(statsData);
        setShipments(recentShipments);
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
            <tbody>
              {shipments.map((s) => (
                <tr key={s._id}>
                  <td data-label="Tracking">
                    <strong>{s.trackingNumber}</strong>
                  </td>

                  <td data-label="Sender">
                    {s.sender?.name || "—"}
                  </td>

                  <td data-label="Receiver">
                    {s.receiver?.name || "—"}
                  </td>

                  <td data-label="Destination">
                    {s.destination}
                  </td>

                  <td data-label="Status">
                    <span
                      className={`status ${s.status
                        .toLowerCase()
                        .replace(/\s/g, "-")}`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td data-label="Date">
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
