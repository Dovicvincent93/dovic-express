import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

/* ✅ IMPORT LOGO */
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  /* ================= CLOSE MENUS ON ROUTE CHANGE ================= */
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setAccountOpen(false);
  }, [location.pathname]);

  /* ================= SMOOTH SCROLL ================= */
  const goToSection = (id) => {
    const scrollToTarget = () => {
      const el = document.getElementById(id);
      if (!el) return;

      const yOffset = -80;
      const y =
        el.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToTarget, 120);
    } else {
      scrollToTarget();
    }

    setMenuOpen(false);
    setServicesOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isDesktop = () => window.innerWidth > 900;

  return (
    <header className="navbar">
      {/* 🔥 THIS DIV WAS MISSING — NOW MATCHES CSS */}
      <div className="nav-inner">
        <div className="nav-container">

          {/* ================= LOGO ================= */}
          <Link to="/" className="logo">
            <img
              src={logo}
              alt="Dovic Express Logo"
              className="logo-img"
            />
            <span className="logo-text">
              Dovic<span>Express</span>
            </span>
          </Link>

          {/* ================= HAMBURGER ================= */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* ================= NAV ================= */}
          <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About Us</NavLink>

            {/* ================= SERVICES ================= */}
            <div
              className={`nav-mega ${servicesOpen ? "open" : ""}`}
              onMouseEnter={() => isDesktop() && setServicesOpen(true)}
              onMouseLeave={() => isDesktop() && setServicesOpen(false)}
            >
              <button
                type="button"
                className="nav-title"
                onClick={() => !isDesktop() && setServicesOpen((p) => !p)}
              >
                Services ▾
              </button>

              <div className="mega-menu">
                <div>
                  <h4>Operational Capabilities</h4>
                  <button onClick={() => goToSection("service-domestic")}>
                    Express Delivery, Global Coverage & Secure Handling
                  </button>
                </div>

                <div>
                  <h4>International & Freight</h4>
                  <button onClick={() => goToSection("service-international")}>
                    Warehousing, Road, Air & Sea Freight Solutions
                  </button>
                </div>

                <div>
                  <h4>Supply Chain Solutions</h4>
                  <button onClick={() => goToSection("service-supply")}>
                    Enterprise Logistics, Compliance & Reliability
                  </button>
                </div>
              </div>
            </div>

            <NavLink to="/careers">Careers</NavLink>
            <NavLink to="/sustainability">Sustainability</NavLink>
            <NavLink to="/investors">Investors</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/track">Track</NavLink>
            <NavLink to="/my-quotes">My Quotes</NavLink>

            {/* ================= ACCOUNT ================= */}
            <div
              className={`nav-mega ${accountOpen ? "open" : ""}`}
              onMouseEnter={() => isDesktop() && setAccountOpen(true)}
              onMouseLeave={() => isDesktop() && setAccountOpen(false)}
            >
              <button
                type="button"
                className="nav-title"
                onClick={() => !isDesktop() && setAccountOpen((p) => !p)}
              >
                Account ▾
              </button>

              <div className="mega-menu small">
                {!token && (
                  <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
                  </>
                )}

                {token && user && (
                  <>
                    <div className="account-info">
                      <strong>{user.name}</strong>
                    </div>

                    {user.role === "admin" && (
                      <>
                        <NavLink to="/admin">Dashboard</NavLink>
                        <NavLink to="/admin/shipments">Shipments</NavLink>
                        <NavLink to="/admin/quotes">Quotes</NavLink>
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
      </div>
    </header>
  );
}
