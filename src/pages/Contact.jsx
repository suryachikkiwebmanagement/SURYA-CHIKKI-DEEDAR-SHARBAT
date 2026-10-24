import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import {
  FaWhatsapp, FaEnvelope, FaPhone, FaMapMarker, FaClock,
  FaCheckCircle, FaInstagram, FaFacebook
} from 'react-icons/fa';

const CONTACT_INFO = [
  { icon: <FaPhone />,     label: 'Phone',   value: '+91 9429946364' },
  { icon: <FaEnvelope />,  label: 'Email',   value: 'suryachikki.admin@gmail.com' },
  { icon: <FaMapMarker />, label: 'Address', value: 'Bhavnagar, Gujarat' },
  { icon: <FaClock />,     label: 'Hours',   value: 'Mon–Sat: 9AM – 9PM' },
];

const SOCIALS = [
  { href: 'https://www.instagram.com/suryachikki.official', icon: <FaInstagram />, label: 'Instagram', cls: 'ig' },
  { href: 'https://www.facebook.com/share/1PTvkmhSDY/',     icon: <FaFacebook />,  label: 'Facebook',  cls: 'fb' },
  { href: 'https://wa.me/919429946364',                     icon: <FaWhatsapp />,  label: 'WhatsApp',  cls: 'wa' },
];

const EMPTY_FORM = { name: '', email: '', phone: '', subject: '', message: '' };

