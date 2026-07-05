import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarker, FaClock, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const Inquiry = () => {
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

  const handleWhatsAppSubmit = () => {
    const { name, email, phone, subject, message } = formData;
    
    if (name && email && message) {
      const whatsappMessage = 
        "🛒 Inquiry - Surya Chikki" +
        "\n\n👤 Name: " + name +
        "\n📧 Email: " + email +
        "\n📞 Phone: " + (phone || "Not provided") +
        "\n📋 Subject: " + (subject || "General Inquiry") +
        "\n\n💬 Message:\n" + message +
        "\n\nThank you for your interest in Surya Chikki!";
      
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const phoneNumber = '919429946364';
      window.open('https://wa.me/' + phoneNumber + '?text=' + encodedMessage, '_blank');
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  const handleEmailSubmit = () => {
    const { name, email, phone, subject, message } = formData;
    
    if (name && email && message) {
      const emailSubject = encodeURIComponent('Inquiry from ' + name + ' - ' + (subject || 'General Inquiry'));
      const body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Phone: ' + (phone || 'Not provided') + '\n' +
        'Subject: ' + (subject || 'General Inquiry') + '\n\n' +
        'Message:\n' + message
      );
      window.open('mailto:suryachikki.admin@gmail.com?subject=' + emailSubject + '&body=' + body, '_blank');
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
      minHeight: '100vh'
    }}>
      <Container>
        <div className="text-center mb-5">
          <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '0.8rem', letterSpacing: '2px', borderRadius: '50px' }}>
            Get in Touch
          </Badge>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1a1a2e',
            fontFamily: "'Playfair Display', serif"
          }}>
            Send Us an <span style={{ color: '#DC143C' }}>Inquiry</span>
          </h1>
          <p style={{ color: '#777', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Have questions about our products? We'd love to hear from you!
          </p>
        </div>

        <Row className="g-4">
          {/* Contact Info */}
       
          {/* Form - No Send Message Button */}
          <Col lg={8}>
            <Card style={{
              border: 'none',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              padding: '40px',
              background: '#FFFFFF'
            }}>
              <h4 style={{ 
                fontFamily: "'Playfair Display', serif", 
                fontWeight: '700',
                color: '#1a1a2e',
                marginBottom: '20px'
              }}>
                Send Inquiry
              </h4>

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
                    Your inquiry has been sent successfully. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: '600', color: '#1a1a2e' }}>
                          Full Name <span style={{ color: '#DC143C' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: '10px',
                            padding: '12px 15px',
                            border: '2px solid #f0e6e6',
                            transition: 'all 0.3s'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#DC143C';
                            e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#f0e6e6';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: '600', color: '#1a1a2e' }}>
                          Email Address <span style={{ color: '#DC143C' }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          style={{
                            borderRadius: '10px',
                            padding: '12px 15px',
                            border: '2px solid #f0e6e6',
                            transition: 'all 0.3s'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#DC143C';
                            e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#f0e6e6';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: '600', color: '#1a1a2e' }}>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{
                            borderRadius: '10px',
                            padding: '12px 15px',
                            border: '2px solid #f0e6e6',
                            transition: 'all 0.3s'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#DC143C';
                            e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#f0e6e6';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: '600', color: '#1a1a2e' }}>
                          Subject
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          style={{
                            borderRadius: '10px',
                            padding: '12px 15px',
                            border: '2px solid #f0e6e6',
                            transition: 'all 0.3s'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#DC143C';
                            e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#f0e6e6';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#1a1a2e' }}>
                      Message <span style={{ color: '#DC143C' }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      placeholder="Tell us about your requirements, questions, or feedback..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: '10px',
                        padding: '12px 15px',
                        border: '2px solid #f0e6e6',
                        transition: 'all 0.3s',
                        resize: 'none'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#DC143C';
                        e.target.style.boxShadow = '0 0 0 3px rgba(220,20,60,0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#f0e6e6';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </Form.Group>

                  {/* Send Message Button REMOVED - Only WhatsApp and Email */}
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button 
                      onClick={handleWhatsAppSubmit}
                      style={{
                        flex: 1,
                        borderRadius: '50px',
                        padding: '14px 30px',
                        fontWeight: '700',
                        fontSize: '1rem',
                        background: '#25D366',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        minWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#128C7E';
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 8px 25px rgba(37,211,102,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#25D366';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <FaWhatsapp />
                      Send via WhatsApp
                    </Button>
                    
                    <Button 
                      onClick={handleEmailSubmit}
                      style={{
                        flex: 1,
                        borderRadius: '50px',
                        padding: '14px 30px',
                        fontWeight: '700',
                        fontSize: '1rem',
                        background: '#EA4335',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        minWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#C5221F';
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 8px 25px rgba(234,67,53,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#EA4335';
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <FaEnvelope />
                      Send via Email
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

export default Inquiry;

