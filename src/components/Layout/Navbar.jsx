import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaShoppingCart } from 'react-icons/fa';
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { useInquiry } from '../../context/InquiryContext';
import logo from "../../assets/images/logo.png";
import logo2 from "../../assets/images/logo2.png";

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const [basketBounce, setBasketBounce] = useState(false);
  const { getTotalItems } = useInquiry();
  const itemCount = getTotalItems();

  useEffect(() => {
    if (itemCount > 0) {
      setBasketBounce(true);
      const timer = setTimeout(() => {
        setBasketBounce(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  const bounceStyle = basketBounce ? 'basketBounce 0.6s ease' : 'none';

  // Reusable link style to keep the code clean and consistent
  const linkStyle = {
    color: '#333',
    fontSize: '0.8rem',
    fontWeight: '700',
    padding: '6px 10px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap'
  };

  const handleLinkEnter = (e) => {
    e.target.style.backgroundColor = '#DC143C';
    e.target.style.color = '#FFFFFF';
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 6px 18px rgba(220,20,60,0.3)';
  };

  const handleLinkLeave = (e) => {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.color = '#333';
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <BootstrapNavbar 
      expand="lg" 
      className="sticky-top" 
      expanded={expanded}
      style={{ 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF5F5 100%)',
        boxShadow: '0 4px 30px rgba(220, 20, 60, 0.15)',
        borderBottom: '4px solid #DC143C',
        padding: '6px 0'
      }}
    >
      <Container fluid style={{ paddingLeft: '12px', paddingRight: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'nowrap'
        }}>
          {/* Logo Section */}
          <BootstrapNavbar.Brand 
            as={Link} 
            to="/" 
            className="d-flex align-items-center" 
            style={{ 
              gap: '4px', 
              textDecoration: 'none', 
              flexShrink: 0,
              margin: 0,
              padding: 0
            }}
          >
            {/* Logo 1 */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.3s ease',
                borderRadius: '10px',
                overflow: 'hidden',
                background: '#FFFFFF',
                padding: '2px',
                width: '100px',
                height: '60px',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08) rotate(-3deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
              <img 
                src={logo} 
                alt="Surya Chikki Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Logo 2 - Mobile only */}
            <div 
              className="d-lg-none d-flex align-items-center"
              style={{
                justifyContent: 'center',
                borderRadius: '10px',
                overflow: 'hidden',
                padding: '2px',
                width: '130px',
                height: '55px',
                flexShrink: 0
              }}
            >
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: '700',
                color: '#DC143C',
                fontFamily: "'Playfair Display', serif",
                display: 'block',
                lineHeight: '1.1'
              }}>
                & 
              </span>
              <img 
                src={logo2} 
                alt="Deedar Sharbat Logo" 
                style={{ width: '130%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Brand text - PC only */}
            <div className="d-none d-lg-block" style={{ marginLeft: '2px' }}>
              <span style={{ 
                fontSize: '1.15rem', 
                fontWeight: '800',
                color: '#DC143C',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '-0.3px',
                display: 'block',
                lineHeight: '1.05',
                whiteSpace: 'nowrap'
              }}>
                Surya Chikki & Deedar Sharbat
              </span>
              <div style={{ 
                fontSize: '0.42rem', 
                color: '#DC143C',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: '600',
                opacity: '0.7'
              }}>
                Since 1975
              </div>
            </div>

            {/* Second logo - PC only, smaller */}
            <div className="d-none d-lg-block" style={{
              width: '130px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}> 
              <img 
                src={logo2} 
                alt="Deedar Sharbat Logo" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </BootstrapNavbar.Brand>
          
          {/* Mobile toggle */}
          <div className="d-flex align-items-center d-lg-none" style={{ gap: '4px', flexShrink: 0 }}>
            <BootstrapNavbar.Toggle 
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(expanded ? false : true)}
              style={{
                background: 'linear-gradient(135deg, #DC143C, #FF0000)',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 7px',
                boxShadow: '0 4px 15px rgba(220, 20, 60, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {expanded ? 
                <FaTimes style={{ color: '#FFFFFF', fontSize: '0.8rem' }} /> : 
                <FaBars style={{ color: '#FFFFFF', fontSize: '0.8rem' }} />
              }
            </BootstrapNavbar.Toggle>
          </div>
        </div>
        
        {/* Navigation Links */}
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center" style={{ gap: '1px' }}>
            <Nav.Link 
              as={Link} to="/" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} to="/chikki" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              Chikki
            </Nav.Link>

            <Nav.Link 
              as={Link} to="/cashew" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              Cashew
            </Nav.Link>

            <Nav.Link 
              as={Link} to="/almonds" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              Almonds
            </Nav.Link>

            <Nav.Link 
              as={Link} to="/sharbat" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              Sharbat
            </Nav.Link>
            
            <Nav.Link 
              as={Link} to="/about" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              About
            </Nav.Link>
            
            <Nav.Link 
              as={Link} to="/contact" 
              onClick={() => setExpanded(false)}
              style={linkStyle}
              onMouseEnter={handleLinkEnter}
              onMouseLeave={handleLinkLeave}
            >
              Contact
            </Nav.Link>

            {/* Inquiry Button */}
            <Nav.Link 
              as={Link} 
              to="/inquiry" 
              onClick={() => setExpanded(false)}
              style={{ padding: '3px 3px 3px 6px' }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #DC143C, #FF0000)',
                color: '#FFFFFF',
                padding: '6px 14px',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '0.68rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(220, 20, 60, 0.4)',
                border: '2px solid transparent',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.03)';
                e.target.style.boxShadow = '0 8px 35px rgba(220, 20, 60, 0.5)';
                e.target.style.background = 'linear-gradient(135deg, #FF0000, #DC143C)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.4)';
                e.target.style.background = 'linear-gradient(135deg, #DC143C, #FF0000)';
              }}>
                <FaPhone style={{ fontSize: '0.6rem' }} />
                Inquiry
              </span>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;