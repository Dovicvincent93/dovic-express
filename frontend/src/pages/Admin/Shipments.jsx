import { useEffect, useState, Fragment } from "react";
import api from "../../api/axios";

/* ================= ALLOWED ADMIN STATUSES ================= */
const STATUS_OPTIONS = [
  "In Transit",
  "Customs Clearance",
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
  const [sender, setSender] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [shipmentInfo, setShipmentInfo] = useState({
    origin: "",
    destination: "",
    weight: "",
    quantity: 1,
    estimatedDelivery: "6–10 business days",
    deliveryRange: "6–10 business days",
    price: "",
    city: "",
    country: "",
    message: "",
    paymentMethod: "Cash",
  });

  /* ================= UPDATE STATE ================= */
  const [updateData, setUpdateData] = useState({
    status: "",
    city: "",
    country: "",
    message: "",
  });

  /* ================= LOAD SHIPMENTS ================= */
  const loadShipments = async () => {
    try {
      const res = await api.get("/shipments");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.shipments || [];
      setShipments(data);
    } catch (error) {
      console.error("Failed to load shipments", error);
    }
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
    const {
      origin,
      destination,
      weight,
      quantity,
      estimatedDelivery,
      deliveryRange,
      price,
      city,
      country,
      message,
      paymentMethod,
    } = shipmentInfo;

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
      !city ||
      !country
    ) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      sender: {
        name: sender.name,
        phone: sender.phone,
        email: sender.email || "",
        address: sender.address,
      },
      receiver: {
        name: receiver.name,
        phone: receiver.phone,
        email: receiver.email || "",
        address: receiver.address,
      },
      origin,
      destination,
      weight: Number(weight),
      quantity: Number(quantity),
      deliveryRange: deliveryRange || estimatedDelivery,
      price: Number(price),
      city,
      country,
      adminNote: message,
      paymentMethod,
    };

    try {
      await api.post("/shipments", payload);
      loadShipments();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create shipment");
      return;
    }

    setSender({ name: "", phone: "", email: "", address: "" });
    setReceiver({ name: "", phone: "", email: "", address: "" });
    setShipmentInfo({
      origin: "",
      destination: "",
      weight: "",
      quantity: 1,
      estimatedDelivery: "6–10 business days",
      deliveryRange: "6–10 business days",
      price: "",
      city: "",
      country: "",
      message: "",
      paymentMethod: "Cash",
    });
  };

  /* ================= UPDATE STATUS ================= */
  const submitUpdate = async (id) => {
    const { status, city, country, message } = updateData;

    if (!status || !city || !country) {
      alert("Status, city and country are required");
      return;
    }

    await api.patch(`/shipments/${id}/status`, {
      status,
      city,
      country,
      message,
    });

    setUpdatingId(null);
    setUpdateData({ status: "", city: "", country: "", message: "" });
    loadShipments();
  };

  /* ================= DELETE SHIPMENT ================= */
  const deleteShipment = async (id) => {
    if (!window.confirm("Delete this shipment permanently?")) return;
    await api.delete(`/shipments/${id}`);
    loadShipments();
  };

  /* ================= PRINT INVOICE ================= */
  const printInvoice = (id) => {
    window.open(`/admin/shipments/${id}/invoice`, "_blank");
  };

  return (
    <div className="admin-page">
      <h2>Shipments</h2>

      {/* ================= CREATE ORDER ================= */}
      <div className="admin-card">
        <h3>Create Shipment (Admin Order)</h3>

        <div className="shipment-form-grid">
          {/* SENDER */}
          <div className="shipment-box">
            <h4>Sender</h4>
            <input placeholder="Name" value={sender.name}
              onChange={(e) => setSender({ ...sender, name: e.target.value })} />
            <input placeholder="Phone" value={sender.phone}
              onChange={(e) => setSender({ ...sender, phone: e.target.value })} />
            <input placeholder="Email" value={sender.email}
              onChange={(e) => setSender({ ...sender, email: e.target.value })} />
            <input placeholder="Address" value={sender.address}
              onChange={(e) => setSender({ ...sender, address: e.target.value })} />
          </div>

          {/* RECEIVER */}
          <div className="shipment-box">
            <h4>Receiver</h4>
            <input placeholder="Name" value={receiver.name}
              onChange={(e) => setReceiver({ ...receiver, name: e.target.value })} />
            <input placeholder="Phone" value={receiver.phone}
              onChange={(e) => setReceiver({ ...receiver, phone: e.target.value })} />
            <input placeholder="Email" value={receiver.email}
              onChange={(e) => setReceiver({ ...receiver, email: e.target.value })} />
            <input placeholder="Address" value={receiver.address}
              onChange={(e) => setReceiver({ ...receiver, address: e.target.value })} />
          </div>

          {/* SHIPMENT */}
          <div className="shipment-box">
            <h4>Shipment</h4>

            <input placeholder="Origin" value={shipmentInfo.origin}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, origin: e.target.value })} />
            <input placeholder="Destination" value={shipmentInfo.destination}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, destination: e.target.value })} />

            <input placeholder="Weight (kg)" type="number" value={shipmentInfo.weight}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, weight: e.target.value })} />

            <input placeholder="Quantity" type="number" value={shipmentInfo.quantity}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, quantity: e.target.value })} />

            <input placeholder="Estimated delivery" value={shipmentInfo.estimatedDelivery}
              onChange={(e) =>
                setShipmentInfo({
                  ...shipmentInfo,
                  estimatedDelivery: e.target.value,
                  deliveryRange: e.target.value,
                })
              } />

            <input placeholder="Price (Subtotal)" type="number" value={shipmentInfo.price}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, price: e.target.value })} />

            <select
              value={shipmentInfo.paymentMethod}
              onChange={(e) =>
                setShipmentInfo({ ...shipmentInfo, paymentMethod: e.target.value })
              }
            >
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Card">Card</option>
            </select>

            <input placeholder="City" value={shipmentInfo.city}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, city: e.target.value })} />
            <input placeholder="Country" value={shipmentInfo.country}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, country: e.target.value })} />

            <input placeholder="Admin note" value={shipmentInfo.message}
              onChange={(e) => setShipmentInfo({ ...shipmentInfo, message: e.target.value })} />
          </div>
        </div>

        <div className="shipment-actions">
          <button onClick={createShipment}>Create Order</button>
        </div>
      </div>

      {/* ================= SHIPMENTS TABLE ================= */}
      <div className="admin-table-wrapper">
        <table className="admin-table shipments-table">
          <thead>
            <tr>
              <th>Tracking</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Payment</th>
              <th>Subtotal</th>
              <th>VAT</th>
              <th>Total</th>
              <th>Invoice</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {shipments.map((s) => (
              <Fragment key={s._id}>
                <tr className="shipment-row">
                  <td>{s.trackingNumber}</td>
                  <td>{s.sender?.name}</td>
                  <td>{s.receiver?.name}</td>
                  <td>{s.origin}</td>
                  <td>{s.destination}</td>
                  <td>{s.paymentMethod || "Cash"}</td>
                  <td>{s.invoice?.currency || "$"}{s.invoice?.subtotal ?? s.price}</td>
                  <td>{s.invoice?.vatPercent ?? 0}% ({s.invoice?.currency || "$"}{s.invoice?.tax ?? 0})</td>
                  <td>{s.invoice?.currency || "$"}{s.invoice?.total ?? s.price}</td>
                  <td>{s.invoiceStatus || "Unpaid"}</td>
                  <td>{s.isDelivered ? <strong>Delivered 🔒</strong> : s.status}</td>
                  <td>
                    <button onClick={() => loadHistory(s.trackingNumber, s._id)}>History</button>
                    <button onClick={() => printInvoice(s._id)}>Invoice</button>
                    {!s.isDelivered && (
                      <button onClick={() => setUpdatingId(s._id)}>Update</button>
                    )}
                    <button style={{ background: "#991b1b" }} onClick={() => deleteShipment(s._id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {expandedId === s._id && (
                  <tr className="shipment-subrow">
                    <td colSpan="12">
                      {historyMap[s._id]?.map((h, i) => (
                        <div key={i}>
                          <strong>{h.status}</strong> — {h.city}, {h.country}
                          <div>{h.message}</div>
                          <small>{new Date(h.createdAt).toLocaleString()}</small>
                        </div>
                      ))}
                    </td>
                  </tr>
                )}

                {updatingId === s._id && !s.isDelivered && (
                  <tr className="shipment-subrow">
                    <td colSpan="12">
                      <select
                        value={updateData.status}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, status: e.target.value })
                        }
                      >
                        <option value="">Select status</option>
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>

                      <input placeholder="City" value={updateData.city}
                        onChange={(e) => setUpdateData({ ...updateData, city: e.target.value })} />
                      <input placeholder="Country" value={updateData.country}
                        onChange={(e) => setUpdateData({ ...updateData, country: e.target.value })} />
                      <input placeholder="Message" value={updateData.message}
                        onChange={(e) => setUpdateData({ ...updateData, message: e.target.value })} />

                      <button onClick={() => submitUpdate(s._id)}>Save Update</button>
                      <button onClick={() => setUpdatingId(null)}>Cancel</button>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
