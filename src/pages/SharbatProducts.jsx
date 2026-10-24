import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';

// ─── Static data hoisted ───
const SHARBAT_PRODUCTS = [
  {
    id: 1,
    name: 'Orange Sharbat',
    image: '/images/sharbat/images(18).webp',
    category: 'Fruit Sharbat',
    isSpecial: true,
    description: 'Refreshing orange sharbat with natural flavors. Made from real oranges for a tangy and sweet taste.',
    sku: 'SHR-001',
    flavor: 'Orange',
    price: '150.00'
  },
  {
    id: 2,
    name: 'Mango Sharbat',
    image: '/images/sharbat/images(19).webp',
    category: 'Fruit Sharbat',
    isSpecial: true,
    description: 'Authentic mango sharbat made from real mangoes. Rich, flavorful, and perfect for traditional summer drinks.',
    sku: 'SHR-002',
    flavor: 'Mango',
    price: '160.00'
  },
  {
    id: 3,
    name: 'Varyali Sharbat',
    image: '/images/sharbat/images(20).webp',
    category: 'Traditional Sharbat',
    isSpecial: false,
    description: 'Traditional Varyali sharbat with unique taste. A classic Indian summer drink with cooling properties.',
    sku: 'SHR-003',
    flavor: 'Varyali',
    price: '170.00'
  },
  {
    id: 4,
    name: 'Nimbu Sharbat',
    image: '/images/sharbat/images(21).webp',
    category: 'Fruit Sharbat',
    isSpecial: false,
    description: 'Tangy lemon sharbat perfect for summer. Made with fresh lemons and natural ingredients.',
    sku: 'SHR-004',
    flavor: 'Lemon',
    price: '140.00'
  },
  {
    id: 5,
    name: 'Shabi Rose Sharbat',
    image: '/images/sharbat/images(22).webp',
    category: 'Flower Sharbat',
    isSpecial: false,
    description: 'Fragrant rose sharbat with a delightful aroma. Made from premium rose petals for a royal taste.',
    sku: 'SHR-005',
    flavor: 'Rose',
    price: '155.00'
  },
  {
    id: 6,
    name: 'Special Deedar Sharbat',
    image: '/images/sharbat/images(23).webp',
    category: 'Traditional Sharbat',
    isSpecial: false,
    description: 'Cooling khus sharbat perfect for hot summers. Made with natural khus extract.',
    sku: 'SHR-006',
    flavor: 'Khus',
    price: '165.00'
  },
  {
    id: 7,
    name: 'Pineapple Sharbat',
    image: '/images/sharbat/images(24).webp',
    category: 'Pine apple Sharbat',
    isSpecial: false,
    description: 'Sweet and tangy pineapple sharbat with natural pineapple flavor.',
    sku: 'SHR-007',
    flavor: 'Pineapple',
    price: '145.00'
  }
];

const CATEGORIES = ['All', ...new Set(SHARBAT_PRODUCTS.map(p => p.category))];

