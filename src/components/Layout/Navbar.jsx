import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaShoppingBag } from 'react-icons/fa';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { useInquiry } from '../../context/InquiryContext';
import logo from "../../assets/images/logo.png";

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/chikki', label: 'Chikki' },
  { to: '/cashew', label: 'Cashew' },
  { to: '/almonds', label: 'Almonds' },
  { to: '/sharbat', label: 'Sharbat' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useInquiry();
  const itemCount = getTotalItems();
  const location = useLocation();

  // Passive scroll listener — updates only when the boolean flips
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 20;
      setScrolled(prev => (prev === next ? prev : next));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const path = location.pathname;

  return (
    <>
      <style>{CSS}</style>

      <BootstrapNavbar
        expand="lg"
        className={`premium-navbar sticky-top ${scrolled ? 'is-scrolled' : ''}`}
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid className="navbar-inner">
          <div className="navbar-row">
            {/* Brand */}
            <BootstrapNavbar.Brand as={Link} to="/" className="nav-brand-wrap m-0 p-0">
              <div className="logo-shell">
                <img src={logo} alt="Surya Chikki" decoding="async" />
              </div>

              <div className="d-none d-lg-block ms-2">
                <div className="brand-text-main">Surya Chikki</div>
                <div className="brand-text-sub">& Deedar Sharbat · Since 1975</div>
              </div>

              <div className="d-lg-none ms-1">
                <div className="brand-text-main" style={{ fontSize: '0.95rem' }}>Surya Chikki</div>
                <div className="brand-text-sub" style={{ fontSize: '0.45rem', letterSpacing: '1.5px' }}>& Deedar Sharbat</div>
              </div>
            </BootstrapNavbar.Brand>

            {/* Mobile controls */}
            <div className="mobile-controls d-flex d-lg-none">
              <Link to="/inquiry" className="cart-btn" aria-label="View inquiry basket">
                <FaShoppingBag style={{ fontSize: '0.85rem' }} />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </Link>
              <button
                className="mobile-toggle"
                aria-label="Toggle navigation"
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
                type="button"
              >
                {expanded ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          <BootstrapNavbar.Collapse id="premium-navbar-nav">
            <Nav className="ms-auto align-items-center nav-menu">
              {NAV_LINKS.map((link) => (
                <Nav.Link
                  key={link.to}
                  as={Link}
                  to={link.to}
                  className={`nav-link-premium ${path === link.to ? 'active' : ''}`}
                >
                  {link.label}
                </Nav.Link>
              ))}

              <Link
                to="/inquiry"
                className="cart-btn cart-desktop ms-2 d-none d-lg-flex"
                aria-label="View inquiry basket"
              >
                <FaShoppingBag style={{ fontSize: '0.9rem' }} />
                {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
              </Link>

              <Link to="/inquiry" className="inquiry-btn ms-lg-2">
                <FaPhone style={{ fontSize: '0.65rem' }} />
                Inquiry
              </Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   CSS — Lightweight:
   - Solid backgrounds, no gradients, no blur, no will-change
   - No full-width gradient paint on scroll
   - Static shadows only (no per-hover repaint of shadow)
   - GPU-only transforms for hover feedback
   ═══════════════════════════════════════════════════════════ */
const CSS = `
  .premium-navbar {
    background: #ffffff;
    border-bottom: 1px solid rgba(242, 183, 5, 0.22);
    padding: 8px 0;
    z-index: 1030;
    transition: box-shadow 0.2s ease;
  }

  .premium-navbar.is-scrolled {
    box-shadow: 0 2px 10px rgba(201, 148, 0, 0.10);
  }

  .navbar-inner {
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .navbar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-wrap: nowrap;
  }

  /* ─── Brand ─── */
  .nav-brand-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
  }

  .logo-shell {
    width: 64px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 14px;
    padding: 4px;
    border: 1px solid rgba(242, 183, 5, 0.22);
  }
  .logo-shell img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .brand-text-main {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1.2rem;
    font-weight: 800;
    color: #1a1600;
    letter-spacing: -0.3px;
    line-height: 1.1;
  }

  .brand-text-sub {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.55rem;
    color: #C99400;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.9;
    margin-top: 2px;
  }

  /* ─── Nav links ─── */
  .nav-menu {
    gap: 2px;
  }

  .nav-link-premium {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4a4126 !important;
    padding: 8px 14px !important;
    border-radius: 10px;
    transition: color 0.15s ease, background-color 0.15s ease;
    white-space: nowrap;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    letter-spacing: 0.2px;
  }
  .nav-link-premium:hover {
    color: #C99400 !important;
    background-color: rgba(242, 183, 5, 0.10);
  }
  .nav-link-premium.active {
    color: #C99400 !important;
    background-color: rgba(242, 183, 5, 0.16);
    font-weight: 700;
  }

  /* ─── Inquiry CTA ─── */
  .inquiry-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #F2B705;
    color: #1a1600 !important;
    padding: 9px 20px;
    border-radius: 50px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-decoration: none !important;
    white-space: nowrap;
    transition: background-color 0.15s ease;
  }
  .inquiry-btn:hover {
    background: #C99400;
    color: #1a1600 !important;
  }

  /* ─── Cart ─── */
  .cart-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(242, 183, 5, 0.14);
    color: #C99400;
    text-decoration: none !important;
    transition: background-color 0.15s ease;
  }
  .cart-btn:hover {
    background: rgba(242, 183, 5, 0.24);
  }

  .cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: #C99400;
    color: #fff;
    font-size: 0.6rem;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    border: 2px solid #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  /* ─── Mobile toggle ─── */
  .mobile-controls {
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .mobile-toggle {
    background: #F2B705;
    border: none;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #1a1600;
    font-size: 0.95rem;
    transition: background-color 0.15s ease;
  }
  .mobile-toggle:hover {
    background: #C99400;
  }
  .mobile-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(242, 183, 5, 0.30);
  }

  /* ─── Mobile dropdown ─── */
  @media (max-width: 991px) {
    .navbar-collapse {
      background: #ffffff;
      border-radius: 16px;
      margin-top: 12px;
      padding: 12px;
      border: 1px solid rgba(242, 183, 5, 0.22);
      box-shadow: 0 6px 20px rgba(201, 148, 0, 0.10);
    }

    .nav-link-premium {
      padding: 11px 16px !important;
      width: 100%;
      justify-content: flex-start;
      border-radius: 10px;
    }

    .inquiry-btn {
      margin-top: 8px;
      justify-content: center;
      width: 100%;
    }

    .cart-desktop {
      display: none !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .premium-navbar,
    .nav-link-premium,
    .inquiry-btn,
    .cart-btn,
    .mobile-toggle {
      transition: none !important;
      animation: none !important;
    }
  }
`;

export default Navbar;