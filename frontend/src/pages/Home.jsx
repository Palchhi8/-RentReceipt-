import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Shield, BarChart3, User, Download, CheckCircle, Star, Home as HomeIcon } from 'lucide-react';
import CountUp from 'react-countup';
import '../styles/Home.css';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FiArrowRight } from "react-icons/fi";
import { useMotionTemplate, useMotionValue, motion, animate } from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const AnimatedHeroSection = ({ isVisible }) => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200 hero-section"
      id="hero"
    >
      {/* Stars background - only one, absolutely positioned */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      <div className={`hero-content relative z-10 ${isVisible ? 'animate-fade-in' : ''}`}>
        <div className="hero-text">
          <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            Smart Rent Receipts. Simple. Secure. Legal.
          </h1>
          <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
            Track rent payments, generate legal receipts, and stay organized — all in one place.
          </p>
          <div className="home-actions">
            <Link to="/register">
              <button className="btn-primary">Get Started</button>
            </Link>
            <button className="btn-secondary">View Demo</button>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="receipt-mockup">
            <div className="receipt-header">
              <div className="receipt-logo">🧾</div>
              <div className="receipt-title">Rent Receipt</div>
            </div>
            <div className="receipt-content">
              <div className="receipt-row">
                <span>Tenant:</span>
                <span>Gunjan Jain</span>
              </div>
              <div className="receipt-row">
                <span>Amount:</span>
                <span>₹25,000</span>
              </div>
              <div className="receipt-row">
                <span>Month:</span>
                <span>December 2024</span>
              </div>
              <div className="receipt-row">
                <span>Property:</span>
                <span>3BHK, Sector 18</span>
              </div>
            </div>
            <div className="receipt-footer">
              <div className="receipt-status">✅ Verified & Legal</div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const Home = () => {
  const [isVisible, setIsVisible] = useState({});

  const features = [
    {
      icon: <FileText className="feature-icon" />,
      title: "Auto Rent Receipts",
      description: "Get monthly PDF receipts automatically generated and delivered to your email"
    },
    {
      icon: <Mail className="feature-icon" />,
      title: "Email Reminders", 
      description: "Never miss a rent date with smart automated reminders for tenants and landlords"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Role-Based Dashboard",
      description: "Separate secure dashboards for tenants & landlords with personalized features"
    },
    {
      icon: <BarChart3 className="feature-icon" />,
      title: "Track Payments",
      description: "Visual rent history and statistics to keep your finances organized"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      icon: <User className="step-icon" />,
      title: "Sign Up as Landlord or Tenant",
      description: "Choose your role and create your secure account in under 2 minutes"
    },
    {
      step: "2", 
      icon: <HomeIcon className="step-icon" />,
      title: "Add Properties & Rent Details",
      description: "Input property information and rental terms for automatic processing"
    },
    {
      step: "3",
      icon: <Download className="step-icon" />,
      title: "Receive & Download Receipts Monthly",
      description: "Get professional PDF receipts delivered automatically every month"
    }
  ];

  const testimonials = [
    {
      name: "Aakash Kumar",
      role: "Landlord in Delhi",
      avatar: "👨‍💼",
      quote: "Managing rent has never been easier. This tool saved me hours every month!"
    },
    {
      name: "Priya Sharma",
      role: "Tenant",
      avatar: "👩‍💻",
      quote: "I love that I get proper receipts now. Super helpful during tax filing."
    },
    {
      name: "Rajesh Gupta",
      role: "Property Manager",
      avatar: "👨",
      quote: "Finally, a solution that understands Indian rental requirements. Highly recommended!"
    }
  ];

  const stats = [
    { number: 15000, suffix: '+', label: 'Active Users' },
    { number: 99.9, suffix: '%', label: 'Uptime' },
    { number: 50000, suffix: '+', label: 'Receipts Generated' },
    { number: 4.9, suffix: '★', label: 'User Rating' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      {/* Animated Hero Section */}
      <AnimatedHeroSection isVisible={isVisible.hero} />

      {/* Custom Stats Section - Redesigned */}
      <section className="custom-stats-section" id="stats">
        <div className="custom-stats-heading">
          "Powering Trust with Performance — Here's What Sets Us Apart" <span className="highlight">Trusted. Tested. Transparent.</span>
        </div>
        <div className="custom-stats-row">
          {stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              <div className="custom-stat-box">
                <span className="custom-stat-number">
                  {isVisible.stats ? (
                    <CountUp end={stat.number} duration={2} separator="," decimals={stat.suffix === '%' || stat.suffix === '★' ? 1 : 0} />
                  ) : (
                    stat.suffix === '%' || stat.suffix === '★' ? '0.0' : '0'
                  )}{stat.suffix}
                </span>
                <span className="custom-stat-label">
                  {idx === 0 && 'Active Users'}
                  {idx === 1 && 'System Uptime'}
                  {idx === 2 && 'Receipts Generated'}
                  {idx === 3 && 'Average User Rating'}
                </span>
              </div>
              {idx !== stats.length - 1 && <div className="custom-stat-divider" />}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className={`features-content ${isVisible.features ? 'animate-slide-up' : ''}`}>
          <h2>What Makes RentReceipt Different?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" id="how-it-works">
        <div className={`how-it-works-content ${isVisible['how-it-works'] ? 'animate-slide-up' : ''}`}>
          <h2>How It Works</h2>
          <div className="steps-container">
            {howItWorks.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.step}</div>
                {step.icon}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="screenshots-section" id="screenshots">
        <div className={`screenshots-content ${isVisible.screenshots ? 'animate-fade-in' : ''}`}>
          <h2>See RentReceipt in Action</h2>
          <div className="screenshots-grid">
            <div className="screenshot-card">
              <div className="screenshot-mockup dashboard-mockup">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-title">Dashboard</div>
                </div>
                <div className="mockup-content">
                  <div className="dashboard-stats">
                    <div className="stat-box">
                      <div className="stat-number">₹75,000</div>
                      <div className="stat-label">This Month</div>
                    </div>
                    <div className="stat-box">
                      <div className="stat-number">3</div>
                      <div className="stat-label">Properties</div>
                    </div>
                  </div>
                  <div className="dashboard-recent">
                    <div className="recent-item">
                      <span className="recent-dot"></span>
                      <span>Payment received from John</span>
                    </div>
                    <div className="recent-item">
                      <span className="recent-dot"></span>
                      <span>Receipt generated for Dec</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="screenshot-caption">Clean, intuitive dashboard for landlords</p>
            </div>

            <div className="screenshot-card">
              <div className="screenshot-mockup receipt-mockup-large">
                <div className="mockup-header">
                  <div className="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div className="mockup-title">Rent Receipt</div>
                </div>
                <div className="mockup-content">
                  <div className="receipt-preview">
                    <div className="receipt-logo-large">🧾 RentReceipt</div>
                    <div className="receipt-details">
                      <div className="detail-row">
                        <span>Receipt No:</span>
                        <span>#RR-2024-12-001</span>
                      </div>
                      <div className="detail-row">
                        <span>Amount:</span>
                        <span>₹25,000</span>
                      </div>
                      <div className="detail-row">
                        <span>Date:</span>
                        <span>01 Dec 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="screenshot-caption">Professional PDF receipts ready for tax filing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className={`testimonials-content ${isVisible.testimonials ? 'animate-fade-in' : ''}`}>
          <h2>What Our Users Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <blockquote>"{testimonial.quote}"</blockquote>
                <div className="testimonial-author">
                  <span className="author-avatar">{testimonial.avatar}</span>
                  <div className="author-info">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section" id="final-cta">
        <div className={`final-cta-content ${isVisible['final-cta'] ? 'animate-slide-up' : ''}`}>
          <h2>Ready to simplify your rent tracking?</h2>
          <p>Join hundreds of landlords and tenants who trust RentReceipt for their rental management.</p>
          <Link to="/register">
            <button className="btn-primary-large">Create Your Account</button>
          </Link>
          <div className="trust-badges">
            <div className="trust-badge">
              <CheckCircle className="trust-icon" />
              <span>500+ receipts generated</span>
            </div>
            <div className="trust-badge">
              <CheckCircle className="trust-icon" />
              <span>Free forever for tenants</span>
            </div>
            <div className="trust-badge">
              <CheckCircle className="trust-icon" />
              <span>Legal compliance guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>🧾 RentReceipt</h3>
            <p>Smart rent management for modern India</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <a href="#contact">Contact</a>
              <a href="#help">Help Center</a>
              <a href="#privacy">Privacy Policy</a>
            </div>
            <div className="footer-section">
              <h4>Connect</h4>
              <a href="mailto:support@rentreceipt.in">support@rentreceipt.in</a>
              <a href="#linkedin">LinkedIn</a>
              <a href="#github">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Made with ❤️ by Palchhi Jain</p>
          <p>&copy; 2024 RentReceipt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;