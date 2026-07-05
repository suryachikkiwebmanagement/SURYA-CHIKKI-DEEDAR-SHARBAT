import React, { useState } from 'react';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WhatsAppInquiryModal from './WhatsAppInquiryModal.jsx';

const ProductCard = ({ product, category }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Card 
        className={'product-card-' + product.id}
        style={{
          border: 'none',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
          transition: 'all 0.4s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-12px)';
          e.currentTarget.style.boxShadow = '0 25px 60px rgba(220,20,60,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        }}
      >
        <Link to={'/' + category + '/' + product.id}>
          <div style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <Card.Img 
              variant="top" 
              src={product.image} 
              style={{ height: '220px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            />
            {product.isSpecial && (
              <Badge style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#DC143C',
                padding: '8px 18px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>
                ⭐ Bestseller
              </Badge>
            )}
          </div>
        </Link>

        <Card.Body style={{ 
          padding: '20px 20px 15px 20px',
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Link to={'/' + category + '/' + product.id} style={{ textDecoration: 'none' }}>
            <div className="d-flex justify-content-between align-items-start">
              <Card.Title style={{ 
                fontWeight: '700', 
                color: '#1a1a2e', 
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'color 0.3s',
                marginBottom: '5px'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#DC143C';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#1a1a2e';
              }}>
                {product.name}
              </Card.Title>
              <div className="text-warning d-flex align-items-center" style={{ flexShrink: 0 }}>
                <FaStar className="me-1" style={{ fontSize: '0.85rem' }} />
                <span style={{ color: '#1a1a2e', fontWeight: '600', fontSize: '0.85rem' }}>{product.rating}</span>
              </div>
            </div>
            <p style={{ color: '#777', fontSize: '0.8rem', marginTop: '2px', marginBottom: '5px' }}>{product.category}</p>
            <p style={{ color: '#777', fontSize: '0.85rem', marginBottom: '12px', lineHeight: '1.4' }}>
              {product.description}
            </p>
          </Link>
          
          <div style={{ 
            display: 'flex', 
            gap: '8px', 
            marginTop: 'auto',
            paddingTop: '10px',
            borderTop: '1px solid #f0e6e6'
          }}>
            <Button 
              onClick={handleOpenModal}
              style={{
                flex: 1,
                borderRadius: '50px',
                padding: '10px 15px',
                fontWeight: '600',
                fontSize: '0.85rem',
                background: '#cf2f1a',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              
              onMouseEnter={(e) => {
                e.target.style.background = '#cf2f1a';
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 8px 25px rgb(122, 7, 7)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#cf2f1a';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              
              Inquiry Now
            </Button>
          </div>
        </Card.Body>
      </Card>

      <WhatsAppInquiryModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        product={product} 
      />
    </>
  );
};

export default ProductCard;
