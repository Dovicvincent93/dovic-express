import "./Investors.css";

export default function Investors() {
  return (
    <section className="investors-page">
      {/* ================= HERO ================= */}
      <div className="investors-hero">
        <h1>Investor Relations</h1>
        <p>
          Building sustainable long-term value through disciplined growth,
          operational excellence, strong governance, and technology-led
          logistics solutions across global markets.
        </p>
      </div>

      <div className="investors-container">
        {/* ================= INVESTMENT PROPOSITION ================= */}
        <section>
          <h2>Investment Proposition</h2>
          <p>
            Dovic Express operates at the intersection of logistics, technology,
            and global trade — industries supported by long-term structural
            demand, digital transformation, and expanding cross-border commerce.
            Our business model is designed to scale efficiently while maintaining
            operational discipline and financial resilience.
          </p>
          <p>
            By leveraging technology, data-driven decision making, and a flexible
            operating structure, we are positioned to capture growth
            opportunities while delivering consistent value to shareholders and
            stakeholders.
          </p>
        </section>

        {/* ================= INVESTOR HIGHLIGHTS ================= */}
        <section className="investor-grid">
          <div className="investor-card">
            <h3>Scalable Platform</h3>
            <p>
              Asset-light, technology-enabled logistics platform built to support
              rapid geographic expansion, high shipment volumes, and evolving
              customer requirements without excessive capital intensity.
            </p>
          </div>

          <div className="investor-card">
            <h3>Operational Discipline</h3>
            <p>
              Performance-driven execution supported by standardized processes,
              cost controls, and continuous optimization across routing,
              fulfillment, and last-mile delivery operations.
            </p>
          </div>

          <div className="investor-card">
            <h3>Governance & Oversight</h3>
            <p>
              Robust governance framework with transparent reporting, regulatory
              compliance, internal controls, and active board oversight to
              support accountability and long-term value creation.
            </p>
          </div>
        </section>

        {/* ================= REPORTS ================= */}
        <section>
          <h2>Reports & Disclosures</h2>
          <p>
            Dovic Express is committed to transparent communication and timely
            disclosure of financial, operational, and sustainability
            information. Our reports provide insight into company performance,
            strategy, governance, and ESG priorities.
          </p>
          <ul>
            <li>
              <strong>Annual Report</strong> – Financial performance, strategic
              overview, and operational highlights (PDF)
            </li>
            <li>
              <strong>Sustainability & ESG Report</strong> – Environmental,
              social, and governance performance and commitments
            </li>
            <li>
              <strong>Corporate Governance Statement</strong> – Board structure,
              risk management, and compliance framework
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
