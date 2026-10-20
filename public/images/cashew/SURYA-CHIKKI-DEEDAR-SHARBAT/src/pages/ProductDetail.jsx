import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Badge, Card } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaWhatsapp, FaExpand } from 'react-icons/fa';
import { chikkiProducts } from '../data/chikkiProducts';
import { sharbatProducts } from '../data/sharbatProducts';
import WhatsAppInquiryModal from '../components/WhatsAppInquiryModal.jsx';

const ProductDetail = () => {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  useEffect(() => {
    let allProducts = [];
    if (category === 'chikki') {
      allProducts = chikkiProducts;
    } else if (category === 'sharbat') {
      allProducts = sharbatProducts;
    }

    const productId = parseInt(id);
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);

    if (foundProduct) {
      const related = allProducts.filter(p => 
        p.id !== foundProduct.id && p.category === foundProduct.category
      );
      setRelatedProducts(related.slice(0, 4));
    }
  }, [id, category]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  if (!product) {
    return (
      <section style={{
        padding: '80px 0',
        background: '#FFF8F8',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container className="text-center">
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '700' }}>
            Product Not Found
          </h2>
          <p style={{ color: '#777' }}>The product you're looking for doesn't exist.</p>
          <Link to={category === 'chikki' ? '/chikki' : '/sharbat'}>
            <Button 
              style={{
                background: '#DC143C',
                border: 'none',
                padding: '12px 40px',
                borderRadius: '50px',
                fontWeight: '600',
                marginTop: '20px'
              }}
            >
              Back to Products
            </Button>
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <>
      <section style={{
        padding: '40px 0',
        background: '#FFF8F8',
        minHeight: '100vh'
      }}>
        <Container>
          <Link to={category === 'chikki' ? '/chikki' : '/sharbat'}>
            <Button 
              variant="outline-danger" 
              style={{
                borderRadius: '50px',
                padding: '8px 20px',
                marginBottom: '30px',
                borderWidth: '2px'
              }}
            >
              <FaArrowLeft className="me-2" />
              Back to Products
            </Button>
          </Link>

          <Row>
            <Col lg={6} className="mb-4 mb-lg-0">
              <div style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                background: '#fff',
                cursor: 'pointer',
                height: '500px'
              }}
              onClick={() => setIsZoomed(!isZoomed)}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '20px',
                    transition: 'transform 0.3s ease',
                    transform: isZoomed ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  padding: '8px 15px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <FaExpand />
                  Click to Zoom
                </div>
              </div>
            </Col>

            <Col lg={6}>
              <Badge 
                bg="danger" 
                className="mb-3 px-4 py-2" 
                style={{ fontSize: '0.8rem' }}
              >
                {product.category}
              </Badge>
              
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1a1a2e',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '10px'
              }}>
                {product.name}
              </h1>

              <div className="d-flex align-items-center mb-3">
                <div className="text-warning me-2">
                  {'⭐'.repeat(Math.floor(product.rating))}
                </div>
                <span style={{ color: '#777' }}>({product.rating})</span>
              </div>

              <p style={{
                color: '#555',
                fontSize: '1.05rem',
                lineHeight: '1.8',
                marginBottom: '25px'
              }}>
                {product.description}
              </p>

              <div style={{
                background: '#f8f0f0',
                padding: '15px 20px',
                borderRadius: '12px',
                marginBottom: '25px'
              }}>
                <p style={{ margin: 0, color: '#555' }}>
                  <strong>Category:</strong> {product.category}
                </p>
                {product.isSpecial && (
                  <p style={{ margin: 0, color: '#DC143C', fontWeight: '600' }}>
                    ⭐ Bestseller
                  </p>
                )}
              </div>

              {/* Only Inquiry Now Button - Removed Add to Inquiry */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <Button 
                  onClick={handleOpenModal}
                  style={{
                    flex: 1,
                    borderRadius: '50px',
                    padding: '14px 25px',
                    fontWeight: '700',
                    fontSize: '1rem',
                    background: '#25D366',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    minWidth: '200px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#128C7E';
                    e.target.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = '#25D366';
                    e.target.style.transform = 'scale(1)';
                  }}
                >
                  <FaWhatsapp />
                  Inquiry Now
                </Button>
              </div>

              <div style={{
                marginTop: '30px',
                padding: '20px',
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #f0e6e6'
              }}>
                <h6 style={{ fontWeight: '700', color: '#1a1a2e', marginBottom: '10px' }}>
                  Product Details
                </h6>
                <ul style={{ color: '#555', paddingLeft: '20px', margin: 0 }}>
                  <li>Premium quality ingredients</li>
                  <li>Authentic traditional recipe</li>
                  <li>Freshly made with love</li>
                  <li>100% natural and pure</li>
                </ul>
              </div>
            </Col>
          </Row>

          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '60px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1a1a2e',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '30px',
                textAlign: 'center'
              }}>
                You May Also Like
              </h2>
              <Row className="g-4">
                {relatedProducts.map((relatedProduct) => (
                  <Col key={relatedProduct.id} lg={3} md={6}>
                    <Link 
                      to={'/' + category + '/' + relatedProduct.id}
                      style={{ textDecoration: 'none' }}
                    >
                      <Card style={{
                        border: 'none',
                        borderRadius: '15px',
                        overflow: 'hidden',
                        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                        transition: 'all 0.3s ease',
                        height: '100%',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
                      }}>
                        <Card.Img 
                          variant="top" 
                          src={relatedProduct.image} 
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <Card.Body style={{ padding: '20px' }}>
                          <Card.Title style={{ 
                            fontWeight: '700', 
                            color: '#1a1a2e', 
                            fontSize: '1rem',
                            marginBottom: '5px'
                          }}>
                            {relatedProduct.name}
                          </Card.Title>
                          <Badge style={{
                            background: '#f0e6e6',
                            color: '#DC143C'
                          }}>
                            {relatedProduct.category}
                          </Badge>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Container>
      </section>

      <WhatsAppInquiryModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        product={product} 
      />
    </>
  );
};

export default ProductDetail;
