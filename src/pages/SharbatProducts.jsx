import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';
import logo2 from '../assets/images/logo2.png';

// ============================================
// SHARBAT PRODUCT DATA (Embedded)
// ============================================
const sharbatProducts = [
  {
    id: 1,
    name: "Orange Sharbat",
    image: '/images/sharbat/images(18).jpeg',
    category: "Orange",
    isSpecial: true,
    description: "Refreshing orange sharbat with natural flavors"
  },
  {
    id: 2,
    name: "Mango Sharbat",
    image: '/images/sharbat/images(19).jpeg',
    category: "Mango",
    isSpecial: false,
    description: "Authentic mango sharbat made from real mangoes"
  },
  {
    id: 3,
    name: "Varyali Sharbat",
    image: '/images/sharbat/images(20).jpeg',
    category: "Varyali",
    isSpecial: true,
    description: "Traditional Varyali sharbat with unique taste"
  },
  {
    id: 4,
    name: "Nimbu Sharbat",
    image: '/images/sharbat/images(21).jpeg',
    category: "Nimbu",
    isSpecial: false,
    description: "Tangy lemon sharbat perfect for summer"
  },
  {
    id: 5,
    name: "Shabi Rose Sharbat",
    image: '/images/sharbat/images(22).jpeg',
    category: "Rose",
    isSpecial: false,
    description: "Fragrant rose sharbat with a delightful aroma"
  },
  {
    id: 6,
    name: "Deedar Special Sharbat",
    image: '/images/sharbat/images(23).jpeg',
    category: "Special",
    isSpecial: true,
    description: "Deedar's special recipe sharbat"
  },
  {
    id: 7,
    name: "Pineapple Sharbat",
    image: '/images/sharbat/images(24).jpeg',
    category: "Pineapple",
    isSpecial: false,
    description: "Sweet and tangy pineapple sharbat"
  },
];
// ============================================
// PRODUCT CARD COMPONENT (Fixed Image Display)
// ============================================
const ProductCard = ({ product, onInquiryClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div style={{
      background: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
    }}>
      {/* Image Container - Fixed */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '300px', // Fixed height instead of padding-top trick
        background: '#f8f9fa',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={imageError ? 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Sharbat' : product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // Changed from 'cover' to 'contain' to show full image
            objectPosition: 'center',
            padding: '10px' // Add some padding for breathing room
          }}
          onError={() => {
            console.error(`Failed to load image for: ${product.name} - ${product.image}`);
            setImageError(true);
          }}
        />
        
        {/* Special Badge */}
        {product.isSpecial && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: '#DC143C',
            color: 'white',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(220,20,60,0.3)'
          }}>
            ⭐ Special
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h5 style={{
          fontWeight: '700',
          marginBottom: '5px',
          color: '#1a1a2e',
          fontSize: '1rem'
        }}>
          {product.name}
        </h5>
        <p style={{
          color: '#777',
          fontSize: '0.85rem',
          marginBottom: '10px',
          minHeight: '40px'
        }}>
          {product.description || 'Delicious sharbat'}
        </p>
        <div style={{ marginTop: 'auto' }}>
          <Badge
            style={{
              background: '#f0e6e6',
              color: '#DC143C',
              padding: '5px 15px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              marginBottom: '10px',
              display: 'inline-block'
            }}
          >
            {product.category}
          </Badge>
          
          {/* Inquiry Button - On each product */}
          <Button
            onClick={() => onInquiryClick(product)}
            style={{
              background: '#DC143C',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '13px',
              width: '100%',
              marginTop: '10px',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 4px 12px rgba(220,20,60,0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span>📞</span> Inquiry Now
          </Button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN SHARBAT PRODUCTS COMPONENT
// ============================================
const SharbatProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    address: '',
    message: ''
  });
  
  const categories = ['All', ...new Set(sharbatProducts.map(p => p.category))];

  const filteredProducts = sharbatProducts.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  // Handle inquiry button click from product card
  const handleInquiryClick = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
    // Pre-fill message with product details
    setInquiryData(prev => ({
      ...prev,
      message: `I'm interested in: ${product.name}\nCategory: ${product.category}\nDescription: ${product.description || 'N/A'}\n\nPlease provide more information about pricing and availability.`
    }));
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const { name, email, address, message } = inquiryData;
    const subject = `Inquiry about ${selectedProduct?.name || 'Sharbat Products'}`;
    const body = `Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nProduct Details:\nProduct: ${selectedProduct?.name || 'N/A'}\nCategory: ${selectedProduct?.category || 'N/A'}\nDescription: ${selectedProduct?.description || 'N/A'}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:suryachikki.admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowInquiryModal(false);
    resetForm();
  };

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, email, address, message } = inquiryData;
    const phoneNumber = '+91 9429946364'; // Replace with actual phone number
    
    const whatsappMessage = `*Inquiry about ${selectedProduct?.name || 'Sharbat Products'}*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Address:* ${address}\n\n` +
      `*Product Details:*\n` +
      `Product: ${selectedProduct?.name || 'N/A'}\n` +
      `Category: ${selectedProduct?.category || 'N/A'}\n` +
      `Description: ${selectedProduct?.description || 'N/A'}\n\n` +
      `*Message:*\n${message}`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    setShowInquiryModal(false);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setInquiryData({
      name: '',
      email: '',
      address: '',
      message: ''
    });
    setSelectedProduct(null);
  };

  return (
    <section style={{
      padding: '80px 0',
      background: '#FFF8F8',
      minHeight: '100vh'
    }}>
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '15px'
              }}>
                <img 
                  src={logo2} 
                  alt="Deedar Sharbat Logo" 
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    console.error('Logo failed to load');
                    e.target.src = 'https://via.placeholder.com/60x60/DC143C/FFFFFF?text=D';
                  }}
                />
              </div>
              
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                color: '#1a1a2e',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '5px'
              }}>
                Our <span style={{ color: '#DC143C' }}>Sharbat</span> Collection
              </h1>
              <p style={{ color: '#777', fontSize: '1.1rem', marginBottom: 0 }}>
                Premium quality sharbats with natural and authentic ingredients
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Search sharbat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: '50px',
                padding: '12px 20px',
                border: '2px solid #f0e6e6'
              }}
            />
          </Col>
          <Col md={8}>
            <div className="d-flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'danger' : 'outline-danger'}
                  style={{
                    borderRadius: '50px',
                    padding: '8px 25px',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </Col>
        </Row>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: '4rem' }}>😢</div>
            <h3 className="mt-3">No sharbat found</h3>
            <p className="text-secondary">Try adjusting your search or filter</p>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product) => (
              <Col key={product.id} lg={3} md={6} sm={6} xs={12}>
                <ProductCard 
                  product={product} 
                  onInquiryClick={handleInquiryClick}
                />
              </Col>
            ))}
          </Row>
        )}

        {/* Inquiry Modal */}
        <Modal
          show={showInquiryModal}
          onHide={() => {
            setShowInquiryModal(false);
            resetForm();
          }}
          size="lg"
          centered
        >
          <Modal.Header closeButton style={{ borderBottom: '2px solid #f0e6e6' }}>
            <Modal.Title style={{ color: '#DC143C', fontWeight: '700' }}>
              📝 Inquiry About {selectedProduct?.name || 'Sharbat Product'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '30px' }}>
            {/* Product Details Display */}
            {selectedProduct && (
              <div style={{
                background: '#FFF8F8',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px',
                borderLeft: '4px solid #DC143C'
              }}>
                <h6 style={{ fontWeight: '700', color: '#1a1a2e' }}>Product Details:</h6>
                <p style={{ marginBottom: '5px' }}>
                  <strong>Product:</strong> {selectedProduct.name}
                </p>
                <p style={{ marginBottom: '5px' }}>
                  <strong>Category:</strong> {selectedProduct.category}
                </p>
                <p style={{ marginBottom: '0' }}>
                  <strong>Description:</strong> {selectedProduct.description || 'N/A'}
                </p>
              </div>
            )}

            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600' }}>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={inquiryData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      style={{ borderRadius: '10px', padding: '12px' }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600' }}>Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={inquiryData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                      style={{ borderRadius: '10px', padding: '12px' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600' }}>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={inquiryData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  style={{ borderRadius: '10px', padding: '12px' }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: '600' }}>Message *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  name="message"
                  value={inquiryData.message}
                  onChange={handleInputChange}
                  placeholder="Write your message here..."
                  required
                  style={{ borderRadius: '10px', padding: '12px' }}
                />
              </Form.Group>

              <div style={{
                background: '#f8f9fa',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <p style={{ marginBottom: '0', fontSize: '14px', color: '#666' }}>
                  <strong>📌 Note:</strong> Your inquiry will be sent with product details automatically included.
                </p>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <Button
                  onClick={handleEmailSubmit}
                  style={{
                    background: '#DC143C',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    flex: 1,
                    minWidth: '150px'
                  }}
                  disabled={!inquiryData.name || !inquiryData.email || !inquiryData.message}
                >
                  ✉️ Send via Email
                </Button>
                <Button
                  onClick={handleWhatsAppSubmit}
                  style={{
                    background: '#25D366',
                    border: 'none',
                    padding: '12px 30px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    flex: 1,
                    minWidth: '150px'
                  }}
                  disabled={!inquiryData.name || !inquiryData.email || !inquiryData.message}
                >
                  💬 Send via WhatsApp
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => {
                    setShowInquiryModal(false);
                    resetForm();
                  }}
                  style={{
                    borderRadius: '50px',
                    padding: '12px 30px',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Footer */}
        <div className="text-center mt-5">
          <p style={{ color: '#777' }}>
            Showing {filteredProducts.length} of {sharbatProducts.length} products
          </p>
        </div>
      </Container>
    </section>
  );
};

export default SharbatProducts;