import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Admin.css";

export default function AdminLayout() {
  const [unreadCount, setUnreadCount] = useState(0);

  /* ================= FETCH UNREAD INBOX COUNT ================= */
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await api.get("/admin/inbox/unread-count");
        setUnreadCount(res.data.count || 0);
      } catch (error) {
        // silent fail – don't break admin UI
        console.error("Failed to load inbox count");
      }
    };

    fetchUnreadCount();
  }, []);

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">📦 Dovic Admin</h2>

        <nav className="admin-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/quotes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Quotes
          </NavLink>

          <NavLink
            to="/admin/shipments"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Shipments
          </NavLink>

          {/* ================= INBOX ================= */}
          <NavLink
            to="/admin/inbox"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Inbox
            {unreadCount > 0 && (
              <span
                style={{
                  marginLeft: 8,
                  background: "#ffd400",
                  color: "#000",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {unreadCount}
              </span>
            )}
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
