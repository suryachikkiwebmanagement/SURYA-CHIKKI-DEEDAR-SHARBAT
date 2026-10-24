import React from 'react';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaHeart, FaAward, FaClock, FaStar, FaUsers, FaQuoteLeft,
  FaMapMarker, FaBuilding, FaCalendarAlt
} from 'react-icons/fa';
import pcBanner1 from '../assets/images/pcbanners  (1).png';
import logo1 from '../assets/images/logo.png';
import logo2 from '../assets/images/logo2.png';

const statsData = [
  { icon: <FaCalendarAlt />, number: '1975',      label: 'Year Established', color: '#C99400' },
  { icon: <FaMapMarker />,   number: 'Bhavnagar', label: 'Our Roots',        color: '#E6A100' },
  { icon: <FaUsers />,       number: '10K+',      label: 'Happy Customers',  color: '#B8860B' },
  { icon: <FaStar />,        number: '4.9★',      label: 'Average Rating',   color: '#D4A017' },
];

const valuesData = [
  { icon: <FaHeart />,  title: 'Passion',  desc: 'Every product is made with love and dedication', color: '#E6A100' },
  { icon: <FaAward />,  title: 'Quality',  desc: 'Premium ingredients and traditional recipes',    color: '#C99400' },
  { icon: <FaClock />,  title: 'Tradition', desc: 'Authentic recipes passed down for generations', color: '#B8860B' },
];

