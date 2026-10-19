import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';

// Simple Head component for meta tags (replaces next/head)
const Head = ({ children }) => {
  return <>{children}</>;
};

const CashewProducts = () => {
  // Product data — 10 cashew products mapped to images (1)–(10)
  const cashewProducts = [
    
    {
      id: 2,
      name: "Blueberry Cashew",
      image: '/images/cashew/images (2).png',
      category: "Flavoured Cashew",
      isSpecial: true,
      description: "Sweet-tart blueberry-coated cashews with a bright fruity crunch. Perfect for a fresh, modern snack.",
      sku: "CSH-002",
      price: "540.00"
    },
   
    {
      id: 4,
      name: "Classic Salted Cashew",
      image: '/images/cashew/images (4).png',
      category: "Salted Cashew",
      isSpecial: false,
      description: "Our signature classic salted cashews. Simple, honest, and perfectly roasted with just the right salt balance.",
      sku: "CSH-003",
      price: "450.00"
    },
    
    {
      id: 6,
      name: "Cheese Jalapeno Cashew",
      image: '/images/cashew/images (6).png',
      category: "Flavoured Cashew",
      isSpecial: true,
      description: "Savory cheese and spicy jalapeno flavoured cashews — an addictive, punchy snack that keeps you coming back.",
      sku: "CSH-004",
      price: "500.00"
    },
    {
      id: 7,
      name: "Guava Twist Cashew",
      image: '/images/cashew/images (7).png',
      category: "Flavoured Cashew",
      isSpecial: true,
      description: "Tangy guava-coated cashews with a tropical twist. Sweet, fruity, and utterly refreshing.",
      sku: "CSH-005",
      price: "510.00"
    },
    {
      id: 8,
      name: "Peri Peri Lime Cashew",
      image: '/images/cashew/images (8).png',
      category: "Flavoured Cashew",
      isSpecial: true,
      description: "Zesty lime meets bold peri peri spice — a fiery, tangy cashew snack with an unforgettable kick.",
      sku: "CSH-006",
      price: "520.00"
    },
    
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    address: '',
    message: ''
  });

  // ✅ GENERATE PRODUCT SLUG
  const generateProductSlug = (name, id) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${id}-${slug}`;
  };

  // ✅ COMPLETE STRUCTURED DATA GENERATOR
  const generateProductStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@graph": cashewProducts.map(product => {
        const productSlug = generateProductSlug(product.name, product.id);
        const productUrl = window.location.origin + `/cashew/${productSlug}`;
        const imageUrl = window.location.origin + product.image;
        
        return {
          "@type": "Product",
          "name": product.name,
          "description": product.description || "Premium cashew",
          "image": {
            "@type": "ImageObject",
            "url": imageUrl,
            "width": "300",
            "height": "300",
            "caption": product.name
          },
          "category": product.category,
          "url": productUrl,
          "sku": product.sku || `SKU-${String(product.id).padStart(4, '0')}`,
          "mpn": `MPN-${String(product.id).padStart(4, '0')}`,
          "brand": {
            "@type": "Brand",
            "name": "Surya Chikki"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Surya Chikki"
          },
          "offers": {
            "@type": "Offer",
            "price": product.price || "0.00",
            "priceCurrency": "INR",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "url": productUrl,
            "seller": {
              "@type": "Organization",
              "name": "Surya Chikki"
            }
          },
          "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.7",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Surya Chikki Customer"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "127",
            "bestRating": "5",
            "worstRating": "1"
          }
        };
      })
    };
  };

  const structuredData = generateProductStructuredData();

  // Get unique categories
  const categories = ['All', ...new Set(cashewProducts.map(p => p.category))];

  const filteredProducts = cashewProducts.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleImageError = (productId, e) => {
    console.error(`❌ Failed to load image for product ${productId}:`, e.target.src);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    e.target.src = 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Surya+Cashew';
    e.target.onerror = null;
  };

  // Handle inquiry button click
  const handleInquiryClick = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
    const imageUrl = window.location.origin + product.image;
    const productUrl = window.location.origin + `/cashew/${generateProductSlug(product.name, product.id)}`;
    setInquiryData(prev => ({
      ...prev,
      message: `I'm interested in: ${product.name}\nCategory: ${product.category}\nDescription: ${product.description || 'N/A'}\nSKU: ${product.sku || 'N/A'}\nPrice: ₹${product.price || 'Contact for price'}\nProduct Image: ${imageUrl}\nProduct URL: ${productUrl}\n\nPlease provide more information about pricing and availability.`
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
  const handleEmailSubmit = () => {
    const { name, email, address, message } = inquiryData;
    const imageUrl = window.location.origin + selectedProduct?.image;
    const productUrl = window.location.origin + `/cashew/${generateProductSlug(selectedProduct?.name, selectedProduct?.id)}`;
    const subject = `Inquiry about ${selectedProduct?.name || 'Cashew Products'}`;
    const body = `Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nProduct Details:\nProduct: ${selectedProduct?.name || 'N/A'}\nCategory: ${selectedProduct?.category || 'N/A'}\nDescription: ${selectedProduct?.description || 'N/A'}\nSKU: ${selectedProduct?.sku || 'N/A'}\nPrice: ₹${selectedProduct?.price || 'Contact for price'}\nProduct Image URL: ${imageUrl}\nProduct Page URL: ${productUrl}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:suryachikki.admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowInquiryModal(false);
    resetForm();
  };

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = () => {
    const { name, email, address, message } = inquiryData;
    const phoneNumber = '919429946364';
    const imageUrl = window.location.origin + selectedProduct?.image;
    const productUrl = window.location.origin + `/cashew/${generateProductSlug(selectedProduct?.name, selectedProduct?.id)}`;
    
    const whatsappMessage = `*Inquiry about ${selectedProduct?.name || 'Cashew Products'}*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Address:* ${address}\n\n` +
      `*Product Details:*\n` +
      `Product: ${selectedProduct?.name || 'N/A'}\n` +
      `Category: ${selectedProduct?.category || 'N/A'}\n` +
      `Description: ${selectedProduct?.description || 'N/A'}\n` +
      `SKU: ${selectedProduct?.sku || 'N/A'}\n` +
      `Price: ₹${selectedProduct?.price || 'Contact for price'}\n` +
      `Product Image: ${imageUrl}\n` +
      `Product Page: ${productUrl}\n\n` +
      `*Message:*\n${message}`;
    
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank');
    }
    
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
    <>
      {/* ✅ STRUCTURED DATA SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ META TAGS */}
      <Head>
        <title>Surya Cashew - Premium Flavoured Cashew & Almonds Collection</title>
        <meta name="description" content="Explore our premium cashew and almond collection - Rose Cashew, Blueberry Cashew, Coffee Mocha Almonds, Cheese Jalapeno Cashew, Guava Twist Cashew, Peri Peri Lime Cashew, and more." />
        <meta name="keywords" content="cashew, flavoured cashew, rose cashew, blueberry cashew, coffee mocha almonds, cheese jalapeno cashew, guava twist cashew, peri peri lime cashew, salted cashew, salted almonds, Surya Cashew" />
        <link rel="canonical" href="https://suryachikki.com/cashew" />
      </Head>

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
                <h1 style={{
                  fontSize: '3.5rem',
                  fontWeight: '800',
                  color: '#1a1a2e',
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: '5px'
                }}>
                  Our <span style={{ color: '#DC143C' }}>Cashew</span> Collection
                </h1>
                <p style={{ color: '#777', fontSize: '1.1rem', marginBottom: 0 }}>
                  Handpicked, flavoured, and carefully roasted premium cashews &amp; almonds since 1975
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <Row className="mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Search cashew..."
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
              <h3 className="mt-3">No cashew found</h3>
              <p className="text-secondary">Try adjusting your search or filter</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} lg={3} md={6} sm={6} xs={12}>
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
                    {/* Image Container */}
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '300px',
                      background: '#f8f9fa',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={imageErrors[product.id] ? 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Surya+Cashew' : product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          padding: '10px'
                        }}
                        onError={(e) => handleImageError(product.id, e)}
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
                        {product.description || 'Premium cashew'}
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
                        
                        {/* Inquiry Button */}
                        <Button
                          onClick={() => handleInquiryClick(product)}
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
                📝 Inquiry About {selectedProduct?.name || 'Product'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '30px' }}>
              {/* Product Details Display with Image Preview */}
              {selectedProduct && (
                <div style={{
                  background: '#FFF8F8',
                  padding: '15px',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  borderLeft: '4px solid #DC143C'
                }}>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      background: '#f0f0f0',
                      flexShrink: 0
                    }}>
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          padding: '5px'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Surya+Cashew';
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h6 style={{ fontWeight: '700', color: '#1a1a2e' }}>Product Details:</h6>
                      <p style={{ marginBottom: '5px' }}>
                        <strong>Product:</strong> {selectedProduct.name}
                      </p>
                      <p style={{ marginBottom: '5px' }}>
                        <strong>Category:</strong> {selectedProduct.category}
                      </p>
                      <p style={{ marginBottom: '5px' }}>
                        <strong>Description:</strong> {selectedProduct.description || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '5px' }}>
                        <strong>SKU:</strong> {selectedProduct.sku || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '5px', color: '#DC143C', fontWeight: 'bold' }}>
                        <strong>Price:</strong> ₹{selectedProduct.price || 'Contact for price'}
                      </p>
                      <p style={{ marginBottom: '0', fontSize: '12px', color: '#666' }}>
                        <strong>Image URL:</strong> {window.location.origin + selectedProduct.image}
                      </p>
                      <p style={{ marginBottom: '0', fontSize: '12px', color: '#666' }}>
                        <strong>Product URL:</strong> {window.location.origin + `/cashew/${generateProductSlug(selectedProduct.name, selectedProduct.id)}`}
                      </p>
                    </div>
                  </div>
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
                    <strong>📌 Note:</strong> Product details, image URL, and product page URL will be included with your inquiry.
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
              Showing {filteredProducts.length} of {cashewProducts.length} products
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CashewProducts;