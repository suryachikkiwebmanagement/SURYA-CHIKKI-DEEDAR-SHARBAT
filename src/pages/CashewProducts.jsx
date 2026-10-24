import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';

// ─── Static data hoisted ───
const CASHEW_PRODUCTS = [
  {
    id: 2,
    name: 'Blueberry Cashew',
    image: '/images/cashew/images (2).webp',
    category: 'Flavoured Cashew',
    isSpecial: true,
    description: 'Sweet-tart blueberry-coated cashews with a bright fruity crunch. Perfect for a fresh, modern snack.',
    sku: 'CSH-002',
    price: '540.00'
  },
  {
    id: 4,
    name: 'Classic Salted Cashew',
    image: '/images/cashew/images (4).webp',
    category: 'Salted Cashew',
    isSpecial: false,
    description: 'Our signature classic salted cashews. Simple, honest, and perfectly roasted with just the right salt balance.',
    sku: 'CSH-003',
    price: '450.00'
  },
  {
    id: 6,
    name: 'Cheese Jalapeno Cashew',
    image: '/images/cashew/images (6).webp',
    category: 'Flavoured Cashew',
    isSpecial: true,
    description: 'Savory cheese and spicy jalapeno flavoured cashews — an addictive, punchy snack that keeps you coming back.',
    sku: 'CSH-004',
    price: '500.00'
  },
  {
    id: 7,
    name: 'Guava Twist Cashew',
    image: '/images/cashew/images (7).webp',
    category: 'Flavoured Cashew',
    isSpecial: true,
    description: 'Tangy guava-coated cashews with a tropical twist. Sweet, fruity, and utterly refreshing.',
    sku: 'CSH-005',
    price: '510.00'
  },
  {
    id: 8,
    name: 'Peri Peri Lime Cashew',
    image: '/images/cashew/images (8).webp',
    category: 'Flavoured Cashew',
    isSpecial: true,
    description: 'Zesty lime meets bold peri peri spice — a fiery, tangy cashew snack with an unforgettable kick.',
    sku: 'CSH-006',
    price: '520.00'
  }
];

const CATEGORIES = ['All', ...new Set(CASHEW_PRODUCTS.map(p => p.category))];