const About = () => {
  return (
    <>
      <style>{CSS}</style>

      <section className="about-shell">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <Badge className="about-badge mb-3">
              Since 1975
            </Badge>
            <h1 className="about-h1">
              About <span className="accent">Us</span>
            </h1>
            <p className="about-lead">
              Born in the heart of Bhavnagar, rooted in tradition and taste
            </p>
          </div>

          {/* Main Story */}
          <Row className="align-items-center mb-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="story-media">
                <img
                  src={pcBanner1}
                  alt="Our Story"
                  className="story-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="story-pin">
                  <FaMapMarker className="pin-ic" />
                  Bhavnagar, Gujarat
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <h2 className="about-h2">
                Born in <span className="accent">1975</span> in the Heart of Bhavnagar
              </h2>
              <p className="about-p">
                Surya Chikki began with a simple mission: to share the rich, traditional taste
                of handcrafted chikki made from the finest ingredients. What started as a small,
                homegrown effort soon captured the hearts of local families — not through flashy
                marketing, but through pure quality and honest flavor.
              </p>
              <p className="about-p">
                Over the years, Surya Chikki has grown — not in haste, but with purpose.
                Slowly and steadily, we've earned a respected name across Gujarat and beyond,
                thanks to our unwavering commitment to authenticity, and the same timeless
                taste our customers first fell in love with.
              </p>
              <p className="about-p">
                From the streets of Bhavnagar to shelves across regions, Surya Chikki continues
                to stand for trust, tradition, and taste — a legacy built over decades, one
                chikki at a time.
              </p>
            </Col>
          </Row>

          {/* Stats */}
          <section className="stats-block mb-5">
            <Row className="g-4">
              {statsData.map((stat, index) => (
                <Col key={index} md={3} sm={6}>
                  <div className="stat-card">
                    <div className="stat-ic" style={{ color: stat.color }}>
                      {stat.icon}
                    </div>
                    <div className="stat-num">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </Col>
              ))}
            </Row>
          </section>

          {/* Brand Legacy */}
          <div className="legacy-block mb-5">
            <Row className="align-items-center">
              <Col lg={8}>
                <Badge className="about-badge mb-3">
                  <FaBuilding className="me-2" />
                  Surya Gruh Udyog
                </Badge>
                <h3 className="about-h3">
                  Two Brands, <span className="accent">One Legacy</span>
                </h3>
                <p className="about-p mb-0">
                  Surya Gruh Udyog proudly brings together <strong>Surya Chikki</strong> and
                  <strong> Deedar Sharbat</strong>, delivering authentic taste with
                  generations of trust. With decades of manufacturing excellence, we continue
                  crafting quality products rooted in tradition and consistency.
                </p>
              </Col>
              <Col lg={4} className="text-center mt-4 mt-lg-0">
                <div className="legacy-logos">
                  <div className="legacy-card">
                    <img src={logo1} alt="Surya Chikki" loading="lazy" decoding="async" />
                    <div className="legacy-name">Surya Chikki</div>
                  </div>
                  <div className="legacy-card">
                    <img src={logo2} alt="Deedar Sharbat" loading="lazy" decoding="async" />
                    <div className="legacy-name">Deedar Sharbat</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Values */}
          <div className="text-center mb-4">
            <Badge className="about-badge mb-3">Our Values</Badge>
            <h2 className="about-h2">
              What <span className="accent">Drives</span> Us
            </h2>
          </div>

          <Row className="g-3">
            {valuesData.map((value, index) => (
              <Col key={index} md={4} sm={6}>
                <Card className="value-card">
                  <div className="value-ic" style={{ color: value.color }}>
                    {value.icon}
                  </div>
                  <h5 className="value-title">{value.title}</h5>
                  <p className="value-desc">{value.desc}</p>
                </Card>
              </Col>
            ))}
          </Row>

          {/* CTA */}
          <div className="cta-block mt-5">
            <h2 className="cta-h">
              Taste the <span className="cta-accent">Tradition</span>
            </h2>
            <p className="cta-p">
              Experience the authentic taste of Surya Chikki &amp; Deedar Sharbat
            </p>
            <Link to="/inquiry">
              <Button className="cta-btn">
                Get in Touch <FaQuoteLeft className="ms-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   CSS — light yellow theme, GPU-friendly, no gradients in
   content surfaces, static shadows, no inline handlers
   ═══════════════════════════════════════════════════════════ */
const CSS = `
  :root{
    --y:#F2B705; --y-dk:#C99400; --y-lt:#FFD966;
    --ink:#1a1600; --ink-soft:#2e2a1a;
    --mut:#6b6248; --mut-2:#7a6f4e;
    --line:rgba(120,100,20,.14);
    --cream:#FFFDF5; --cream-2:#FFF8E1;
  }

  .about-shell{
    padding:60px 0;
    background:var(--cream);
    min-height:100vh;
    color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  }

  /* ─── Typography ─── */
  .accent{color:var(--y-dk);}

  .about-badge{
    background:var(--y) !important;
    color:var(--ink) !important;
    font-size:.78rem;
    letter-spacing:2px;
    border-radius:50px;
    padding:.5rem 1rem;
    font-weight:700;
    text-transform:uppercase;
  }

  .about-h1{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(2.2rem,5vw,3.5rem);
    font-weight:800;
    color:var(--ink);
    line-height:1.1;
  }

  .about-lead{
    color:var(--mut);
    font-size:1.05rem;
    max-width:600px;
    margin:0 auto;
  }

  .about-h2{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(1.6rem,3.2vw,2.5rem);
    font-weight:700;
    color:var(--ink);
    margin-bottom:1.1rem;
    line-height:1.2;
  }

  .about-h3{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(1.4rem,2.4vw,2rem);
    font-weight:700;
    color:var(--ink);
    margin-bottom:.6rem;
  }

  .about-p{
    color:#4a4126;
    font-size:1rem;
    line-height:1.8;
    margin-bottom:1rem;
  }
  .about-p strong{color:var(--y-dk);}

  /* ─── Main story media ─── */
  .story-media{
    position:relative;
    border-radius:20px;
    overflow:hidden;
    border:1px solid var(--line);
    background:#fff;
  }
  .story-img{
    width:100%;
    height:400px;
    object-fit:cover;
    display:block;
  }
  .story-pin{
    position:absolute;
    bottom:20px;
    left:20px;
    background:rgba(255,255,255,.96);
    padding:12px 20px;
    border-radius:12px;
    color:var(--y-dk);
    font-weight:700;
    border:1px solid var(--line);
    display:inline-flex;
    align-items:center;
    gap:8px;
    font-size:.92rem;
  }

  /* ─── Stats ─── */
  .stats-block{
    padding:40px 24px;
    background:var(--cream-2);
    border-radius:20px;
    border:1px solid var(--line);
  }
  .stat-card{
    text-align:center;
    padding:26px 18px;
    border-radius:16px;
    background:#fff;
    border:1px solid var(--line);
    height:100%;
    transition:transform .25s ease;
    will-change:transform;
  }
  .stat-card:hover{transform:translate3d(0,-4px,0);}
  .stat-ic{font-size:2.2rem;margin-bottom:10px;line-height:1;}
  .stat-num{
    font-family:Georgia,'Times New Roman',serif;
    font-size:1.9rem;
    font-weight:900;
    color:var(--ink);
    line-height:1.15;
    margin-bottom:4px;
  }
  .stat-label{font-size:.95rem;font-weight:600;color:var(--mut);}

  /* ─── Legacy ─── */
  .legacy-block{
    padding:36px 28px;
    border-radius:20px;
    background:#fff;
    border:1px solid var(--line);
  }
  .legacy-logos{
    display:flex;
    justify-content:center;
    gap:16px;
    flex-wrap:wrap;
  }
  .legacy-card{
    padding:14px 22px;
    border-radius:12px;
    background:var(--cream-2);
    border:1px solid var(--line);
    text-align:center;
    min-width:120px;
  }
  .legacy-card img{
    width:50px;
    height:50px;
    object-fit:contain;
    display:block;
    margin:0 auto 6px;
  }
  .legacy-name{font-weight:700;color:var(--ink);font-size:.9rem;}

  /* ─── Values ─── */
  .value-card{
    border:1px solid var(--line) !important;
    border-radius:16px !important;
    padding:24px;
    text-align:center;
    height:100%;
    background:#fff !important;
    transition:transform .25s ease;
    will-change:transform;
  }
  .value-card:hover{transform:translate3d(0,-4px,0);}
  .value-ic{font-size:2.6rem;margin-bottom:14px;line-height:1;}
  .value-title{font-weight:700;color:var(--ink);margin-bottom:.4rem;font-size:1.05rem;}
  .value-desc{color:var(--mut);font-size:.92rem;margin:0;line-height:1.6;}

  /* ─── CTA ─── */
  .cta-block{
    padding:40px;
    border-radius:20px;
    background:var(--ink);
    text-align:center;
    color:#fff;
  }
  .cta-h{
    color:#fff;
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(1.6rem,3.2vw,2.2rem);
    font-weight:700;
    margin-bottom:.8rem;
    line-height:1.2;
  }
  .cta-accent{color:var(--y-lt);}
  .cta-p{color:rgba(255,255,255,.7);font-size:1rem;margin-bottom:1.5rem;}

  .cta-btn{
    background:var(--y) !important;
    color:var(--ink) !important;
    border:none !important;
    padding:14px 45px !important;
    border-radius:50px !important;
    font-weight:700 !important;
    font-size:1rem !important;
    transition:background-color .2s ease !important;
  }
  .cta-btn:hover{
    background:var(--y-dk) !important;
    color:var(--ink) !important;
  }

  /* ─── Responsive ─── */
  @media (max-width:767px){
    .about-shell{padding:40px 0;}
    .story-img{height:280px;}
    .stats-block{padding:28px 16px;}
    .legacy-block{padding:26px 20px;}
    .cta-block{padding:28px 20px;}
    .cta-btn{padding:12px 32px !important;font-size:.95rem !important;}
  }

  @media (prefers-reduced-motion:reduce){
    .stat-card,.value-card,.cta-btn{
      transition:none !important;
      animation:none !important;
    }
    .stat-card:hover,.value-card:hover{transform:none;}
  }
`;

export default About;