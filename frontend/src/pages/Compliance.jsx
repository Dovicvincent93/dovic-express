import "./Compliance.css";

export default function Compliance() {
  return (
    <section className="compliance-page">
      {/* ================= HERO ================= */}
      <div className="compliance-hero">
        <h1>Compliance & Certifications</h1>
        <p>
          Upholding global standards of integrity, security, safety, and
          regulatory excellence across our logistics operations.
        </p>
      </div>

      <div className="compliance-container">
        {/* ================= INTRO ================= */}
        <div className="compliance-section">
          <p>
            At <strong>Dovic Express</strong>, compliance is a core pillar of our
            operations. We adhere to international logistics regulations,
            industry standards, and ethical business practices to ensure safe,
            lawful, and transparent movement of goods across borders.
          </p>
          <p>
            Our compliance framework is designed to protect customers,
            employees, partners, and stakeholders while supporting sustainable
            global trade.
          </p>
        </div>

        {/* ================= REGULATORY COMPLIANCE ================= */}
        <div className="compliance-section">
          <h2>Regulatory Compliance</h2>
          <p>
            Dovic Express operates in full alignment with applicable national and
            international logistics, transportation, and trade regulations.
          </p>
          <ul>
            <li>Customs laws and international trade regulations</li>
            <li>Import and export control requirements</li>
            <li>Aviation, maritime, and ground transportation standards</li>
            <li>Dangerous goods and restricted cargo handling rules</li>
            <li>Anti-money laundering (AML) and sanctions compliance</li>
          </ul>
        </div>

        {/* ================= DATA & INFORMATION SECURITY ================= */}
        <div className="compliance-section">
          <h2>Data Protection & Information Security</h2>
          <p>
            We maintain strict controls to safeguard customer data, shipment
            information, and digital infrastructure.
          </p>
          <ul>
            <li>Data privacy and protection principles</li>
            <li>Secure authentication and access controls</li>
            <li>Encryption of sensitive information</li>
            <li>Continuous monitoring and incident response</li>
            <li>Compliance with applicable data protection laws</li>
          </ul>
        </div>

        {/* ================= CERTIFICATIONS ================= */}
        <div className="compliance-section">
          <h2>Certifications & Industry Standards</h2>
          <p>
            Our operations align with internationally recognized standards for
            quality, safety, and operational excellence.
          </p>

          <div className="cert-grid">
            <div className="cert-card">
              <h4>ISO Quality Management</h4>
              <p>
                Commitment to consistent service quality, process control, and
                continuous improvement across logistics operations.
              </p>
            </div>

            <div className="cert-card">
              <h4>ISO Information Security</h4>
              <p>
                Structured approach to managing sensitive data and protecting
                information assets from unauthorized access.
              </p>
            </div>

            <div className="cert-card">
              <h4>Trade & Customs Compliance</h4>
              <p>
                Alignment with international customs frameworks and trade
                facilitation standards.
              </p>
            </div>

            <div className="cert-card">
              <h4>Operational Safety Standards</h4>
              <p>
                Safety-focused handling, transportation, and warehousing
                practices across our logistics network.
              </p>
            </div>
          </div>
        </div>

        {/* ================= ETHICS ================= */}
        <div className="compliance-section">
          <h2>Code of Ethics & Business Conduct</h2>
          <p>
            Dovic Express enforces a strong Code of Ethics governing professional
            conduct, integrity, and accountability.
          </p>
          <ul>
            <li>Zero tolerance for corruption and bribery</li>
            <li>Fair competition and ethical sourcing</li>
            <li>Respect for human rights and labor standards</li>
            <li>Responsible partner and vendor relationships</li>
          </ul>
        </div>

        {/* ================= AUDIT ================= */}
        <div className="compliance-section">
          <h2>Audits & Oversight</h2>
          <p>
            Our compliance framework is supported by internal controls,
            continuous monitoring, and periodic reviews to ensure ongoing
            adherence to standards.
          </p>
          <p>
            Independent assessments and operational audits are conducted where
            required to maintain transparency and accountability.
          </p>
        </div>

        {/* ================= REPORTING ================= */}
        <div className="compliance-section">
          <h2>Reporting & Whistleblowing</h2>
          <p>
            We encourage employees, partners, and stakeholders to report
            suspected violations, unethical behavior, or compliance concerns
            without fear of retaliation.
          </p>
          <p>
            All reports are handled confidentially and investigated promptly.
          </p>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="compliance-footer">
          <p>
            For compliance-related inquiries, please contact:
            <br />
            <strong>compliance@dovicexpress.com</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
