import { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function AboutSection() {
  return (
    <section id="about" className="content-section">
      <div className="section-header">
        <h2>ABOUT US</h2>
        <p className="section-kicker">Built for collective voice and transparent action.</p>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <h3>Who We Are</h3>
          <p>
            Civic is a digital civic engagement platform designed to empower communities by giving
            citizens a direct voice in local governance. We make it effortless to create petitions,
            contribute to sentiment polls, and follow responses from elected officials — all in one
            transparent ecosystem.
          </p>
          <div className="about-points">
            <div className="pill">Petitions that reach decision makers</div>
            <div className="pill">Polling with real-time sentiment</div>
            <div className="pill">Verified responses and progress</div>
          </div>
          <div className="about-highlight">
            <span className="highlight-label">Mission</span>
            <p>
              Strengthen democracy by making public participation simple, accessible, and
              data-driven — so every community can share ideas, concerns, and collective opinions
              openly and effectively.
            </p>
          </div>
        </div>

        <div className="about-media">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
            alt="Hands signing a digital petition"
            className="about-image about-image-primary"
          />
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80"
            alt="Digital documents and charts"
            className="about-image about-image-secondary"
          />
        </div>
      </div>

      <div className="feature-row">
        <div className="feature-card">
          <div className="feature-icon">🗳️</div>
          <h4>Petition Creation</h4>
          <p>Raise issues that matter, gather community backing, and deliver them directly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h4>Public Polling</h4>
          <p>Collect real-time sentiment on local matters with clear visual reporting.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🛰️</div>
          <h4>Transparent Governance</h4>
          <p>Track official responses, updates, and accountability across every initiative.</p>
        </div>
      </div>

      <div className="vision-block">
        <div>
          <h3>Our Vision</h3>
          <p>
            A future where every individual can influence local decisions, foster collective action,
            and hold institutions accountable through open data and meaningful collaboration.
          </p>
        </div>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-value">24/7</div>
            <div className="stat-label">Civic Participation</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">100%</div>
            <div className="stat-label">Transparent Updates</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">Zero</div>
            <div className="stat-label">Barriers to Entry</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="content-section">
      <div className="section-header">
        <h2>CONTACT US</h2>
        <p className="section-kicker">We respond quickly to every civic query.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-left">
          <div className="contact-card">
            <div className="contact-badge">Support & Partnerships</div>
            <h3>Let's collaborate for transparent governance</h3>
            <p>
              Share your ideas, partnership requests, or platform feedback. Our team is ready to
              help you launch petitions, polls, and reporting dashboards tailored to your community.
            </p>
            <div className="contact-meta">
              <div className="contact-item">
                <span className="contact-emoji">✉️</span>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">support@civixplatform.com</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-emoji">📞</span>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-value">+91 XXX-XXX-XXXX</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-emoji">📍</span>
                <div>
                  <div className="contact-label">Address</div>
                  <div className="contact-value">Digital Civic Engagement Office, India</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-emoji">⏰</span>
                <div>
                  <div className="contact-label">Support Hours</div>
                  <div className="contact-value">Mon–Fri, 9 AM – 6 PM IST</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
            </div>
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Tell us how we can help" rows="5" />
            <button type="submit">Send Message</button>
            <p className="contact-footnote">
              We aim to reply within one business day. Urgent civic issues are prioritized.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [panel, setPanel] = useState(null); // 'about' | 'contact' | null
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setShowDashboard(true);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
    }
  };

  const closePanel = () => setPanel(null);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
    setPanel(null);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
    setPanel(null);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
    setShowDashboard(true);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDashboard(false);
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  // Show Dashboard if user is logged in
  if (showDashboard && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <div className="app-root">
      {/* Fullscreen Spline background */}
      <div className="spline-wrap">
        <Spline scene="https://prod.spline.design/ezT7x73hQBfLV5TG/scene.splinecode" />
      </div>

      {/* Navbar overlay */}
      <header className="nav">
        <div className="nav-logo">DIGITALCIVIC</div>
        <nav className="nav-links">
          <button className="nav-link nav-button" onClick={closePanel}>
            Home
          </button>
          <button className="nav-link nav-button" onClick={() => setPanel('about')}>
            About Us
          </button>
          <button className="nav-link nav-button" onClick={() => setPanel('contact')}>
            Contact Us
          </button>
          {!user && (
            <>
              <button className="nav-link nav-button nav-button-primary" onClick={handleLoginClick}>
                Login
              </button>
              <button className="nav-link nav-button nav-button-secondary" onClick={handleRegisterClick}>
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Panels */}
      <main>
        {panel && (
          <div className="panel-overlay" onClick={closePanel}>
            <div className="info-panel" onClick={(e) => e.stopPropagation()}>
              <div className="panel-header">
                <h2>{panel === 'about' ? 'About Us' : 'Contact Us'}</h2>
                <button className="close-btn" onClick={closePanel} aria-label="Close panel">
                  ✕
                </button>
              </div>
              {panel === 'about' ? <AboutSection /> : <ContactSection />}
            </div>
          </div>
        )}
      </main>

      {/* Login Modal */}
      {showLogin && (
        <Login
          onLogin={handleLogin}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}

      {/* Register Modal */}
      {showRegister && (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
}
