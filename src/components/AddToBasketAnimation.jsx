import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const AddToBasketAnimation = ({ product, trigger }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (trigger) {
      const productElement = document.querySelector('.product-card-' + product.id);
      if (productElement) {
        const rect = productElement.getBoundingClientRect();
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
        setIsAnimating(true);
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }
    }
  }, [trigger, product.id]);

  if (!isAnimating) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: position.x - 25,
        top: position.y - 25,
        width: '50px',
        height: '50px',
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'flyToBasket 0.8s ease-in forwards',
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '50px',
          height: '50px',
          objectFit: 'cover',
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(220,20,60,0.4)',
          border: '3px solid #DC143C'
        }}
      />
    </div>,
    document.body
  );
};

export default AddToBasketAnimation;
