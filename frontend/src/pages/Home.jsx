import "./Home.css";
import Hero from "../components/Hero";
import "../components/QuoteForm.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import AIQuickChat from "../components/AIQuickChat";
import BackToTop from "../components/BackToTop";
import shipImg from "../assets/hero/ship.jpg";
import planeImg from "../assets/hero/plane.jpg";
import courierImg from "../assets/hero/courier.jpg";
import air from "../assets/couriers/air.jpg";
import road from "../assets/couriers/road.jpg";
import sea from "../assets/couriers/sea.jpg";
import warehouse from "../assets/couriers/warehouse.jpg";

/* ================= SLIDER DATA ================= */
const slides = [
  {
    title: "Ocean Freight in Motion",
    subtitle:
      "Reliable container shipping moving cargo across global trade lanes.",
    image: shipImg,
    overlay: "blue",
    motion: "ship",
  },
  {
    title: "Air Express Taking Off",
    subtitle:
      "Fast, time-critical air logistics connecting continents.",
    image: planeImg,
    overlay: "dark",
    motion: "plane",
  },
  {
    title: "Last-Mile Delivery Excellence",
    subtitle:
      "Professional couriers ensuring safe and timely delivery.",
    image: courierImg,
    overlay: "gold",
    motion: "courier",
  },

  /* ORIGINAL SLIDES */
  {
    title: "Global Logistics, Powered by Precision",
    subtitle:
      "End-to-end express delivery and supply chain solutions across continents.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    overlay: "blue",
  },
  {
    title: "Connecting Businesses to the World",
    subtitle:
      "International express, freight forwarding, and cross-border logistics.",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    overlay: "dark",
  },
  {
    title: "Reliable. Secure. On Time.",
    subtitle:
      "Trusted by enterprises and individuals for mission-critical deliveries.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
    overlay: "gold",
  },
];






export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  /* ================= AUTO ROTATE HERO ================= */
  useEffect(() => {
    const interval = setInterval(
      () => setActiveSlide((p) => (p + 1) % slides.length),
      6000
    );
    return () => clearInterval(interval);
  }, []);

  /* ================= TRACKING ================= */
const [tracking, setTracking] = useState("");
const [trackResult, setTrackResult] = useState("");
const [trackingLoading, setTrackingLoading] = useState(false);
const [trackerOpen, setTrackerOpen] = useState(true); // already present
const [trackStatus, setTrackStatus] = useState(""); // "success" | "error"

