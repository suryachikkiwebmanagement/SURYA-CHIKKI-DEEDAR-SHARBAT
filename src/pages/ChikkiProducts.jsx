import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Badge, Modal } from 'react-bootstrap';

// ─── Static data hoisted ───
const CHIKKI_PRODUCTS = [
  { id: 1,  name: 'Till Chikki',              image: '/images/chikki/images(1).webp',  category: 'Chikki', isSpecial: true,  description: 'Traditional sesame seed chikki with authentic taste. Made with premium quality sesame seeds and jaggery for a perfect crunch.', sku: 'CHK-001', price: '120.00' },
  { id: 17, name: 'Rajgiri Peanut chikki',    image: '/images/chikki/images(40).webp', category: 'Chikki', isSpecial: true,  description: 'Special Rajgiri Peanut chikki with authentic taste. Made with premium quality sesame seeds and jaggery for a perfect crunch.', sku: 'CHK-001', price: '120.00' },
  { id: 2,  name: 'Peanut Dry Fruit Chikki',  image: '/images/chikki/images(2).webp',  category: 'Chikki', isSpecial: false, description: 'Crunchy peanut with dry fruits for extra nutrition. A healthy blend of peanuts, almonds, and cashews with jaggery.', sku: 'CHK-002', price: '180.00' },
  { id: 3,  name: 'Dates Chikki',             image: '/images/chikki/images(3).webp',  category: 'Chikki', isSpecial: true,  description: 'Sweet and healthy dates chikki with natural sweetness. Made with premium dates and nuts for an energy-boosting snack.', sku: 'CHK-003', price: '200.00' },
  { id: 4,  name: 'Signature Melts',          image: '/images/chikki/images(4).webp',  category: 'Bar',    isSpecial: false, description: 'Melt in your mouth delight. Creamy and smooth texture that dissolves instantly.', sku: 'BAR-001', price: '150.00' },
  { id: 5,  name: 'Dates Peanut Butter Bar',  image: '/images/chikki/images(5).webp',  category: 'Bar',    isSpecial: false, description: 'Perfect blend of dates and peanut butter. Rich, creamy, and packed with protein.', sku: 'BAR-002', price: '175.00' },
  { id: 6,  name: 'Peanut Crush Chikki Almond / Cashew', image: '/images/chikki/images(6).webp', category: 'Bar', isSpecial: true, description: 'Best of both textures with almonds and cashews. Premium nuts for an elevated chikki experience.', sku: 'BAR-003', price: '220.00' },
  { id: 7,  name: 'Creamy Bites Bar',         image: '/images/chikki/images(7).webp',  category: 'Bar',    isSpecial: true,  description: 'Rich almond chikki with a perfect crunch. Made with premium almonds for a satisfying bite.', sku: 'BAR-004', price: '195.00' },
  { id: 8,  name: 'Peanut Chikki Classic',    image: '/images/chikki/images(8).webp',  category: 'Chikki', isSpecial: false, description: 'Classic peanut chikki made with premium peanuts. The traditional recipe that everyone loves.', sku: 'CHK-004', price: '100.00' },
  { id: 9,  name: 'Peanut Chikki Premium',    image: '/images/chikki/images(9).webp',  category: 'Chikki', isSpecial: false, description: 'Premium peanut chikki with extra crunch. Made with handpicked peanuts for superior quality.', sku: 'CHK-005', price: '130.00' },
  { id: 10, name: 'Peanut Chikki Special',    image: '/images/chikki/images(8).webp',  category: 'Chikki', isSpecial: false, description: 'Traditional peanut chikki with special recipe. Passed down through generations since 1975.', sku: 'CHK-006', price: '140.00' },
  { id: 11, name: 'Peanut Chikki Jar',        image: '/images/chikki/images(10).webp', category: 'Jar',    isSpecial: false, description: 'Rich chocolate bar in premium jar packaging. Perfect for gifting and special occasions.', sku: 'JAR-001', price: '250.00' },
  { id: 12, name: 'Peanut Crush Chikki Jar',  image: '/images/chikki/images(11).webp', category: 'Jar',    isSpecial: false, description: 'Special recipe peanut chikki in jar. Made with crushed peanuts for unique texture.', sku: 'JAR-002', price: '280.00' },
  { id: 13, name: 'Till Chikki Premium Jar',  image: '/images/chikki/images(32).webp', category: 'Jar',    isSpecial: false, description: 'Premium sesame chikki in elegant jar. A luxurious treat for sesame lovers.', sku: 'JAR-003', price: '300.00' },
  { id: 14, name: 'Topra Chikki',             image: '/images/chikki/images(33).webp', category: 'Chikki', isSpecial: false, description: 'Traditional topra chikki with authentic taste. Made with special topra variety of jaggery.', sku: 'CHK-007', price: '160.00' },
  { id: 15, name: 'Topra Chikki Jar',         image: '/images/chikki/images(34).webp', category: 'Jar',    isSpecial: false, description: 'Special topra chikki in premium jar. Preserved for long-lasting freshness.', sku: 'JAR-004', price: '320.00' },
  { id: 16, name: 'Pistachio Chikki',         image: '/images/chikki/images(35).webp', category: 'Chikki', isSpecial: false, description: 'Perfect crunch and creamy texture with pistachios. A premium chikki made with imported pistachios.', sku: 'CHK-008', price: '240.00' }
];

