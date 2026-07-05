import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar, FaInstagram, FaFacebook, FaWhatsapp, FaPlay, FaTrophy, FaUsers, FaAward, FaHandshake, FaBox, FaTruck, FaPhone, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import mobileBanner1 from '../assets/images/banner(1).png';
import mobileBanner2 from '../assets/images/banner(2).png';
import mobileBanner3 from '../assets/images/banner(3).png';
import mobileBanner4 from '../assets/images/banner(4).png';
import mobileBanner5 from '../assets/images/banner(5).png';
import pcBanner1 from '../assets/images/pcbanners  (1).png';
import pcBanner2 from '../assets/images/pcbanners  (2).png';
import pcBanner3 from '../assets/images/pcbanners  (3).png';
import pcBanner4 from '../assets/images/pcbanners  (4).png';
import pcBanner5 from '../assets/images/pcbanners  (5).png';
import followUsImg from '../assets/images/followusimg.png';

// Import Traditional Chikki images (JPEG)
import tcimages1 from '../assets/images/tcimages (1).png';
import tcimages2 from '../assets/images/tcimages (2).png';
import tcimages3 from '../assets/images/tcimages (3).png';


// Import Refreshing Sharbat images (PNG)
import rsimage1 from '../assets/images/rsimages (1).png';
import rsimage2 from '../assets/images/rsimages (2).png';
import rsimage3 from '../assets/images/rsimages (3).png';
// Import only fromourfeed images (1) to (7)
import feedImg1 from '../assets/images/fromourfeed (1).jpeg';
import feedImg2 from '../assets/images/fromourfeed (2).jpeg';
import feedImg3 from '../assets/images/fromourfeed (3).jpeg';
import feedImg4 from '../assets/images/fromourfeed (4).jpeg';
import feedImg5 from '../assets/images/fromourfeed (5).jpeg';
import feedImg6 from '../assets/images/fromourfeed (6).jpeg';
import feedImg7 from '../assets/images/fromourfeed (7).jpeg';

