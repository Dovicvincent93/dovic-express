import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setAccountOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          📦 Dovic<span>Express</span>
        </Link>

        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>

          {/* ===== SERVICES ===== */}
          <div
            className={`nav-mega ${servicesOpen ? "open" : ""}`}
            onMouseEnter={() => window.innerWidth > 900 && setServicesOpen(true)}
            onMouseLeave={() => window.innerWidth > 900 && setServicesOpen(false)}
            onClick={() => window.innerWidth <= 900 && setServicesOpen(!servicesOpen)}
          >
            <span className="nav-title-link">Services ▾</span>

            <div className="mega-menu">
              <div>
                <h4>Domestic Express</h4>
                <a href="/#service-domestic" onClick={closeMenu}>Same-day delivery</a> <br />
                <a href="/#service-domestic" onClick={closeMenu}>Nationwide coverage</a>
              </div>

              <div>
                <h4>International Logistics</h4>
                <a href="/#service-international" onClick={closeMenu}>International Express</a> <br />
                <a href="/#service-international" onClick={closeMenu}>Air & Sea Freight</a> <br />
                <a href="/#service-international" onClick={closeMenu}>Customs Clearance</a>
              </div>

              <div>
                <h4>Supply Chain</h4>
                <a href="/#service-supply" onClick={closeMenu}>Warehousing</a><br />
                <a href="/#service-supply" onClick={closeMenu}>Fulfillment</a><br />
                <a href="/#service-supply" onClick={closeMenu}>Enterprise Logistics</a>
              </div>
            </div>
          </div>
           <NavLink to="/careers">Careers</NavLink>
          <NavLink to="/sustainability">Sustainability</NavLink>
          <NavLink to="/investors">Investors</NavLink>

          <NavLink to="/track" onClick={closeMenu}>Track</NavLink>
          <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          <Link to="/my-quotes" onClick={closeMenu}>My Quotes</Link>

          {/* ===== ACCOUNT ===== */}
          <div
            className={`nav-mega ${accountOpen ? "open" : ""}`}
            onMouseEnter={() => window.innerWidth > 900 && setAccountOpen(true)}
            onMouseLeave={() => window.innerWidth > 900 && setAccountOpen(false)}
            onClick={() => window.innerWidth <= 900 && setAccountOpen(!accountOpen)}
          >
            <span className="nav-title">Account ▾</span>

            <div className="mega-menu small">
              {!token && (
                <>
                  <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
                  <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
                </>
              )}

              {token && user && (
                <>
                  <div className="account-info">
                    <strong>{user.name}</strong>
                    <small>{user.role}</small>
                  </div>

                  {user.role === "admin" && (
                    <>
                      <NavLink to="/admin" onClick={closeMenu}>Dashboard</NavLink>
                      <NavLink to="/admin/shipments" onClick={closeMenu}>Shipments</NavLink>
                      <NavLink to="/admin/quotes" onClick={closeMenu}>Quotes</NavLink>
                    </>
                  )}

                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