const CATEGORIES = ['All', ...new Set(CHIKKI_PRODUCTS.map(p => p.category))];

const FALLBACK_IMG =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <rect fill="#FFF8E1" width="300" height="300"/>
      <text x="150" y="150" font-family="Arial,sans-serif" font-size="18"
            fill="#C99400" text-anchor="middle" dominant-baseline="middle">
        Surya Chikki
      </text>
    </svg>`
  );

const slugify = (name, id) =>
  `${id}-${String(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')}`;

const origin = () => (typeof window !== 'undefined' ? window.location.origin : '');

const ChikkiProducts = () => {
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
      '@graph': CHIKKI_PRODUCTS.map(product => {
        const productUrl = `${base}/product/${slugify(product.name, product.id)}`;
        const imageUrl = `${base}${product.image}`;
        return {
          '@type': 'Product',
          name: product.name,
          description: product.description || 'Delicious chikki',
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
    return CHIKKI_PRODUCTS.filter(p => {
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
      productUrl: `${base}/product/${slugify(product.name, product.id)}`
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

      <section className="ck-shell">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="ck-h1">
              Our <span className="accent">Chikki</span> Collection
            </h1>
            <p className="ck-lead">
              Handcrafted with love using traditional recipes since 1975
            </p>
          </div>

          {/* Search + Filter */}
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search chikki..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ck-search"
              />
            </Col>
            <Col md={8}>
              <div className="ck-filters">
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`ck-chip ${selectedCategory === category ? 'on' : ''}`}
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
              <h3 className="mt-3 ck-empty-h">No chikki found</h3>
              <p className="ck-empty-p">Try adjusting your search or filter</p>
            </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.map((product) => (
                <Col key={product.id} lg={3} md={6} sm={6} xs={12}>
                  <div className="ck-card">
                    <div className="ck-img-wrap">
                      <img
                        src={imageErrors[product.id] ? FALLBACK_IMG : product.image}
                        alt={product.name}
                        className="ck-img"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => handleImageError(product.id, e)}
                      />
                      {product.isSpecial && (
                        <div className="ck-special">⭐ Special</div>
                      )}
                    </div>

                    <div className="ck-body">
                      <h5 className="ck-name">{product.name}</h5>
                      <p className="ck-desc">{product.description || 'Delicious chikki'}</p>
                      <div className="ck-foot">
                        <Badge className="ck-cat">{product.category}</Badge>
                        <Button
                          onClick={() => handleInquiryClick(product)}
                          className="ck-inquiry"
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
            <p className="ck-count">
              Showing {filteredProducts.length} of {CHIKKI_PRODUCTS.length} products
            </p>
          </div>

          {/* Inquiry Modal */}
          <Modal show={showInquiryModal} onHide={closeModal} size="lg" centered>
            <Modal.Header closeButton className="ck-modal-head">
              <Modal.Title className="ck-modal-title">
                📝 Inquiry About {selectedProduct?.name || 'Product'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="ck-modal-body">
              {selectedProduct && (
                <div className="ck-modal-product">
                  <div className="ck-modal-img">
                    <img
                      src={imageErrors[selectedProduct.id] ? FALLBACK_IMG : selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMG;
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                  <div className="ck-modal-details">
                    <h6 className="ck-modal-sub">Product Details:</h6>
                    <p><strong>Product:</strong> {selectedProduct.name}</p>
                    <p><strong>Category:</strong> {selectedProduct.category}</p>
                    <p><strong>Description:</strong> {selectedProduct.description || 'N/A'}</p>
                    <p><strong>SKU:</strong> {selectedProduct.sku || 'N/A'}</p>
                    <p className="ck-price"><strong>Price:</strong> ₹{selectedProduct.price || 'Contact for price'}</p>
                    <p className="ck-url"><strong>Image URL:</strong> {origin() + selectedProduct.image}</p>
                    <p className="ck-url"><strong>Product URL:</strong> {origin() + `/product/${slugify(selectedProduct.name, selectedProduct.id)}`}</p>
                  </div>
                </div>
              )}

              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="ck-label">Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={inquiryData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="ck-input"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="ck-label">Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={inquiryData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                        className="ck-input"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="ck-label">Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={inquiryData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address"
                    className="ck-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="ck-label">Message *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    name="message"
                    value={inquiryData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    required
                    className="ck-input"
                  />
                </Form.Group>

                <div className="ck-note">
                  <p><strong>📌 Note:</strong> Product details, image URL, and product page URL will be included with your inquiry.</p>
                </div>

                <div className="ck-actions">
                  <Button onClick={handleEmailSubmit} className="ck-btn email" disabled={!canSubmit}>
                    ✉️ Send via Email
                  </Button>
                  <Button onClick={handleWhatsAppSubmit} className="ck-btn wa" disabled={!canSubmit}>
                    💬 Send via WhatsApp
                  </Button>
                  <Button variant="outline-secondary" onClick={closeModal} className="ck-btn cancel">
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

  .ck-shell{
    padding:80px 0;
    background:var(--cream);
    min-height:100vh;
    color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  }
  .accent{color:var(--y-dk);}

  .ck-h1{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(2.2rem,5vw,3.5rem);
    font-weight:800;
    color:var(--ink);
    line-height:1.1;
    margin-bottom:.5rem;
  }
  .ck-lead{color:var(--mut);font-size:1.05rem;margin:0;}

  /* Search */
  .ck-search{
    border-radius:50px !important;
    padding:12px 20px !important;
    border:2px solid var(--line) !important;
    background:#fff;
    font-size:.95rem;
  }
  .ck-search:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  /* Filter chips */
  .ck-filters{display:flex;flex-wrap:wrap;gap:8px;}
  .ck-chip{
    border-radius:50px !important;
    padding:8px 22px !important;
    font-weight:600 !important;
    font-size:.85rem !important;
    border:1.5px solid var(--y-dk) !important;
    background:transparent !important;
    color:var(--y-dk) !important;
    transition:background-color .15s ease,color .15s ease !important;
  }
  .ck-chip:hover{background:var(--cream-2) !important;}
  .ck-chip.on{
    background:var(--y) !important;
    color:var(--ink) !important;
    border-color:var(--y) !important;
  }

  /* Product card */
  .ck-card{
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
  .ck-card:hover{transform:translate3d(0,-4px,0);}

  .ck-img-wrap{
    position:relative;
    width:100%;
    height:270px;
    background:var(--cream-2);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .ck-img{
    width:100%;
    height:100%;
    object-fit:contain;
    object-position:center;
    padding:10px;
  }

  .ck-special{
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

  .ck-body{
    padding:16px;
    flex:1;
    display:flex;
    flex-direction:column;
  }
  .ck-name{
    font-weight:700;
    margin-bottom:6px;
    color:var(--ink);
    font-size:1rem;
  }
  .ck-desc{
    color:var(--mut);
    font-size:.85rem;
    margin-bottom:12px;
    min-height:40px;
    line-height:1.5;
  }
  .ck-foot{margin-top:auto;}

  .ck-cat{
    background:var(--cream-2) !important;
    color:var(--y-dk) !important;
    padding:5px 14px !important;
    border-radius:20px !important;
    font-size:11px !important;
    font-weight:600 !important;
    display:inline-block;
    border:1px solid var(--line);
  }

  .ck-inquiry{
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
  .ck-inquiry:hover{background:var(--y-dk) !important;color:var(--ink) !important;}

  /* Empty state */
  .ck-empty-h{color:var(--ink);font-weight:700;}
  .ck-empty-p{color:var(--mut);}
  .ck-count{color:var(--mut);margin:0;}

  /* Modal */
  .ck-modal-head{border-bottom:2px solid var(--line) !important;}
  .ck-modal-title{color:var(--y-dk) !important;font-weight:700;}
  .ck-modal-body{padding:24px !important;}

  .ck-modal-product{
    background:var(--cream-2);
    padding:15px;
    border-radius:10px;
    margin-bottom:20px;
    border-left:4px solid var(--y);
    display:flex;
    gap:15px;
    align-items:flex-start;
  }
  .ck-modal-img{
    width:80px;height:80px;
    border-radius:8px;
    overflow:hidden;
    background:#fff;
    flex-shrink:0;
    border:1px solid var(--line);
  }
  .ck-modal-img img{
    width:100%;height:100%;
    object-fit:contain;padding:4px;
  }
  .ck-modal-details{flex:1;min-width:0;}
  .ck-modal-sub{font-weight:700;color:var(--ink);margin-bottom:6px;}
  .ck-modal-details p{margin-bottom:4px;font-size:.9rem;color:#4a4126;}
  .ck-price{color:var(--y-dk) !important;font-weight:700;}
  .ck-url{font-size:.72rem !important;color:var(--mut) !important;word-break:break-all;}

  .ck-label{font-weight:600;color:var(--ink);font-size:.9rem;}
  .ck-input{
    border-radius:10px !important;
    padding:10px 12px !important;
    border:1px solid var(--line) !important;
    font-size:.92rem;
  }
  .ck-input:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  .ck-note{
    background:var(--cream-2);
    padding:12px 15px;
    border-radius:10px;
    margin-bottom:20px;
    border:1px solid var(--line);
  }
  .ck-note p{margin:0;font-size:.85rem;color:var(--mut);}

  .ck-actions{display:flex;gap:12px;flex-wrap:wrap;}
  .ck-btn{
    border:none !important;
    padding:12px 28px !important;
    border-radius:50px !important;
    font-weight:600 !important;
    flex:1;
    min-width:150px;
    transition:background-color .15s ease !important;
    font-size:.9rem !important;
  }
  .ck-btn.email{background:var(--y) !important;color:var(--ink) !important;}
  .ck-btn.email:hover{background:var(--y-dk) !important;}
  .ck-btn.wa{background:#25D366 !important;color:#fff !important;}
  .ck-btn.wa:hover{background:#1EA952 !important;}
  .ck-btn.cancel{
    background:transparent !important;
    color:var(--mut) !important;
    border:1px solid var(--line) !important;
    flex:0 0 auto !important;
  }
  .ck-btn.cancel:hover{background:var(--cream-2) !important;color:var(--ink) !important;}

  .ck-btn:disabled{opacity:.5;cursor:not-allowed;}

  /* Responsive */
  @media (max-width:767px){
    .ck-shell{padding:50px 0;}
    .ck-img-wrap{height:220px;}
    .ck-actions{flex-direction:column;}
    .ck-btn{width:100%;flex:none !important;}
    .ck-modal-product{flex-direction:column;align-items:stretch;}
    .ck-modal-img{width:100%;height:120px;}
  }

  @media (prefers-reduced-motion:reduce){
    .ck-card,.ck-chip,.ck-inquiry,.ck-btn{transition:none !important;}
    .ck-card:hover{transform:none;}
  }
`;

export default ChikkiProducts;