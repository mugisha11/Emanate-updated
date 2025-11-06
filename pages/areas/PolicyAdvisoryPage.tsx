import React from 'react';
import { Link } from 'react-router-dom';
import './PolicyAdvisoryPage.css';

const PolicyAdvisoryPage: React.FC = () => {
  return (
    <div className="policy-page">
      <header className="policy-hero" role="banner">
        <div className="hero-overlay">
          <div className="hero-inner">
            <h1 className="hero-title">Policy Advisory</h1>
            <p className="hero-lead">EMANATE provides evidence-based policy advice, technical assistance and stakeholder engagement to support better policymaking that improves lives.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Request Assistance</Link>
              <Link to="/research" className="btn btn-outline">See Our Research</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="policy-content">
        <section className="policy-intro container">
          <div className="intro-grid">
            <div className="intro-text">
              <h2>What we do</h2>
              <p>We translate evidence into practical policy advice and support governments, civil society and donors to design and implement effective, inclusive policies. Our approach combines rigorous research, stakeholder engagement and capacity building so reforms are measurable and sustainable.</p>
              <ul className="bullets">
                <li>Evidence-based policy briefs and recommendations</li>
                <li>Stakeholder consultations and workshops</li>
                <li>Technical assistance and capacity strengthening</li>
                <li>Monitoring, evaluation and learning (MEL) support</li>
              </ul>
            </div>
            <div className="intro-image">
              <img src="../../components/img/diverse-group-of-young-professionals-collaborating.jpg" alt="Policy workshop"/>
            </div>
          </div>
        </section>

        <section className="policy-stats">
          <div className="stats container">
            <div className="stat">
              <div className="stat-number">120+</div>
              <div className="stat-label">Policy Briefs</div>
            </div>
            <div className="stat">
              <div className="stat-number">40+</div>
              <div className="stat-label">Stakeholder Workshops</div>
            </div>
            <div className="stat">
              <div className="stat-number">30</div>
              <div className="stat-label">Countries Supported</div>
            </div>
          </div>
        </section>

        <section className="policy-services container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <article className="service-card">
              <h3>Policy Analysis</h3>
              <p>Rapid diagnostics, policy option appraisal and evidence synthesis to guide decision making.</p>
            </article>
            <article className="service-card">
              <h3>Stakeholder Engagement</h3>
              <p>Participatory workshops and consultations that ensure inclusive policy design.</p>
            </article>
            <article className="service-card">
              <h3>Technical Assistance</h3>
              <p>Longer-term support for implementation, monitoring and institutional strengthening.</p>
            </article>
          </div>
        </section>

        <section className="policy-cta container">
          <div className="cta-inner">
            <div>
              <h2>Work with us to influence better policy</h2>
              <p>Contact our policy team to discuss a tailored advisory package or partnership.</p>
            </div>
            <div>
              <Link to="/contact" className="btn btn-primary large">Contact the Policy Team</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PolicyAdvisoryPage;
