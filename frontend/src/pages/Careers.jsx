import "./Careers.css";

export default function Careers() {
  return (
    <section className="careers-page">
      {/* ================= HERO ================= */}
      <div className="careers-hero">
        <h1>Careers at Dovic Express</h1>
        <p>
          Build the future of global logistics with a company driven by
          technology, scale, and operational excellence. At Dovic Express, your
          work directly supports international trade, digital commerce, and
          critical supply chains across the world.
        </p>
      </div>

      <div className="careers-container">
        {/* ================= WHY JOIN ================= */}
        <section className="careers-section">
          <h2>Why Join Dovic Express</h2>
          <p>
            Dovic Express is building a world-class logistics organization
            designed to move goods efficiently, securely, and intelligently
            across borders and markets. We operate in a fast-paced, complex
            environment where innovation, precision, and reliability matter.
          </p>
          <p>
            Our teams span operations, engineering, data, customer experience,
            compliance, and corporate leadership. Each role contributes to
            delivering mission-critical logistics services for enterprises,
            e-commerce platforms, and global trade partners.
          </p>
        </section>

        {/* ================= CAREER HIGHLIGHTS ================= */}
        <section className="careers-grid">
          <div className="career-card">
            <h3>Global Exposure</h3>
            <p>
              Work on international logistics networks spanning multiple
              continents, trade corridors, and regulatory environments. Gain
              firsthand experience in cross-border operations and global supply
              chain execution.
            </p>
          </div>

          <div className="career-card">
            <h3>Technology-Driven</h3>
            <p>
              Design, build, and operate platforms powered by real-time tracking,
              automation, data analytics, and system integrations that power
              modern logistics operations.
            </p>
          </div>

          <div className="career-card">
            <h3>Growth & Learning</h3>
            <p>
              Structured development programs, mentorship, leadership pathways,
              and continuous learning opportunities to help you grow your
              expertise and advance your career.
            </p>
          </div>

          <div className="career-card">
            <h3>Performance Culture</h3>
            <p>
              A culture built on accountability, ownership, collaboration, and
              measurable impact — where high performance is recognized and
              rewarded.
            </p>
          </div>
        </section>

        {/* ================= OPEN ROLES ================= */}
        <section className="careers-section">
          <h2>Current Opportunities</h2>
          <p>
            We are continually expanding our team to support growth across
            operations, technology, and corporate functions. Current openings
            include:
          </p>

          <ul className="roles-list">
            <li>Logistics Operations Manager</li>
            <li>Frontend / Platform Engineer</li>
            <li>Supply Chain Analyst</li>
            <li>Customer Experience Specialist</li>
            <li>Compliance & Trade Operations Officer</li>
          </ul>

          <p className="note">
            New roles are published regularly as our business grows. Qualified
            candidates may submit expressions of interest, even if a specific
            role is not currently listed.
          </p>
        </section>
      </div>
    </section>
  );
}