/* ================= AUTO REOPEN TRACKER ================= */
useEffect(() => {
  if (!trackerOpen) {
    const reopenTimer = setTimeout(() => {
      setTrackerOpen(true);
    }, 10000); // reopen after 10 seconds

    return () => clearTimeout(reopenTimer);
  }
}, [trackerOpen]);

   
 const handleTrack = async () => {
  if (!tracking.trim()) {
    setTrackResult("❌ Please enter a tracking number");
    setTrackStatus("error");
    setTrackerOpen(true);

    setTimeout(() => setTrackerOpen(false), 10000);
    return;
  }

  try {
    setTrackingLoading(true);
    setTrackResult("🔍 Searching shipment...");
    setTrackStatus("");
    setTrackerOpen(true);

    const res = await api.get(`/tracking/${tracking.trim()}`);
    const history = res.data.history || [];

    if (history.length === 0) {
      setTrackResult("⚠️ No tracking history available");
      setTrackStatus("error");

      setTimeout(() => setTrackerOpen(false), 10000);
      return;
    }

    const latest = history[history.length - 1];

    setTrackResult(
      `📦 ${latest.status} — 📍 ${latest.city}, ${latest.country}`
    );
    setTrackStatus("success");

    // AUTO HIDE AFTER 10 SECONDS
    setTimeout(() => {
      setTrackerOpen(false);
    }, 10000);

  } catch (error) {
    if (error.response?.status === 404) {
      setTrackResult("❌ Shipment not found. Check the tracking number.");
    } else {
      setTrackResult("⚠️ Failed to track shipment. Try again.");
    }

    setTrackStatus("error");

    setTimeout(() => {
      setTrackerOpen(false);
    }, 10000);

  } finally {
    setTrackingLoading(false);
  }
};



  /* ================= QUOTE ================= */
  const [pickup, setPickup] = useState("");
  const [delivery, setDelivery] = useState("");
  const [weight, setWeight] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const requestQuote = async () => {
    if (!name || !email || !pickup || !delivery || !weight) {
      setMessage("Please complete all required fields");
      return;
    }

    try {
      await api.post("/quotes", {
        name,
        email,
        pickup,
        destination: delivery,
        weight: Number(weight),
        price: 0,
      });

      setMessage("Quote submitted successfully");

      setName("");
      setEmail("");
      setPickup("");
      setDelivery("");
      setWeight("");
    } catch (error) {
      console.error("QUOTE ERROR:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to request quote");
    }
  };

  return (
    <>
      {/* ================= HERO ================= */}
{/* ================= HERO ================= */}
<section className="hero-slider">
  {slides.map((slide, i) => (
    <div
      key={i}
      className={`hero-slide ${i === activeSlide ? "active" : ""}`}
      data-motion={slide.motion}
      style={{ backgroundImage: `url(${slide.image})` }}
    >
      {/* OVERLAY */}
      <div className={`hero-overlay ${slide.overlay}`} />

      {/* CONTENT */}
      <div className="hero-content">
        <h1>{slide.title}</h1>
        <p>{slide.subtitle}</p>
        <div className="hero-buttons">
          <Link to="/track" className="btn primary">
            Track Shipment
          </Link>
          <a href="#quote" className="btn outline">
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  ))}
</section>



      {/* ================= SERVICES ================= */}
      <section className="services" id="services">
  <h2>Our Logistics Services</h2>

  <p className="services-sub">
    We provide reliable and flexible logistics services designed to support individuals and businesses across domestic and international markets. Our service offerings cover multiple transport modes and operational needs, ensuring efficient cargo movement, secure handling, and dependable delivery.
  </p>

  <div className="services-grid">
    <div className="service-card">
      <img src={air} alt="Air Freight" />
      <h3>Air Freight</h3>
      <p>
        Fast and time-definite domestic and international air cargo solutions for urgent and high-value shipments.
      </p>
    </div>

    <div className="service-card">
      <img src={road} alt="Road Transport" />
      <h3>Road Transport</h3>
      <p>
        Secure and efficient land transportation services supporting regional distribution and last-mile delivery.
      </p>
    </div>

    <div className="service-card">
      <img src={sea} alt="Sea Freight" />
      <h3>Sea Freight</h3>
      <p>
        Cost-effective ocean freight solutions for bulk cargo, commercial shipments, and large-volume consignments.
      </p>
    </div>

    <div className="service-card">
      <img src={warehouse} alt="Warehousing" />
      <h3>Warehousing</h3>
      <p>
        Modern warehousing solutions offering secure storage, inventory control, and order fulfillment support.
      </p>
    </div>
  </div>
</section>


      {/* ================= CAPABILITIES (DOMESTIC) ================= */}
     <section className="capabilities-grid" id="service-domestic">
  <h2>Our Logistics Capabilities</h2>

  <div className="cap-grid">
    <div className="cap-card">
      <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf" />
      <h3>Express Delivery Capability</h3>
      <p>
        Operational capacity to execute high-frequency same-day and next-day deliveries, supported by real-time tracking and performance monitoring.
      </p>
    </div>

    <div className="cap-card">
      <img src="https://images.unsplash.com/photo-1596075780750-81249df16d19" />
      <h3>Global Network Reach</h3>
      <p>
        An extensive international logistics network spanning over 200 countries, enabled through trusted carrier and partner relationships.
      </p>
    </div>

    <div className="cap-card">
      <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59" />
      <h3>Customs & Regulatory Expertise</h3>
      <p>
        Proven capability in managing customs documentation, regulatory compliance, and clearance processes across multiple jurisdictions.
      </p>
    </div>

    <div className="cap-card">
      <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088" />
      <h3>Secure Cargo Handling</h3>
      <p>
        Enterprise-grade handling procedures, security controls, and risk mitigation measures to protect cargo throughout transit.
      </p>
    </div>
  </div>
</section>


      {/* ================= IMAGE TEXT GRID (INTERNATIONAL) ================= */}
      <section className="image-text-grid" id="service-international">
        <div className="image-text-row">
          <img
            src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492"
            alt="Logistics Warehouse Interior"
          />
          <div className="text">
            <h2>Enterprise Warehousing & Fulfillment</h2>
            <p>
              Provide professional integrated warehousing and distribution services for e-commerce, pharmaceutical, cold chain and overseas customers based on intensive warehouse network deployment, strong transportation network, highly efficient operation capability and intelligent system support. <br />
              
              E-commerce Warehouse <br />
              Cold Chain Warehouse <br />
              Pharmaceutical Warehouse <br />
              Overseas Warehouse
            </p>
          </div>
        </div>

        <div className="image-text-row reverse">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt="Air Freight"
          />
          <div className="text">
            <h2>Air & Sea Freight Solutions</h2>
            <p>
              From local road transport to international air cargo and ocean freight, we deliver end-to-end logistics solutions built for performance and reliability. Our expertly managed freight forwarding services ensure timely deliveries, optimized costs, and seamless coordination across global supply chains, connecting businesses to markets worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* ================= WHY US (SUPPLY CHAIN) ================= */}
      <section className="why-us" id="service-supply">
        <h2>Why Enterprises Choose Dovic Express</h2>
        <div className="why-grid">
          
         <div>
           <h3>✔ Global Scale</h3>
           <p>
             With a robust global logistics footprint supported by localized operational teams, we deliver scalable freight solutions that perform consistently across international and regional markets.
           </p>
         </div>

        <div>
          <h3>✔ Transparency</h3>
          <p>
          With advanced real-time tracking systems and comprehensive performance reporting, we provide complete shipment visibility that supports informed decision-making and operational confidence.
          </p>
       </div>

       <div>
          <h3>✔ Compliance</h3>
          <p>
           With strict adherence to international logistics regulations, customs requirements, and security standards, we ensure accurate documentation, secure handling, and full regulatory compliance across all transport modes.
         </p>
       </div>

       <div>
        <h3>✔ Reliability</h3>
        <p>
         With proven operational processes, proactive shipment monitoring, and disciplined logistics planning, we deliver consistent on-time performance across every stage of the supply chain.
        </p>
       </div>

        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section className="industries">
        <h2>Industries We Serve</h2>
        <p className="industries-sub">
          Tailored logistics solutions designed for diverse industries and business needs.
        </p>

        <div className="industries-grid">
          <div className="industry-card">
            <h3>E-commerce</h3>
            <p>Fast order fulfillment, last-mile delivery, and returns management.</p>
          </div>

          <div className="industry-card">
            <h3>Manufacturing</h3>
            <p>Inbound raw materials, outbound finished goods, and supply chain reliability.</p>
          </div>

          <div className="industry-card">
            <h3>Healthcare</h3>
            <p>Secure, time-critical transport for medical equipment and supplies.</p>
          </div>

          <div className="industry-card">
            <h3>Retail</h3>
            <p>Store replenishment, inventory distribution, and seasonal logistics.</p>
          </div>

          <div className="industry-card">
            <h3>SMEs</h3>
            <p>Affordable, scalable logistics support for growing businesses.</p>
          </div>

          <div className="industry-card">
            <h3>Corporate & Enterprise</h3>
            <p>End-to-end logistics management with SLA-backed reliability.</p>
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="process-grid">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div>
            <span>01</span>
            <h4>Pickup</h4>
            <p>We collect shipments from your location.</p>
          </div>
          <div>
            <span>02</span>
            <h4>Processing</h4>
            <p>Sorting, customs & compliance checks.</p>
          </div>
          <div>
            <span>03</span>
            <h4>Transit</h4>
            <p>Air, sea or road transport.</p>
          </div>
          <div>
            <span>04</span>
            <h4>Delivery</h4>
            <p>Last-mile delivery to destination.</p>
          </div>
        </div>
      </section>

      {/* ================= GLOBAL STATS ================= */}
      <section className="global-stats">
        <div className="stats-text">
          <h2>Our Global Network at a Glance</h2>
          <ul>
            <li><strong>Domestic Country-level Divisions Covered:</strong> 30+</li>
            <li><strong>Domestic Prefecture-level Divisions Covered:</strong> 350+</li>
            <li><strong>International Express Coverage:</strong> 200+ Countries</li>
            <li><strong>Freight & Supply Chain Coverage:</strong> Global</li>
            <li><strong>International Small Parcels:</strong> Worldwide</li>
            <li><strong>Overseas Self-operated Outlets:</strong> 80+</li>
          </ul>
        </div>
        <div className="globe-wrapper">
          <div className="globe" />
        </div>
      </section>

      {/* ================= WORLD MAP ================= */}
      <section className="world-map">
        <h2>Global Delivery Network</h2>

        <div className="map-container">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/2000px-World_map_-_low_resolution.svg.png"
            alt="World Map"
          />

          <svg
            className="map-routes"
            viewBox="0 0 2000 1000"
            preserveAspectRatio="xMidYMid meet"
          >
            <path d="M900 520 C 980 420, 1100 380, 1250 300" />
            <path d="M1200 300 C 950 200, 650 220, 420 300" />
            <path d="M1400 420 C 1550 520, 1650 650, 1500 760" />
            <path d="M600 700 C 750 600, 820 560, 900 520" />
          </svg>
        </div>
      </section>

      {/* ================= SERVICES RICH ================= */}
      <section className="services-rich">
        <h2>Integrated Logistics Solutions</h2>
        <div className="services-grid">
          <Service title="International Express" />
          <Service title="Freight Forwarding" />
          <Service title="Supply Chain Management" />
          <Service title="Domestic Express" />
        </div>
      </section>

      {/* ================= EXPANDED SERVICES ================= */}
      <ExpandedServices />

      {/* ================= QUOTE ================= */}
      <section id="quote" className="quote-section">
        <div className="quote-container">
          <h2>Request a Shipping Quote</h2>
          <p>Transparent pricing. Enterprise-grade logistics.</p>

          <form
            className="quote-form"
            onSubmit={(e) => {
              e.preventDefault();
              requestQuote();
            }}
          >
            <input placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
            <input placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
            <input placeholder="Pickup City" onChange={(e) => setPickup(e.target.value)} />
            <input placeholder="Delivery City" onChange={(e) => setDelivery(e.target.value)} />
            <input placeholder="Weight (kg)" onChange={(e) => setWeight(e.target.value)} />
            <button type="submit">Request Quote</button>
          </form>

          {message && <p className="quote-message">{message}</p>}
        </div>
      </section>

            <BackToTop />
      <AIQuickChat />

      
{/* ================= FLOATING TRACKER ================= */}
{trackerOpen && (
  <div className="floating-tracker">

    {/* CLOSE ICON */}
    <button
      className="tracker-close"
      onClick={() => {
        setTrackerOpen(false);
        setTrackResult("");
        setTrackStatus("");
      }}
      aria-label="Close tracker"
    >
      ✕
    </button>

    <input
      placeholder="Enter Tracking Number"
      value={tracking}
      onChange={(e) => {
        setTracking(e.target.value);
        if (!trackerOpen) setTrackerOpen(true); // reopen ONLY if closed
      }}
    />

    <button onClick={handleTrack} disabled={trackingLoading}>
      {trackingLoading ? "Checking..." : "Track"}
    </button>

    {trackResult && (
      <span className={`track-result ${trackStatus}`}>
        {trackResult}
      </span>
    )}
  </div>
)}




    </>
  );
}

