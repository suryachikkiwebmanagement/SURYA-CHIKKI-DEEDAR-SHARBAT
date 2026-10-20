import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarker, FaClock, FaCheckCircle, FaArrowRight, FaInstagram, FaFacebook } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent('Contact from ' + formData.name + ' - ' + formData.subject);
      const body = encodeURIComponent(
        'Name: ' + formData.name + '\n' +
        'Email: ' + formData.email + '\n' +
        'Phone: ' + (formData.phone || 'Not provided') + '\n' +
        'Subject: ' + (formData.subject || 'General Inquiry') + '\n\n' +
        'Message:\n' + formData.message
      );
      window.open('mailto:suryachikki.admin@gmail.com?subject=' + subject + '&body=' + body, '_blank');
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  const handleWhatsApp = () => {
    const phoneNumber = '919429946364';
    const message = encodeURIComponent(
      'Hello Surya Chikki Team,\n\n' +
      'I would like to get in touch with you.\n\n' +
      'Please get back to me.\n\n' +
      'Thank you!'
    );
    window.open('https://wa.me/' + phoneNumber + '?text=' + message, '_blank');
  };

  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
      minHeight: '100vh'
    }}>
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '0.8rem', letterSpacing: '2px', borderRadius: '50px' }}>
            Get in Touch
          </Badge>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: '#1a1a2e',
            fontFamily: "'Playfair Display', serif"
          }}>
            Contact <span style={{ color: '#DC143C' }}>Us</span>
          </h1>
          <p style={{ color: '#777', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Info */}
          <Col lg={4}>
            <Card style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              height: '100%',
              padding: '30px',
              background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
              color: 'white'
            }}>
              <h4 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontWeight: '700',
                marginBottom: '25px'
              }}>
                Contact Information
              </h4>
              
              <div style={{ marginBottom: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    <FaPhone />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>Phone</div>
                    <div style={{ fontWeight: '600' }}>+91 9429946364</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>Email</div>
                    <div style={{ fontWeight: '600' }}>suryachikki.admin@gmail.com</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    <FaMapMarker />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>Address</div>
                    <div style={{ fontWeight: '600' }}>Bhavnagar , Gujrat</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem'
                  }}>
                    <FaClock />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: '0.7' }}>Hours</div>
                    <div style={{ fontWeight: '600' }}>Mon-Sat: 9AM - 9PM</div>
                  </div>
                </div>
              </div>

              <div style={{
                padding: '15px 20px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: '0.8' }}>
                  <FaWhatsapp style={{ marginRight: '10px', color: '#25D366' }} />
                  WhatsApp: +91 9429946364
                </p>
              </div>

              {/* Social Links */}
              <div style={{ marginTop: '20px' }}>
                <p style={{ fontSize: '0.9rem', opacity: '0.8', marginBottom: '10px' }}>
                  Follow us:
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a
                    href="https://www.instagram.com/suryachikki.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      fontSize: '1.2rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#E4405F';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    <FaInstagram />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1PTvkmhSDY/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      fontSize: '1.2rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#1877F2';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="https://wa.me/919429946364"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      fontSize: '1.2rem'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#25D366';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }}
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              </div>
            </Card>
          </Col>

          {/* Form */}
          <Col lg={8}>
            <Card style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              padding: '40px',
              background: '#FFFFFF'
            }}>
              {submitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '3rem',
                    color: 'white'
                  }}>
                    <FaCheckCircle />
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '700', color: '#1a1a2e' }}>
                    Thank You!
                  </h3>
                  <p style={{ color: '#777' }}>
                    Your message has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  

                
                
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  
                    <Button 
                      onClick={handleWhatsApp}
                      variant="outline-success"
                      style={{
                        borderRadius: '50px',
                        padding: '14px 30px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        borderWidth: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#25D366';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = '#25D366';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </Button>
                  </div>

                  <p style={{ marginTop: '15px', color: '#999', fontSize: '0.85rem' }}>
                    <FaCheckCircle style={{ color: '#4CAF50', marginRight: '5px' }} />
                    We'll respond within 24 hours
                  </p>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
