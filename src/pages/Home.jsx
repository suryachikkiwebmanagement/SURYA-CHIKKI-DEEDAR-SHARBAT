import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaInstagram, FaFacebook, FaWhatsapp, FaPlay, FaTrophy, FaUsers, FaAward, FaHandshake, FaBox, FaTruck, FaPhone, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import mobileBanner1 from '../assets/images/banner(1).png';
import mobileBanner2 from '../assets/images/banner(2).png';
import mobileBanner3 from '../assets/images/banner(3).png';
import mobileBanner4 from '../assets/images/banner(4).png';
import mobileBanner5 from '../assets/images/banner(5).png';
import mobileBanner6 from '../assets/images/banner(6).png';
import pcBanner1 from '../assets/images/pcbanners  (1).png';
import pcBanner2 from '../assets/images/pcbanners  (2).png';
import pcBanner3 from '../assets/images/pcbanners  (3).png';
import pcBanner4 from '../assets/images/pcbanners  (4).png';
import pcBanner5 from '../assets/images/pcbanners  (3).png';
import pcBanner6 from '../assets/images/pcbanners  (5).png';
import followUsImg from '../assets/images/followusimg.png';

import tcimages1 from '../assets/images/tcimages (1).png';
import tcimages2 from '../assets/images/tcimages (2).png';
import tcimages3 from '../assets/images/tcimages (3).png';

import rnimages1 from '../assets/images/rnimages (1).png';
import rnimages2 from '../assets/images/rnimages (2).png';
import rnimages3 from '../assets/images/rnimages (3).png';
import rnimages4 from '../assets/images/rnimages (4).png';
import rnimages5 from '../assets/images/rnimages (5).png';
import rnimages6 from '../assets/images/rnimages (6).png';
import rnimages7 from '../assets/images/rnimages (7).png';
import rnimages8 from '../assets/images/rnimages (8).png';
import rnimages9 from '../assets/images/rnimages (9).png';

import feedImg1 from '../assets/images/fromourfeed (1).webp';
import feedImg2 from '../assets/images/fromourfeed (2).webp';
import feedImg3 from '../assets/images/fromourfeed (3).webp';
import feedImg4 from '../assets/images/fromourfeed (4).webp';
import feedImg5 from '../assets/images/fromourfeed (5).webp';
import feedImg6 from '../assets/images/fromourfeed (6).webp';
import feedImg7 from '../assets/images/fromourfeed (7).webp';
import feedImg8 from '../assets/images/fromourfeed (8).png';
import feedImg9 from '../assets/images/fromourfeed (9).png';
import feedImg10 from '../assets/images/fromourfeed (10).png';

