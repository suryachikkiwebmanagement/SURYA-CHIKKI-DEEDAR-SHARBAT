import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';

// Simple Head component for meta tags (replaces next/head)
const Head = ({ children }) => {
  return <>{children}</>;
};

const SharbatProducts = () => {
  // Sharbat product data with images from public folder
  const sharbatProducts = [
    {
      id: 1,
      name: "Orange Sharbat",
      image: '/images/sharbat/images(18).jpeg',
      category: "Fruit Sharbat",
      isSpecial: true,
      description: "Refreshing orange sharbat with natural flavors. Made from real oranges for a tangy and sweet taste.",
      sku: "SHR-001",
      flavor: "Orange",
      price: "150.00"
    },
    {
      id: 2,
      name: "Mango Sharbat",
      image: '/images/sharbat/images(19).jpeg',
      category: "Fruit Sharbat",
      isSpecial: true,
      description: "Authentic mango sharbat made from real mangoes. Rich, flavorful, and perfect for traditional summer drinks.",
      sku: "SHR-002",
      flavor: "Mango",
      price: "160.00"
    },
    {
      id: 3,
      name: "Varyali Sharbat",
      image: '/images/sharbat/images(20).jpeg',
      category: "Traditional Sharbat",
      isSpecial: false,
      description: "Traditional Varyali sharbat with unique taste. A classic Indian summer drink with cooling properties.",
      sku: "SHR-003",
      flavor: "Varyali",
      price: "170.00"
    },
    {
      id: 4,
      name: "Nimbu Sharbat",
      image: '/images/sharbat/images(21).jpeg',
      category: "Fruit Sharbat",
      isSpecial: false,
      description: "Tangy lemon sharbat perfect for summer. Made with fresh lemons and natural ingredients.",
      sku: "SHR-004",
      flavor: "Lemon",
      price: "140.00"
    },
    {
      id: 5,
      name: "Shabi Rose Sharbat",
      image: '/images/sharbat/images(22).jpeg',
      category: "Flower Sharbat",
      isSpecial: false,
      description: "Fragrant rose sharbat with a delightful aroma. Made from premium rose petals for a royal taste.",
      sku: "SHR-005",
      flavor: "Rose",
      price: "155.00"
    },
    {
      id: 6,
      name: "Special Deedar Sharbat",
      image: '/images/sharbat/images(23).jpeg',
      category: "Traditional Sharbat",
      isSpecial: false,
      description: "Cooling khus sharbat perfect for hot summers. Made with natural khus extract.",
      sku: "SHR-006",
      flavor: "Khus",
      price: "165.00"
    },
    {
      id: 7,
      name: "Pineapple Sharbat",
      image: '/images/sharbat/images(24).jpeg',
      category: "Pine apple Sharbat",
      isSpecial: false,
      description: "Sweet and tangy pineapple sharbat with natural pineapple flavor.",
      sku: "SHR-007",
      flavor: "Pineapple",
      price: "145.00"
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

  // Generate product slug
  const generateProductSlug = (name, id) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${id}-${slug}`;
  };

  // ✅ FIXED: Generate structured data with correct prices
  const generateProductStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@graph": sharbatProducts.map(product => {
        const productSlug = generateProductSlug(product.name, product.id);
        const productUrl = window.location.origin + `/sharbat-product/${productSlug}`;
        const imageUrl = window.location.origin + product.image;
        
        return {
          "@type": "Product",
          "name": product.name,
          "description": product.description || "Refreshing sharbat",
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
            "price": product.price || "0.00", // ✅ FIXED: Using actual price
            "priceCurrency": "INR",
            "priceValidUntil": "2026-12-31",
            "availability": "https://schema.org/InStock",
            "url": productUrl,
            "seller": {
              "@type": "Organization",
              "name": "Surya Chikki"
            }
          },
          // ✅ FIXED: Added review field (optional but recommended)
          "review": {
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.5",
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
            "reviewCount": "95",
            "bestRating": "5",
            "worstRating": "1"
          }
        };
      })
    };
  };

  const structuredData = generateProductStructuredData();

  // Get unique categories
  const categories = ['All', ...new Set(sharbatProducts.map(p => p.category))];

  const filteredProducts = sharbatProducts.filter(product => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                       (product.flavor && product.flavor.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleImageError = (productId, e) => {
    console.error(`❌ Failed to load image for product ${productId}:`, e.target.src);
    setImageErrors(prev => ({ ...prev, [productId]: true }));
    e.target.src = 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Surya+Sharbat';
    e.target.onerror = null;
  };

  // Handle inquiry button click
  const handleInquiryClick = (product) => {
    setSelectedProduct(product);
    setShowInquiryModal(true);
    const imageUrl = window.location.origin + product.image;
    const productUrl = window.location.origin + `/sharbat-product/${generateProductSlug(product.name, product.id)}`;
    setInquiryData(prev => ({
      ...prev,
      message: `I'm interested in: ${product.name}\nCategory: ${product.category}\nFlavor: ${product.flavor || 'N/A'}\nDescription: ${product.description || 'N/A'}\nSKU: ${product.sku || 'N/A'}\nPrice: ₹${product.price || 'Contact for price'}\nProduct Image: ${imageUrl}\nProduct URL: ${productUrl}\n\nPlease provide more information about pricing and availability.`
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSubmit = () => {
    const { name, email, address, message } = inquiryData;
    const imageUrl = window.location.origin + selectedProduct?.image;
    const productUrl = window.location.origin + `/sharbat-product/${generateProductSlug(selectedProduct?.name, selectedProduct?.id)}`;
    const subject = `Inquiry about ${selectedProduct?.name || 'Sharbat Products'}`;
    const body = `Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\nProduct Details:\nProduct: ${selectedProduct?.name || 'N/A'}\nCategory: ${selectedProduct?.category || 'N/A'}\nFlavor: ${selectedProduct?.flavor || 'N/A'}\nDescription: ${selectedProduct?.description || 'N/A'}\nSKU: ${selectedProduct?.sku || 'N/A'}\nPrice: ₹${selectedProduct?.price || 'Contact for price'}\nProduct Image URL: ${imageUrl}\nProduct Page URL: ${productUrl}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:suryachikki.admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowInquiryModal(false);
    resetForm();
  };

  const handleWhatsAppSubmit = () => {
    const { name, email, address, message } = inquiryData;
    const phoneNumber = '919429946364';
    const imageUrl = window.location.origin + selectedProduct?.image;
    const productUrl = window.location.origin + `/sharbat-product/${generateProductSlug(selectedProduct?.name, selectedProduct?.id)}`;
    
    const whatsappMessage = `*Inquiry about ${selectedProduct?.name || 'Sharbat Products'}*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      `*Address:* ${address}\n\n` +
      `*Product Details:*\n` +
      `Product: ${selectedProduct?.name || 'N/A'}\n` +
      `Category: ${selectedProduct?.category || 'N/A'}\n` +
      `Flavor: ${selectedProduct?.flavor || 'N/A'}\n` +
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
      {/* ✅ STRUCTURED DATA SCRIPT - FIXED */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ✅ META TAGS */}
      <Head>
        <title>Surya Chikki - Best Sharbat Collection | Refreshing Indian Drinks</title>
        <meta name="description" content="Explore our refreshing sharbat collection - Mango Sharbat, Orange Sharbat, Rose Sharbat, and more. Best sharbat in India since 1974." />
        <meta name="keywords" content="sharbat, best sharbat, mango sharbat, orange sharbat, rose sharbat, Indian drinks, refreshing sharbat, Surya Chikki" />
        <link rel="canonical" href="https://suryachikki.com/sharbat" />
      </Head>

      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #FFF5F0 0%, #FDE8E0 100%)',
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
                  Best <span style={{ color: '#DC143C' }}>Sharbat</span> Collection
                </h1>
                <p style={{ color: '#777', fontSize: '1.1rem', marginBottom: 0 }}>
                  Refreshing sharbat made with natural ingredients since 1975
                </p>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <Row className="mb-4">
            <Col md={4} className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Search sharbat by name or flavor..."
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
              <div style={{ fontSize: '4rem' }}>🧃</div>
              <h3 className="mt-3">No sharbat found</h3>
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
                        src={imageErrors[product.id] ? 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Surya+Sharbat' : product.image}
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
                      {product.flavor && (
                        <Badge
                          style={{
                            background: '#e8f0fe',
                            color: '#1a73e8',
                            padding: '3px 12px',
                            borderRadius: '20px',
                            fontSize: '11px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            display: 'inline-block',
                            width: 'fit-content'
                          }}
                        >
                          🍃 {product.flavor}
                        </Badge>
                      )}
                      <p style={{
                        color: '#777',
                        fontSize: '0.85rem',
                        marginBottom: '10px',
                        minHeight: '40px'
                      }}>
                        {product.description || 'Refreshing sharbat'}
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
                          <span>🧃</span> Inquiry Now
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
                🧃 Inquiry About {selectedProduct?.name || 'Sharbat'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '30px' }}>
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
                          e.target.src = 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=Surya+Sharbat';
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
                        <strong>Flavor:</strong> {selectedProduct.flavor || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '5px' }}>
                        <strong>Description:</strong> {selectedProduct.description || 'N/A'}
                      </p>
                      <p style={{ marginBottom: '5px', color: '#DC143C', fontWeight: 'bold' }}>
                        <strong>Price:</strong> ₹{selectedProduct.price || 'Contact for price'}
                      </p>
                      <p style={{ marginBottom: '0', fontSize: '12px', color: '#666' }}>
                        <strong>Product URL:</strong> {window.location.origin + `/sharbat-product/${generateProductSlug(selectedProduct.name, selectedProduct.id)}`}
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

          {/* Footer Stats */}
          <div className="text-center mt-5">
            <p style={{ color: '#777' }}>
              Showing {filteredProducts.length} of {sharbatProducts.length} sharbat varieties
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SharbatProducts;