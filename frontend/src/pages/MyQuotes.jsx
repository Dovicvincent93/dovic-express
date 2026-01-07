import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadMyQuotes = async () => {
    try {
      const res = await api.get("/quotes/my");
      setQuotes(res.data);
    } catch (error) {
      console.error("Failed to load quotes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyQuotes();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading your quotes...</p>;
  }

  return (
    <div className="page">
      <h2>My Quotes</h2>

      {quotes.length === 0 ? (
        <p>No quotes found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Pickup</th>
              <th>Destination</th>
              <th>Weight</th>
              <th>Price</th>
              <th>Status</th>
              <th>Tracking</th>
            </tr>
          </thead>

          <tbody>
            {quotes.map((q) => (
              <tr key={q._id}>
                <td>{q.pickup}</td>
                <td>{q.destination}</td>
                <td>{q.weight} kg</td>

                <td>
                  {q.price > 0 ? `$${q.price}` : "—"}
                </td>

                <td>
                  <strong>{q.status}</strong>
                </td>

                <td>
                  {q.shipment ? (
                    <>
                      {/* TRACKING NUMBER */}
                      <div style={{ fontWeight: "600" }}>
                        {q.shipment.trackingNumber}
                      </div>

                      {/* SHIPMENT STATUS */}
                      <small style={{ color: "#64748b" }}>
                        {q.shipment.status}
                      </small>

                      {/* TRACK BUTTON */}
                      <div>
                        <button
                          style={{
                            marginTop: "6px",
                            padding: "6px 10px",
                            fontSize: "13px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            navigate("/track", {
                              state: {
                                trackingNumber:
                                  q.shipment.trackingNumber,
                              },
                            })
                          }
                        >
                          Track Shipment
                        </button>
                      </div>
                    </>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
