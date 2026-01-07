import "./Privacy.css";

export default function Privacy() {
  return (
    <section className="privacy-page">
      {/* ================= HERO ================= */}
      <div className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>
          How Dovic Express collects, uses, protects, and manages personal data.
        </p>
      </div>

      <div className="privacy-container">
        {/* ================= INTRO ================= */}
        <div className="privacy-section">
          <p>
            At <strong>Dovic Express</strong>, we are committed to protecting the
            privacy, confidentiality, and security of personal information
            entrusted to us. This Privacy Policy explains how we collect, use,
            store, disclose, and safeguard data when you interact with our
            services, platforms, and digital applications.
          </p>
        </div>

        {/* ================= INFORMATION WE COLLECT ================= */}
        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <ul>
            <li>Personal details (name, email address, phone number)</li>
            <li>Account credentials and authentication data</li>
            <li>Shipment and delivery information</li>
            <li>Billing and transaction data</li>
            <li>Communications and customer support messages</li>
            <li>Technical data (IP address, device, browser type)</li>
          </ul>
        </div>

        {/* ================= HOW WE USE DATA ================= */}
        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>
          <p>
            We use collected information to deliver, operate, and improve our
            logistics services and digital platforms.
          </p>
          <ul>
            <li>Processing shipments and deliveries</li>
            <li>Providing tracking and customer support</li>
            <li>Managing accounts and authentication</li>
            <li>Sending service updates and notifications</li>
            <li>Improving operational efficiency and security</li>
            <li>Meeting legal and regulatory requirements</li>
          </ul>
        </div>

        {/* ================= LEGAL BASIS ================= */}
        <div className="privacy-section">
          <h2>3. Legal Basis for Processing</h2>
          <p>
            We process personal data based on contractual necessity, legitimate
            business interests, legal obligations, and user consent where
            required.
          </p>
        </div>

        {/* ================= DATA SHARING ================= */}
        <div className="privacy-section">
          <h2>4. Data Sharing & Disclosure</h2>
          <p>
            Dovic Express does not sell personal data. Information may be shared
            only with:
          </p>
          <ul>
            <li>Logistics partners and carriers</li>
            <li>Customs and regulatory authorities</li>
            <li>Payment processors and service providers</li>
            <li>Legal or government authorities when required by law</li>
          </ul>
        </div>

        {/* ================= INTERNATIONAL TRANSFERS ================= */}
        <div className="privacy-section">
          <h2>5. International Data Transfers</h2>
          <p>
            As a global logistics company, data may be processed across borders.
            We implement appropriate safeguards to ensure lawful and secure
            international data transfers.
          </p>
        </div>

        {/* ================= DATA RETENTION ================= */}
        <div className="privacy-section">
          <h2>6. Data Retention</h2>
          <p>
            Personal information is retained only as long as necessary to
            fulfill service obligations, comply with legal requirements, and
            resolve disputes.
          </p>
        </div>

        {/* ================= SECURITY ================= */}
        <div className="privacy-section">
          <h2>7. Data Security</h2>
          <p>
            We employ industry-standard security measures including encryption,
            access controls, monitoring, and secure infrastructure to protect
            personal data from unauthorized access, loss, or misuse.
          </p>
        </div>

        {/* ================= USER RIGHTS ================= */}
        <div className="privacy-section">
          <h2>8. Your Rights</h2>
          <p>
            Depending on applicable laws, you may have the right to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Request correction or updates</li>
            <li>Request deletion of data</li>
            <li>Restrict or object to processing</li>
            <li>Withdraw consent where applicable</li>
          </ul>
        </div>

        {/* ================= COOKIES ================= */}
        <div className="privacy-section">
          <h2>9. Cookies & Tracking Technologies</h2>
          <p>
            Our platforms use cookies and similar technologies to enhance user
            experience, analyze performance, and improve service functionality.
          </p>
        </div>

        {/* ================= THIRD PARTY LINKS ================= */}
        <div className="privacy-section">
          <h2>10. Third-Party Links</h2>
          <p>
            Our website may contain links to external sites. Dovic Express is not
            responsible for the privacy practices of third-party websites.
          </p>
        </div>

        {/* ================= POLICY UPDATES ================= */}
        <div className="privacy-section">
          <h2>11. Policy Updates</h2>
          <p>
            This Privacy Policy may be updated periodically. Continued use of
            our services constitutes acceptance of revised policies.
          </p>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="privacy-footer">
          <p>
            For privacy-related inquiries or requests, contact:
            <br />
            <strong>privacy@dovicexpress.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
