import React from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash, FaWhatsapp, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import { useInquiry } from '../context/InquiryContext';
import toast from 'react-hot-toast';

const InquiryBasket = () => {
  const { 
    inquiryItems, 
    removeFromInquiry, 
    updateQuantity, 
    clearInquiry, 
    getTotalItems
  } = useInquiry();

  
  const handleWhatsAppInquiry = () => {
    if (inquiryItems.length === 0) {
      toast.error('Your inquiry basket is empty!');
      return;
    }

    let message = '🛒 Inquiry Basket - Surya Chikki\n\n';
    message = message + '📦 Product List:\n\n';
    
    inquiryItems.forEach((item, index) => {
      message = message + (index + 1) + '. ' + item.name + '\n';
      message = message + '   Quantity: ' + item.quantity + '\n';
      message = message + '   Category: ' + item.category + '\n';
      message = message + '   Image: ' + window.location.origin + item.image + '\n\n';
    });
    
    message = message + '📊 Summary:\n';
    message = message + 'Total Items: ' + getTotalItems() + '\n\n';
    message = message + 'Please provide your delivery details.\n';
    message = message + 'Thank you for your interest in Surya Chikki!';

    const encoded = encodeURIComponent(message);
    const number = '919876543210';
    window.open('https://wa.me/' + number + '?text=' + encoded, '_blank');
  };

  const handleEmailInquiry = () => {
    if (inquiryItems.length === 0) {
      toast.error('Your inquiry basket is empty!');
      return;
    }

    let body = '🛒 Inquiry Basket - Surya Chikki\n\n';
    body = body + '📦 Product List:\n\n';
    
    inquiryItems.forEach((item, index) => {
      body = body + (index + 1) + '. ' + item.name + '\n';
      body = body + '   Quantity: ' + item.quantity + '\n';
      body = body + '   Category: ' + item.category + '\n';
      body = body + '   Image: ' + window.location.origin + item.image + '\n\n';
    });
    
    body = body + '📊 Summary:\n';
    body = body + 'Total Items: ' + getTotalItems() + '\n\n';
    body = body + 'Please provide your delivery details.\n';
    body = body + 'Thank you for your interest in Surya Chikki!';

    const subject = 'Inquiry Basket - Surya Chikki';
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open('mailto:suryachikki@gmail.com?subject=' + encodedSubject + '&body=' + encodedBody, '_blank');
  };

  if (inquiryItems.length === 0) {
    return (
      <section style={{
        padding: '80px 0',
        background: '#FFF8F8',
        minHeight: '100vh'
      }}>
        <Container>
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛒</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '700', color: '#1a1a2e' }}>
              Your Inquiry Basket is Empty
            </h2>
            <p style={{ color: '#777' }}>Start adding products to your inquiry basket!</p>
            <Link to="/chikki">
              <Button style={{
                background: '#DC143C',
                border: 'none',
                padding: '12px 40px',
                borderRadius: '50px',
                fontWeight: '600',
                marginTop: '20px'
              }}>
                Browse Products
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section style={{
      padding: '80px 0',
      background: '#FFF8F8',
      minHeight: '100vh'
    }}>
      <Container>
        <div className="text-center mb-5">
          <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '1rem' }}>
            🛒 Inquiry Basket
          </Badge>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: '#1a1a2e',
            fontFamily: "'Playfair Display', serif"
          }}>
            Your <span style={{ color: '#DC143C' }}>Items</span>
          </h1>
          <p style={{ color: '#777', fontSize: '1.1rem' }}>
            Review your inquiry items and send to us
          </p>
        </div>

        <Row>
          <Col lg={8}>
            {inquiryItems.map((item) => (
              <Card key={item.id} className="mb-3" style={{
                border: 'none',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden'
              }}>
                <Card.Body style={{ padding: '20px' }}>
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '10px'
                        }}
                      />
                    </Col>
                    <Col xs={5} md={6}>
                      <h6 style={{ fontWeight: '700', color: '#1a1a2e' }}>{item.name}</h6>
                      <p style={{ color: '#777', fontSize: '0.85rem', margin: 0 }}>
                        Category: {item.category}
                      </p>
                    </Col>
                    <Col xs={4} md={4}>
                      <div className="d-flex align-items-center justify-content-end gap-2">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ borderRadius: '50px' }}
                        >
                          -
                        </Button>
                        <span style={{ fontWeight: '700', minWidth: '30px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ borderRadius: '50px' }}
                        >
                          +
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => removeFromInquiry(item.id)}
                          style={{ borderRadius: '50px' }}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Col>

          <Col lg={4}>
            <Card style={{
              border: 'none',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
              position: 'sticky',
              top: '100px'
            }}>
              <Card.Body style={{ padding: '25px' }}>
                <h5 style={{ fontWeight: '700', color: '#1a1a2e', marginBottom: '20px' }}>
                  Inquiry Summary
                </h5>
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: '#777' }}>Total Items</span>
                  <span style={{ fontWeight: '700' }}>{getTotalItems()}</span>
                </div>
                <hr />
                <Button 
                  variant="outline-danger" 
                  className="w-100 mb-2"
                  onClick={clearInquiry}
                  style={{ borderRadius: '50px' }}
                >
                  Clear All
                </Button>
                <Button 
                  onClick={handleWhatsAppInquiry}
                  style={{
                    width: '100%',
                    background: '#25D366',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#128C7E';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#25D366';
                  }}
                >
                  <FaWhatsapp />
                  Send via WhatsApp
                </Button>
                <Button 
                  onClick={handleEmailInquiry}
                  style={{
                    width: '100%',
                    background: '#EA4335',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#C5221F';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#EA4335';
                  }}
                >
                  <FaEnvelope />
                  Send via Email
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default InquiryBasket;