const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect fill="#FFF8E1" width="300" height="300"/>
      <text x="150" y="150" font-family="Arial,sans-serif" font-size="18"
            fill="#C99400" text-anchor="middle" dominant-baseline="middle">
        Surya Sharbat
      </text>
    </svg>`
  );

const slugify = (name, id) =>
  `${id}-${String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const origin = () => (typeof window !== 'undefined' ? window.location.origin : '');

const SharbatProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', address: '', message: '' });

  // Structured data — built once
  const structuredData = useMemo(() => {
    const base = origin();
    return {
      '@context': 'https://schema.org',
      '@graph': SHARBAT_PRODUCTS.map(product => {
        const productUrl = `${base}/sharbat-product/${slugify(product.name, product.id)}`;
        const imageUrl = `${base}${product.image}`;
        return {
          '@type': 'Product',
          name: product.name,
          description: product.description || 'Refreshing sharbat',
          image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: '300',
            height: '300',
            caption: product.name
          },
          category: product.category,
          url: productUrl,
          sku: product.sku || `SKU-${String(product.id).padStart(4, '0')}`,
          mpn: `MPN-${String(product.id).padStart(4, '0')}`,
          brand: { '@type': 'Brand', name: 'Surya Chikki' },
          manufacturer: { '@type': 'Organization', name: 'Surya Chikki' },
          offers: {
            '@type': 'Offer',
            price: product.price || '0.00',
            priceCurrency: 'INR',
            priceValidUntil: '2026-12-31',
            availability: 'https://schema.org/InStock',
            url: productUrl,
            seller: { '@type': 'Organization', name: 'Surya Chikki' }
          },
          review: {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '4.5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Surya Chikki Customer' }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '95',
            bestRating: '5',
            worstRating: '1'
          }
        };
      })
    };
  }, []);

  // Filtering memoized — searches name, description, AND flavor
  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return SHARBAT_PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.flavor || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleImageError = (productId, e) => {
    e.target.src = FALLBACK_IMG;
    e.target.onerror = null;
    setImageErrors(prev => (prev[productId] ? prev : { ...prev, [productId]: true }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const buildUrls = (product) => {
    const base = origin();
    return {
      imageUrl: `${base}${product.image}`,
      productUrl: `${base}/sharbat-product/${slugify(product.name, product.id)}`
    };
  };

  const handleInquiryClick = (product) => {
    const { imageUrl, productUrl } = buildUrls(product);
    setSelectedProduct(product);
    setShowInquiryModal(true);
    setInquiryData({
      name: '',
      email: '',
      address: '',
      message:
        `I'm interested in: ${product.name}\n` +
        `Category: ${product.category}\n` +
        `Flavor: ${product.flavor || 'N/A'}\n` +
        `Description: ${product.description || 'N/A'}\n` +
        `SKU: ${product.sku || 'N/A'}\n` +
        `Price: ₹${product.price || 'Contact for price'}\n` +
        `Product Image: ${imageUrl}\n` +
        `Product URL: ${productUrl}\n\n` +
        `Please provide more information about pricing and availability.`
    });
  };

  const closeModal = () => {
    setShowInquiryModal(false);
    setSelectedProduct(null);
    setInquiryData({ name: '', email: '', address: '', message: '' });
  };

  const handleEmailSubmit = () => {
    if (!selectedProduct) return;
    const { name, email, address, message } = inquiryData;
    const { imageUrl, productUrl } = buildUrls(selectedProduct);
    const subject = `Inquiry about ${selectedProduct.name}`;
    const body =
      `Name: ${name}\nEmail: ${email}\nAddress: ${address}\n\n` +
      `Product Details:\nProduct: ${selectedProduct.name}\nCategory: ${selectedProduct.category}\n` +
      `Flavor: ${selectedProduct.flavor || 'N/A'}\nDescription: ${selectedProduct.description || 'N/A'}\n` +
      `SKU: ${selectedProduct.sku || 'N/A'}\n` +
      `Price: ₹${selectedProduct.price || 'Contact for price'}\n` +
      `Product Image URL: ${imageUrl}\nProduct Page URL: ${productUrl}\n\n` +
      `Message:\n${message}`;
    window.location.href = `mailto:suryachikki.admin@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeModal();
  };

  const handleWhatsAppSubmit = () => {
    if (!selectedProduct) return;
    const { name, email, address, message } = inquiryData;
    const { imageUrl, productUrl } = buildUrls(selectedProduct);
    const text =
      `*Inquiry about ${selectedProduct.name}*\n\n` +
      `*Name:* ${name}\n*Email:* ${email}\n*Address:* ${address}\n\n` +
      `*Product Details:*\nProduct: ${selectedProduct.name}\nCategory: ${selectedProduct.category}\n` +
      `Flavor: ${selectedProduct.flavor || 'N/A'}\nDescription: ${selectedProduct.description || 'N/A'}\n` +
      `SKU: ${selectedProduct.sku || 'N/A'}\n` +
      `Price: ₹${selectedProduct.price || 'Contact for price'}\n` +
      `Product Image: ${imageUrl}\nProduct Page: ${productUrl}\n\n` +
      `*Message:*\n${message}`;
    const waUrl = `https://wa.me/919429946364?text=${encodeURIComponent(text)}`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank');
    }
    closeModal();
  };

  const canSubmit = Boolean(inquiryData.name && inquiryData.email && inquiryData.message);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style>{CSS}</style>

      <section className="sh-shell">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="sh-h1">
              Best <span className="accent">Sharbat</span> Collection
            </h1>
            <p className="sh-lead">
              Refreshing sharbat made with natural ingredients since 1975
            </p>
          </div>

          {/* Search + Filter */}
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search sharbat by name or flavor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sh-search"
              />
            </Col>
            <Col md={8}>
              <div className="sh-filters">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`sh-chip ${selectedCategory === category ? 'on' : ''}`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>🧃</div>
              <h3 className="mt-3 sh-empty-h">No sharbat found</h3>
              <p className="sh-empty-p">Try adjusting your search or filter</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} lg={3} md={6} sm={6} xs={12}>
                  <div className="sh-card">
                    <div className="sh-img-wrap">
                      <img
                        src={imageErrors[product.id] ? FALLBACK_IMG : product.image}
                        alt={product.name}
                        className="sh-img"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => handleImageError(product.id, e)}
                      />
                      {product.isSpecial && (
                        <div className="sh-special">⭐ Special</div>
                      )}
                    </div>

                    <div className="sh-body">
                      <h5 className="sh-name">{product.name}</h5>
                      {product.flavor && (
                        <Badge className="sh-flavor">🍃 {product.flavor}</Badge>
                      )}
                      <p className="sh-desc">{product.description || 'Refreshing sharbat'}</p>
                      <div className="sh-foot">
                        <Badge className="sh-cat">{product.category}</Badge>
                        <Button
                          onClick={() => handleInquiryClick(product)}
                          className="sh-inquiry"
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

          {/* Footer */}
          <div className="text-center mt-5">
            <p className="sh-count">
              Showing {filteredProducts.length} of {SHARBAT_PRODUCTS.length} sharbat varieties
            </p>
          </div>

          {/* Inquiry Modal */}
          <Modal show={showInquiryModal} onHide={closeModal} size="lg" centered>
            <Modal.Header closeButton className="sh-modal-head">
              <Modal.Title className="sh-modal-title">
                🧃 Inquiry About {selectedProduct?.name || 'Sharbat'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="sh-modal-body">
              {selectedProduct && (
                <div className="sh-modal-product">
                  <div className="sh-modal-img">
                    <img
                      src={imageErrors[selectedProduct.id] ? FALLBACK_IMG : selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMG;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="sh-modal-details">
                    <h6 className="sh-modal-sub">Product Details:</h6>
                    <p><strong>Product:</strong> {selectedProduct.name}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Flavor:</strong> {selectedProduct.flavor || 'N/A'}</p>
                    <p><strong>Description:</strong> {selectedProduct.description || 'N/A'}</p>
                    <p className="sh-price"><strong>Price:</strong> ₹{selectedProduct.price || 'Contact for price'}</p>
                    <p className="sh-url"><strong>Product URL:</strong> {origin() + `/sharbat-product/${slugify(selectedProduct.name, selectedProduct.id)}`}</p>
                  </div>
                </div>
              )}

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="sh-label">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={inquiryData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="sh-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="sh-label">Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inquiryData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="sh-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="sh-label">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={inquiryData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="sh-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="sh-label">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="message"
                    value={inquiryData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    required
                    className="sh-input"
                  />
                </Form.Group>

                <div className="sh-note">
                  <p><strong>📌 Note:</strong> Product details, image URL, and product page URL will be included with your inquiry.</p>
                </div>

                <div className="sh-actions">
                  <Button onClick={handleEmailSubmit} className="sh-btn email" disabled={!canSubmit}>
                    ✉️ Send via Email
                  </Button>
                  <Button onClick={handleWhatsAppSubmit} className="sh-btn wa" disabled={!canSubmit}>
                    💬 Send via WhatsApp
                  </Button>
                  <Button variant="outline-secondary" onClick={closeModal} className="sh-btn cancel">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   CSS — light yellow theme, GPU-friendly hover, no gradients
   ═══════════════════════════════════════════════════════════ */
const CSS = `
  :root{
    --y:#F2B705; --y-dk:#C99400; --y-lt:#FFD966;
    --ink:#1a1600; --ink-soft:#2e2a1a;
    --mut:#6b6248; --line:rgba(120,100,20,.14);
    --cream:#FFFDF5; --cream-2:#FFF8E1;
  }

  .sh-shell{
    padding:80px 0;
    background:var(--cream);
    min-height:100vh;
    color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  }
  .accent{color:var(--y-dk);}

  .sh-h1{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(2.2rem,5vw,3.5rem);
    font-weight:800;
    color:var(--ink);
    line-height:1.1;
    margin-bottom:.5rem;
  }
  .sh-lead{color:var(--mut);font-size:1.05rem;margin:0;}

  /* Search */
  .sh-search{
    border-radius:50px !important;
    padding:12px 20px !important;
    border:2px solid var(--line) !important;
    background:#fff;
    font-size:.95rem;
  }
  .sh-search:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  /* Filter chips */
  .sh-filters{display:flex;flex-wrap:wrap;gap:8px;}
  .sh-chip{
    border-radius:50px !important;
    padding:8px 22px !important;
    font-weight:600 !important;
    font-size:.85rem !important;
    border:1.5px solid var(--y-dk) !important;
    background:transparent !important;
    color:var(--y-dk) !important;
    transition:background-color .15s ease,color .15s ease !important;
  }
  .sh-chip:hover{background:var(--cream-2) !important;}
  .sh-chip.on{
    background:var(--y) !important;
    color:var(--ink) !important;
    border-color:var(--y) !important;
  }

  /* Product card */
  .sh-card{
    background:#fff;
    border-radius:15px;
    overflow:hidden;
    border:1px solid var(--line);
    height:100%;
    display:flex;
    flex-direction:column;
    transition:transform .25s ease;
    will-change:transform;
  }
  .sh-card:hover{transform:translate3d(0,-4px,0);}

  .sh-img-wrap{
    position:relative;
    width:100%;
    height:270px;
    background:var(--cream-2);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .sh-img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    padding:10px;
  }

  .sh-special{
    position:absolute;
    top:10px;
    right:10px;
    background:var(--y);
    color:var(--ink);
    padding:5px 14px;
    border-radius:20px;
    font-size:12px;
    font-weight:700;
  }

  .sh-body{
    padding:16px;
    flex:1;
    display:flex;
    flex-direction:column;
  }
  .sh-name{
    font-weight:700;
    margin-bottom:8px;
    color:var(--ink);
    font-size:1rem;
  }

  /* Flavor badge — soft yellow tint, distinct from category */
  .sh-flavor{
    background:rgba(242,183,5,.15) !important;
    color:var(--y-dk) !important;
    padding:3px 11px !important;
    border-radius:20px !important;
    font-size:11px !important;
    font-weight:600 !important;
    display:inline-block;
    width:fit-content;
    margin-bottom:8px !important;
    border:1px solid rgba(242,183,5,.35);
  }

  .sh-desc{
    color:var(--mut);
    font-size:.85rem;
    margin-bottom:12px;
    min-height:40px;
    line-height:1.5;
  }
  .sh-foot{margin-top:auto;}

  .sh-cat{
    background:var(--cream-2) !important;
    color:var(--y-dk) !important;
    padding:5px 14px !important;
    border-radius:20px !important;
    font-size:11px !important;
    font-weight:600 !important;
    display:inline-block;
    border:1px solid var(--line);
  }

  .sh-inquiry{
    background:var(--y) !important;
    color:var(--ink) !important;
    border:none !important;
    padding:9px 15px !important;
    border-radius:50px !important;
    font-weight:600 !important;
    font-size:13px !important;
    width:100%;
    margin-top:12px;
    display:flex !important;
    align-items:center;
    justify-content:center;
    gap:8px;
    transition:background-color .15s ease !important;
  }
  .sh-inquiry:hover{background:var(--y-dk) !important;color:var(--ink) !important;}

  /* Empty state */
  .sh-empty-h{color:var(--ink);font-weight:700;}
  .sh-empty-p{color:var(--mut);}
  .sh-count{color:var(--mut);margin:0;}

  /* Modal */
  .sh-modal-head{border-bottom:2px solid var(--line) !important;}
  .sh-modal-title{color:var(--y-dk) !important;font-weight:700;}
  .sh-modal-body{padding:24px !important;}

  .sh-modal-product{
    background:var(--cream-2);
    padding:15px;
    border-radius:10px;
    margin-bottom:20px;
    border-left:4px solid var(--y);
    display:flex;
    gap:15px;
    align-items:flex-start;
  }
  .sh-modal-img{
    width:80px;height:80px;
    border-radius:8px;
    overflow:hidden;
    background:#fff;
    flex-shrink:0;
    border:1px solid var(--line);
  }
  .sh-modal-img img{
    width:100%;height:100%;
    object-fit:contain;padding:4px;
  }
  .sh-modal-details{flex:1;min-width:0;}
  .sh-modal-sub{font-weight:700;color:var(--ink);margin-bottom:6px;}
  .sh-modal-details p{margin-bottom:4px;font-size:.9rem;color:#4a4126;}
  .sh-price{color:var(--y-dk) !important;font-weight:700;}
  .sh-url{font-size:.72rem !important;color:var(--mut) !important;word-break:break-all;}

  .sh-label{font-weight:600;color:var(--ink);font-size:.9rem;}
  .sh-input{
    border-radius:10px !important;
    padding:10px 12px !important;
    border:1px solid var(--line) !important;
    font-size:.92rem;
  }
  .sh-input:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  .sh-note{
    background:var(--cream-2);
    padding:12px 15px;
    border-radius:10px;
    margin-bottom:20px;
    border:1px solid var(--line);
  }
  .sh-note p{margin:0;font-size:.85rem;color:var(--mut);}

  .sh-actions{display:flex;gap:12px;flex-wrap:wrap;}
  .sh-btn{
    border:none !important;
    padding:12px 28px !important;
    border-radius:50px !important;
    font-weight:600 !important;
    flex:1;
    min-width:150px;
    transition:background-color .15s ease !important;
    font-size:.9rem !important;
  }
  .sh-btn.email{background:var(--y) !important;color:var(--ink) !important;}
  .sh-btn.email:hover{background:var(--y-dk) !important;}
  .sh-btn.wa{background:#25D366 !important;color:#fff !important;}
  .sh-btn.wa:hover{background:#1EA952 !important;}
  .sh-btn.cancel{
    background:transparent !important;
    color:var(--mut) !important;
    border:1px solid var(--line) !important;
    flex:0 0 auto !important;
  }
  .sh-btn.cancel:hover{background:var(--cream-2) !important;color:var(--ink) !important;}

  .sh-btn:disabled{opacity:.5;cursor:not-allowed;}

  /* Responsive */
  @media (max-width:767px){
    .sh-shell{padding:50px 0;}
    .sh-img-wrap{height:220px;}
    .sh-actions{flex-direction:column;}
    .sh-btn{width:100%;flex:none !important;}
    .sh-modal-product{flex-direction:column;align-items:stretch;}
    .sh-modal-img{width:100%;height:120px;}
  }

  @media (prefers-reduced-motion:reduce){
    .sh-card,.sh-chip,.sh-inquiry,.sh-btn{transition:none !important;}
    .sh-card:hover{transform:none;}
  }
`;

export default SharbatProducts;