const Contact = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const resetTimer = useRef(null);

  // Clear any pending timer on unmount
  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formData;
    if (!name || !email || !message) return;

    const mailSubject = `Contact from ${name} - ${subject || 'General Inquiry'}`;
    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || 'Not provided'}\n` +
      `Subject: ${subject || 'General Inquiry'}\n\n` +
      `Message:\n${message}`;

    window.open(
      `mailto:suryachikki.admin@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`,
      '_blank'
    );

    setSubmitted(true);
    resetTimer.current = setTimeout(() => {
      setSubmitted(false);
      setFormData(EMPTY_FORM);
    }, 3000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello Surya Chikki Team,\n\n' +
      'I would like to get in touch with you.\n\n' +
      'Please get back to me.\n\n' +
      'Thank you!'
    );
    window.open(`https://wa.me/919429946364?text=${text}`, '_blank');
  };

  return (
    <>
      <style>{CSS}</style>

      <section className="ct-shell">
        <Container>
          {/* Header */}
          <div className="text-center mb-5">
            <Badge className="ct-badge mb-3">Get in Touch</Badge>
            <h1 className="ct-h1">
              Contact <span className="accent">Us</span>
            </h1>
            <p className="ct-lead">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <Row className="g-4">
            {/* Contact Info */}
            <Col lg={4}>
              <Card className="ct-info-card">
                <h4 className="ct-info-h">Contact Information</h4>

                <div className="ct-info-list">
                  {CONTACT_INFO.map((item, i) => (
                    <div key={i} className="ct-info-row">
                      <div className="ct-info-ic">{item.icon}</div>
                      <div>
                        <div className="ct-info-label">{item.label}</div>
                        <div className="ct-info-val">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="ct-wa-strip">
                  <FaWhatsapp className="ct-wa-ic" />
                  WhatsApp: +91 9429946364
                </div>

                {/* Social */}
                <div className="ct-socials">
                  <p className="ct-socials-label">Follow us:</p>
                  <div className="ct-social-row">
                    {SOCIALS.map((s, i) => (
                      <a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className={`ct-social ${s.cls}`}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Card>
            </Col>

            {/* Form */}
            <Col lg={8}>
              <Card className="ct-form-card">
                {submitted ? (
                  <div className="ct-success">
                    <div className="ct-success-ic">
                      <FaCheckCircle />
                    </div>
                    <h3 className="ct-success-h">Thank You!</h3>
                    <p className="ct-success-p">
                      Your message has been sent successfully. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="ct-label">Full Name *</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                            className="ct-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="ct-label">Email Address *</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="ct-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="ct-label">Phone</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            className="ct-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="ct-label">Subject</Form.Label>
                          <Form.Control
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is this about?"
                            className="ct-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="ct-label">Message *</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            required
                            className="ct-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="ct-actions">
                      <Button type="submit" className="ct-btn primary">
                        Send Message
                      </Button>
                      <Button
                        type="button"
                        onClick={handleWhatsApp}
                        className="ct-btn wa-outline"
                      >
                        <FaWhatsapp /> WhatsApp
                      </Button>
                    </div>

                    <p className="ct-footnote">
                      <FaCheckCircle className="ct-foot-ic" />
                      We'll respond within 24 hours
                    </p>
                  </Form>
                )}
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════
   CSS — light yellow theme, GPU-friendly, no gradients,
   dark info card for contrast, brand-colored social hovers
   ═══════════════════════════════════════════════════════════ */
const CSS = `
  :root{
    --y:#F2B705; --y-dk:#C99400; --y-lt:#FFD966;
    --ink:#1a1600; --ink-soft:#2e2a1a;
    --mut:#6b6248; --line:rgba(120,100,20,.16);
    --cream:#FFFDF5; --cream-2:#FFF8E1;
  }

  .ct-shell{
    padding:60px 0;
    background:var(--cream);
    min-height:100vh;
    color:var(--ink);
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;
  }
  .accent{color:var(--y-dk);}

  .ct-badge{
    background:var(--y) !important;
    color:var(--ink) !important;
    font-size:.78rem !important;
    letter-spacing:2px;
    border-radius:50px !important;
    padding:.5rem 1rem !important;
    font-weight:700;
    text-transform:uppercase;
  }

  .ct-h1{
    font-family:Georgia,'Times New Roman',serif;
    font-size:clamp(2.2rem,5vw,3.5rem);
    font-weight:800;
    color:var(--ink);
    line-height:1.1;
    margin-bottom:.6rem;
  }
  .ct-lead{
    color:var(--mut);
    font-size:1.05rem;
    max-width:600px;
    margin:0 auto;
  }

  /* ─── Info card (dark) ─── */
  .ct-info-card{
    border:1px solid var(--line) !important;
    border-radius:20px !important;
    padding:30px !important;
    background:var(--ink) !important;
    color:#fff !important;
    height:100%;
  }
  .ct-info-h{
    font-family:Georgia,'Times New Roman',serif;
    font-weight:700;
    margin-bottom:24px;
    font-size:1.2rem;
  }

  .ct-info-list{display:flex;flex-direction:column;gap:18px;margin-bottom:22px;}
  .ct-info-row{display:flex;align-items:center;gap:14px;}
  .ct-info-ic{
    width:44px;
    height:44px;
    border-radius:50%;
    background:rgba(255,255,255,.10);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.05rem;
    color:var(--y-lt);
    flex-shrink:0;
  }
  .ct-info-label{font-size:.75rem;opacity:.65;letter-spacing:.3px;text-transform:uppercase;}
  .ct-info-val{font-weight:600;font-size:.95rem;word-break:break-word;}

  .ct-wa-strip{
    padding:12px 16px;
    border-radius:12px;
    background:rgba(255,255,255,.05);
    border:1px solid rgba(255,255,255,.10);
    font-size:.88rem;
    margin-bottom:22px;
    display:flex;
    align-items:center;
    gap:8px;
  }
  .ct-wa-ic{color:#25D366;font-size:1.15rem;}

  .ct-socials-label{font-size:.88rem;opacity:.75;margin-bottom:10px;}
  .ct-social-row{display:flex;gap:12px;}

  .ct-social{
    width:40px;height:40px;border-radius:50%;
    background:rgba(255,255,255,.10);
    color:#fff;
    display:flex;align-items:center;justify-content:center;
    font-size:1.1rem;
    text-decoration:none;
    transition:background-color .2s ease;
  }
  .ct-social.ig:hover{background:#E4405F;color:#fff;}
  .ct-social.fb:hover{background:#1877F2;color:#fff;}
  .ct-social.wa:hover{background:#25D366;color:#fff;}

  /* ─── Form card (light) ─── */
  .ct-form-card{
    border:1px solid var(--line) !important;
    border-radius:20px !important;
    padding:32px !important;
    background:#fff !important;
    height:100%;
  }

  .ct-label{font-weight:600;color:var(--ink);font-size:.88rem;margin-bottom:.35rem;}
  .ct-input{
    border-radius:10px !important;
    padding:10px 12px !important;
    border:1px solid var(--line) !important;
    font-size:.92rem !important;
    background:#fff;
  }
  .ct-input:focus{
    border-color:var(--y) !important;
    box-shadow:0 0 0 3px rgba(242,183,5,.18) !important;
  }

  .ct-actions{
    display:flex;
    gap:12px;
    flex-wrap:wrap;
    margin-top:20px;
  }
  .ct-btn{
    border-radius:50px !important;
    padding:12px 28px !important;
    font-weight:700 !important;
    font-size:.9rem !important;
    display:inline-flex !important;
    align-items:center;
    justify-content:center;
    gap:8px;
    transition:background-color .15s ease,color .15s ease !important;
    flex:1;
    min-width:150px;
  }
  .ct-btn.primary{
    background:var(--y) !important;
    color:var(--ink) !important;
    border:1.5px solid var(--y) !important;
  }
  .ct-btn.primary:hover{background:var(--y-dk) !important;border-color:var(--y-dk) !important;}

  .ct-btn.wa-outline{
    background:transparent !important;
    color:#1EA952 !important;
    border:1.5px solid #25D366 !important;
  }
  .ct-btn.wa-outline:hover{
    background:#25D366 !important;
    color:#fff !important;
    border-color:#25D366 !important;
  }

  .ct-footnote{
    margin-top:14px;
    color:var(--mut);
    font-size:.85rem;
    display:flex;
    align-items:center;
    gap:6px;
  }
  .ct-foot-ic{color:#4CAF50;}

  /* ─── Success state ─── */
  .ct-success{text-align:center;padding:40px 20px;}
  .ct-success-ic{
    width:80px;height:80px;border-radius:50%;
    background:#4CAF50;color:#fff;
    display:flex;align-items:center;justify-content:center;
    margin:0 auto 20px;
    font-size:2.6rem;
  }
  .ct-success-h{
    font-family:Georgia,'Times New Roman',serif;
    font-weight:700;
    color:var(--ink);
    margin-bottom:.5rem;
  }
  .ct-success-p{color:var(--mut);margin:0;}

  /* ─── Responsive ─── */
  @media (max-width:767px){
    .ct-shell{padding:40px 0;}
    .ct-form-card{padding:22px !important;}
    .ct-info-card{padding:24px !important;}
    .ct-actions{flex-direction:column;}
    .ct-btn{width:100%;flex:none !important;}
  }

  @media (prefers-reduced-motion:reduce){
    .ct-social,.ct-btn{transition:none !important;}
  }
`;

export default Contact;