const Home = () => {
  /* ═══════════════════════════════════════════════════════════
     IMAGE DATA — same images, no 3× duplication
     ═══════════════════════════════════════════════════════════ */
  const banners = [
    { id: 1, mobile: mobileBanner1, pc: pcBanner1 },
    { id: 4, mobile: mobileBanner4, pc: pcBanner4 },
    { id: 5, mobile: mobileBanner5, pc: pcBanner5 },
    { id: 6, mobile: mobileBanner6, pc: pcBanner6 }
  ];

  const traditionalChikkiSlides = [
    { id: 1, image: tcimages1 },
    { id: 2, image: tcimages2 },
    { id: 3, image: tcimages3 },
  ];

  const richnustsslides = [
    { id: 1, image: rnimages1 },
    { id: 2, image: rnimages2 },
    { id: 3, image: rnimages3 },
    { id: 4, image: rnimages4 },
    { id: 5, image: rnimages5 },
    { id: 6, image: rnimages6 },
    { id: 7, image: rnimages7 },
    { id: 8, image: rnimages8 },
    { id: 9, image: rnimages9 },
  ];

  const productImages = [
    feedImg1, feedImg2, feedImg3, feedImg4,
    feedImg5, feedImg6, feedImg7, feedImg8, feedImg9, feedImg10
  ];

  const allTags = [
    'Tasty', 'Flavorful', 'Savory', 'Delightful', 'Wholesome',
    'Nutritious', 'Freshness', 'Purity', 'Excellence', 'Finest',
    'Superior', 'Signature', 'Tradition & Trust', 'Heritage', 'Legacy',
    'Classic', 'Timeless', 'Authenticity', 'Trust', 'Reliability',
    'Commitment', 'Dedication', 'Integrity', 'Pride', 'Craftsmanship'
  ];

  /* ═══════════════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════════════ */
  const [chikkiCurrentIndex, setChikkiCurrentIndex] = useState(0);
  const [isChikkiAnimating, setIsChikkiAnimating] = useState(false);
  const [nutsCurrentIndex, setNutsCurrentIndex] = useState(0);
  const [isNutsAnimating, setIsNutsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChikkiAnimating) {
        setChikkiCurrentIndex((prevIndex) =>
          prevIndex === traditionalChikkiSlides.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isChikkiAnimating]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isNutsAnimating) {
        setNutsCurrentIndex((prevIndex) =>
          prevIndex === richnustsslides.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isNutsAnimating]);

  const goToPreviousChikki = () => {
    if (!isChikkiAnimating) {
      setIsChikkiAnimating(true);
      setChikkiCurrentIndex((prevIndex) =>
        prevIndex === 0 ? traditionalChikkiSlides.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsChikkiAnimating(false), 800);
    }
  };
  const goToNextChikki = () => {
    if (!isChikkiAnimating) {
      setIsChikkiAnimating(true);
      setChikkiCurrentIndex((prevIndex) =>
        prevIndex === traditionalChikkiSlides.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsChikkiAnimating(false), 800);
    }
  };
  const goToChikkiSlide = (index) => {
    if (!isChikkiAnimating && index !== chikkiCurrentIndex) {
      setIsChikkiAnimating(true);
      setChikkiCurrentIndex(index);
      setTimeout(() => setIsChikkiAnimating(false), 800);
    }
  };
  const goToPreviousNuts = () => {
    if (!isNutsAnimating) {
      setIsNutsAnimating(true);
      setNutsCurrentIndex((prevIndex) =>
        prevIndex === 0 ? richnustsslides.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsNutsAnimating(false), 800);
    }
  };
  const goToNextNuts = () => {
    if (!isNutsAnimating) {
      setIsNutsAnimating(true);
      setNutsCurrentIndex((prevIndex) =>
        prevIndex === richnustsslides.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsNutsAnimating(false), 800);
    }
  };
  const goToNutsSlide = (index) => {
    if (!isNutsAnimating && index !== nutsCurrentIndex) {
      setIsNutsAnimating(true);
      setNutsCurrentIndex(index);
      setTimeout(() => setIsNutsAnimating(false), 800);
    }
  };

  const SlideshowRenderer = ({ slides, currentIndex, goToPrevious, goToNext, goToSlide, linkTo, buttonText }) => (
    <div className="sshow">
      <div className="sshow-stage">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div key={slide.id} className={`sshow-slide ${isActive ? 'on' : ''}`}>
              <div className="sshow-img-wrap">
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  className="sshow-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          );
        })}

        <button className="sshow-arrow l" onClick={goToPrevious} aria-label="Previous">
          <FaChevronLeft />
        </button>
        <button className="sshow-arrow r" onClick={goToNext} aria-label="Next">
          <FaChevronRight />
        </button>

        <div className="sshow-counter">
          <span className="sshow-count-cur">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span className="sshow-count-sep">/</span>
          <span className="sshow-count-tot">{String(slides.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="sshow-bottom">
        <div className="sshow-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`sshow-dot ${index === currentIndex ? 'on' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
        <Link to={linkTo} className="sshow-cta">
          {buttonText} <FaArrowRight style={{ fontSize: '.75em' }} />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <div className="home-v2">

        {/* ══════ 1. HERO BANNER ══════ */}
        <section className="hero-wrap">
          <Carousel fade controls={false} indicators={true} interval={5000} pause={false} className="hero-carousel">
            {banners.map((banner, index) => (
              <Carousel.Item key={index} className="hero-item">
                <img src={banner.mobile} alt={`Banner ${index + 1}`} className="hero-img d-block d-lg-none" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <img src={banner.pc} alt={`Banner ${index + 1}`} className="hero-img d-none d-lg-block" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                <div className="hero-overlay" />

                <div className="hero-caption">
                  <span className="hero-eyebrow">
                    <span className="hero-eyebrow-line" />
                    Since 1975
                    <span className="hero-eyebrow-line" />
                  </span>
                  <h1 className="hero-headline">
                    Made with <em>Love</em>
                  </h1>
                  <p className="hero-desc">
                    Authentic taste, crafted with devotion for over five decades.
                  </p>
                  <Link to="/chikki" className="hero-cta">
                    View Collection <FaArrowRight style={{ fontSize: '.8em' }} />
                  </Link>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="hero-side-info">
            <span className="hero-side-num">01</span>
            <span className="hero-side-line" />
            <span className="hero-side-text">HERITAGE · TRUST · PURITY</span>
          </div>
        </section>

        {/* ══════ 2. TRADITIONAL CHIKKI ══════ */}
        <section className="sec">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">
                <span className="eyebrow-line" /> Signature Collection <span className="eyebrow-line" />
              </span>
              <h2 className="sec-title">
                Taste The <em>Tradition</em>
              </h2>
              <p className="sec-sub">Premium Chikki — crafted with time-honoured recipes</p>
            </div>
            <SlideshowRenderer
              slides={traditionalChikkiSlides}
              currentIndex={chikkiCurrentIndex}
              goToPrevious={goToPreviousChikki}
              goToNext={goToNextChikki}
              goToSlide={goToChikkiSlide}
              linkTo="/chikki"
              buttonText="Explore Chikkis"
            />
          </div>
        </section>

        {/* ══════ 3. RICH NUTS ══════ */}
        <section className="sec sec-tint">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">
                <span className="eyebrow-line" /> Dry Fruits <span className="eyebrow-line" />
              </span>
              <h2 className="sec-title">
                Crunchy <em>Rich Dry Fruits</em>
              </h2>
              <p className="sec-sub">Hand-picked premium nuts — blended with craftsmanship</p>
            </div>
            <SlideshowRenderer
              slides={richnustsslides}
              currentIndex={nutsCurrentIndex}
              goToPrevious={goToPreviousNuts}
              goToNext={goToNextNuts}
              goToSlide={goToNutsSlide}
              linkTo="/Cashew"
              buttonText="Explore Dry Fruits"
            />
          </div>
        </section>

        {/* ══════ 4. FROM OUR FEED — single set + cached duplicate ══════ */}
        <section className="sec feed-sec">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">
                <span className="eyebrow-line" /> On The Gram <span className="eyebrow-line" />
              </span>
              <h2 className="sec-title">
                From <em>Our Feed</em>
              </h2>
              <p className="sec-sub">Discover our complete range of authentic chikkis</p>
            </div>
          </div>

          <div className="marquee-viewport">
            <div className="marquee-track">
              {productImages.map((img, index) => (
                <div key={`a-${index}`} className="marquee-card">
                  <img src={img} alt={`Product ${index + 1}`} loading="lazy" decoding="async" />
                </div>
              ))}
              {productImages.map((img, index) => (
                <div key={`b-${index}`} className="marquee-card" aria-hidden="true">
                  <img src={img} alt="" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>

          <div className="wrap" style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/chikki" className="btn-outline-pill">
              View All Products <FaArrowRight style={{ fontSize: '.75em' }} />
            </Link>
          </div>
        </section>

        {/* ══════ 5. PARTNER WITH US ══════ */}
        <section className="sec sec-tint">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">
                <span className="eyebrow-line" /> Business Opportunities <span className="eyebrow-line" />
              </span>
              <h2 className="sec-title">
                Get Our <em>Agency</em> or Become a <em>Wholesaler</em>
              </h2>
              <p className="sec-sub">
                Join the Surya Chikki family and grow your business with our premium products
              </p>
            </div>

            <Row className="g-4">
              <Col lg={6}>
                <Card className="partner-card">
                  <div className="partner-header yellow">
                    <div className="partner-icon"><FaHandshake /></div>
                    <h3>Become an Agency</h3>
                    <p>Represent our brand in your region</p>
                  </div>
                  <Card.Body className="partner-body">
                    <ul className="partner-list">
                      <li><span className="partner-li-ic"><FaTrophy /></span>50+ years of trusted brand legacy</li>
                      <li><span className="partner-li-ic"><FaUsers /></span>10K+ happy customers network</li>
                      <li><span className="partner-li-ic"><FaBox /></span>Premium quality product range</li>
                      <li><span className="partner-li-ic"><FaAward /></span>Marketing &amp; logistics support</li>
                    </ul>
                    <div className="partner-actions">
                      <a href="https://wa.me/919429946364" target="_blank" rel="noopener noreferrer" className="p-btn wa">
                        <FaWhatsapp /> Apply via WhatsApp
                      </a>
                      <a href="mailto:suryachikki@gmail.com" className="p-btn ml">
                        ✉️ Apply via Email
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={6}>
                <Card className="partner-card">
                  <div className="partner-header dark">
                    <div className="partner-icon"><FaTruck /></div>
                    <h3>Be a Wholesaler</h3>
                    <p>Stock our premium chikki products</p>
                  </div>
                  <Card.Body className="partner-body">
                    <ul className="partner-list">
                      <li><span className="partner-li-ic"><FaStar /></span>High-demand premium products</li>
                      <li><span className="partner-li-ic"><FaTrophy /></span>Competitive wholesale pricing</li>
                      <li><span className="partner-li-ic"><FaUsers /></span>Bulk order &amp; quick delivery</li>
                      <li><span className="partner-li-ic"><FaHandshake /></span>Reliable supply chain support</li>
                    </ul>
                    <div className="partner-actions">
                      <a href="https://wa.me/919429946364" target="_blank" rel="noopener noreferrer" className="p-btn wa">
                        <FaWhatsapp /> Enquire via WhatsApp
                      </a>
                      <a href="mailto:suryachikki@gmail.com" className="p-btn ml">
                        ✉️ Enquire via Email
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="contact-strip">
              <span><FaPhone /> Call us: <strong>+91 9429946364</strong></span>
              <span className="contact-divider" />
              <span><FaWhatsapp /> WhatsApp: <strong>+91 9429946364</strong></span>
            </div>
          </div>
        </section>

        {/* ══════ 6. BRAND STORY ══════ */}
        <section className="sec">
          <div className="wrap">
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <div className="story-img-wrap">
                  <img src={pcBanner1} alt="About" className="story-img" loading="lazy" decoding="async" />
                </div>
              </Col>
              <Col lg={6}>
                <span className="eyebrow left">
                  <span className="eyebrow-line" /> Our Story
                </span>
                <h2 className="sec-title left">
                  A Legacy of <em>Sweetness</em>
                </h2>
                <p className="story-text">
                  For over <strong>50 years</strong>, Surya Chikki has been crafting authentic
                  chikki with the perfect blend of tradition, taste, and quality.
                </p>
                <p className="story-text">
                  Every bite of our chikki carries the warmth of homemade goodness, using
                  only the <strong>finest natural ingredients</strong>.
                </p>
                <Link to="/about" className="btn-primary-pill" style={{ marginTop: '16px', display: 'inline-flex' }}>
                  Know More <FaArrowRight style={{ fontSize: '.75em' }} />
                </Link>
              </Col>
            </Row>
          </div>
        </section>

        {/* ══════ 7. TESTIMONIALS ══════ */}
        <section className="sec sec-tint">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">
                <span className="eyebrow-line" /> Testimonials <span className="eyebrow-line" />
              </span>
              <h2 className="sec-title">
                What People <em>Say</em>
              </h2>
            </div>

            <Row className="g-4">
              {[
                { name: 'Safin S', text: "Absolutely delicious! The best chikki I've ever had.", role: 'Verified Buyer · Mumbai' },
                { name: 'Amit', text: 'My family loves it. Premium quality and amazing taste.', role: 'Loyal Customer · Pune' },
                { name: 'Vishal', text: 'Perfect for gifting. Everyone loved the packaging too!', role: 'Regular Buyer · Delhi' }
              ].map((item, index) => (
                <Col key={index} md={4}>
                  <div className="testi-card">
                    <div className="testi-stars">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    </div>
                    <p className="testi-quote">"{item.text}"</p>
                    <div className="testi-who">
                      <span className="testi-avatar">{item.name.charAt(0)}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.role}</small>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* ══════ 8. FOLLOW US ══════ */}
        <section className="follow-sec">
          <div className="follow-tags-layer">
            <div className="follow-tags-track">
              {allTags.map((tag, index) => (
                <span key={`r1-${index}`} className="follow-tag">{tag}</span>
              ))}
              {allTags.map((tag, index) => (
                <span key={`r2-${index}`} className="follow-tag" aria-hidden="true">{tag}</span>
              ))}
            </div>
          </div>

          <div className="wrap follow-content">
            <span className="eyebrow gold">
              <span className="eyebrow-line" /> Connect With Us <span className="eyebrow-line" />
            </span>
            <h2 className="follow-title">
              Follow <em>Us</em>
            </h2>
            <div className="follow-avatar">
              <img src={followUsImg} alt="Follow Us" loading="lazy" decoding="async" />
            </div>
            <p className="follow-sub">
              Join our community and stay updated with our latest sweets and offers!
            </p>
            <div className="follow-socials">
              <a href="https://www.instagram.com/suryachikki.official" target="_blank" rel="noopener noreferrer" className="social-btn ig" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.facebook.com/share/1PTvkmhSDY/" target="_blank" rel="noopener noreferrer" className="social-btn fb" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://wa.me/919429946364" target="_blank" rel="noopener noreferrer" className="social-btn wa" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* ═══════════════════════════════════════════════════════════════
         CSS — light yellow theme, GPU-friendly, no heavy shadows/blurs
         ═══════════════════════════════════════════════════════════════ */}
      <style>{`
        :root{
          --yellow:#F2B705; --yellow-dk:#C99400; --yellow-lt:#FFD966;
          --soft:#FFFDF5; --soft-2:#FFF8E1;
          --ink:#1a1600; --ink-soft:#2e2a1a;
          --mut:#6b6248; --line:rgba(120,100,20,.12);
          --cream:#FFFDF5; --cream-dk:#FFF6DE;
        }

        .home-v2{
          font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
          color:var(--ink);
          background:#fff;
          overflow-x:hidden;
        }
        .home-v2 *{box-sizing:border-box;}
        .wrap{max-width:1280px;margin:0 auto;padding:0 28px;}

        /* ══════════ HERO ══════════ */
        .hero-wrap{position:relative;background:#1a1400;overflow:hidden;}
        .hero-carousel{position:relative;}
        .hero-item{position:relative;height:100vh;min-height:640px;max-height:900px;overflow:hidden;background:#1a1400;}
        .hero-item::after{content:'';position:absolute;inset:0;
          background:linear-gradient(to right,rgba(26,20,0,.82) 0%,rgba(26,20,0,.5) 45%,rgba(26,20,0,.15) 75%,rgba(26,20,0,.4) 100%);
          z-index:1;pointer-events:none;
        }
        .hero-img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
        .hero-overlay{position:absolute;inset:0;z-index:1;pointer-events:none;}

        .hero-caption{
          position:absolute;inset:0;z-index:3;
          display:flex;flex-direction:column;
          align-items:flex-start;justify-content:center;
          text-align:left;padding:0 8%;color:#fff;max-width:780px;
        }
        .hero-eyebrow{
          display:inline-flex;align-items:center;gap:14px;
          font-size:.72rem;font-weight:600;
          letter-spacing:.32em;text-transform:uppercase;
          color:var(--yellow-lt);margin-bottom:26px;
        }
        .hero-eyebrow-line{width:36px;height:1px;background:var(--yellow-lt);}

        .hero-headline{
          font-family:Georgia,'Times New Roman',serif;
          font-size:clamp(2.6rem,6vw,5rem);font-weight:700;
          line-height:1.05;letter-spacing:-.02em;margin:0 0 22px;
        }
        .hero-headline em{font-style:italic;color:#FFE08A;font-weight:800;}

        .hero-desc{
          font-size:clamp(.95rem,1.2vw,1.1rem);line-height:1.7;
          color:rgba(255,255,255,.82);max-width:520px;
          margin:0 0 34px;font-weight:300;
        }

        .hero-cta{
          display:inline-flex;align-items:center;gap:10px;
          padding:16px 40px;border-radius:999px;
          background:var(--yellow);color:#1a1600;
          font-size:.82rem;font-weight:700;
          letter-spacing:.12em;text-transform:uppercase;
          text-decoration:none;transition:background .25s ease,transform .25s ease;
        }
        .hero-cta:hover{background:var(--yellow-dk);color:#1a1600;transform:translateY(-2px);}

        .hero-side-info{
          position:absolute;right:40px;top:50%;transform:translateY(-50%);
          z-index:4;display:flex;flex-direction:column;
          align-items:center;gap:16px;color:rgba(255,255,255,.5);
        }
        .hero-side-num{font-family:Georgia,serif;font-size:1.1rem;font-weight:700;color:var(--yellow-lt);letter-spacing:.1em;}
        .hero-side-line{width:1px;height:80px;background:rgba(255,255,255,.25);}
        .hero-side-text{
          font-size:.62rem;font-weight:600;letter-spacing:.32em;
          text-transform:uppercase;writing-mode:vertical-rl;
          transform:rotate(180deg);color:rgba(255,255,255,.55);
        }

        .hero-carousel .carousel-indicators{bottom:32px;margin:0;left:auto;right:auto;width:100%;justify-content:center;}
        .hero-carousel .carousel-indicators [data-bs-target]{
          width:10px;height:10px;border-radius:50%;
          background:rgba(255,255,255,.45);border:none;margin:0 6px;
          opacity:1;transition:width .3s ease,background .3s ease;
        }
        .hero-carousel .carousel-indicators .active{width:36px;border-radius:6px;background:var(--yellow-lt);}

        /* ══════════ SECTION SKELETON ══════════ */
        .sec{padding:100px 0;background:#fff;}
        .sec-tint{background:var(--cream);}

        .sec-head{text-align:center;max-width:720px;margin:0 auto 52px;}
        .eyebrow{
          display:inline-flex;align-items:center;gap:14px;
          font-size:.68rem;font-weight:700;letter-spacing:.3em;
          text-transform:uppercase;color:var(--yellow-dk);margin-bottom:20px;
        }
        .eyebrow.left{justify-content:flex-start;margin-bottom:18px;}
        .eyebrow.gold{color:var(--yellow-lt);}
        .eyebrow-line{width:36px;height:1px;background:currentColor;opacity:.7;}

        .sec-title{
          font-family:Georgia,'Times New Roman',serif;
          font-size:clamp(2rem,3.8vw,3.2rem);font-weight:700;
          line-height:1.15;letter-spacing:-.02em;margin:0 0 16px;color:var(--ink);
        }
        .sec-title.left{text-align:left;}
        .sec-title em{font-style:italic;color:var(--yellow-dk);font-weight:800;}

        .sec-sub{font-size:1rem;line-height:1.7;color:var(--mut);max-width:560px;margin:0 auto;}

        /* ══════════ SLIDESHOW ══════════ */
        .sshow{
          position:relative;max-width:1000px;margin:0 auto;
          background:#fff;border-radius:28px;overflow:hidden;
          border:1px solid var(--line);
        }
        .sshow-stage{
          position:relative;width:100%;aspect-ratio:16/10;max-height:620px;
          overflow:hidden;background:var(--cream-dk);z-index:1;
        }
        .sshow-slide{
          position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
          padding:40px;opacity:0;transform:scale(.97);
          transition:opacity .6s ease,transform .6s ease;pointer-events:none;
        }
        .sshow-slide.on{opacity:1;transform:scale(1);pointer-events:auto;z-index:2;}
        .sshow-img-wrap{width:100%;height:100%;display:flex;align-items:center;justify-content:center;}
        .sshow-img{
          max-width:100%;max-height:100%;width:auto;height:auto;
          object-fit:contain;border-radius:16px;
        }

        .sshow-arrow{
          position:absolute;top:50%;transform:translateY(-50%);
          width:52px;height:52px;border-radius:50%;
          background:rgba(255,255,255,.96);border:1px solid var(--line);
          color:var(--ink);cursor:pointer;
          display:flex;align-items:center;justify-content:center;font-size:.9rem;
          transition:background .25s ease,color .25s ease;z-index:10;
        }
        .sshow-arrow:hover{background:var(--yellow);color:#1a1600;border-color:var(--yellow);}
        .sshow-arrow.l{left:20px;}
        .sshow-arrow.r{right:20px;}

        .sshow-counter{
          position:absolute;bottom:22px;right:22px;
          display:flex;align-items:baseline;gap:6px;
          background:rgba(255,255,255,.94);padding:10px 20px;
          border-radius:999px;font-family:Georgia,serif;z-index:10;
        }
        .sshow-count-cur{font-size:1.3rem;font-weight:700;color:var(--yellow-dk);}
        .sshow-count-sep{font-size:.8rem;color:var(--mut);}
        .sshow-count-tot{font-size:.85rem;color:var(--mut);}

        .sshow-bottom{
          display:flex;align-items:center;justify-content:space-between;
          gap:16px;flex-wrap:wrap;padding:22px 32px;
          background:#fff;border-top:1px solid var(--line);position:relative;z-index:2;
        }
        .sshow-dots{display:flex;gap:8px;}
        .sshow-dot{
          width:10px;height:10px;border:0;padding:0;
          background:#ecdfb8;border-radius:999px;cursor:pointer;
          transition:width .3s ease,background .3s ease;
        }
        .sshow-dot.on{width:32px;background:var(--yellow-dk);}

        .sshow-cta{
          display:inline-flex;align-items:center;gap:10px;
          padding:13px 30px;border-radius:999px;
          border:1.5px solid var(--yellow-dk);color:var(--yellow-dk);
          font-size:.74rem;font-weight:700;letter-spacing:.16em;
          text-transform:uppercase;text-decoration:none;
          transition:background .25s ease,color .25s ease;white-space:nowrap;
        }
        .sshow-cta:hover{background:var(--yellow);color:#1a1600;border-color:var(--yellow);}

        /* ══════════ FEED MARQUEE ══════════ */
        .feed-sec{padding-bottom:60px;}
        .marquee-viewport{overflow:hidden;padding:20px 0;margin-top:36px;}
        .marquee-track{
          display:flex;gap:20px;width:max-content;
          will-change:transform;animation:marqAnim 60s linear infinite;
        }
        .marquee-viewport:hover .marquee-track{animation-play-state:paused;}
        @keyframes marqAnim{to{transform:translate3d(-50%,0,0);}}
        .marquee-card{
          flex:0 0 auto;width:240px;height:240px;
          border-radius:20px;overflow:hidden;
          background:var(--cream-dk);border:1px solid var(--line);
          display:flex;align-items:center;justify-content:center;
          transition:transform .3s ease;
        }
        .marquee-card:hover{transform:translateY(-4px);}
        .marquee-card img{width:100%;height:100%;object-fit:cover;object-position:center;}

        /* ══════════ BUTTONS ══════════ */
        .btn-outline-pill,.btn-primary-pill{
          display:inline-flex;align-items:center;gap:10px;
          padding:15px 36px;border-radius:999px;
          font-size:.76rem;font-weight:700;letter-spacing:.16em;
          text-transform:uppercase;text-decoration:none;
          transition:background .25s ease,color .25s ease,transform .25s ease;
        }
        .btn-outline-pill{background:transparent;color:var(--yellow-dk);border:1.5px solid var(--yellow-dk);}
        .btn-outline-pill:hover{background:var(--yellow);color:#1a1600;border-color:var(--yellow);transform:translateY(-2px);}
        .btn-primary-pill{background:var(--yellow);color:#1a1600;}
        .btn-primary-pill:hover{background:var(--yellow-dk);color:#1a1600;transform:translateY(-2px);}

        /* ══════════ PARTNER CARDS ══════════ */
        .partner-card{
          border:1px solid var(--line)!important;border-radius:24px!important;
          overflow:hidden;height:100%;background:#fff;
          transition:transform .3s ease;
        }
        .partner-card:hover{transform:translateY(-4px);}

        .partner-header{padding:40px 36px 30px;color:#1a1600;position:relative;overflow:hidden;}
        .partner-header.yellow{background:linear-gradient(135deg,var(--yellow) 0%,var(--yellow-lt) 100%);}
        .partner-header.dark{background:linear-gradient(135deg,var(--ink-soft) 0%,var(--ink) 100%);color:#fff;}
        .partner-icon{
          width:60px;height:60px;border-radius:16px;
          background:rgba(255,255,255,.35);
          display:flex;align-items:center;justify-content:center;
          font-size:1.7rem;margin-bottom:16px;
          border:1px solid rgba(255,255,255,.5);
        }
        .partner-header.dark .partner-icon{
          background:rgba(255,255,255,.15);
          border:1px solid rgba(255,255,255,.2);
        }
        .partner-header h3{
          font-family:Georgia,serif;font-size:1.6rem;font-weight:700;margin:0 0 8px;
        }
        .partner-header p{font-size:.9rem;opacity:.85;margin:0;line-height:1.5;}

        .partner-body{padding:30px 36px!important;}
        .partner-list{list-style:none;margin:0 0 24px;padding:0;display:flex;flex-direction:column;gap:16px;}
        .partner-list li{display:flex;align-items:center;gap:14px;font-size:.92rem;color:#4a4126;line-height:1.5;}
        .partner-li-ic{
          width:34px;height:34px;border-radius:10px;flex-shrink:0;
          background:rgba(242,183,5,.15);color:var(--yellow-dk);
          display:flex;align-items:center;justify-content:center;font-size:.82rem;
        }

        .partner-actions{display:flex;flex-direction:column;gap:12px;}
        .p-btn{
          display:flex;align-items:center;justify-content:center;gap:10px;
          padding:15px;border-radius:999px;font-size:.8rem;font-weight:700;
          letter-spacing:.1em;text-transform:uppercase;text-decoration:none;color:#fff;
          transition:background .25s ease,transform .25s ease;
        }
        .p-btn.wa{background:#25D366;}
        .p-btn.wa:hover{background:#1EA952;transform:translateY(-2px);}
        .p-btn.ml{background:#EA4335;}
        .p-btn.ml:hover{background:#C5221F;transform:translateY(-2px);}

        .contact-strip{
          display:flex;align-items:center;justify-content:center;
          gap:32px;flex-wrap:wrap;margin-top:44px;padding:24px 32px;
          border-radius:999px;background:#fff;border:1px solid var(--line);
          font-size:.95rem;color:var(--ink-soft);
          max-width:720px;margin-left:auto;margin-right:auto;
        }
        .contact-strip span{display:inline-flex;align-items:center;gap:10px;}
        .contact-strip svg{color:var(--yellow-dk);}
        .contact-strip span:nth-child(3) svg{color:#25D366;}
        .contact-strip strong{color:var(--ink);font-weight:700;}
        .contact-divider{width:1px;height:20px;background:var(--line);display:inline-block!important;padding:0!important;}

        /* ══════════ STORY ══════════ */
        .story-img-wrap{border-radius:24px;overflow:hidden;background:var(--cream);border:1px solid var(--line);}
        .story-img{width:100%;display:block;object-fit:contain;object-position:center;}
        .story-text{font-size:1rem;line-height:1.85;color:var(--mut);margin:0 0 16px;}
        .story-text strong{color:var(--yellow-dk);font-weight:700;}

        /* ══════════ TESTIMONIALS ══════════ */
        .testi-card{
          padding:32px 28px;background:#fff;border-radius:22px;
          border:1px solid var(--line);height:100%;
          transition:transform .3s ease,border-color .3s ease;
        }
        .testi-card:hover{transform:translateY(-4px);border-color:rgba(242,183,5,.5);}
        .testi-stars{color:#E6A100;margin-bottom:18px;font-size:1rem;letter-spacing:2px;display:flex;gap:4px;}
        .testi-quote{
          font-family:Georgia,serif;font-style:italic;font-size:1rem;
          line-height:1.7;color:#4a4126;margin:0 0 24px;
        }
        .testi-who{display:flex;align-items:center;gap:14px;}
        .testi-avatar{
          width:46px;height:46px;border-radius:50%;flex-shrink:0;
          background:linear-gradient(135deg,var(--yellow),var(--yellow-lt));
          color:#1a1600;display:flex;align-items:center;justify-content:center;
          font-family:Georgia,serif;font-weight:700;font-size:1.1rem;
        }
        .testi-who strong{display:block;font-size:.92rem;font-weight:700;color:var(--ink);margin-bottom:2px;}
        .testi-who small{font-size:.72rem;color:var(--mut);letter-spacing:.04em;}

        /* ══════════ FOLLOW ══════════ */
        .follow-sec{
          position:relative;padding:130px 0 110px;
          background:var(--ink);overflow:hidden;
          text-align:center;color:#fff;
        }
        .follow-tags-layer{
          position:absolute;inset:0;display:flex;align-items:center;
          overflow:hidden;opacity:.05;pointer-events:none;
        }
        .follow-tags-track{
          display:flex;gap:80px;white-space:nowrap;
          will-change:transform;animation:scrollLeft 50s linear infinite;
        }
        .follow-tag{
          font-family:Georgia,serif;font-size:4rem;font-weight:900;
          letter-spacing:.12em;text-transform:uppercase;color:#fff;flex:0 0 auto;
        }
        @keyframes scrollLeft{to{transform:translate3d(-50%,0,0);}}

        .follow-content{position:relative;z-index:2;}

        .follow-title{
          font-family:Georgia,serif;font-size:clamp(2.4rem,5vw,4rem);
          font-weight:700;line-height:1.05;margin:24px 0 30px;
          letter-spacing:-.02em;color:#fff;
        }
        .follow-title em{font-style:italic;color:var(--yellow-lt);font-weight:800;}

        .follow-avatar{
          width:170px;height:170px;border-radius:50%;overflow:hidden;
          margin:0 auto 32px;border:4px solid var(--yellow);background:#fff;
        }
        .follow-avatar img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}

        .follow-sub{
          font-size:1.05rem;line-height:1.7;color:rgba(255,255,255,.65);
          max-width:520px;margin:0 auto 40px;font-weight:300;
        }

        .follow-socials{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;}
        .social-btn{
          width:60px;height:60px;border-radius:50%;
          border:1px solid rgba(255,255,255,.14);
          background:rgba(255,255,255,.04);color:#fff;
          display:flex;align-items:center;justify-content:center;font-size:1.35rem;
          text-decoration:none;transition:background .25s ease,transform .25s ease;
        }
        .social-btn:hover{transform:translateY(-4px);color:#fff;border-color:transparent;}
        .social-btn.ig:hover{background:#E1306C;}
        .social-btn.fb:hover{background:#1877F2;}
        .social-btn.wa:hover{background:#25D366;}

        /* ══════════ RESPONSIVE ══════════ */
        @media (max-width:991px){
          .hero-item{height:auto;min-height:88vh;max-height:none;aspect-ratio:9/16;}
          .hero-caption{padding:24px;max-width:100%;align-items:center;text-align:center;}
          .hero-side-info{display:none;}
          .hero-headline{font-size:clamp(2.2rem,8vw,3.4rem);}
          .hero-desc{margin-left:auto;margin-right:auto;}
          .hero-cta{padding:14px 32px;font-size:.78rem;}
          .hero-item::after{background:linear-gradient(to bottom,rgba(26,20,0,.7) 0%,rgba(26,20,0,.35) 40%,rgba(26,20,0,.55) 100%);}
          .sec{padding:72px 0;}
          .sec-head{margin-bottom:40px;}
          .sshow{border-radius:20px;}
          .sshow-stage{aspect-ratio:4/3;}
          .sshow-slide{padding:20px;}
          .sshow-arrow{width:42px;height:42px;font-size:.78rem;}
          .sshow-arrow.l{left:12px;}
          .sshow-arrow.r{right:12px;}
          .sshow-counter{bottom:14px;right:14px;padding:6px 12px;}
          .sshow-count-cur{font-size:1.1rem;}
          .sshow-bottom{padding:18px 22px;}
          .marquee-card{width:180px;height:180px;border-radius:16px;}
          .partner-card{border-radius:20px!important;}
          .partner-header{padding:34px 26px 26px;}
          .partner-header h3{font-size:1.4rem;}
          .partner-body{padding:26px 26px!important;}
          .contact-strip{flex-direction:column;gap:14px;padding:22px 20px;border-radius:20px;text-align:center;}
          .contact-divider{display:none!important;}
          .follow-sec{padding:90px 0 80px;}
          .follow-avatar{width:140px;height:140px;}
          .follow-tag{font-size:2.6rem;}
          .testi-card{padding:26px 22px;border-radius:18px;}
          .story-img-wrap{border-radius:20px;}
        }
        @media (max-width:520px){
          .wrap{padding:0 20px;}
          .sec-title{font-size:1.7rem;}
          .sshow-stage{aspect-ratio:1/1;}
          .marquee-card{width:150px;height:150px;}
          .follow-title{font-size:2rem;}
          .follow-avatar{width:120px;height:120px;}
          .partner-header h3{font-size:1.3rem;}
        }

        @media (prefers-reduced-motion:reduce){
          *,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important;}
          .marquee-track,.follow-tags-track{animation:none!important;}
        }
      `}</style>
    </>
  );
};

export default Home;