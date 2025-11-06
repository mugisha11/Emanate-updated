import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import logo from './img/imanate_logo.jpg';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation();

    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <img src={logo} alt="EMANATE Logo" className="footer-logo" />
                            <p className="text-gray-400 mb-4">{t('footer.tagline')}</p>
                            <div className="social-links">
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29h-3.128v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085c.645 1.956 2.52 3.38 4.744 3.42a9.875 9.875 0 01-6.117 2.107c-.397 0-.79-.023-1.175-.068a13.963 13.963 0 007.548 2.212c9.058 0 14.01-7.502 14.01-14.01 0-.213-.005-.426-.015-.637a9.953 9.953 0 002.42-2.51z" />
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="LinkedIn">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                </a>
                                <a href="#" className="social-link" aria-label="YouTube">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 className="footer-heading">{t('footer.research_heading')}</h4>
                            <ul className="footer-list">
                                <li className="footer-list-item">
                                    <NavLink to="/research/publications" className="footer-link">{t('footer.research.publications')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/research/case-studies" className="footer-link">{t('footer.research.case_studies')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/research/data" className="footer-link">{t('footer.research.data')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/resources/reports" className="footer-link">{t('footer.research.reports')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/resources/library" className="footer-link">{t('footer.research.library')}</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="footer-heading">{t('footer.areas_heading')}</h4>
                            <ul className="footer-list">
                                <li className="footer-list-item">
                                    <NavLink to="/areas/health" className="footer-link">{t('footer.areas.health')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/areas/education" className="footer-link">{t('footer.areas.education')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/areas/gender" className="footer-link">{t('footer.areas.gender')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/areas/youth" className="footer-link">{t('footer.areas.youth')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/areas/policy" className="footer-link">{t('footer.areas.policy')}</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="footer-heading">{t('footer.info_heading')}</h4>
                            <ul className="footer-list">
                                <li className="footer-list-item">
                                    <NavLink to="/about/team" className="footer-link">{t('footer.info.team')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/partnerships" className="footer-link">{t('footer.info.partnerships')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/careers" className="footer-link">{t('footer.info.careers')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/contact" className="footer-link">{t('footer.info.contact')}</NavLink>
                                </li>
                                <li className="footer-list-item">
                                    <NavLink to="/privacy" className="footer-link">{t('footer.info.privacy')}</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-contact">
                            <h4 className="footer-heading">{t('footer.contact_heading')}</h4>
                            <ul className="footer-list">
                                <li className="footer-list-item">
                                    <div className="contact-item">
                                        <svg className="w-5 h-5 contact-icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"/>
                                        </svg>
                                        <span>{t('footer.contact.location')}</span>
                                    </div>
                                </li>
                                <li className="footer-list-item">
                                    <div className="contact-item">
                                        <svg className="w-5 h-5 contact-icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                        <span>{t('footer.contact.email')}</span>
                                    </div>
                                </li>
                                <li className="footer-list-item">
                                    <div className="contact-item">
                                        <svg className="w-5 h-5 contact-icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                        </svg>
                                        <span>{t('footer.contact.phone')}</span>
                                    </div>
                                </li>
                                <li className="footer-list-item">
                                    <div className="contact-item">
                                        <svg className="w-5 h-5 contact-icon" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                        </svg>
                                        <span>{t('footer.contact.hours')}</span>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-6">
                                <h4 className="footer-heading">Newsletter</h4>
                                <form className="newsletter-form">
                                        <input 
                                        type="email" 
                                        placeholder={t('footer.newsletter.placeholder')} 
                                        className="newsletter-input"
                                        aria-label={t('footer.newsletter.placeholder')}
                                    />
                                    <button type="submit" className="newsletter-button">
                                        {t('footer.newsletter.subscribe')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="footer-bottom-text">{t('footer.copyright', { year })}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
