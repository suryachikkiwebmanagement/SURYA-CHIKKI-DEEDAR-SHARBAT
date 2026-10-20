import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaShoppingBag } from 'react-icons/fa';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { useInquiry } from '../../context/InquiryContext';
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useInquiry();
  const itemCount = getTotalItems();
  const location = useLocation();

  // ✅ Optimized scroll listener — passive + rAF throttle
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/chikki', label: 'Chikki' },
    { to: '/cashew', label: 'Cashew' },
    { to: '/almonds', label: 'Almonds' },
    { to: '/sharbat', label: 'Sharbat' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <>
      <style>{CSS}</style>

      <BootstrapNavbar
        expand="lg"
        className={`premium-navbar sticky-top ${scrolled ? 'is-scrolled' : ''}`}
        expanded={expanded}
        onToggle={(next) => setExpanded(next)}
      >
        <Container fluid className="navbar-inner">
          <div className="navbar-row">
            {/* Brand */}
            <BootstrapNavbar.Brand as={Link} to="/" className="nav-brand-wrap m-0 p-0">
              <div className="logo-shell logo-primary">
                <img src={logo} alt="Surya Chikki" loading="eager" decoding="async" />
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
              {navLinks.map((link) => (
                <Nav.Link
                  key={link.to}
                  as={Link}
                  to={link.to}
                  className={`nav-link-premium ${isActive(link.to) ? 'active' : ''}`}
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
   CSS — Performance-focused:
   - No backdrop-filter on scroll (biggest lag cause)
   - No blur, no saturate filter on main bar
   - Solid semi-transparent bg + soft shadow only
   - GPU-only transforms for hover effects
   ═══════════════════════════════════════════════════════════ */
const CSS = `
  .premium-navbar {
    /* ✅ Solid background — zero GPU cost */
    background: #ffffff;
    border-bottom: 1px solid rgba(220, 20, 60, 0.1);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.04);
    transition: box-shadow 0.25s ease, background 0.25s ease;
    padding: 8px 0;
    z-index: 1030;
    /* GPU hint for sticky positioning */
    will-change: transform;
    transform: translateZ(0);
  }

  .premium-navbar.is-scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 4px 16px rgba(220, 20, 60, 0.08);
  }

  /* Thin gradient accent line — CSS only, no repaint cost */
  .premium-navbar::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #DC143C, #FF4500, #DC143C, transparent);
    opacity: 0.5;
    pointer-events: none;
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
    /* GPU-only hover */
    transition: transform 0.25s ease;
    will-change: transform;
  }
  .nav-brand-wrap:hover {
    transform: translate3d(0, -1px, 0);
  }

  .logo-shell {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 14px;
    padding: 4px;
    border: 1px solid rgba(220, 20, 60, 0.1);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    will-change: transform;
  }
  .logo-primary {
    width: 64px;
    height: 52px;
  }
  .logo-secondary {
    width: 80px;
    height: 50px;
    margin-left: 4px;
  }
  .logo-shell:hover {
    transform: translate3d(0, 0, 0) scale(1.04);
    box-shadow: 0 4px 14px rgba(220, 20, 60, 0.15);
    border-color: rgba(220, 20, 60, 0.22);
  }
  .logo-shell img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .brand-text-main {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 1.2rem;
    font-weight: 800;
    color: #1a1a1a;
    letter-spacing: -0.3px;
    line-height: 1.1;
    /* ✅ Removed gradient text — cheaper to paint */
  }

  .brand-text-sub {
    font-family: 'Segoe UI', -apple-system, Roboto, Helvetica, sans-serif;
    font-size: 0.55rem;
    color: #DC143C;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    font-weight: 600;
    opacity: 0.85;
    margin-top: 2px;
  }

  /* ─── Nav links ─── */
  .nav-menu {
    gap: 2px;
  }

  .nav-link-premium {
    position: relative;
    font-family: 'Segoe UI', -apple-system, Roboto, Helvetica, sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    color: #4a4a4a !important;
    padding: 8px 14px !important;
    border-radius: 10px;
    /* ✅ Simple transitions only, GPU-friendly */
    transition: color 0.2s ease, background-color 0.2s ease;
    white-space: nowrap;
    text-decoration: none !important;
    display: inline-flex;
    align-items: center;
    letter-spacing: 0.2px;
  }

  .nav-link-premium:hover {
    color: #DC143C !important;
    background-color: rgba(220, 20, 60, 0.05);
  }

  .nav-link-premium.active {
    color: #DC143C !important;
    background-color: rgba(220, 20, 60, 0.08);
    font-weight: 700;
  }

  /* ─── Inquiry CTA ─── */
  .inquiry-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: linear-gradient(135deg, #DC143C 0%, #FF4500 100%);
    color: #fff !important;
    padding: 9px 20px;
    border-radius: 50px;
    font-family: 'Segoe UI', -apple-system, Roboto, Helvetica, sans-serif;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    box-shadow: 0 3px 12px rgba(220, 20, 60, 0.3);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    text-decoration: none !important;
    white-space: nowrap;
    will-change: transform;
  }
  .inquiry-btn:hover {
    transform: translate3d(0, -2px, 0);
    box-shadow: 0 6px 20px rgba(220, 20, 60, 0.4);
    color: #fff !important;
  }
  .inquiry-btn:active {
    transform: translate3d(0, 0, 0);
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
    background: rgba(220, 20, 60, 0.08);
    color: #DC143C;
    transition: transform 0.25s ease, background-color 0.25s ease;
    text-decoration: none !important;
    will-change: transform;
  }
  .cart-btn:hover {
    background: rgba(220, 20, 60, 0.15);
    transform: scale(1.06);
  }

  .cart-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    background: linear-gradient(135deg, #DC143C, #FF4500);
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
    box-shadow: 0 2px 6px rgba(220, 20, 60, 0.35);
    border: 2px solid #fff;
    font-family: 'Segoe UI', -apple-system, Roboto, sans-serif;
  }

  /* ─── Mobile toggle ─── */
  .mobile-controls {
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .mobile-toggle {
    background: linear-gradient(135deg, #DC143C, #FF4500);
    border: none;
    border-radius: 10px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    font-size: 0.95rem;
    box-shadow: 0 3px 12px rgba(220, 20, 60, 0.28);
    transition: transform 0.2s ease;
    will-change: transform;
  }
  .mobile-toggle:active {
    transform: scale(0.94);
  }
  .mobile-toggle:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(220, 20, 60, 0.22), 0 3px 12px rgba(220, 20, 60, 0.28);
  }

  /* ─── Mobile dropdown — NO backdrop blur ─── */
  @media (max-width: 991px) {
    .navbar-collapse {
      background: #ffffff;
      border-radius: 16px;
      margin-top: 12px;
      padding: 12px;
      box-shadow: 0 10px 30px rgba(220, 20, 60, 0.12);
      border: 1px solid rgba(220, 20, 60, 0.08);
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

  /* ─── Reduced motion ─── */
  @media (prefers-reduced-motion: reduce) {
    .premium-navbar,
    .nav-brand-wrap,
    .logo-shell,
    .nav-link-premium,
    .inquiry-btn,
    .cart-btn,
    .mobile-toggle {
      transition: none !important;
      animation: none !important;
    }
  }
`;

export default memo(Navbar);