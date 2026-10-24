import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';

// ─── Static data hoisted out of component ───
const ALMOND_PRODUCTS = [
  {
    id: 1,
    name: 'Rose Almonds',
    image: '/images/almonds/images (1).webp',
    category: 'Flavoured Almonds',
    isSpecial: true,
    description: 'Delicately rose-infused almonds with a fragrant floral finish — a premium, romantic snacking experience.',
    sku: 'ALM-001',
    price: '540.00'
  },
  {
    id: 3,
    name: 'Classic Salted Almonds',
    image: '/images/almonds/images (3).webp',
    category: 'Salted Almonds',
    isSpecial: false,
    description: 'Classic lightly-salted almonds — the timeless, everyday snack. Crunchy, wholesome, and satisfying.',
    sku: 'ALM-002',
    price: '480.00'
  },
  {
    id: 5,
    name: 'Coffee Mocha Almonds',
    image: '/images/almonds/images (5).webp',
    category: 'Flavoured Almonds',
    isSpecial: true,
    description: 'Rich coffee-mocha coated almonds — a bold, chocolatey, espresso-kissed snack for coffee lovers.',
    sku: 'ALM-003',
    price: '560.00'
  }
];

const CATEGORIES = ['All', ...new Set(ALMOND_PRODUCTS.map(p => p.category))];