const Home = () => {
  const banners = [
    { id: 1, mobile: mobileBanner1, pc: pcBanner1 },
  
    { id: 4, mobile: mobileBanner4, pc: pcBanner4 },
    { id: 5, mobile: mobileBanner5, pc: pcBanner5 }
  ];

  // Traditional Chikki slideshow data - Titles removed, only images remain
  const traditionalChikkiSlides = [
    { id: 1, image: tcimages1 },
    { id: 2, image: tcimages2 },
    { id: 3, image: tcimages3 },
 
  ];

  // Refreshing Sharbat slideshow data - Titles removed, only images remain
  const sharbatSlides = [
    { id: 1, image: rsimage1 },
    { id: 2, image: rsimage2 },
    { id: 3, image: rsimage3 }
  ];

  // All product images
  const productImages = [
    feedImg1, feedImg2, feedImg3, feedImg4, 
  feedImg5, feedImg6, feedImg7
  ];

  // Create seamless infinite loop by duplicating images 3 times
  const continuousImages = [];
  for (let i = 0; i < 3; i++) {
    continuousImages.push(...productImages);
  }

  const allTags = [
    'Tasty', 'Flavorful', 'Savory', 'Delightful', 'Wholesome',
    'Nutritious', 'Freshness', 'Purity', 'Excellence', 'Finest',
    'Superior', 'Signature', 'Tradition & Trust', 'Heritage', 'Legacy',
    'Classic', 'Timeless', 'Authenticity', 'Trust', 'Reliability',
    'Commitment', 'Dedication', 'Integrity', 'Pride', 'Craftsmanship'
  ];

  const tags = [];
  for (let i = 0; i < 10; i++) {
    tags.push(...allTags);
  }

  // Slideshow state
  const [chikkiCurrentIndex, setChikkiCurrentIndex] = useState(0);
  const [sharbatCurrentIndex, setSharbatCurrentIndex] = useState(0);
  const [isChikkiAnimating, setIsChikkiAnimating] = useState(false);
  const [isSharbatAnimating, setIsSharbatAnimating] = useState(false);

  // Auto-play for Chikki slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChikkiAnimating) {
        setChikkiCurrentIndex((prevIndex) => 
          prevIndex === traditionalChikkiSlides.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isChikkiAnimating]);

  // Auto-play for Sharbat slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSharbatAnimating) {
        setSharbatCurrentIndex((prevIndex) => 
          prevIndex === sharbatSlides.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isSharbatAnimating]);

  // Navigation functions for Chikki
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

  // Navigation functions for Sharbat
  const goToPreviousSharbat = () => {
    if (!isSharbatAnimating) {
      setIsSharbatAnimating(true);
      setSharbatCurrentIndex((prevIndex) =>
        prevIndex === 0 ? sharbatSlides.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsSharbatAnimating(false), 800);
    }
  };

  const goToNextSharbat = () => {
    if (!isSharbatAnimating) {
      setIsSharbatAnimating(true);
      setSharbatCurrentIndex((prevIndex) =>
        prevIndex === sharbatSlides.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsSharbatAnimating(false), 800);
    }
  };

  // Go to specific slide
  const goToChikkiSlide = (index) => {
    if (!isChikkiAnimating && index !== chikkiCurrentIndex) {
      setIsChikkiAnimating(true);
      setChikkiCurrentIndex(index);
      setTimeout(() => setIsChikkiAnimating(false), 800);
    }
  };

  const goToSharbatSlide = (index) => {
    if (!isSharbatAnimating && index !== sharbatCurrentIndex) {
      setIsSharbatAnimating(true);
      setSharbatCurrentIndex(index);
      setTimeout(() => setIsSharbatAnimating(false), 800);
    }
  };

  // Advanced Slideshow Renderer Component - Updated to show only images
  const SlideshowRenderer = ({ slides, currentIndex, goToPrevious, goToNext, goToSlide, linkTo, buttonText }) => (
    <div style={{
      position: 'relative',
      maxWidth: '900px',
      margin: '0 auto',
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04)',
      background: '#FFFFFF',
      transition: 'box-shadow 0.4s ease',
      '&:hover': {
        boxShadow: '0 30px 80px rgba(220,20,60,0.12)'
      }
    }}>
      {/* Decorative Background Glow */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-30%',
        width: '60%',
        height: '100%',
        background: 'radial-gradient(circle, rgba(220,20,60,0.03) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>

      {/* Slideshow Wrapper */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        overflow: 'hidden',
        zIndex: 1
      }}>
        {/* Slides - Only images now, no titles or descriptions */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === (currentIndex - 1 + slides.length) % slides.length;
          const isNext = index === (currentIndex + 1) % slides.length;

          return (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive 
                  ? 'scale(1) translateX(0)' 
                  : isPrev 
                    ? 'scale(0.9) translateX(-30px)' 
                    : 'scale(0.9) translateX(30px)',
                transition: 'all 800ms cubic-bezier(0.65, 0, 0.35, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '35px',
                background: '#FFFFFF',
                pointerEvents: isActive ? 'auto' : 'none',
                zIndex: isActive ? 2 : 1
              }}
            >
              {/* Image Container with Zoom Effect - Full size now */}
              <div style={{
                width: '100%',
                maxWidth: '600px',
                height: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0',
                position: 'relative',
                transform: isActive ? 'scale(1)' : 'scale(0.85)',
                transition: 'transform 800ms cubic-bezier(0.65, 0, 0.35, 1)'
              }}>
                <img
                  src={slide.image}
                  alt={`Slide ${slide.id}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '16px',
                    transition: 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
                    filter: isActive ? 'brightness(1)' : 'brightness(0.7) blur(2px)',
                    transform: isActive ? 'scale(1)' : 'scale(0.9)',
                    boxShadow: isActive ? '0 10px 40px rgba(220,20,60,0.08)' : 'none'
                  }}
                />
                {/* Subtle Image Overlay Gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
                  borderRadius: '0 0 16px 16px',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.8s ease'
                }}></div>
              </div>

              {/* Button only - No title/description */}
              <div style={{
                textAlign: 'center',
                padding: '0 20px',
                transform: isActive ? 'translateY(0)' : 'translateY(20px)',
                opacity: isActive ? 1 : 0,
                transition: 'all 700ms cubic-bezier(0.65, 0, 0.35, 1) 200ms',
                marginTop: '20px'
              }}>
                <Link to={linkTo}>
                  <Button 
                    variant="outline-danger" 
                    style={{
                      borderRadius: '50px',
                      padding: '12px 35px',
                      fontWeight: '700',
                      fontSize: '0.95rem',
                      borderWidth: '2px',
                      transition: 'all 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
                      transform: isActive ? 'scale(1)' : 'scale(0.9)',
                      opacity: isActive ? 1 : 0.6,
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#DC143C';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05) translateY(-2px)';
                      e.target.style.boxShadow = '0 10px 30px rgba(220,20,60,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#DC143C';
                      e.target.style.transform = 'scale(1) translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {buttonText} <FaArrowRight className="ms-2" style={{ transition: 'transform 0.3s ease' }} />
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}

        {/* Animated Navigation Arrows */}
        <button
          onClick={goToPrevious}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.95)',
            border: '2px solid rgba(220,20,60,0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            zIndex: 10,
            color: '#1a1a2e',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#DC143C';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
            e.target.style.boxShadow = '0 10px 30px rgba(220,20,60,0.3)';
            e.target.style.borderColor = '#DC143C';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.95)';
            e.target.style.color = '#1a1a2e';
            e.target.style.transform = 'translateY(-50%) scale(1)';
            e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
            e.target.style.borderColor = 'rgba(220,20,60,0.1)';
          }}
        >
          <FaChevronLeft style={{ fontSize: '1.2rem' }} />
        </button>

        <button
          onClick={goToNext}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.95)',
            border: '2px solid rgba(220,20,60,0.1)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.65, 0, 0.35, 1)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            zIndex: 10,
            color: '#1a1a2e',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#DC143C';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-50%) scale(1.1)';
            e.target.style.boxShadow = '0 10px 30px rgba(220,20,60,0.3)';
            e.target.style.borderColor = '#DC143C';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.95)';
            e.target.style.color = '#1a1a2e';
            e.target.style.transform = 'translateY(-50%) scale(1)';
            e.target.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
            e.target.style.borderColor = 'rgba(220,20,60,0.1)';
          }}
        >
          <FaChevronRight style={{ fontSize: '1.2rem' }} />
        </button>
      </div>

      {/* Animated Pagination Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        padding: '22px 0 25px',
        background: '#FFFFFF',
        position: 'relative',
        zIndex: 2
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              width: index === currentIndex ? '40px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              background: index === currentIndex 
                ? 'linear-gradient(135deg, #DC143C, #FF6B6B)' 
                : '#e0e0e0',
              cursor: 'pointer',
              transition: 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (index !== currentIndex) {
                e.target.style.background = '#b0b0b0';
                e.target.style.transform = 'scale(1.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (index !== currentIndex) {
                e.target.style.background = '#e0e0e0';
                e.target.style.transform = 'scale(1)';
              }
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <>

      {/* ===== 1. FULL SCREEN BANNER CAROUSEL ===== */}
      <section style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        paddingTop: '0px'
      }}>
        <Carousel 
          fade 
          controls={true} 
          indicators={true}
          interval={4000}
          pause={false}
          style={{ height: '100%' }}
        >
          {banners.map((banner, index) => (
            <Carousel.Item key={index} style={{ height: '100vh', position: 'relative' }}>
              <img
                src={banner.mobile}
                alt={'Mobile Banner ' + (index + 1)}
                className="d-block d-lg-none"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              <img
                src={banner.pc}
                alt={'PC Banner ' + (index + 1)}
                className="d-none d-lg-block"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
              
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%)'
              }}></div>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
                padding: '20px'
              }}>
                <Badge 
                  bg="danger" 
                  className="mb-4 px-4 py-2" 
                  style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '600', 
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    borderRadius: '50px'
                  }}
                >
                  Since 1975
                </Badge>
                
                <h1 style={{
                  fontSize: '4rem',
                  fontWeight: '800',
                  fontFamily: "'Playfair Display', serif",
                  textShadow: '2px 2px 30px rgba(0,0,0,0.4)',
                  marginBottom: '15px',
                  lineHeight: '1.1'
                }}>
                
                  <span style={{ fontSize: '2.5rem', fontWeight: '400' }}>Made with Love</span>
                </h1>
                
                <p style={{
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: '500px',
                  marginBottom: '30px',
                  fontWeight: '300'
                }}>
                  Authentic taste since 1975
                </p>

                <Link to="/chikki">
                  <Button 
                    style={{
                      background: '#DC143C',
                      border: 'none',
                      padding: '14px 40px',
                      borderRadius: '50px',
                      fontWeight: '600',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 20px rgba(220,20,60,0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 6px 30px rgba(220,20,60,0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 20px rgba(220,20,60,0.4)';
                    }}
                  >
                    View Collection <FaArrowRight className="ms-2" />
                  </Button>
                </Link>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>

        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 5,
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.8rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '20px',
            height: '30px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '10px',
            margin: '0 auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '3px',
              height: '8px',
              background: '#DC143C',
              borderRadius: '2px'
            }}></div>
          </div>
        </div>
      </section>

     
      {/* ===== 3. TRADITIONAL CHIKKI - PREMIUM SLIDESHOW (No Titles) ===== */}
      <section style={{
        padding: '70px 0',
        background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
        position: 'relative'
      }}>
        {/* Animated Background Element */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,20,60,0.03) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>

        <Container>
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1a1a2e',
              fontFamily: "'Playfair Display', serif"
            }}>
             <i>Taste The<span style={{ color: '#DC143C' }}> Tradition</span></i>
            </h2>
            
            <b><h3><i>Premium<span style={{ color: '#DC143C' }}> Chikki</span></i></h3></b>
         

          <SlideshowRenderer
            slides={traditionalChikkiSlides}
            currentIndex={chikkiCurrentIndex}
            goToPrevious={goToPreviousChikki}
            goToNext={goToNextChikki}
            goToSlide={goToChikkiSlide}
            linkTo="/chikki"
            buttonText="Explore Chikkis"
          /> </div>
        </Container>
      </section>

      {/* ===== 4. REFRESHING SHARBAT - PREMIUM SLIDESHOW (No Titles) ===== */}
      <section style={{
        padding: '70px 0',
        background: '#FFFFFF',
        position: 'relative'
      }}>
        {/* Animated Background Element */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,20,60,0.03) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        <Container>
          <div className="text-center mb-5">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1a1a2e',
              fontFamily: "'Playfair Display', serif"
            }}>
              Refreshing <span style={{ color: '#DC143C' }}>Sharbat</span>
            </h2>
       

          <SlideshowRenderer
            slides={sharbatSlides}
            currentIndex={sharbatCurrentIndex}
            goToPrevious={goToPreviousSharbat}
            goToNext={goToNextSharbat}
            goToSlide={goToSharbatSlide}
            linkTo="/sharbat"
            buttonText="Explore Sharbats"
          />   </div>
        </Container>
      </section>

      {/* ===== 5. OUR COLLECTION - CONTINUOUS INFINITE LOOP ===== */}
      <section style={{
        padding: '50px 0',
        background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Container fluid>
          <div className="text-center mb-4">
            <Badge bg="danger" className="mb-2 px-4 py-2" style={{ fontSize: '0.7rem', letterSpacing: '2px', borderRadius: '50px' }}>
              Our Collection
            </Badge>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1a1a2e',
              fontFamily: "'Playfair Display', serif"
            }}>
              From  <span style={{ color: '#DC143C' }}>Our Feed</span>
            </h2>
            <p style={{ color: '#777', fontSize: '1rem' }}>
              Discover our complete range of authentic chikkis
            </p>
          </div>

          {/* CONTINUOUS INFINITE LOOP - SEAMLESS SCROLLING */}
          <div style={{
            display: 'flex',
            animation: 'scrollImagesContinuous 25s linear infinite',
            whiteSpace: 'nowrap',
            gap: '15px',
            padding: '15px 0',
            cursor: 'grab',
            width: 'max-content'
          }}>
            {continuousImages.map((img, index) => (
              <div 
                key={index} 
                style={{
                  flex: '0 0 auto',
                  width: '220px',
                  height: '170px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  border: '2px solid rgba(220,20,60,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.08) rotate(-2deg)';
                  e.target.style.boxShadow = '0 20px 50px rgba(220,20,60,0.12)';
                  e.target.style.borderColor = '#DC143C';
                  e.target.style.zIndex = '10';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1) rotate(0deg)';
                  e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.04)';
                  e.target.style.borderColor = 'rgba(220,20,60,0.05)';
                  e.target.style.zIndex = '1';
                }}
              >
                <img
                  src={img}
                  alt={'Product ' + (index + 1)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50px',
                  background: 'linear-gradient(to top, rgba(220,20,60,0.1), transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '0';
                }}></div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/chikki">
              <Button 
                variant="outline-danger" 
                style={{
                  borderRadius: '50px',
                  padding: '10px 35px',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  borderWidth: '2px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#DC143C';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#DC143C';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                View All Products <FaArrowRight className="ms-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== 6. GET OUR AGENCY / BE A WHOLESALER ===== */}
      <section style={{
        padding: '70px 0',
        background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
        position: 'relative'
      }}>
        <Container>
          <div className="text-center mb-5">
            <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '0.8rem', letterSpacing: '2px', borderRadius: '50px' }}>
              Partner With Us
            </Badge>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: '800',
              color: '#1a1a2e',
              fontFamily: "'Playfair Display', serif"
            }}>
              Get Our <span style={{ color: '#DC143C' }}>Agency</span> or Become a <span style={{ color: '#DC143C' }}>Wholesaler</span>
            </h2>
            <p style={{ color: '#777', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Join the Surya Chikki family and grow your business with our premium products
            </p>
          </div>

          <Row className="g-4">
            <Col lg={6}>
              <Card style={{
                border: 'none',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                transition: 'all 0.4s ease',
                height: '100%',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(220,20,60,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
              }}>
                <div style={{
                  padding: '30px 30px 20px',
                  background: 'linear-gradient(135deg, #DC143C, #FF0000)',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}><FaHandshake /></div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '700' }}>Become an Agency</h3>
                  <p style={{ opacity: '0.9', margin: 0 }}>Represent our brand in your region</p>
                </div>
                <Card.Body style={{ padding: '25px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaTrophy style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>50+ years of trusted brand legacy</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaUsers style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>10K+ happy customers network</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaBox style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>Premium quality product range</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaAward style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>Marketing & logistics support</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="https://wa.me/919429946364?text=Hi%20Surya%20Chikki%20Team%2C%0A%0AI%20am%20interested%20in%20becoming%20an%20Agency%20partner.%0A%0APlease%20share%20more%20details%20about%3A%0A-%20Agency%20requirements%0A-%20Investment%20and%20terms%0A-%20Area%20availability%0A-%20Support%20provided%0A%0AThank%20you!"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button style={{
                        width: '100%',
                        borderRadius: '50px',
                        padding: '12px',
                        fontWeight: '700',
                        background: '#25D366',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 8px 25px rgba(37,211,102,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        <FaWhatsapp /> Apply via WhatsApp
                      </Button>
                    </a>
                    
                    <a
                      href="mailto:suryachikki@gmail.com?subject=Agency%20Partnership%20Inquiry&body=Hi%20Surya%20Chikki%20Team%2C%0A%0AI%20am%20interested%20in%20becoming%20an%20Agency%20partner.%0A%0APlease%20share%20more%20details%20about%3A%0A-%20Agency%20requirements%0A-%20Investment%20and%20terms%0A-%20Area%20availability%0A-%20Support%20provided%0A%0AThank%20you!"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button style={{
                        width: '100%',
                        borderRadius: '50px',
                        padding: '12px',
                        fontWeight: '700',
                        background: '#EA4335',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 8px 25px rgba(234,67,53,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        ✉️ Apply via Email
                      </Button>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card style={{
                border: 'none',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                transition: 'all 0.4s ease',
                height: '100%',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(220,20,60,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
              }}>
                <div style={{
                  padding: '30px 30px 20px',
                  background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
                  color: 'white'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '10px' }}><FaTruck /></div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: '700' }}>Be a Wholesaler</h3>
                  <p style={{ opacity: '0.9', margin: 0 }}>Stock our premium chikki products</p>
                </div>
                <Card.Body style={{ padding: '25px' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaStar style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>High-demand premium products</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaTrophy style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>Competitive wholesale pricing</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <FaUsers style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>Bulk order & quick delivery</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <FaHandshake style={{ color: '#DC143C' }} />
                      <span style={{ color: '#555' }}>Reliable supply chain support</span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <a
                      href="https://wa.me/919429946364?text=Hi%20Surya%20Chikki%20Team%2C%0A%0AI%20am%20interested%20in%20becoming%20a%20Wholesaler.%0A%0APlease%20share%20more%20details%20about%3A%0A-%20Wholesale%20pricing%20and%20discounts%0A-%20Minimum%20order%20quantity%0A-%20Delivery%20terms%0A-%20Product%20catalog%0A%0AThank%20you!"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button style={{
                        width: '100%',
                        borderRadius: '50px',
                        padding: '12px',
                        fontWeight: '700',
                        background: '#25D366',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 8px 25px rgba(37,211,102,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        <FaWhatsapp /> Enquire via WhatsApp
                      </Button>
                    </a>
                    
                    <a
                      href="mailto:suryachikki@gmail.com?subject=Wholesale%20Partnership%20Inquiry&body=Hi%20Surya%20Chikki%20Team%2C%0A%0AI%20am%20interested%20in%20becoming%20a%20Wholesaler.%0A%0APlease%20share%20more%20details%20about%3A%0A-%20Wholesale%20pricing%20and%20discounts%0A-%20Minimum%20order%20quantity%0A-%20Delivery%20terms%0A-%20Product%20catalog%0A%0AThank%20you!"
                      style={{ textDecoration: 'none' }}
                    >
                      <Button style={{
                        width: '100%',
                        borderRadius: '50px',
                        padding: '12px',
                        fontWeight: '700',
                        background: '#EA4335',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'scale(1.02)';
                        e.target.style.boxShadow = '0 8px 25px rgba(234,67,53,0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }}>
                        ✉️ Enquire via Email
                      </Button>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div style={{
            marginTop: '40px',
            padding: '30px',
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #FFF5F5, #FFFFFF)',
            border: '1px solid #f0e6e6',
            textAlign: 'center'
          }}>
            <p style={{ color: '#555', marginBottom: '10px' }}>
              <FaPhone style={{ color: '#DC143C', marginRight: '10px' }} />
              Call us for bulk inquiries: <strong style={{ color: '#DC143C' }}>+91 9429946364</strong>
            </p>
            <p style={{ color: '#555', margin: 0 }}>
              <FaWhatsapp style={{ color: '#25D366', marginRight: '10px' }} />
              WhatsApp: <strong style={{ color: '#25D366' }}>+91 9429946364</strong>
            </p>
          </div>
        </Container>
      </section>

      {/* ===== 2. BRAND STORY with KNOW MORE BUTTON ===== */}
      <section style={{
        padding: '80px 0',
        background: '#FFFFFF'
      }}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <img 
                src={pcBanner1} 
                alt="About" 
                style={{
                  width: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.06)'
                }}
              />
            </Col>
            <Col lg={6}>
              <Badge 
                bg="danger" 
                className="mb-3 px-4 py-2" 
                style={{ 
                  fontSize: '0.7rem', 
                  letterSpacing: '2px',
                  borderRadius: '50px'
                }}
              >
                Our Story
              </Badge>
              
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1a1a2e',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '20px'
              }}>
                A Legacy of <span style={{ color: '#DC143C' }}>Sweetness</span>
              </h2>
              
              <p style={{
                color: '#555',
                fontSize: '1rem',
                lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                For over <strong style={{ color: '#DC143C' }}>50 years</strong>, Surya Chikki has been crafting authentic chikki 
                with the perfect blend of tradition, taste, and quality. What started as a small 
                family recipe has grown into a beloved brand trusted by thousands across India.
              </p>
              
              <p style={{
                color: '#555',
                fontSize: '1rem',
                lineHeight: '1.8',
                marginBottom: '25px'
              }}>
                Every bite of our chikki carries the warmth of homemade goodness, 
                using only the <strong style={{ color: '#DC143C' }}>finest natural ingredients</strong> and time-honored techniques 
                passed down through generations.
              </p>

              {/* KNOW MORE BUTTON */}
              <Link to="/about">
                <Button 
                  style={{
                    background: '#DC143C',
                    border: 'none',
                    padding: '14px 40px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 20px rgba(220,20,60,0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 30px rgba(220,20,60,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) translateY(0)';
                    e.target.style.boxShadow = '0 4px 20px rgba(220,20,60,0.3)';
                  }}
                >
                  Know More <FaArrowRight />
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== 7. TESTIMONIALS ===== */}
      <section style={{
        padding: '60px 0',
        background: '#FFFFFF'
      }}>
        <Container>
          <div className="text-center mb-4">
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1a1a2e',
              fontFamily: "'Playfair Display', serif"
            }}>
              What People Say
            </h2>
          </div>

          <Row>
            {[
              { name: 'Safin S', text: 'Absolutely delicious! The best chikki I\'ve ever had.' },
              { name: 'Amit', text: 'My family loves it. Premium quality and amazing taste.' },
              { name: 'Vishal', text: 'Perfect for gifting. Everyone loved the packaging too!' }
            ].map((item, index) => (
              <Col key={index} md={4} className="mb-3 mb-md-0">
                <Card style={{
                  border: 'none',
                  borderRadius: '12px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.04)',
                  height: '100%'
                }}>
                  <div style={{ color: '#FFD700', marginBottom: '10px' }}>
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p style={{ color: '#555', fontSize: '0.95rem', fontStyle: 'italic' }}>
                    "{item.text}"
                  </p>
                  <h6 style={{ fontWeight: '600', color: '#1a1a2e', margin: 0 }}>{item.name}</h6>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ===== 8. FOLLOW US SECTION ===== */}
      <section style={{
        position: 'relative',
        padding: '120px 0',
        background: '#0d0d1a',
        overflow: 'hidden',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          opacity: 0.08,
          overflow: 'hidden',
          gap: '50px'
        }}>
          <div style={{
            display: 'flex',
            animation: 'scrollLeft 25s linear infinite',
            whiteSpace: 'nowrap',
            gap: '100px'
          }}>
            {tags.map((tag, index) => (
              <span key={'r1-' + index} style={{
                fontSize: '4.5rem',
                fontWeight: '900',
                color: 'white',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '6px',
                textTransform: 'uppercase'
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{
            display: 'flex',
            animation: 'scrollLeft 30s linear infinite',
            whiteSpace: 'nowrap',
            gap: '100px'
          }}>
            {tags.map((tag, index) => (
              <span key={'r2-' + index} style={{
                fontSize: '3.5rem',
                fontWeight: '900',
                color: 'white',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '5px',
                opacity: 0.6,
                textTransform: 'uppercase'
              }}>
                ✦ {tag} ✦
              </span>
            ))}
          </div>

          <div style={{
            display: 'flex',
            animation: 'scrollLeft 20s linear infinite',
            whiteSpace: 'nowrap',
            gap: '100px'
          }}>
            {tags.map((tag, index) => (
              <span key={'r3-' + index} style={{
                fontSize: '5rem',
                fontWeight: '900',
                color: 'white',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '8px',
                opacity: 0.7,
                textTransform: 'uppercase'
              }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{
            display: 'flex',
            animation: 'scrollLeft 35s linear infinite',
            whiteSpace: 'nowrap',
            gap: '100px'
          }}>
            {tags.map((tag, index) => (
              <span key={'r4-' + index} style={{
                fontSize: '3rem',
                fontWeight: '900',
                color: 'white',
                fontFamily: "'Playfair Display', serif",
                letterSpacing: '4px',
                opacity: 0.5,
                textTransform: 'uppercase'
              }}>
                ✦ {tag} ✦
              </span>
            ))}
          </div>
        </div>

        <Container style={{ position: 'relative', zIndex: 2 }}>
          <Row className="align-items-center justify-content-center">
            <Col lg={6} className="text-center">
              <Badge 
                bg="danger" 
                className="mb-4 px-4 py-2" 
                style={{ 
                  fontSize: '0.8rem', 
                  letterSpacing: '2px',
                  borderRadius: '50px'
                }}
              >
                Connect With Us
              </Badge>
              <h2 style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                color: 'white',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '20px',
                textShadow: '0 2px 30px rgba(0,0,0,0.3)'
              }}>
                Follow <span style={{ color: '#FF6B6B' }}>Us</span>
              </h2>
              
              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '20px auto',
                border: '4px solid #DC143C',
                boxShadow: '0 0 40px rgba(220,20,60,0.3)',
                background: '#fff'
              }}>
                <img 
                  src={followUsImg} 
                  alt="Follow Us" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>

              <p style={{
                color: '#aaa',
                fontSize: '1.1rem',
                marginBottom: '30px'
              }}>
                Join our community and stay updated with our latest sweets and offers!
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <a
                  href="https://www.instagram.com/suryachikki.official?igsh=MWV0aW1jbHBjMTR2YQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    fontSize: '1.8rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#E4405F';
                    e.target.style.transform = 'translateY(-5px) scale(1.1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://www.facebook.com/share/1PTvkmhSDY/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    fontSize: '1.8rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#1877F2';
                    e.target.style.transform = 'translateY(-5px) scale(1.1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <FaFacebook />
                </a>

                <a
                  href="https://wa.me/919429946364"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    fontSize: '1.8rem'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#25D366';
                    e.target.style.transform = 'translateY(-5px) scale(1.1)';
                    e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.05)';
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <FaWhatsapp />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ===== CSS ANIMATIONS ===== */}
      <style>{`
        @keyframes scrollImagesContinuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .d-block {
          display: block !important;
        }
        .d-none {
          display: none !important;
        }
        @media (min-width: 992px) {
          .d-lg-none {
            display: none !important;
          }
          .d-lg-block {
            display: block !important;
          }
        }

        /* Responsive Styles for Slideshow */
        @media (max-width: 768px) {
          .slideshow-container {
            height: 400px !important;
          }
          .slideshow-image-container {
            height: 200px !important;
            max-width: 250px !important;
          }
          .slideshow-title {
            font-size: 1.5rem !important;
          }
          .slideshow-nav-button {
            width: 35px !important;
            height: 35px !important;
          }
        }

        @media (max-width: 576px) {
          .slideshow-container {
            height: 350px !important;
          }
          .slideshow-image-container {
            height: 150px !important;
            max-width: 200px !important;
          }
          .slideshow-title {
            font-size: 1.2rem !important;
          }
          .slideshow-description {
            font-size: 0.9rem !important;
          }
          .slideshow-nav-button {
            width: 30px !important;
            height: 30px !important;
            left: 5px !important;
            right: 5px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Home;