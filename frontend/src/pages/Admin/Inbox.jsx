import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Inbox.css";

export default function Inbox() {
  const [messages, setMessages] = useState([]); // ✅ must always be array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= REPLY STATE ================= */
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");

  /* ================= LOAD MESSAGES ================= */
  const loadMessages = async () => {
    try {
      const res = await api.get("/admin/inbox");

      /*
        ✅ DEFENSIVE PARSING
        Backend may return:
        - []
        - { messages: [] }
        - { inbox: [] }
      */
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.messages || res.data.inbox || [];

      setMessages(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load inbox");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  /* ================= MARK AS READ ================= */
  const markAsRead = async (id) => {
    try {
      await api.patch(`/admin/inbox/${id}/read`);
      setMessages((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, isRead: true } : m
        )
      );
    } catch {
      alert("Failed to mark as read");
    }
  };

  /* ================= SEND REPLY ================= */
  const sendReply = async (id) => {
    if (!replyText.trim()) {
      alert("Reply message cannot be empty");
      return;
    }

    try {
      await api.patch(`/contact/${id}/reply`, {
        reply: replyText,
      });

      setMessages((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                isRead: true,
                isReplied: true,
                replies: [
                  ...(Array.isArray(m.replies) ? m.replies : []),
                  {
                    message: replyText,
                    createdAt: new Date(),
                  },
                ],
              }
            : m
        )
      );

      setReplyingId(null);
      setReplyText("");
    } catch {
      alert("Failed to send reply");
    }
  };

  if (loading) return <p>Loading inbox…</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="admin-page inbox-page">
      <h2>Contact Inbox</h2>
      <p className="admin-subtitle">
        Messages sent from the Contact Us page
      </p>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="inbox-list">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`inbox-card ${
                msg.isRead ? "read" : "unread"
              }`}
            >
              <div className="inbox-header">
                <strong>{msg.name}</strong>
                <span>{msg.email}</span>
              </div>

              {msg.subject && (
                <div className="inbox-subject">
                  <strong>Subject:</strong> {msg.subject}
                </div>
              )}

              <p className="inbox-message">{msg.message}</p>

              {/* ================= PREVIOUS REPLIES ================= */}
              {Array.isArray(msg.replies) && msg.replies.length > 0 && (
                <div className="inbox-replies">
                  <h4>Admin Replies</h4>
                  {msg.replies.map((r, i) => (
                    <div key={i} className="reply-item">
                      <p>{r.message}</p>
                      <small>
                        {new Date(r.createdAt).toLocaleString()}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              {/* ================= REPLY BOX ================= */}
              {replyingId === msg._id && (
                <div className="reply-box">
                  <textarea
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) =>
                      setReplyText(e.target.value)
                    }
                  />
                  <div className="reply-actions">
                    <button onClick={() => sendReply(msg._id)}>
                      Send Reply
                    </button>
                    <button
                      className="cancel"
                      onClick={() => {
                        setReplyingId(null);
                        setReplyText("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* ================= FOOTER ACTIONS ================= */}
              <div className="inbox-footer">
                <small>
                  {new Date(msg.createdAt).toLocaleString()}
                </small>

                <div className="inbox-actions">
                  {!msg.isRead && (
                    <button
                      onClick={() => markAsRead(msg._id)}
                    >
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setReplyingId(
                        replyingId === msg._id ? null : msg._id
                      )
                    }
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
