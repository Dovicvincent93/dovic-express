import "./About.css";
import { useEffect } from "react";

export default function About() {
  /* ================= SCROLL + COUNTER ANIMATION ================= */
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");

            if (entry.target.classList.contains("counter")) {
              const target = +entry.target.dataset.target;
              let count = 0;
              const step = Math.ceil(target / 60);

              const update = () => {
                count += step;
                if (count >= target) {
                  entry.target.innerText = target.toLocaleString();
                } else {
                  entry.target.innerText = count.toLocaleString();
                  requestAnimationFrame(update);
                }
              };
              update();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    reveals.forEach((el) => observer.observe(el));
    counters.forEach((el) => observer.observe(el));
  }, []);

  return (
    <section className="about-page">
      {/* ================= HERO ================= */}
      <div className="about-hero">
        <h1>About Dovic Express</h1>
        <p>
          Dovic Express is a global logistics, supply chain, and technology
          enterprise delivering secure, intelligent, and time-critical shipping
          solutions that support modern trade, digital commerce, and enterprise
          distribution worldwide.
        </p>
      </div>

      <div className="about-container">
        {/* ================= WHO WE ARE ================= */}
        <div className="about-section reveal">
          <h2>Who We Are</h2>
          <p>
            Dovic Express is a next-generation logistics and supply chain company
            purpose-built to support international trade, cross-border commerce,
            enterprise distribution, and digitally enabled supply networks at
            scale. We operate in an increasingly complex global environment
            where speed, reliability, and transparency are critical.
          </p>
          <p>
            Our operating model is designed around operational discipline,
            intelligent automation, and real-time visibility. By integrating
            advanced tracking, predictive analytics, standardized processes, and
            digital workflows, we enable customers to move goods efficiently
            while maintaining control, compliance, and confidence.
          </p>
          <p>
            Inspired by leading global logistics innovators such as SF Express,
            we continuously invest in infrastructure, talent, and technology to
            deliver measurable value for enterprises, institutions, and
            individual customers across diverse markets.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="stats-grid reveal">
          <div className="stat-card">
            <strong className="counter" data-target="200">0</strong>
            <span>Countries & Trade Lanes</span>
          </div>
          <div className="stat-card">
            <strong className="counter" data-target="15000">0</strong>
            <span>Shipments Managed</span>
          </div>
          <div className="stat-card">
            <strong className="counter" data-target="97">0</strong>
            <span>% On-Time Delivery Rate</span>
          </div>
          <div className="stat-card">
            <strong className="counter" data-target="24">0</strong>
            <span>Hour Global Operations</span>
          </div>
        </div>

        {/* ================= GLOBAL NETWORK ================= */}
        <div className="about-section reveal">
          <h2>Global Network</h2>
          <p>
            Dovic Express operates a globally connected logistics network
            spanning the Americas, Europe, Asia-Pacific, and the Middle East.
            Through a combination of strategic partnerships, regional hubs, and
            digital system integrations, we enable seamless cross-border shipping
            and end-to-end supply chain continuity.
          </p>
          <p>
            Our network is designed to support high-volume trade flows,
            time-definite deliveries, and enterprise logistics programs while
            maintaining consistent service quality, regulatory compliance, and
            operational resilience.
          </p>

          <div className="map-box">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
              alt="Global Logistics Network"
            />
            <div className="map-label americas">Americas</div>
            <div className="map-label europe">Europe</div>
            <div className="map-label asia">Asia-Pacific</div>
            <div className="map-label middleeast">Middle East</div>
          </div>
        </div>

        {/* ================= CAREERS ================= */}
        <div className="about-section reveal">
          <h2>Careers at Dovic Express</h2>
          <p>
            Our people are the foundation of our performance and long-term
            success. Dovic Express attracts professionals across logistics
            operations, engineering, data, customer experience, compliance, and
            corporate leadership.
          </p>
          <p>
            We foster a performance-driven culture built on accountability,
            continuous learning, collaboration, and innovation. Team members are
            empowered to develop professionally while contributing to
            mission-critical logistics solutions that serve global markets.
          </p>
          <p className="link-note">
            Explore opportunities on our dedicated <strong>/careers</strong> page.
          </p>
        </div>

        {/* ================= SUSTAINABILITY & ESG ================= */}
        <div className="about-section reveal">
          <h2>Sustainability & ESG</h2>
          <p>
            Sustainability is embedded into our operating model and long-term
            strategy. Dovic Express balances economic growth with environmental
            responsibility, social impact, and strong governance practices
            across all regions in which we operate.
          </p>
          <p>
            Our ESG approach focuses on emissions reduction through route
            optimization, digital documentation to minimize waste, workforce
            safety and development programs, ethical sourcing, and transparent
            governance frameworks.
          </p>
          <p className="link-note">
            Learn more on our <strong>/sustainability</strong> page.
          </p>

          <div className="esg-grid">
            <div className="esg-card">
              <h4>Environmental</h4>
              <p>Fuel efficiency, emissions reduction, digital operations</p>
            </div>
            <div className="esg-card">
              <h4>Social</h4>
              <p>Workforce safety, inclusion, training, community engagement</p>
            </div>
            <div className="esg-card">
              <h4>Governance</h4>
              <p>Ethical leadership, compliance, audit, risk management</p>
            </div>
          </div>
        </div>

        {/* ================= INVESTORS ================= */}
        <div className="about-section reveal">
          <h2>Investor Relations</h2>
          <p>
            Dovic Express is positioned for long-term value creation through
            scalable logistics infrastructure, disciplined financial management,
            and technology-enabled growth aligned with global trade demand.
          </p>
          <p>
            Our investor relations approach emphasizes transparency, strong
            governance, and consistent performance supported by clear strategic
            execution.
          </p>
          <p className="link-note">
            Visit <strong>/investors</strong> for financial updates and reports.
          </p>
        </div>

        {/* ================= REPORTS ================= */}
        <div className="about-section reveal">
          <h2>Annual Reports & Disclosures</h2>
          <p>
            Dovic Express publishes annual reports and disclosures detailing
            operational performance, sustainability progress, governance
            practices, and strategic outlook.
          </p>
          <a className="pdf-link" href="#">
            📄 Download Annual Report (PDF)
          </a>
        </div>

        {/* ================= BOARD & GOVERNANCE ================= */}
        <div className="about-section reveal">
          <h2>Board & Corporate Governance</h2>
          <p>
            Our Board provides strategic oversight, risk management, and
            governance leadership aligned with international best practices and
            long-term shareholder interests.
          </p>

          <div className="leadership-grid">
            <div className="leader-card">
              <h4>Chairperson</h4>
              <p>Corporate governance, board leadership, strategic oversight</p>
            </div>
            <div className="leader-card">
              <h4>Chief Executive Officer</h4>
              <p>Strategy execution, growth, and global expansion</p>
            </div>
            <div className="leader-card">
              <h4>Independent Director</h4>
              <p>Risk management, audit, compliance oversight</p>
            </div>
          </div>
        </div>

        {/* ================= TECHNOLOGY ================= */}
        <div className="about-section highlight reveal">
          <h2>Powered by Technology</h2>
          <p>
            Our digital platform delivers real-time shipment visibility,
            automation, analytics dashboards, and operational intelligence
            across every stage of the logistics lifecycle — enabling faster,
            smarter, and more reliable decision-making.
          </p>
        </div>
      </div>
    </section>
  );
}