/* ================= SERVICE CARD ================= */
function Service({ title }) {
  return (
    <div className="service-rich-card">
      <h3>{title}</h3>
      <p>
        Enterprise-grade logistics designed for speed, compliance, and reliability.
      </p>
    </div>
  );
}

/* ================= EXPANDED SERVICES ================= */
function ExpandedServices() {
  return (
    <section className="services-expanded">
  <h2>End-to-End Logistics Services</h2>

  <p className="services-sub">
    We manage the complete logistics lifecycle, <br />from first-mile pickup and international transportation to customs clearance, <br /> warehousing, and final-mile delivery, providing businesses with a single, fully accountable logistics partner.
  </p>

  <div className="services-expanded-grid">
    <ServiceBox
      title="First- & Last-Mile Delivery"
      text="Reliable pickup and final delivery services ensuring seamless movement from origin to destination."
    />

    <ServiceBox
      title="Domestic Express"
      text="High-frequency same-day and next-day delivery solutions integrated into a unified logistics flow."
    />

    <ServiceBox
      title="International Express"
      text="Time-definite cross-border delivery managed end-to-end across global trade lanes."
    />

    <ServiceBox
      title="Air & Sea Freight"
      text="Coordinated air and ocean freight services forming the backbone of international cargo movement."
    />

    <ServiceBox
      title="Warehousing & Fulfillment"
      text="Secure storage, inventory management, order fulfillment, and regional distribution services."
    />

    <ServiceBox
      title="Customs & Regulatory Management"
      text="End-to-end customs documentation, compliance handling, and clearance coordination."
    />
  </div>
</section>

  );
}

/* ================= SERVICE BOX ================= */
function ServiceBox({ title, text }) {
  return (
    <div className="service-box">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
