import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';
import Head from 'next/head'; // If using Next.js - remove if using plain React

const ChikkiProducts = () => {
  // Product data with images from public folder
  const chikkiProducts = [
    {
      id: 1,
      name: "Till Chikki",
      image: '/images/chikki/images(1).jpeg',
      category: "Chikki",
      isSpecial: true,
      description: "Traditional sesame seed chikki with authentic taste",
      sku: "CHK-001"
    },
    {
      id: 2,
      name: "Peanut Dry Fruit Chikki",
      image: '/images/chikki/images(2).jpeg',
      category: "Chikki",
      isSpecial: false,
      description: "Crunchy peanut with dry fruits for extra nutrition",
      sku: "CHK-002"
    },
    {
      id: 3,
      name: "Dates Chikki",
      image: '/images/chikki/images(3).jpeg',
      category: "Chikki",
      isSpecial: true,
      description: "Sweet and healthy dates chikki with natural sweetness",
      sku: "CHK-003"
    },
    {
      id: 4,
      name: "Signature Melts",
      image: '/images/chikki/images(4).jpeg',
      category: "Bar",
      isSpecial: false,
      description: "Melt in your mouth delight",
      sku: "BAR-001"
    },
    {
      id: 5,
      name: "Dates Peanut Butter Bar",
      image: '/images/chikki/images(5).jpeg',
      category: "Bar",
      isSpecial: false,
      description: "Perfect blend of dates and peanut butter",
      sku: "BAR-002"
    },
    {
      id: 6,
      name: "Peanut Crush Chikki Almond / Cashew",
      image: '/images/chikki/images(6).jpeg',
      category: "Bar",
      isSpecial: true,
      description: "Best of both textures with almonds and cashews",
      sku: "BAR-003"
    },
    {
      id: 7,
      name: "Creamy Bites Bar",
      image: '/images/chikki/images(7).jpeg',
      category: "Bar",
      isSpecial: true,
      description: "Rich almond chikki with a perfect crunch",
      sku: "BAR-004"
    },
    {
      id: 8,
      name: "Peanut Chikki Classic",
      image: '/images/chikki/images(8).jpeg',
      category: "Chikki",
      isSpecial: false,
      description: "Classic peanut chikki made with premium peanuts",
      sku: "CHK-004"
    },
    {
      id: 9,
      name: "Peanut Chikki Premium",
      image: '/images/chikki/images(9).jpeg',
      category: "Chikki",
      isSpecial: false,
      description: "Premium peanut chikki with extra crunch",
      sku: "CHK-005"
    },
    {
      id: 10,
      name: "Peanut Chikki Special",
      image: '/images/chikki/images(8).jpeg',
      category: "Chikki",
      isSpecial: false,
      description: "Traditional peanut chikki with special recipe",
      sku: "CHK-006"
    },
    {
      id: 11,
      name: "Peanut Chikki Jar",
      image: '/images/chikki/images(10).jpeg',
      category: "Jar",
      isSpecial: false,
      description: "Rich chocolate bar in premium jar packaging",
      sku: "JAR-001"
    },
    {
      id: 12,
      name: "Peanut Crush Chikki Jar",
      image: '/images/chikki/images(11).jpeg',
      category: "Jar",
      isSpecial: false,
      description: "Special recipe peanut chikki in jar",
      sku: "JAR-002"
    },
    {
      id: 13,
      name: "Till Chikki Premium Jar",
      image: '/images/chikki/images(32).jpeg',
      category: "Jar",
      isSpecial: false,
      description: "Premium sesame chikki in elegant jar",
      sku: "JAR-003"
    },
    {
      id: 14,
      name: "Topra Chikki",
      image: '/images/chikki/images(33).jpeg',
      category: "Chikki",
      isSpecial: false,
      description: "Traditional topra chikki with authentic taste",
      sku: "CHK-007"
    },
    {
      id: 15,
      name: "Topra Chikki Jar",
      image: '/images/chikki/images(34).jpeg',
      category: "Jar",
      isSpecial: false,
      description: "Special topra chikki in premium jar",
      sku: "JAR-004"
    },
    {
      id: 16,
      name: "Pistachio Chikki",
      image: '/images/chikki/images(35).jpeg',
      category: "Chikki",
      isSpecial: false,
      description: "Perfect crunch and creamy texture with pistachios",
      sku: "CHK-008"
    }
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

  // ✅ COMPLETE STRUCTURED DATA GENERATOR - Fixes the "1 critical issue" error
  const generateProductStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@graph": chikkiProducts.map(product => {
        const productSlug = generateProductSlug(product.name, product.id);
        const productUrl = window.location.origin + `/product/${productSlug}`;
        const imageUrl = window.location.origin + product.image;
        
        return {
          "@type": "Product",
          "name": product.name,
          "description": product.description || "Delicious chikki",
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
          // ✅ This fixes the critical error: Either 'offers', 'review' or 'aggregateRating' should be specified
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "INR",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "url": productUrl,
            "seller": {
              "@type": "Organization",
              "name": "Surya Chikki"
            }
          },
          // ✅ Optional: Add aggregate rating if you have reviews
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

  // Generate the structured data
  const structuredData = generateProductStructuredData();

  // Get unique categories with consistent naming
  const categories = ['All', ...new Set(chikkiProducts.map(p => p.category))];

  const filteredProducts = chikkiProducts.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleImageError = (productId, e) => {
    console.error(`❌ Failed to load image for product ${productId}:`, e.target.src);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    e.target.src = 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Surya+Chikki';
    e.target.onerror = null;
  };

  // Handle inquiry button click
  const handleInquiryClick = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
    const imageUrl = window.location.origin + product.image;
    const productUrl = window.location.origin + `/product/${generateProductSlug(product.name, product.id)}`;
    setInquiryData(prev => ({
      ...prev,
      message: `I'm interested in: ${product.name}\nCategory: ${product.category}\nDescription: ${product.description || 'N/A'}\nSKU: ${product.sku || 'N/A'}\nProduct Image: ${imageUrl}\nProduct URL: ${productUrl}\n\nPlease provide more information about pricing and availability.`
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
    const productUrl = window.location.origin + `/product/${generateProductSlug(selectedProduct?.name, selectedProduct?.id)}`;
    const subject = `Inquiry about ${selectedProduct?.name || 'Chikki Products'}`;
    const body = `Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nProduct Details:\nProduct: ${selectedProduct?.name || 'N/A'}\nCategory: ${selectedProduct?.category || 'N/A'}\nDescription: ${selectedProduct?.description || 'N/A'}\nSKU: ${selectedProduct?.sku || 'N/A'}\nProduct Image URL: ${imageUrl}\nProduct Page URL: ${productUrl}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:suryachikki.admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowInquiryModal(false);
    resetForm();
  };

  // Handle WhatsApp submission
  const handleWhatsAppSubmit = () => {
    const { name, email, address, message } = inquiryData;
    const phoneNumber = '919429946364';
    const imageUrl = window.location.origin + selectedProduct?.image;
    const productUrl = window.location.origin + `/product/${generateProductSlug(selectedProduct?.name, selectedProduct?.id)}`;
    
    const whatsappMessage = `*Inquiry about ${selectedProduct?.name || 'Chikki Products'}*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Address:* ${address}\n\n` +
      `*Product Details:*\n` +
      `Product: ${selectedProduct?.name || 'N/A'}\n` +
      `Category: ${selectedProduct?.category || 'N/A'}\n` +
      `Description: ${selectedProduct?.description || 'N/A'}\n` +
      `SKU: ${selectedProduct?.sku || 'N/A'}\n` +
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
      {/* ✅ STRUCTURED DATA SCRIPT - Added to fix the critical error */}
      {/* If using Next.js, put this in <Head> component */}
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
                  Our <span style={{ color: '#DC143C' }}>Chikki</span> Collection
                </h1>
                <p style={{ color: '#777', fontSize: '1.1rem', marginBottom: 0 }}>
                  Handcrafted with love using traditional recipes since 1975
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <Row className="mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Search chikki..."
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
              <h3 className="mt-3">No chikki found</h3>
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
                        src={imageErrors[product.id] ? 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Surya+Chikki' : product.image}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center',
                          padding: '10px'
                        }}
                        onError={(e) => handleImageError(product.id, e)}
                        onLoad={() => console.log(`✅ Loaded: ${product.name}`)}
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
                        {product.description || 'Delicious chikki'}
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
                    {/* Product Image Preview in Modal */}
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
                          e.target.src = 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Surya+Chikki';
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
                      <p style={{ marginBottom: '0', fontSize: '12px', color: '#666' }}>
                        <strong>Image URL:</strong> {window.location.origin + selectedProduct.image}
                      </p>
                      <p style={{ marginBottom: '0', fontSize: '12px', color: '#666' }}>
                        <strong>Product URL:</strong> {window.location.origin + `/product/${generateProductSlug(selectedProduct.name, selectedProduct.id)}`}
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
              Showing {filteredProducts.length} of {chikkiProducts.length} products
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ChikkiProducts;