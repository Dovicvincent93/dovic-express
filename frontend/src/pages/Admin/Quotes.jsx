import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";

const FILTERS = [
  "All",
  "Pending",
  "Priced",
  "Accepted",
  "ReadyForShipment",
  "Converted",
  "Rejected",
];

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [prices, setPrices] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  /* ===============================
     LOAD QUOTES (ADMIN)
  =============================== */
  const loadQuotes = async () => {
  try {
    const res = await api.get("/quotes");

    // 🔑 FIX: backend returns an object, not an array
    const data = Array.isArray(res.data)
      ? res.data
      : res.data.quotes || [];

    setQuotes(data);

    const priceMap = {};
    data.forEach((q) => {
      priceMap[q._id] = q.price || "";
    });
    setPrices(priceMap);
  } catch (error) {
    console.error("Failed to load quotes", error);
  }
};

  useEffect(() => {
    loadQuotes();
  }, []);

  /* ===============================
     FILTERED QUOTES
  =============================== */
  const filteredQuotes = useMemo(() => {
    if (activeFilter === "All") return quotes;
    return quotes.filter((q) => q.status === activeFilter);
  }, [quotes, activeFilter]);

  /* ===============================
     STATUS COUNTS
  =============================== */
  const counts = useMemo(() => {
    const c = { All: quotes.length };
    FILTERS.forEach((f) => (c[f] = 0));
    quotes.forEach((q) => {
      c[q.status] = (c[q.status] || 0) + 1;
    });
    return c;
  }, [quotes]);

  /* ===============================
     SET PRICE (ADMIN)
  =============================== */
  const setPrice = async (id) => {
    if (!prices[id] || Number(prices[id]) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    try {
      setLoadingId(id);
      await api.patch(`/quotes/${id}/price`, {
        price: Number(prices[id]),
      });
      await loadQuotes();
    } catch (error) {
      alert(
        error.response?.data?.message || "Failed to price quote"
      );
    } finally {
      setLoadingId(null);
    }
  };

  /* ===============================
     REJECT QUOTE (ADMIN)
  =============================== */
  const rejectQuote = async (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this quote?"
    );
    if (!confirmReject) return;

    try {
      setLoadingId(id);
      await api.patch(`/quotes/${id}/reject`);
      await loadQuotes();
    } catch {
      alert("Failed to reject quote");
    } finally {
      setLoadingId(null);
    }
  };

  /* ===============================
     CONVERT TO SHIPMENT (ADMIN)
     ✔ ONLY WHEN ReadyForShipment
  =============================== */
  const convertToShipment = async (id) => {
    const confirmConvert = window.confirm(
      "Convert this quote to a shipment?"
    );
    if (!confirmConvert) return;

    try {
      setLoadingId(id);
      await api.post(`/quotes/${id}/convert`);
      await loadQuotes();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to convert quote"
      );
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="admin-page">
      <h2>Quote Requests</h2>

      {/* ================= FILTER TABS ================= */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: "8px 14px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              background:
                activeFilter === f ? "#ffd400" : "#e5e7eb",
              color: activeFilter === f ? "#000" : "#334155",
            }}
          >
            {f} ({counts[f] || 0})
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredQuotes.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No quotes in this category
              </td>
            </tr>
          ) : (
            filteredQuotes.map((q) => (
              <tr key={q._id}>
                <td>{q.pickup}</td>
                <td>{q.destination}</td>
                <td>{q.weight} kg</td>

                {/* PRICE */}
                <td>
                  {q.status === "Pending" ? (
                    <input
                      type="number"
                      value={prices[q._id] || ""}
                      onChange={(e) =>
                        setPrices({
                          ...prices,
                          [q._id]: e.target.value,
                        })
                      }
                      style={{ width: 90 }}
                    />
                  ) : q.price ? (
                    `$${q.price}`
                  ) : (
                    "—"
                  )}
                </td>

                {/* STATUS */}
                <td>
                  <span
                    className={`status ${q.status.toLowerCase()}`}
                  >
                    {q.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td>
                  {q.status === "Pending" && (
                    <>
                      <button
                        onClick={() => setPrice(q._id)}
                        disabled={loadingId === q._id}
                      >
                        Set Price
                      </button>

                      <button
                        onClick={() => rejectQuote(q._id)}
                        disabled={loadingId === q._id}
                        style={{
                          background: "red",
                          color: "white",
                        }}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {q.status === "Priced" && (
                    <span style={{ color: "#92400e" }}>
                      Waiting for customer
                    </span>
                  )}

                  {q.status === "Accepted" && (
                    <span style={{ color: "#2563eb" }}>
                      Waiting for shipment details
                    </span>
                  )}

                  {q.status === "ReadyForShipment" && (
                    <button
                      onClick={() =>
                        convertToShipment(q._id)
                      }
                      disabled={loadingId === q._id}
                    >
                      Create Shipment
                    </button>
                  )}

                  {q.status === "Converted" && (
                    <span
                      style={{
                        color: "green",
                        fontWeight: 600,
                      }}
                    >
                      Shipment Created
                    </span>
                  )}

                  {q.status === "Rejected" && (
                    <span
                      style={{
                        color: "red",
                        fontWeight: 600,
                      }}
                    >
                      Rejected
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
