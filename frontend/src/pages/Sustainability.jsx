import "./Sustainability.css";

export default function Sustainability() {
  return (
    <section className="sustainability-page">
      {/* ================= HERO ================= */}
      <div className="sustainability-hero">
        <h1>Sustainability & ESG</h1>
        <p>
          At Dovic Express, sustainability is not an initiative — it is a core
          operating principle. We deliver responsible logistics through strong
          environmental stewardship, social accountability, and transparent,
          ethical governance across our global network.
        </p>
      </div>

      <div className="sustainability-container">
        {/* ================= ESG COMMITMENT ================= */}
        <section>
          <h2>Our ESG Commitment</h2>
          <p>
            Dovic Express integrates Environmental, Social, and Governance (ESG)
            principles into every aspect of its business strategy, decision-
            making, and daily operations. As a global logistics provider, we
            recognize our responsibility to balance operational excellence with
            long-term environmental protection, workforce well-being, and
            stakeholder trust.
          </p>
          <p>
            Our ESG framework is designed to support sustainable growth, reduce
            risk, improve efficiency, and create lasting value for customers,
            employees, investors, and the communities we serve.
          </p>
        </section>

        {/* ================= ESG DASHBOARD ================= */}
        <section className="esg-dashboard">
          <h2>ESG Performance Overview</h2>
          <p>
            We continuously measure, monitor, and improve our ESG performance
            using data-driven metrics aligned with global best practices. The
            indicators below reflect our progress in reducing environmental
            impact, strengthening operational resilience, and maintaining high
            governance standards.
          </p>

          <div className="esg-metrics">
            <div className="metric">
              <span>Carbon Reduction</span>
              <div className="bar">
                <div className="fill" style={{ width: "68%" }} />
              </div>
              <small>
                68% of delivery routes optimized to minimize fuel consumption and
                emissions
              </small>
            </div>

            <div className="metric">
              <span>Digital Documentation</span>
              <div className="bar">
                <div className="fill" style={{ width: "82%" }} />
              </div>
              <small>
                82% of operational processes transitioned to paperless workflows
              </small>
            </div>

            <div className="metric">
              <span>Workforce Safety</span>
              <div className="bar">
                <div className="fill" style={{ width: "95%" }} />
              </div>
              <small>
                95% safety compliance rate across facilities, fleets, and field
                operations
              </small>
            </div>

            <div className="metric">
              <span>Governance Controls</span>
              <div className="bar">
                <div className="fill" style={{ width: "90%" }} />
              </div>
              <small>
                Enterprise-wide risk management, audit, and compliance coverage
              </small>
            </div>
          </div>
        </section>

        {/* ================= ENVIRONMENT ================= */}
        <section>
          <h2>Environmental Strategy</h2>
          <p>
            Our environmental strategy focuses on reducing the carbon footprint
            of logistics operations through smarter network design, route
            optimization, and digital transformation. We invest in fuel-
            efficiency initiatives, reduce idle time across fleets, and adopt
            technology that enables real-time monitoring and optimization.
          </p>
          <p>
            By replacing manual processes with digital systems, we significantly
            reduce paper usage while improving accuracy, transparency, and
            operational speed. Environmental performance is reviewed regularly
            to ensure continuous improvement and accountability.
          </p>
        </section>

        {/* ================= SOCIAL ================= */}
        <section>
          <h2>Social Responsibility</h2>
          <p>
            People are at the center of our success. Dovic Express is committed
            to providing a safe, inclusive, and supportive working environment
            for employees across all regions. Our policies emphasize health and
            safety, professional development, equal opportunity, and ethical
            labor practices.
          </p>
          <p>
            We invest in training programs, safety awareness, and leadership
            development to empower our workforce and uphold the highest
            standards of professionalism and care throughout our operations.
          </p>
        </section>

        {/* ================= GOVERNANCE ================= */}
        <section>
          <h2>Governance & Ethics</h2>
          <p>
            Strong governance is essential to maintaining trust and operational
            integrity. Dovic Express operates under robust governance frameworks
            designed to ensure transparency, accountability, and compliance with
            applicable laws and international standards.
          </p>
          <p>
            Our governance structure includes clear oversight mechanisms, risk
            management controls, and ethical guidelines that guide decision-
            making at every level of the organization. We are committed to
            responsible leadership and long-term value creation.
          </p>
        </section>
      </div>
    </section>
  );
}