const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect fill="#FFF8E1" width="300" height="300"/>
      <text x="150" y="150" font-family="Arial,sans-serif" font-size="18"
            fill="#C99400" text-anchor="middle" dominant-baseline="middle">
        Surya Cashew
      </text>
    </svg>`
  );

const slugify = (name, id) =>
  `${id}-${String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const origin = () => (typeof window !== 'undefined' ? window.location.origin : '');

const CashewProducts = () => {
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
      '@graph': CASHEW_PRODUCTS.map(product => {
        const productUrl = `${base}/cashew/${slugify(product.name, product.id)}`;
        const imageUrl = `${base}${product.image}`;
        return {
          '@type': 'Product',
          name: product.name,
          description: product.description || 'Premium cashew',
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
            reviewRating: { '@type': 'Rating', ratingValue: '4.7', bestRating: '5' },
            author: { '@type': 'Person', name: 'Surya Chikki Customer' }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
            bestRating: '5',
            worstRating: '1'
          }
        };
      })
    };
  }, []);

  // Filtering memoized
  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return CASHEW_PRODUCTS.filter(p => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSearch = !q || p.name.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q);
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
      productUrl: `${base}/cashew/${slugify(product.name, product.id)}`
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
      `Description: ${selectedProduct.description || 'N/A'}\nSKU: ${selectedProduct.sku || 'N/A'}\n` +
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
      `Description: ${selectedProduct.description || 'N/A'}\nSKU: ${selectedProduct.sku || 'N/A'}\n` +
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

      <section className="cs-shell">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="cs-h1">
              Our <span className="accent">Cashew</span> Collection
            </h1>
            <p className="cs-lead">
              Handpicked, flavoured, and carefully roasted premium cashews &amp; almonds since 1975
            </p>
          </div>

          {/* Search + Filter */}
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search cashew..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cs-search"
              />
            </Col>
            <Col md={8}>
              <div className="cs-filters">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`cs-chip ${selectedCategory === category ? 'on' : ''}`}
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
              <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>😢</div>
              <h3 className="mt-3 cs-empty-h">No cashew found</h3>
              <p className="cs-empty-p">Try adjusting your search or filter</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} lg={3} md={6} sm={6} xs={12}>
                  <div className="cs-card">
                    <div className="cs-img-wrap">
                      <img
                        src={imageErrors[product.id] ? FALLBACK_IMG : product.image}
                        alt={product.name}
                        className="cs-img"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => handleImageError(product.id, e)}
                      />
                      {product.isSpecial && (
                        <div className="cs-special">⭐ Special</div>
                      )}
                    </div>

                    <div className="cs-body">
                      <h5 className="cs-name">{product.name}</h5>
                      <p className="cs-desc">{product.description || 'Premium cashew'}</p>
                      <div className="cs-foot">
                        <Badge className="cs-cat">{product.category}</Badge>
                        <Button
                          onClick={() => handleInquiryClick(product)}
                          className="cs-inquiry"
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

          {/* Footer count */}
          <div className="text-center mt-5">
            <p className="cs-count">
              Showing {filteredProducts.length} of {CASHEW_PRODUCTS.length} products
            </p>
          </div>

          {/* Inquiry Modal */}
          <Modal show={showInquiryModal} onHide={closeModal} size="lg" centered>
            <Modal.Header closeButton className="cs-modal-head">
              <Modal.Title className="cs-modal-title">
                📝 Inquiry About {selectedProduct?.name || 'Product'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="cs-modal-body">
              {selectedProduct && (
                <div className="cs-modal-product">
                  <div className="cs-modal-img">
                    <img
                      src={imageErrors[selectedProduct.id] ? FALLBACK_IMG : selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMG;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="cs-modal-details">
                    <h6 className="cs-modal-sub">Product Details:</h6>
                    <p><strong>Product:</strong> {selectedProduct.name}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Description:</strong> {selectedProduct.description || 'N/A'}</p>
                    <p><strong>SKU:</strong> {selectedProduct.sku || 'N/A'}</p>
                    <p className="cs-price"><strong>Price:</strong> ₹{selectedProduct.price || 'Contact for price'}</p>
                    <p className="cs-url"><strong>Image URL:</strong> {origin() + selectedProduct.image}</p>
                    <p className="cs-url"><strong>Product URL:</strong> {origin() + `/cashew/${slugify(selectedProduct.name, selectedProduct.id)}`}</p>
                  </div>
                </div>
              )}

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="cs-label">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={inquiryData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="cs-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="cs-label">Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inquiryData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="cs-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="cs-label">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={inquiryData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="cs-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="cs-label">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="message"
                    value={inquiryData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    required
                    className="cs-input"
                  />
                </Form.Group>

                <div className="cs-note">
                  <p><strong>📌 Note:</strong> Product details, image URL, and product page URL will be included with your inquiry.</p>
                </div>

                <div className="cs-actions">
                  <Button onClick={handleEmailSubmit} className="cs-btn email" disabled={!canSubmit}>
                    ✉️ Send via Email
                  </Button>
                  <Button onClick={handleWhatsAppSubmit} className="cs-btn wa" disabled={!canSubmit}>
                    💬 Send via WhatsApp
                  </Button>
                  <Button variant="outline-secondary" onClick={closeModal} className="cs-btn cancel">
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

  .cs-shell{
    padding:80px 0;
    background:var(--cream);
    min-height:100vh;
    color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  }
  .accent{color:var(--y-dk);}

  .cs-h1{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(2.2rem,5vw,3.5rem);
    font-weight:800;
    color:var(--ink);
    line-height:1.1;
    margin-bottom:.5rem;
  }
  .cs-lead{color:var(--mut);font-size:1.05rem;margin:0;}

  /* Search */
  .cs-search{
    border-radius:50px !important;
    padding:12px 20px !important;
    border:2px solid var(--line) !important;
    background:#fff;
    font-size:.95rem;
  }
  .cs-search:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  /* Filter chips */
  .cs-filters{display:flex;flex-wrap:wrap;gap:8px;}
  .cs-chip{
    border-radius:50px !important;
    padding:8px 22px !important;
    font-weight:600 !important;
    font-size:.85rem !important;
    border:1.5px solid var(--y-dk) !important;
    background:transparent !important;
    color:var(--y-dk) !important;
    transition:background-color .15s ease,color .15s ease !important;
  }
  .cs-chip:hover{background:var(--cream-2) !important;}
  .cs-chip.on{
    background:var(--y) !important;
    color:var(--ink) !important;
    border-color:var(--y) !important;
  }

  /* Product card */
  .cs-card{
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
  .cs-card:hover{transform:translate3d(0,-4px,0);}

  .cs-img-wrap{
    position:relative;
    width:100%;
    height:270px;
    background:var(--cream-2);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .cs-img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    padding:10px;
  }

  .cs-special{
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

  .cs-body{
    padding:16px;
    flex:1;
    display:flex;
    flex-direction:column;
  }
  .cs-name{
    font-weight:700;
    margin-bottom:6px;
    color:var(--ink);
    font-size:1rem;
  }
  .cs-desc{
    color:var(--mut);
    font-size:.85rem;
    margin-bottom:12px;
    min-height:40px;
    line-height:1.5;
  }
  .cs-foot{margin-top:auto;}

  .cs-cat{
    background:var(--cream-2) !important;
    color:var(--y-dk) !important;
    padding:5px 14px !important;
    border-radius:20px !important;
    font-size:11px !important;
    font-weight:600 !important;
    display:inline-block;
    border:1px solid var(--line);
  }

  .cs-inquiry{
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
  .cs-inquiry:hover{background:var(--y-dk) !important;color:var(--ink) !important;}

  /* Empty state */
  .cs-empty-h{color:var(--ink);font-weight:700;}
  .cs-empty-p{color:var(--mut);}
  .cs-count{color:var(--mut);margin:0;}

  /* Modal */
  .cs-modal-head{border-bottom:2px solid var(--line) !important;}
  .cs-modal-title{color:var(--y-dk) !important;font-weight:700;}
  .cs-modal-body{padding:24px !important;}

  .cs-modal-product{
    background:var(--cream-2);
    padding:15px;
    border-radius:10px;
    margin-bottom:20px;
    border-left:4px solid var(--y);
    display:flex;
    gap:15px;
    align-items:flex-start;
  }
  .cs-modal-img{
    width:80px;height:80px;
    border-radius:8px;
    overflow:hidden;
    background:#fff;
    flex-shrink:0;
    border:1px solid var(--line);
  }
  .cs-modal-img img{
    width:100%;height:100%;
    object-fit:contain;padding:4px;
  }
  .cs-modal-details{flex:1;min-width:0;}
  .cs-modal-sub{font-weight:700;color:var(--ink);margin-bottom:6px;}
  .cs-modal-details p{margin-bottom:4px;font-size:.9rem;color:#4a4126;}
  .cs-price{color:var(--y-dk) !important;font-weight:700;}
  .cs-url{font-size:.72rem !important;color:var(--mut) !important;word-break:break-all;}

  .cs-label{font-weight:600;color:var(--ink);font-size:.9rem;}
  .cs-input{
    border-radius:10px !important;
    padding:10px 12px !important;
    border:1px solid var(--line) !important;
    font-size:.92rem;
  }
  .cs-input:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  .cs-note{
    background:var(--cream-2);
    padding:12px 15px;
    border-radius:10px;
    margin-bottom:20px;
    border:1px solid var(--line);
  }
  .cs-note p{margin:0;font-size:.85rem;color:var(--mut);}

  .cs-actions{display:flex;gap:12px;flex-wrap:wrap;}
  .cs-btn{
    border:none !important;
    padding:12px 28px !important;
    border-radius:50px !important;
    font-weight:600 !important;
    flex:1;
    min-width:150px;
    transition:background-color .15s ease !important;
    font-size:.9rem !important;
  }
  .cs-btn.email{background:var(--y) !important;color:var(--ink) !important;}
  .cs-btn.email:hover{background:var(--y-dk) !important;}
  .cs-btn.wa{background:#25D366 !important;color:#fff !important;}
  .cs-btn.wa:hover{background:#1EA952 !important;}
  .cs-btn.cancel{
    background:transparent !important;
    color:var(--mut) !important;
    border:1px solid var(--line) !important;
    flex:0 0 auto !important;
  }
  .cs-btn.cancel:hover{background:var(--cream-2) !important;color:var(--ink) !important;}

  .cs-btn:disabled{opacity:.5;cursor:not-allowed;}

  /* Responsive */
  @media (max-width:767px){
    .cs-shell{padding:50px 0;}
    .cs-img-wrap{height:220px;}
    .cs-actions{flex-direction:column;}
    .cs-btn{width:100%;flex:none !important;}
    .cs-modal-product{flex-direction:column;align-items:stretch;}
    .cs-modal-img{width:100%;height:120px;}
  }

  @media (prefers-reduced-motion:reduce){
    .cs-card,.cs-chip,.cs-inquiry,.cs-btn{transition:none !important;}
    .cs-card:hover{transform:none;}
  }
`;

export default CashewProducts;