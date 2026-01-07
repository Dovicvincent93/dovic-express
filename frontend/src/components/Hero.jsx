import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Fast. Reliable. <span>Dovic Express</span>
        </h1>
        <p>
          Delivering excellence across borders with world-class logistics
          solutions trusted by businesses and individuals.
        </p>

        <div className="hero-actions">
          <a href="/track" className="hero-btn primary">
            Track Shipment
          </a>
          <a href="/contact" className="hero-btn secondary">
            Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}