// Inline SVG placeholder — zero network request when an image fails
const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect fill="#FFF8E1" width="300" height="300"/>
      <text x="150" y="150" font-family="Arial,sans-serif" font-size="18"
            fill="#C99400" text-anchor="middle" dominant-baseline="middle">
        Surya Almonds
      </text>
    </svg>`
  );

const slugify = (name, id) =>
  `${id}-${String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const origin = () => (typeof window !== 'undefined' ? window.location.origin : '');

const AlmondsProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [imageErrors, setImageErrors] = useState({});
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', address: '', message: '' });

  // ✅ Structured data — built once
  const structuredData = useMemo(() => {
    const base = origin();
    return {
      '@context': 'https://schema.org',
      '@graph': ALMOND_PRODUCTS.map(product => {
        const productUrl = `${base}/almonds/${slugify(product.name, product.id)}`;
        const imageUrl = `${base}${product.image}`;
        return {
          '@type': 'Product',
          name: product.name,
          description: product.description || 'Premium almond',
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

  // ✅ Filtering memoized
  const filteredProducts = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return ALMOND_PRODUCTS.filter(p => {
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

  const buildMessageLines = (product) => {
    const base = origin();
    return {
      imageUrl: `${base}${product.image}`,
      productUrl: `${base}/almonds/${slugify(product.name, product.id)}`
    };
  };

  const handleInquiryClick = (product) => {
    const { imageUrl, productUrl } = buildMessageLines(product);
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
    const { imageUrl, productUrl } = buildMessageLines(selectedProduct);
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
    const { imageUrl, productUrl } = buildMessageLines(selectedProduct);
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
      {/* ✅ Structured data — SSR-safe */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <style>{CSS}</style>

      <section className="al-shell">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="al-h1">
              Our <span className="accent">Almonds</span> Collection
            </h1>
            <p className="al-lead">
              Handpicked and carefully roasted premium almonds since 1975
            </p>
          </div>

          {/* Search + Filter */}
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search almonds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="al-search"
              />
            </Col>
            <Col md={8}>
              <div className="al-filters">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`al-chip ${selectedCategory === category ? 'on' : ''}`}
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
              <h3 className="mt-3 al-empty-h">No almonds found</h3>
              <p className="al-empty-p">Try adjusting your search or filter</p>
            </div>
          ) : (
            <Row className="g-4 justify-content-center">
              {filteredProducts.map((product) => (
                <Col key={product.id} lg={4} md={6} sm={6} xs={12}>
                  <div className="al-card">
                    <div className="al-img-wrap">
                      <img
                        src={imageErrors[product.id] ? FALLBACK_IMG : product.image}
                        alt={product.name}
                        className="al-img"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => handleImageError(product.id, e)}
                      />
                      {product.isSpecial && (
                        <div className="al-special">⭐ Special</div>
                      )}
                    </div>

                    <div className="al-body">
                      <h5 className="al-name">{product.name}</h5>
                      <p className="al-desc">{product.description || 'Premium almond'}</p>
                      <div className="al-foot">
                        <Badge className="al-cat">{product.category}</Badge>
                        <Button
                          onClick={() => handleInquiryClick(product)}
                          className="al-inquiry"
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
            <p className="al-count">
              Showing {filteredProducts.length} of {ALMOND_PRODUCTS.length} products
            </p>
          </div>

          {/* Inquiry Modal */}
          <Modal show={showInquiryModal} onHide={closeModal} size="lg" centered>
            <Modal.Header closeButton className="al-modal-head">
              <Modal.Title className="al-modal-title">
                📝 Inquiry About {selectedProduct?.name || 'Product'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="al-modal-body">
              {selectedProduct && (
                <div className="al-modal-product">
                  <div className="al-modal-img">
                    <img
                      src={imageErrors[selectedProduct.id] ? FALLBACK_IMG : selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMG;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="al-modal-details">
                    <h6 className="al-modal-sub">Product Details:</h6>
                    <p><strong>Product:</strong> {selectedProduct.name}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Description:</strong> {selectedProduct.description || 'N/A'}</p>
                    <p><strong>SKU:</strong> {selectedProduct.sku || 'N/A'}</p>
                    <p className="al-price"><strong>Price:</strong> ₹{selectedProduct.price || 'Contact for price'}</p>
                    <p className="al-url"><strong>Image URL:</strong> {origin() + selectedProduct.image}</p>
                    <p className="al-url"><strong>Product URL:</strong> {origin() + `/almonds/${slugify(selectedProduct.name, selectedProduct.id)}`}</p>
                  </div>
                </div>
              )}

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="al-label">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={inquiryData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="al-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="al-label">Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inquiryData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="al-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="al-label">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={inquiryData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="al-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="al-label">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="message"
                    value={inquiryData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    required
                    className="al-input"
                  />
                </Form.Group>

                <div className="al-note">
                  <p><strong>📌 Note:</strong> Product details, image URL, and product page URL will be included with your inquiry.</p>
                </div>

                <div className="al-actions">
                  <Button onClick={handleEmailSubmit} className="al-btn email" disabled={!canSubmit}>
                    ✉️ Send via Email
                  </Button>
                  <Button onClick={handleWhatsAppSubmit} className="al-btn wa" disabled={!canSubmit}>
                    💬 Send via WhatsApp
                  </Button>
                  <Button variant="outline-secondary" onClick={closeModal} className="al-btn cancel">
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

  .al-shell{
    padding:80px 0;
    background:var(--cream);
    min-height:100vh;
    color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  }
  .accent{color:var(--y-dk);}

  .al-h1{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(2.2rem,5vw,3.5rem);
    font-weight:800;
    color:var(--ink);
    line-height:1.1;
    margin-bottom:.5rem;
  }
  .al-lead{color:var(--mut);font-size:1.05rem;margin:0;}

  /* Search */
  .al-search{
    border-radius:50px !important;
    padding:12px 20px !important;
    border:2px solid var(--line) !important;
    background:#fff;
    font-size:.95rem;
  }
  .al-search:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  /* Filter chips */
  .al-filters{display:flex;flex-wrap:wrap;gap:8px;}
  .al-chip{
    border-radius:50px !important;
    padding:8px 22px !important;
    font-weight:600 !important;
    font-size:.85rem !important;
    border:1.5px solid var(--y-dk) !important;
    background:transparent !important;
    color:var(--y-dk) !important;
    transition:background-color .15s ease,color .15s ease !important;
  }
  .al-chip:hover{background:var(--cream-2) !important;}
  .al-chip.on{
    background:var(--y) !important;
    color:var(--ink) !important;
    border-color:var(--y) !important;
  }

  /* Product card */
  .al-card{
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
  .al-card:hover{transform:translate3d(0,-4px,0);}

  .al-img-wrap{
    position:relative;
    width:100%;
    height:280px;
    background:var(--cream-2);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .al-img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    padding:10px;
  }

  .al-special{
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

  .al-body{
    padding:16px;
    flex:1;
    display:flex;
    flex-direction:column;
  }
  .al-name{
    font-weight:700;
    margin-bottom:6px;
    color:var(--ink);
    font-size:1rem;
  }
  .al-desc{
    color:var(--mut);
    font-size:.85rem;
    margin-bottom:12px;
    min-height:40px;
    line-height:1.5;
  }
  .al-foot{margin-top:auto;}

  .al-cat{
    background:var(--cream-2) !important;
    color:var(--y-dk) !important;
    padding:5px 14px !important;
    border-radius:20px !important;
    font-size:11px !important;
    font-weight:600 !important;
    display:inline-block;
    border:1px solid var(--line);
  }

  .al-inquiry{
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
  .al-inquiry:hover{background:var(--y-dk) !important;color:var(--ink) !important;}

  /* Empty state */
  .al-empty-h{color:var(--ink);font-weight:700;}
  .al-empty-p{color:var(--mut);}
  .al-count{color:var(--mut);margin:0;}

  /* Modal */
  .al-modal-head{border-bottom:2px solid var(--line) !important;}
  .al-modal-title{color:var(--y-dk) !important;font-weight:700;}
  .al-modal-body{padding:24px !important;}

  .al-modal-product{
    background:var(--cream-2);
    padding:15px;
    border-radius:10px;
    margin-bottom:20px;
    border-left:4px solid var(--y);
    display:flex;
    gap:15px;
    align-items:flex-start;
  }
  .al-modal-img{
    width:80px;height:80px;
    border-radius:8px;
    overflow:hidden;
    background:#fff;
    flex-shrink:0;
    border:1px solid var(--line);
  }
  .al-modal-img img{
    width:100%;height:100%;
    object-fit:contain;padding:4px;
  }
  .al-modal-details{flex:1;min-width:0;}
  .al-modal-sub{font-weight:700;color:var(--ink);margin-bottom:6px;}
  .al-modal-details p{margin-bottom:4px;font-size:.9rem;color:#4a4126;}
  .al-price{color:var(--y-dk) !important;font-weight:700;}
  .al-url{font-size:.72rem !important;color:var(--mut) !important;word-break:break-all;}

  .al-label{font-weight:600;color:var(--ink);font-size:.9rem;}
  .al-input{
    border-radius:10px !important;
    padding:10px 12px !important;
    border:1px solid var(--line) !important;
    font-size:.92rem;
  }
  .al-input:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  .al-note{
    background:var(--cream-2);
    padding:12px 15px;
    border-radius:10px;
    margin-bottom:20px;
    border:1px solid var(--line);
  }
  .al-note p{margin:0;font-size:.85rem;color:var(--mut);}

  .al-actions{display:flex;gap:12px;flex-wrap:wrap;}
  .al-btn{
    border:none !important;
    padding:12px 28px !important;
    border-radius:50px !important;
    font-weight:600 !important;
    flex:1;
    min-width:150px;
    transition:background-color .15s ease !important;
    font-size:.9rem !important;
  }
  .al-btn.email{background:var(--y) !important;color:var(--ink) !important;}
  .al-btn.email:hover{background:var(--y-dk) !important;}
  .al-btn.wa{background:#25D366 !important;color:#fff !important;}
  .al-btn.wa:hover{background:#1EA952 !important;}
  .al-btn.cancel{
    background:transparent !important;
    color:var(--mut) !important;
    border:1px solid var(--line) !important;
    flex:0 0 auto !important;
  }
  .al-btn.cancel:hover{background:var(--cream-2) !important;color:var(--ink) !important;}

  .al-btn:disabled{opacity:.5;cursor:not-allowed;}

  /* Responsive */
  @media (max-width:767px){
    .al-shell{padding:50px 0;}
    .al-img-wrap{height:220px;}
    .al-actions{flex-direction:column;}
    .al-btn{width:100%;flex:none !important;}
    .al-modal-product{flex-direction:column;align-items:stretch;}
    .al-modal-img{width:100%;height:120px;}
  }

  @media (prefers-reduced-motion:reduce){
    .al-card,.al-chip,.al-inquiry,.al-btn{transition:none !important;}
    .al-card:hover{transform:none;}
  }
`;

export default AlmondsProducts;