import "./Terms.css";

export default function Terms() {
  return (
    <section className="terms-page">
      {/* ================= HERO ================= */}
      <div className="terms-hero">
        <h1>Terms of Use</h1>
        <p>
          These Terms govern the use of Dovic Express services, platforms,
          and digital applications.
        </p>
      </div>

      <div className="terms-container">
        {/* ================= INTRO ================= */}
        <div className="terms-section">
          <p>
            Welcome to <strong>Dovic Express</strong>. By accessing or using our
            website, mobile applications, APIs, or logistics services, you agree
            to be bound by these Terms of Use. If you do not agree, please do not
            use our services.
          </p>
        </div>

        {/* ================= DEFINITIONS ================= */}
        <div className="terms-section">
          <h2>1. Definitions</h2>
          <ul>
            <li><strong>"Company"</strong> refers to Dovic Express.</li>
            <li><strong>"Customer"</strong> refers to any individual or entity using our services.</li>
            <li><strong>"Shipment"</strong> refers to goods tendered for transport.</li>
            <li><strong>"Services"</strong> refers to logistics, delivery, tracking, and related offerings.</li>
            <li><strong>"Platform"</strong> refers to our website, dashboards, APIs, and applications.</li>
          </ul>
        </div>

        {/* ================= SERVICES ================= */}
        <div className="terms-section">
          <h2>2. Scope of Services</h2>
          <p>
            Dovic Express provides domestic and international logistics services,
            including express delivery, freight forwarding, customs facilitation,
            warehousing, and supply chain solutions.
          </p>
          <p>
            Services are subject to availability, operational constraints,
            regulatory requirements, and these Terms.
          </p>
        </div>

        {/* ================= CUSTOMER OBLIGATIONS ================= */}
        <div className="terms-section">
          <h2>3. Customer Responsibilities</h2>
          <ul>
            <li>Provide accurate shipment details and documentation</li>
            <li>Ensure goods are properly packaged and labeled</li>
            <li>Comply with applicable laws and regulations</li>
            <li>Declare shipment contents truthfully</li>
            <li>Pay all applicable charges, duties, and taxes</li>
          </ul>
        </div>

        {/* ================= PROHIBITED ITEMS ================= */}
        <div className="terms-section">
          <h2>4. Prohibited & Restricted Items</h2>
          <p>
            Customers must not ship prohibited items including but not limited
            to illegal goods, hazardous materials, counterfeit products, or
            items restricted by law or carrier policy.
          </p>
        </div>

        {/* ================= PRICING ================= */}
        <div className="terms-section">
          <h2>5. Pricing & Payments</h2>
          <p>
            Shipping charges are calculated based on weight, dimensions,
            destination, service type, and declared value.
          </p>
          <p>
            All charges must be paid in full prior to shipment release unless
            otherwise agreed in writing.
          </p>
        </div>

        {/* ================= DELIVERY ================= */}
        <div className="terms-section">
          <h2>6. Delivery & Transit Times</h2>
          <p>
            Transit times provided are estimates only. Dovic Express does not
            guarantee delivery by a specific date unless expressly stated.
          </p>
          <p>
            Delays may occur due to customs clearance, weather, security checks,
            or force majeure events.
          </p>
        </div>

        {/* ================= LIABILITY ================= */}
        <div className="terms-section">
          <h2>7. Liability & Claims</h2>
          <p>
            Our liability for loss or damage is limited in accordance with
            applicable laws, international conventions, and declared value.
          </p>
          <p>
            Claims must be submitted within specified timeframes as outlined in
            our Claims & Insurance policy.
          </p>
        </div>

        {/* ================= INSURANCE ================= */}
        <div className="terms-section">
          <h2>8. Shipment Insurance</h2>
          <p>
            Optional shipment insurance may be purchased for additional
            protection. Insurance terms are subject to policy conditions.
          </p>
        </div>

        {/* ================= PLATFORM USE ================= */}
        <div className="terms-section">
          <h2>9. Platform Usage</h2>
          <p>
            Users may not misuse the platform, interfere with system integrity,
            attempt unauthorized access, or engage in fraudulent activity.
          </p>
        </div>

        {/* ================= INTELLECTUAL PROPERTY ================= */}
        <div className="terms-section">
          <h2>10. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, software, and data on the platform
            are the property of Dovic Express and may not be used without
            permission.
          </p>
        </div>

        {/* ================= TERMINATION ================= */}
        <div className="terms-section">
          <h2>11. Suspension & Termination</h2>
          <p>
            We reserve the right to suspend or terminate services in cases of
            breach, fraud, security risks, or regulatory violations.
          </p>
        </div>

        {/* ================= LIMITATION ================= */}
        <div className="terms-section">
          <h2>12. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Dovic Express shall not be
            liable for indirect, incidental, or consequential damages.
          </p>
        </div>

        {/* ================= GOVERNING LAW ================= */}
        <div className="terms-section">
          <h2>13. Governing Law</h2>
          <p>
            These Terms are governed by applicable international logistics laws
            and the jurisdiction in which Dovic Express operates.
          </p>
        </div>

        {/* ================= CHANGES ================= */}
        <div className="terms-section">
          <h2>14. Amendments</h2>
          <p>
            Dovic Express reserves the right to update these Terms at any time.
            Continued use of services constitutes acceptance of changes.
          </p>
        </div>

        {/* ================= CONTACT ================= */}
        <div className="terms-footer">
          <p>
            For questions regarding these Terms, contact:
            <br />
            <strong>support@dovicexpress.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
