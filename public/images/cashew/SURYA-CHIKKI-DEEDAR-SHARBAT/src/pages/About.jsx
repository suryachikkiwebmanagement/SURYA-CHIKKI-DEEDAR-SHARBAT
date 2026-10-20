import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaHeart, FaAward, FaClock, FaStar, FaUsers, FaTrophy, 
  FaQuoteLeft, FaMapMarker, FaBuilding, FaCalendarAlt 
} from 'react-icons/fa';
import pcBanner1 from '../assets/images/pcbanners  (1).png';
import logo1 from '../assets/images/logo.png';
import logo2 from '../assets/images/logo2.png';

const About = () => {
  return (
    <section style={{
      padding: '60px 0',
      background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
      minHeight: '100vh'
    }}>
      
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '0.8rem', letterSpacing: '2px', borderRadius: '50px' }}>
            Since 1975
          </Badge>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            color: '#1a1a2e',
            fontFamily: "'Playfair Display', serif"
          }}>
            About <span style={{ color: '#DC143C' }}>Us</span>
          </h1>
          <p style={{ color: '#777', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Born in the heart of Bhavnagar, rooted in tradition and taste
          </p>
        </div>

        {/* Main Story */}
        <Row className="align-items-center mb-5">
          <Col lg={6} className="mb-4 mb-lg-0">
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              position: 'relative'
            }}>
              <img 
                src={pcBanner1} 
                alt="Our Story" 
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(255,255,255,0.95)',
                padding: '15px 25px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}>
                <p style={{ margin: 0, color: '#DC143C', fontWeight: '700' }}>
                  <FaMapMarker style={{ marginRight: '8px' }} />
                  Bhavnagar, Gujarat
                </p>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1a1a2e',
              fontFamily: "'Playfair Display', serif",
              marginBottom: '20px'
            }}>
              Born in <span style={{ color: '#DC143C' }}>1975</span> in the Heart of Bhavnagar
            </h2>
            <p style={{
              color: '#555',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              marginBottom: '15px'
            }}>
              Surya Chikki began with a simple mission: to share the rich, traditional taste 
              of handcrafted chikki made from the finest ingredients. What started as a small, 
              homegrown effort soon captured the hearts of local families — not through flashy 
              marketing, but through pure quality and honest flavor.
            </p>
            <p style={{
              color: '#555',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              marginBottom: '20px'
            }}>
              Over the years, Surya Chikki has grown — not in haste, but with purpose. 
              Slowly and steadily, we've earned a respected name across Gujarat and beyond, 
              thanks to our unwavering commitment to authenticity, and the same timeless 
              taste our customers first fell in love with.
            </p>
            <p style={{
              color: '#555',
              fontSize: '1.05rem',
              lineHeight: '1.8',
              marginBottom: '20px'
            }}>
              From the streets of Bhavnagar to shelves across regions, Surya Chikki continues 
              to stand for trust, tradition, and taste — a legacy built over decades, one 
              chikki at a time.
            </p>
          </Col>
        </Row>

        {/* Stats Section */}
        <section style={{
          padding: '60px 0',
          background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
          borderRadius: '20px',
          marginBottom: '50px'
        }}>
          <Container>
            <Row className="g-4">
              {[
                { icon: <FaCalendarAlt />, number: '1975', label: 'Year Established', color: '#DC143C' },
                { icon: <FaMapMarker />, number: 'Bhavnagar', label: 'Our Roots', color: '#FF6B00' },
                { icon: <FaUsers />, number: '10K+', label: 'Happy Customers', color: '#2196F3' },
                { icon: <FaStar />, number: '4.9★', label: 'Average Rating', color: '#FFD700' }
              ].map((stat, index) => (
                <Col key={index} md={3} sm={6}>
                  <div style={{
                    textAlign: 'center',
                    padding: '30px 20px',
                    borderRadius: '16px',
                    background: 'white',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                    border: '1px solid rgba(220,20,60,0.06)',
                    transition: 'all 0.4s ease',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-10px)';
                    e.target.style.boxShadow = '0 20px 50px rgba(220,20,60,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.04)';
                  }}>
                    <div style={{
                      fontSize: '2.5rem',
                      color: stat.color,
                      marginBottom: '10px'
                    }}>
                      {stat.icon}
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: '900',
                      color: '#1a1a2e',
                      fontFamily: "'Playfair Display', serif",
                      background: 'linear-gradient(135deg, ' + stat.color + ', ' + stat.color + 'dd)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      {stat.number}
                    </div>
                    <div style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#555'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        {/* Brand Legacy Section */}
        <div style={{
          padding: '40px 30px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #FFF8F8, #FFFFFF)',
          border: '1px solid #f0e6e6',
          marginBottom: '50px'
        }}>
          <Row className="align-items-center">
            <Col lg={8}>
              <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '0.8rem', letterSpacing: '2px', borderRadius: '50px' }}>
                <FaBuilding style={{ marginRight: '8px' }} />
                Surya Gruh Udyog
              </Badge>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1a1a2e',
                fontFamily: "'Playfair Display', serif"
              }}>
                Two Brands, <span style={{ color: '#DC143C' }}>One Legacy</span>
              </h3>
              <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8' }}>
                Surya Gruh Udyog proudly brings together <strong style={{ color: '#DC143C' }}>Surya Chikki</strong> and 
                <strong style={{ color: '#DC143C' }}> Deedar Sharbat</strong>, delivering authentic taste with 
                generations of trust. With decades of manufacturing excellence, we continue 
                crafting quality products rooted in tradition and consistency.
              </p>
            </Col>
            <Col lg={4} className="text-center mt-4 mt-lg-0">
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  padding: '15px 25px',
                  borderRadius: '12px',
                  background: 'white',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #f0e6e6'
                }}>
                  <img 
                    src={logo1} 
                    alt="Surya Chikki" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto 8px'
                    }} 
                  />
                  <div style={{ fontWeight: '700', color: '#1a1a2e' }}>Surya Chikki</div>
                </div>
                <div style={{
                  padding: '15px 25px',
                  borderRadius: '12px',
                  background: 'white',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #f0e6e6'
                }}>
                  <img 
                    src={logo2} 
                    alt="Deedar Sharbat" 
                    style={{ 
                      width: '50px', 
                      height: '50px', 
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto 8px'
                    }} 
                  />
                  <div style={{ fontWeight: '700', color: '#1a1a2e' }}>Deedar Sharbat</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* Values Section */}
        <div className="text-center mb-5">
          <Badge bg="danger" className="mb-3 px-4 py-2" style={{ fontSize: '0.8rem', letterSpacing: '2px', borderRadius: '50px' }}>
            Our Values
          </Badge>
          <h2 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            color: '#1a1a2e',
            fontFamily: "'Playfair Display', serif"
          }}>
            What <span style={{ color: '#DC143C' }}>Drives</span> Us
          </h2>
        </div>

        <Row className="g-3">
          {[
            { icon: <FaHeart />, title: 'Passion', desc: 'Every product is made with love and dedication', color: '#DC143C' },
            { icon: <FaAward />, title: 'Quality', desc: 'Premium ingredients and traditional recipes', color: '#FF6B00' },
            { icon: <FaClock />, title: 'Tradition', desc: 'Authentic recipes passed down for generations', color: '#2196F3' }
          ].map((value, index) => (
            <Col key={index} md={4} sm={6}>
              <Card style={{
                border: 'none',
                borderRadius: '16px',
                padding: '25px',
                textAlign: 'center',
                boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
                height: '100%',
                background: '#FFFFFF'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(220,20,60,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.04)';
              }}>
                <div style={{
                  fontSize: '3rem',
                  color: value.color,
                  marginBottom: '15px'
                }}>
                  {value.icon}
                </div>
                <h5 style={{ fontWeight: '700', color: '#1a1a2e' }}>{value.title}</h5>
                <p style={{ color: '#777', fontSize: '0.95rem', margin: 0 }}>{value.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA Section */}
        <div style={{
          marginTop: '60px',
          padding: '40px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#FFFFFF',
            fontSize: '2.2rem',
            fontWeight: '700',
            fontFamily: "'Playfair Display', serif",
            marginBottom: '15px'
          }}>
            Taste the <span style={{ color: '#FF6B6B' }}>Tradition</span>
          </h2>
          <p style={{ color: '#aaa', fontSize: '1.05rem', marginBottom: '25px' }}>
            Experience the authentic taste of Surya Chikki & Deedar Sharbat
          </p>
          <Link to="/inquiry">
            <Button style={{
              background: 'linear-gradient(135deg, #DC143C, #FF0000)',
              border: 'none',
              padding: '14px 45px',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '1rem',
              boxShadow: '0 8px 30px rgba(220,20,60,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 12px 40px rgba(220,20,60,0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 8px 30px rgba(220,20,60,0.4)';
            }}>
              Get in Touch <FaQuoteLeft className="ms-2" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default About;