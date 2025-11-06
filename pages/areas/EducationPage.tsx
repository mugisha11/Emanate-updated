import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './EducationPage.css';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const EducationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="education-page">
      <div className="education-content">
        {/* Main Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="hero-main"
        >
          <div className="hero-content">
            <motion.h1 
              variants={fadeIn}
              className="hero-title"
            >
              {t('education.title', 'Every Child Deserves Quality Education')}
            </motion.h1>
            <motion.p 
              variants={fadeIn}
              className="hero-subtitle"
            >
              {t('education.description', 'We work to ensure every child has access to quality education, creating brighter futures through learning.')}
            </motion.p>
            <motion.div variants={fadeIn} className="hero-cta">
              <Link to="/contact" className="primary-button">Support Our Work</Link>
              <Link to="/programmes" className="secondary-button">View Programmes</Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Impact Numbers */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="impact-banner"
        >
          <div className="impact-stats">
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Children Reached</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15</span>
              <span className="stat-label">Schools Supported</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">85%</span>
              <span className="stat-label">Graduation Rate</span>
            </div>
          </div>
        </motion.section>

        {/* Featured Programs */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="featured-programs"
        >
          <h2 className="section-title">Our Educational Programs</h2>
          <div className="programs-grid">
            <motion.div variants={scaleIn} className="program-card" style={{backgroundImage: `url('../../components/img/diverse-group-of-young-professionals-collaborating.jpg')`}}>
              <div className="program-overlay">
                <h3>Early Childhood Education</h3>
                <p>Building strong foundations for lifelong learning through play-based education.</p>
                <Link to="/programmes/early-childhood" className="learn-more">Learn More</Link>
              </div>
            </motion.div>
            
            <motion.div variants={scaleIn} className="program-card" style={{backgroundImage: `url('../../components/img/kids.jpg')`}}>
              <div className="program-overlay">
                <h3>Primary Education Support</h3>
                <p>Ensuring quality primary education through teacher training and resource provision.</p>
                <Link to="/programmes/primary-education" className="learn-more">Learn More</Link>
              </div>
            </motion.div>
            
            <motion.div variants={scaleIn} className="program-card" style={{backgroundImage: `url('../../components/img/hero.jpg')`}}>
              <div className="program-overlay">
                <h3>Community Learning Centers</h3>
                <p>Creating accessible spaces for education and community development.</p>
                <Link to="/programmes/learning-centers" className="learn-more">Learn More</Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Success Stories */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="success-stories"
        >
          <h2 className="section-title">Impact Stories</h2>
          <div className="stories-grid">
            <motion.div variants={scaleIn} className="story-card">
              <div className="story-image">
                <img src="../../components/img/peace.jpg" alt="Student Success Story" />
              </div>
              <div className="story-content">
                <h3>Peace's Journey to Education</h3>
                <p>"Thanks to the community learning center, I can now pursue my dreams of becoming a teacher."</p>
                <Link to="/stories/peace" className="read-story">Read Full Story</Link>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Image Gallery */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="image-gallery"
        >
          <h2 className="section-title">Our Impact in Action</h2>
          <div className="gallery-grid">
            <motion.div variants={scaleIn} className="gallery-item large">
              <img src="../../components/img/kids.jpg" alt="Children learning" />
              <div className="gallery-caption">
                <h3>Building Better Futures</h3>
                <p>Creating safe and engaging learning environments for all children</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="gallery-item">
              <img src="../../components/img/diverse-group-of-young-professionals-collaborating.jpg" alt="Teacher training" />
              <div className="gallery-caption">
                <h3>Teacher Development</h3>
                <p>Professional training for educators</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="gallery-item">
              <img src="../../components/img/peace.jpg" alt="Community engagement" />
              <div className="gallery-caption">
                <h3>Community Support</h3>
                <p>Working together for better education</p>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="cta-section"
        >
          <div className="cta-content">
            <h2>Make a Difference in Children's Education</h2>
            <p>Join us in our mission to provide quality education to every child in our community.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="donate-button">Donate Now</Link>
              <Link to="/join" className="volunteer-button">Become a Volunteer</Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default EducationPage;
