import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* ================= INNER CONTAINER ================= */}
      <div className="footer-inner">
        {/* ================= FOOTER TOP ================= */}
        <div className="footer-top">
          {/* BRAND */}
          <div className="footer-column">
            <h4>Dovic Express</h4>
            <p>
              A global leader in logistics and express delivery, providing
              comprehensive shipping, freight forwarding, and supply chain
              solutions across continents with reliability, transparency, and
              speed.
            </p>
            <p>
              Trusted by businesses and individuals for time-critical and
              international deliveries.
            </p>
          </div>

          {/* SERVICES */}
          <div className="footer-column">
            <h4>Services</h4>
            <a href="#">Express Delivery</a>
            <a href="#">International Shipping</a>
            <a href="#">Air & Sea Freight</a>
            <a href="#">Customs Clearance</a>
            <a href="#">Warehousing & Fulfillment</a>
            <a href="#">Supply Chain Solutions</a>
          </div>

          {/* COMPANY */}
          <div className="footer-column">
            <h4>Company</h4>
            <a href="/about">About Us</a>
            <a href="/contact">Contact Us</a>
            <a href="/track">Track Shipment</a>
            <a href="/careers">Careers</a>
            <a href="/sustainability">Sustainability</a>
            <a href="/investors">Investor Relations</a>
          </div>

          {/* SUPPORT */}
          <div className="footer-column">
            <h4>Support</h4>

            <p className="support-item">
              <span className="support-icon">📞</span>
              <span>
                <strong>Hotline:</strong> +234 000 000 0000
              </span>
            </p>

            <p className="support-item">
              <span className="support-icon">✉️</span>
              <span>
                <strong>Email:</strong> support@dovicexpress.com
              </span>
            </p>

            <a href="/faqs">FAQs</a>
            <a href="/claims">Claims & Insurance</a>
          </div>

          {/* GLOBAL COVERAGE */}
          <div className="footer-column">
            <h4>Global Coverage</h4>
            <a href="#">Americas</a>
            <a href="#">Europe</a>
            <a href="#">Asia-Pacific</a>
            <a href="#">Middle East</a>
            <a href="#">Africa</a>
          </div>

          {/* BUSINESS SOLUTIONS */}
          <div className="footer-column">
            <h4>Business Solutions</h4>
            <a href="#">E-commerce Logistics</a>
            <a href="#">Bulk Shipping</a>
            <a href="#">Enterprise Accounts</a>
            <a href="#">API & Integrations</a>
            <a href="#">Dedicated Couriers</a>
          </div>

          {/* NEWSLETTER */}
          <div className="footer-column">
            <h4>Stay Updated</h4>
            <p>
              Subscribe to receive logistics insights, shipping tips, and service
              updates.
            </p>

            <form className="footer-newsletter">
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email address"
              />
              <button type="button">Subscribe</button>
            </form>
          </div>
        </div>

        {/* ================= FOOTER BOTTOM ================= */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              © {new Date().getFullYear()} Dovic Express. All rights reserved.
            </p>

            <div className="footer-legal">
              <a href="/terms">Terms of Use</a>
              <span>|</span>
              <a href="/privacy">Privacy Policy</a>
              <span>|</span>
              <a href="/compliance">Compliance</a>
            </div>
          </div>

          {/* SOCIAL LINKS */}
          <div className="footer-socials">
            <a href="#" aria-label="Facebook">Facebook</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>

      {/* ================= TRUST STRIP (FULL WIDTH) ================= */}
      <div className="footer-trust">
        <p>
          ISO-certified logistics partner • Secure operations • Shipment insurance
          available • 24/7 customer support
        </p>
      </div>
    </footer>
  );
}
