import { useEffect, useState, Fragment } from "react";
import api from "../../api/axios";

const STATUS_OPTIONS = [
  "Pending",
  "In Transit",
  "Custom Clearance",
  "On Hold",
  "Out for Delivery",
  "Delivered",
];

export default function Shipments() {
  const [shipments, setShipments] = useState([]);
  const [historyMap, setHistoryMap] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  /* ================= CREATE ORDER STATE ================= */
  const [sender, setSender] = useState({ name: "", phone: "", address: "" });
  const [receiver, setReceiver] = useState({ name: "", phone: "", address: "" });
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [estimatedDelivery, setEstimatedDelivery] =
    useState("6–10 business days");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  /* ================= UPDATE STATE ================= */
  const [updateData, setUpdateData] = useState({
    status: "",
    city: "",
    message: "",
  });

  /* ================= LOAD SHIPMENTS ================= */
  const loadShipments = async () => {
    const res = await api.get("/shipments");
    setShipments(res.data || []);
  };

  useEffect(() => {
    loadShipments();
  }, []);

  /* ================= LOAD HISTORY ================= */
  const loadHistory = async (trackingNumber, shipmentId) => {
    if (historyMap[shipmentId]) {
      setExpandedId(expandedId === shipmentId ? null : shipmentId);
      return;
    }

    const res = await api.get(`/tracking/${trackingNumber}`);
    setHistoryMap((prev) => ({
      ...prev,
      [shipmentId]: res.data.history || [],
    }));
    setExpandedId(shipmentId);
  };

  /* ================= CREATE SHIPMENT ================= */
  const createShipment = async () => {
    if (
      !sender.name ||
      !sender.phone ||
      !sender.address ||
      !receiver.name ||
      !receiver.phone ||
      !receiver.address ||
      !origin ||
      !destination ||
      !weight ||
      !price ||
      !city
    ) {
      alert("Please fill all required shipment details");
      return;
    }

    await api.post("/shipments", {
      sender,
      receiver,
      origin,
      destination,
      weight: Number(weight),
      quantity: Number(quantity),
      estimatedDelivery,
      price: Number(price),
      city,
      message,
    });

    setSender({ name: "", phone: "", address: "" });
    setReceiver({ name: "", phone: "", address: "" });
    setOrigin("");
    setDestination("");
    setWeight("");
    setQuantity(1);
    setPrice("");
    setCity("");
    setMessage("");

    loadShipments();
  };

  /* ================= UPDATE STATUS ================= */
  const submitUpdate = async (id) => {
    const { status, city, message } = updateData;

    if (!status || !city) {
      alert("Status and city are required");
      return;
    }

    await api.put(`/shipments/${id}/status`, {
      status,
      city,
      message,
    });

    setUpdatingId(null);
    setUpdateData({ status: "", city: "", message: "" });
    loadShipments();
  };

  return (
    <div className="admin-page">
      <h2>Shipments</h2>

      {/* ================= CREATE ORDER ================= */}
      <div className="admin-card">
        <h3>Create Shipment (Admin Order)</h3>

        <h4>Sender</h4>
        <input placeholder="Name" value={sender.name}
          onChange={(e) => setSender({ ...sender, name: e.target.value })} />
        <input placeholder="Phone" value={sender.phone}
          onChange={(e) => setSender({ ...sender, phone: e.target.value })} />
        <input placeholder="Address" value={sender.address}
          onChange={(e) => setSender({ ...sender, address: e.target.value })} />

        <h4>Receiver</h4>
        <input placeholder="Name" value={receiver.name}
          onChange={(e) => setReceiver({ ...receiver, name: e.target.value })} />
        <input placeholder="Phone" value={receiver.phone}
          onChange={(e) => setReceiver({ ...receiver, phone: e.target.value })} />
        <input placeholder="Address" value={receiver.address}
          onChange={(e) => setReceiver({ ...receiver, address: e.target.value })} />

        <input placeholder="Origin" value={origin}
          onChange={(e) => setOrigin(e.target.value)} />
        <input placeholder="Destination" value={destination}
          onChange={(e) => setDestination(e.target.value)} />
        <input placeholder="Weight (kg)" type="number" value={weight}
          onChange={(e) => setWeight(e.target.value)} />
        <input placeholder="Quantity" type="number" value={quantity}
          onChange={(e) => setQuantity(e.target.value)} />
        <input placeholder="Estimated delivery" value={estimatedDelivery}
          onChange={(e) => setEstimatedDelivery(e.target.value)} />
        <input placeholder="Price" type="number" value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="Starting city" value={city}
          onChange={(e) => setCity(e.target.value)} />
        <input placeholder="Admin note (optional)" value={message}
          onChange={(e) => setMessage(e.target.value)} />

        <button onClick={createShipment}>Create Order</button>
      </div>

      {/* ================= SHIPMENTS TABLE ================= */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Tracking</th>
            <th>Sender → Receiver</th>
            <th>Destination</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {shipments.map((s) => (
            <Fragment key={s._id}>
              <tr>
                <td>{s.trackingNumber}</td>
                <td>
                  {(s.sender?.name || "—")} → {(s.receiver?.name || "—")}
                </td>
                <td>{s.destination}</td>
                <td>
                  <strong>{s.status}</strong>
                  {s.isDelivered && (
                    <div style={{ color: "green", fontSize: 12 }}>
                      Delivered (Locked)
                    </div>
                  )}
                </td>
                <td>
                  <button onClick={() => loadHistory(s.trackingNumber, s._id)}>
                    {expandedId === s._id ? "Hide History" : "View History"}
                  </button>

                  {!s.isDelivered && (
                    <button onClick={() => setUpdatingId(s._id)}>
                      Update Status
                    </button>
                  )}
                </td>
              </tr>

              {updatingId === s._id && (
                <tr>
                  <td colSpan="5">
                    <select
                      value={updateData.status}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, status: e.target.value })
                      }
                    >
                      <option value="">Select status</option>
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>

                    <input
                      placeholder="Current city"
                      value={updateData.city}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, city: e.target.value })
                      }
                    />

                    <input
                      placeholder="Admin note"
                      value={updateData.message}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, message: e.target.value })
                      }
                    />

                    <button onClick={() => submitUpdate(s._id)}>Save</button>
                    <button onClick={() => setUpdatingId(null)}>Cancel</button>
                  </td>
                </tr>
              )}

              {expandedId === s._id && historyMap[s._id] && (
                <tr>
                  <td colSpan="5">
                    {historyMap[s._id].map((h, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <strong>{h.status}</strong>
                        <div>{h.city}</div>
                        {h.message && <div>{h.message}</div>}
                        <small>{new Date(h.createdAt).toLocaleString()}</small>
                      </div>
                    ))}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
