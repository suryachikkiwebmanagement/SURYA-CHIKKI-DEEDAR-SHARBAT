import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const WhatsAppInquiryModal = ({ show, handleClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = () => {
    const { name, phone, message } = formData;
    
    const imageUrl = window.location.origin + product.image;
    const phoneNumber = '919429946364'; // Your WhatsApp number
    
    const msg = "🛒 Product Inquiry - Surya Chikki" +
      "\n\n📦 Product Details:" +
      "\n📌 Product: " + product.name +
      "\n📂 Category: " + product.category +
      "\n🖼️ Image: " + imageUrl +
      "\n\n👤 Customer Details:" +
      "\nName: " + name +
      "\nPhone: " + phone +
      "\nEmail: " + formData.email +
      "\n\n💬 Message: " + (message || "No additional message") +
      "\n\nThank you for your interest in Surya Chikki!";

    const encoded = encodeURIComponent(msg);
    window.open('https://wa.me/' + phoneNumber + '?text=' + encoded, '_blank');
    handleClose();
  };

  const handleEmailSubmit = () => {
    const { name, phone, email, message } = formData;
    
    const imageUrl = window.location.origin + product.image;
    const emailAddress = 'suryachikki.admin@gmail.com'; // Your email address
    
    const subject = "Product Inquiry: " + product.name;
    const body = 
      "Product Inquiry - Surya Chikki\n\n" +
      "📦 Product Details:\n" +
      "Product: " + product.name + "\n" +
      "Category: " + product.category + "\n" +
      "Image URL: " + imageUrl + "\n\n" +
      "👤 Customer Details:\n" +
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Email: " + email + "\n\n" +
      "💬 Message: " + (message || "No additional message") + "\n\n" +
      "Thank you for your interest in Surya Chikki!";

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open('mailto:' + emailAddress + '?subject=' + encodedSubject + '&body=' + encodedBody, '_blank');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton style={{ 
        background: 'linear-gradient(135deg, #DC143C, #FF0000)',
        color: '#fff',
        borderBottom: 'none'
      }}>
        <Modal.Title>
          <FaWhatsapp style={{ marginRight: '10px' }} />
          Inquiry for {product?.name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body style={{ padding: '30px' }}>
        <div style={{
          background: '#f8f0f0',
          padding: '15px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '1px solid #f0e6e6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={product?.image} 
              alt={product?.name}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'cover',
                borderRadius: '10px',
                marginRight: '15px'
              }}
            />
            <div>
              <h6 style={{ fontWeight: '700', margin: 0 }}>{product?.name}</h6>
              <p style={{ margin: 0, color: '#777', fontSize: '0.85rem' }}>
                Category: {product?.category}
              </p>
            </div>
          </div>
        </div>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Full Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Phone Number *</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Email Address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontWeight: 'bold' }}>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              rows={3}
              placeholder="Any special requests or questions?"
              value={formData.message}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      
      <Modal.Footer style={{ borderTop: 'none', padding: '20px 30px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleEmailSubmit}
          style={{
            background: '#EA4335',
            border: 'none',
            padding: '10px 25px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '50px'
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
        <Button 
          onClick={handleWhatsAppSubmit}
          style={{
            background: '#25D366',
            border: 'none',
            padding: '10px 25px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderRadius: '50px'
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
      </Modal.Footer>
    </Modal>
  );
};

export default WhatsAppInquiryModal;
