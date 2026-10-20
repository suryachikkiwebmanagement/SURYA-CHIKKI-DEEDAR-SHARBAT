import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaPhone, FaShoppingCart } from 'react-icons/fa';
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from 'react-bootstrap';
import { useInquiry } from '../../context/InquiryContext';
// In Navbar.js - Using relative path
// Try these paths:
import logo from "../../assets/images/logo.png";  // Go up two levels
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
      <Container fluid>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          flexWrap: 'nowrap'
        }}>
          {/* Logo Section - Left */}
        <BootstrapNavbar.Brand 
  as={Link} 
  to="/" 
  className="d-flex align-items-center" 
  style={{ 
    gap: '6px', 
    textDecoration: 'none', 
    flexShrink: 0,
    margin: 0,
    padding: 0,
    alignItems: 'center'
  }}
>
  {/* Logo 1 */}
  <div 
    className="logo-container"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#FFFFFF',
      padding: '2px',
      width: '35px',
      height: '45px',
      flexShrink: 0
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'scale(1.08) rotate(-3deg)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'scale(1) rotate(0deg)';
    }}>
    <img 
      src={logo} 
      alt="Surya Chikki Logo" 
      style={{
        width: '80%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </div>

  {/* Logo 2 - Mobile only */}
  <div 
    className="d-lg-none d-flex align-items-center"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease',
      borderRadius: '10px',
      overflow: 'hidden',
      background: '#ffffff00',
      padding: '2px',
      width: '150px',
      height: '60px',
      flexShrink: 0
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'scale(1.08) rotate(-3deg)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'scale(1) rotate(0deg)';
    }}>
    <div>
      <span style={{ 
        fontSize: '1rem', 
        fontWeight: '700',
        color: '#DC143C',
        fontFamily: "'Playfair Display', serif",
        letterSpacing: '-0.3px',
        display: 'block',
        lineHeight: '1.1'
      }}>
        & 
      </span>
    </div>
    <img 
      src={logo2} 
      alt="Deedar Sharbat Logo" 
      style={{
        width: '150%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </div>

  {/* Text - Hidden on mobile, shown on PC */}
  <div className="d-none d-lg-block" style={{ marginLeft: '4px' }}>
    <span style={{ 
      fontSize: '1.50rem', 
      fontWeight: '800',
      color: '#DC143C',
      fontFamily: "'Playfair Display', serif",
      letterSpacing: '-0.3px',
      display: 'block',
      lineHeight: '1.1'
    }}>
      Surya Chikki & Deedar Sharbat
    </span>
    <div style={{ 
      fontSize: '0.45rem', 
      color: '#DC143C',
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      fontWeight: '600',
      opacity: '0.7'
    }}>
      Since 1975
    </div>
  </div>

  {/* Second Logo - PC Only */}
  <div className="d-none d-lg-block" style={{
    width: '200px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}> 
    <img 
      src={logo2} 
      alt="Deedar Sharbat Logo" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </div>
</BootstrapNavbar.Brand>
          
          {/* Right Section - Cart + Toggle (Mobile Only) */}
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
          <Nav className="ms-auto align-items-center" style={{ gap: '3px' }}>
            <Nav.Link 
              as={Link} 
              to="/" 
              className="fw-bold" 
              onClick={() => setExpanded(false)}
              style={{
                color: '#333',
                fontSize: '0.85rem',
                padding: '8px 14px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DC143C';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(220,20,60,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Home
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/chikki" 
              className="fw-bold" 
              onClick={() => setExpanded(false)}
              style={{
                color: '#333',
                fontSize: '0.85rem',
                padding: '8px 14px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DC143C';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(220,20,60,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Chikki
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/sharbat" 
              className="fw-bold" 
              onClick={() => setExpanded(false)}
              style={{
                color: '#333',
                fontSize: '0.85rem',
                padding: '8px 14px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DC143C';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(220,20,60,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Sharbat
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/about" 
              className="fw-bold" 
              onClick={() => setExpanded(false)}
              style={{
                color: '#333',
                fontSize: '0.85rem',
                padding: '8px 14px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DC143C';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(220,20,60,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              About
            </Nav.Link>
            
            <Nav.Link 
              as={Link} 
              to="/contact" 
              className="fw-bold" 
              onClick={() => setExpanded(false)}
              style={{
                color: '#333',
                fontSize: '0.85rem',
                padding: '8px 14px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#DC143C';
                e.target.style.color = '#FFFFFF';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(220,20,60,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#333';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Contact
            </Nav.Link>

            {/* Cart Icon - PC Only (after pages, before inquiry) */}
            <div className="d-none d-lg-flex align-items-center" style={{ margin: '0 3px' }}>
              
            </div>
            
            {/* Inquiry Button */}
            <Nav.Link 
              as={Link} 
              to="/inquiry" 
              onClick={() => setExpanded(false)}
              style={{ padding: '3px 3px 3px 8px' }}
            >
              <span style={{
                background: 'linear-gradient(135deg, #DC143C, #FF0000)',
                color: '#FFFFFF',
                padding: '6px 16px',
                borderRadius: '50px',
                fontWeight: '700',
                fontSize: '0.7rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(220, 20, 60, 0.4)',
                border: '2px solid transparent'
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
