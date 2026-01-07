import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [prices, setPrices] = useState({}); // store edited prices

  const loadQuotes = async () => {
    try {
      const res = await api.get("/quotes");
      setQuotes(res.data);

      // initialize price inputs
      const initialPrices = {};
      res.data.forEach((q) => {
        initialPrices[q._id] = q.price || 0;
      });
      setPrices(initialPrices);
    } catch (error) {
      console.error("Failed to load quotes", error);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  /* ===============================
     UPDATE PRICE (ADMIN)
  =============================== */
  const updatePrice = async (id) => {
    try {
      await api.patch(`/quotes/${id}`, {
        price: Number(prices[id]),
      });
    } catch (error) {
      console.error("Price update failed", error.response?.data || error.message);
      alert("Failed to update price");
    }
  };

  /* ===============================
     REJECT QUOTE
  =============================== */
  const reject = async (id) => {
    try {
      setLoadingId(id);
      await api.patch(`/quotes/${id}/reject`);
      await loadQuotes();
    } catch (error) {
      console.error("Reject failed", error.response?.data || error.message);
      alert("Failed to reject quote");
    } finally {
      setLoadingId(null);
    }
  };

  /* ===============================
     APPROVE + CONVERT TO SHIPMENT
  =============================== */
  const approveAndConvert = async (id) => {
    try {
      setLoadingId(id);

      // 🔴 Ensure price is set
      if (!prices[id] || Number(prices[id]) <= 0) {
        alert("Please set a valid price before approving");
        setLoadingId(null);
        return;
      }

      // 1️⃣ Save price
      await updatePrice(id);

      // 2️⃣ Approve
      await api.patch(`/quotes/${id}/approve`);

      // 3️⃣ Convert to shipment
      await api.post(`/quotes/${id}/convert`);

      alert("Quote approved and shipment created");
      await loadQuotes();
    } catch (error) {
      console.error(
        "Approve/Convert failed",
        error.response?.data || error.message
      );
      alert("Failed to approve and convert quote");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="admin-page">
      <h2>Quote Requests</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Pickup</th>
            <th>Destination</th>
            <th>Weight</th>
            <th>Fix Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((q) => (
            <tr key={q._id}>
              <td>{q.pickup}</td>
              <td>{q.destination}</td>
              <td>{q.weight}kg</td>

              {/* PRICE INPUT */}
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
                    style={{ width: "80px" }}
                  />
                ) : (
                  <>${q.price}</>
                )}
              </td>

              <td>{q.status}</td>

              <td>
                {q.status === "Pending" && (
                  <>
                    <button
                      onClick={() => approveAndConvert(q._id)}
                      disabled={loadingId === q._id}
                      style={{ marginRight: "8px" }}
                    >
                      {loadingId === q._id
                        ? "Processing..."
                        : "Approve & Convert"}
                    </button>

                    <button
                      onClick={() => reject(q._id)}
                      disabled={loadingId === q._id}
                      style={{ background: "red", color: "white" }}
                    >
                      Reject
                    </button>
                  </>
                )}

                {q.status === "Converted" && (
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    Shipment Created
                  </span>
                )}

                {q.status === "Rejected" && (
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    Rejected
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
