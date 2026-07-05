import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-5 mt-auto" style={{
      background: '#FFFFFF',
      borderTop: '3px solid #DC143C',
      boxShadow: '0 -2px 20px rgba(0,0,0,0.05)'
    }}>
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h3 className="font-playfair" style={{ color: '#DC143C' }}>
             Surya Chikki
            </h3>
            <p style={{ color: '#666' }}> since 1975.</p>
          </Col>
          
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold" style={{ color: '#DC143C' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" style={{ color: '#666', textDecoration: 'none' }}>Home</Link></li>
              <li><Link to="/products" style={{ color: '#666', textDecoration: 'none' }}>Products</Link></li>
              <li><Link to="/about" style={{ color: '#666', textDecoration: 'none' }}>About</Link></li>
              <li><Link to="/contact" style={{ color: '#666', textDecoration: 'none' }}>Contact</Link></li>
              <li><Link to="/inquiry" style={{ color: '#666', textDecoration: 'none' }}>Inquiry</Link></li>
            </ul>
          </Col>
          
          
          
        </Row>
        <hr style={{ borderColor: '#DC143C', opacity: '0.2' }} />
        <p className="text-center mb-0" style={{ color: '#666' }}>&copy; 2026 Surya Chikki.</p>
      </Container>
    </footer>
  );
};

export default Footer;
