import ContactMessage from "../models/ContactMessage.js";
import getResend from "../utils/email.js";

/* ======================================================
   PUBLIC: SEND CONTACT MESSAGE
====================================================== */
export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    /* ================= SAVE TO DB ================= */
    const savedMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
    });

    /* ================= EMAIL (NON-BLOCKING) ================= */
    try {
      const resend = getResend();

      // ADMIN NOTIFICATION
      await resend.emails.send({
        from: "Dovic Express <onboarding@resend.dev>",
        to: ["onboarding@resend.dev"],
        replyTo: email,
        subject: subject || "New Contact Message",
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "—"}</p>
          <hr />
          <p>${message}</p>
        `,
      });

      // AUTO-REPLY (TEST MODE SAFE)
      await resend.emails.send({
        from: "Dovic Express <onboarding@resend.dev>",
        to: ["onboarding@resend.dev"],
        subject: "Message received – Dovic Express",
        html: `
          <p>Hello ${name},</p>
          <p>
            Thank you for contacting <strong>Dovic Express</strong>.
            We have received your message.
          </p>
          <p>
            Our support team will respond within <strong>24 hours</strong>.
          </p>
          <br />
          <p>📦 Dovic Express</p>
        `,
      });
    } catch (emailError) {
      console.error("⚠ Email failed:", emailError.message);
      // DO NOT FAIL REQUEST
    }

    res.json({
      message: "Message received successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

/* ======================================================
   ADMIN: REPLY TO CONTACT MESSAGE
====================================================== */
export const replyToContactMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).json({
        message: "Reply message is required",
      });
    }

    const contact = await ContactMessage.findById(messageId);

    if (!contact) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    /* ================= SAVE REPLY ================= */
    contact.replies.push({
      message: reply,
      repliedBy: req.user._id, // admin user
    });

    contact.isReplied = true;
    contact.repliedAt = new Date();

    await contact.save();

    /* ================= EMAIL REPLY (SAFE) ================= */
    try {
      const resend = getResend();

      await resend.emails.send({
        from: "Dovic Express <onboarding@resend.dev>",
        to: ["onboarding@resend.dev"], // test mode safe
        subject: "Reply from Dovic Express",
        html: `
          <p>Hello ${contact.name},</p>
          <p>${reply}</p>
          <br />
          <p>📦 Dovic Express</p>
        `,
      });
    } catch (emailError) {
      console.error("⚠ Reply email failed:", emailError.message);
    }

    res.json({
      message: "Reply sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Admin reply error:", error);
    res.status(500).json({
      message: "Failed to send reply",
    });
  }
};
