import "./Claims.css";

export default function Claims() {
  return (
    <section className="claims-page">
      {/* ================= HERO ================= */}
      <div className="claims-hero">
        <h1>Claims & Insurance</h1>
        <p>
          Transparent processes to protect your shipments and give you peace
          of mind at every stage of delivery.
        </p>
      </div>

      <div className="claims-container">
        {/* ================= OVERVIEW ================= */}
        <div className="claims-section">
          <h2>Shipment Protection at Dovic Express</h2>
          <p>
            Dovic Express is committed to safeguarding your shipments through
            robust handling procedures and optional shipment insurance coverage.
            While we maintain high delivery performance standards, claims may be
            submitted in the rare event of loss, damage, or delay.
          </p>
        </div>

        {/* ================= WHAT IS COVERED ================= */}
        <div className="claims-grid">
          <div className="claims-card">
            <h3>Covered Events</h3>
            <ul>
              <li>✔ Loss of shipment during transit</li>
              <li>✔ Physical damage caused during handling or transport</li>
              <li>✔ Partial loss of shipment contents</li>
              <li>✔ Insured value discrepancies</li>
            </ul>
          </div>

          <div className="claims-card">
            <h3>Not Covered</h3>
            <ul>
              <li>✖ Improper packaging by sender</li>
              <li>✖ Prohibited or restricted items</li>
              <li>✖ Force majeure events beyond control</li>
              <li>✖ Incorrect documentation or declarations</li>
            </ul>
          </div>
        </div>

        {/* ================= CLAIM PROCESS ================= */}
        <div className="claims-section">
          <h2>How to File a Claim</h2>

          <ol className="claims-steps">
            <li>
              <strong>Submit Claim Request</strong>
              <p>
                Contact our support team or submit a claim within the
                prescribed time window after delivery or expected delivery date.
              </p>
            </li>

            <li>
              <strong>Provide Supporting Documents</strong>
              <p>
                Documents may include tracking number, commercial invoice,
                delivery confirmation, photographs of damage, and proof of value.
              </p>
            </li>

            <li>
              <strong>Claim Review & Investigation</strong>
              <p>
                Our claims team will investigate the case, verify shipment data,
                and assess liability based on service terms.
              </p>
            </li>

            <li>
              <strong>Resolution & Settlement</strong>
              <p>
                Approved claims are settled in accordance with insurance terms,
                declared value, and applicable regulations.
              </p>
            </li>
          </ol>
        </div>

        {/* ================= TIME LIMITS ================= */}
        <div className="claims-section highlight">
          <h2>Claim Time Limits</h2>
          <p>
            To ensure timely resolution, claims must be submitted within the
            following timeframes:
          </p>

          <ul className="claims-limits">
            <li><strong>Loss:</strong> Within 14 days of expected delivery</li>
            <li><strong>Damage:</strong> Within 7 days of delivery</li>
            <li><strong>Delay:</strong> Within 7 days of delivery</li>
          </ul>
        </div>

        {/* ================= INSURANCE ================= */}
        <div className="claims-section">
          <h2>Shipment Insurance</h2>
          <p>
            Shipment insurance provides additional protection beyond standard
            carrier liability. Customers are encouraged to declare accurate
            shipment value and select insurance coverage where applicable.
          </p>
          <p>
            Insurance coverage terms vary by destination, service type, and
            declared value. Full policy details are available upon request.
          </p>
        </div>

        {/* ================= DISCLAIMER ================= */}
        <div className="claims-disclaimer">
          <p>
            This page provides general information only and does not replace the
            official Terms of Use, service agreements, or insurance policies.
            Final claim decisions are subject to verification and contractual
            conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
