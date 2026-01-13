import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./MyQuotes.css";

export default function MyQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const navigate = useNavigate();

  /* ===============================
     LOAD MY QUOTES
  =============================== */
  const loadMyQuotes = async () => {
    try {
      const res = await api.get("/quotes/my");
      setQuotes(res.data || []);
    } catch (error) {
      console.error("Failed to load quotes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyQuotes();
  }, []);

  /* ===============================
     ACCEPT QUOTE (CUSTOMER)
  =============================== */
  const acceptQuote = async (id) => {
    try {
      setActionId(id);
      await api.post(`/quotes/${id}/accept`);
      await loadMyQuotes();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to accept quote"
      );
    } finally {
      setActionId(null);
    }
  };

  /* ===============================
     DECLINE QUOTE (CUSTOMER)
  =============================== */
  const declineQuote = async (id) => {
    const confirmDecline = window.confirm(
      "Are you sure you want to decline this quote?"
    );
    if (!confirmDecline) return;

    try {
      setActionId(id);
      await api.post(`/quotes/${id}/decline`);
      await loadMyQuotes();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to decline quote"
      );
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="quotes-loading">
        Loading your quotes…
      </div>
    );
  }

  return (
    <section className="quotes-page">
      <div className="quotes-container">
        <h2>My Quotes</h2>

        {quotes.length === 0 ? (
          <div className="empty-state">
            <p>You have not requested any quotes yet.</p>
          </div>
        ) : (
          <table className="quotes-table">
            <thead>
              <tr>
                <th>Pickup</th>
                <th>Destination</th>
                <th>Weight</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
                <th>Tracking</th>
              </tr>
            </thead>

            <tbody>
              {quotes.map((q) => (
                <tr key={q._id}>
                  <td data-label="Pickup">{q.pickup}</td>
                  <td data-label="Destination">{q.destination}</td>
                  <td data-label="Weight">{q.weight} kg</td>

                  {/* PRICE */}
                  <td data-label="Price">
                    {q.price ? `$${q.price}` : "—"}
                  </td>

                  {/* STATUS */}
                  <td data-label="Status">
                    <span
                      className={`status ${
                        q.status?.toLowerCase() || "pending"
                      }`}
                    >
                      {q.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td data-label="Action">
                    {q.status === "Pending" && (
                      <span className="pending-label">
                        Awaiting pricing
                      </span>
                    )}

                    {q.status === "Priced" && (
                      <>
                        <button
                          className="accept-btn"
                          disabled={actionId === q._id}
                          onClick={() => acceptQuote(q._id)}
                        >
                          {actionId === q._id
                            ? "Processing..."
                            : "Accept"}
                        </button>

                        <button
                          className="decline-btn"
                          disabled={actionId === q._id}
                          onClick={() => declineQuote(q._id)}
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {/* ✅ NEW STEP */}
                    {q.status === "Accepted" && (
                      <button
                        className="complete-btn"
                        onClick={() =>
                          navigate(
                            `/quotes/${q._id}/shipment-details`
                          )
                        }
                      >
                        Complete Shipment Details
                      </button>
                    )}

                    {q.status === "ReadyForShipment" && (
                      <span className="accepted-label">
                        Shipment details submitted — awaiting admin
                      </span>
                    )}

                    {q.status === "Declined" && (
                      <span className="declined-label">
                        Declined
                      </span>
                    )}

                    {q.status === "Rejected" && (
                      <span className="declined-label">
                        Rejected by admin
                      </span>
                    )}

                    {q.status === "Converted" && (
                      <span className="accepted-label">
                        Shipment created
                      </span>
                    )}
                  </td>

                  {/* TRACKING */}
                  <td data-label="Tracking">
                    {q.shipment ? (
                      <>
                        <div className="tracking-number">
                          {q.shipment.trackingNumber}
                        </div>

                        <small className="tracking-status">
                          {q.shipment.status}
                        </small>

                        <button
                          className="track-btn"
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
    </section>
  );
}
