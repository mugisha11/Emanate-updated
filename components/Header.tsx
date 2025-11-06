import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

// Local logo and styles
import logoSrc from './img/logo.jpg';
import './Header.css';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'sw', name: 'Swahili' },
        { code: 'fr', name: 'French' }
    ];

    const { t, i18n } = useTranslation();

    const currentLang = languages.find(l => l.code === i18n.language) ?? languages[0];

    const navLinkClasses = "text-gray-600 hover:text-cyan-600 px-2 py-1 rounded-md text-xs font-medium transition-colors";
    const activeNavLinkClasses = "text-cyan-600 bg-cyan-50";

    const getNavLinkClass = ({ isActive }: { isActive: boolean }) => 
        isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses;

    return (
        <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-40 transition-all duration-200">
            <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-3 lg:py-4">
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="logo-container relative">
                            <img 
                                src={logoSrc} 
                                alt="EMANATE logo" 
                                className="logo-image h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
                                loading="eager"
                                decoding="async"
                            />
                            <div className="logo-overlay absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-lg sm:text-xl font-bold tracking-wider text-gray-800 hidden sm:inline transform transition-transform duration-300 group-hover:scale-105">EMANATE</span>
                    </NavLink>

                    <div className="hidden md:block flex-1">
                        <nav className="flex items-center justify-center">
                            <div className="flex space-x-8">
                                <NavLink to="/" className={getNavLinkClass}>{t('nav.home')}</NavLink>
                                <NavLink to="/about" className={getNavLinkClass}>{t('nav.about')}</NavLink>
                                <NavLink to="/programmes" className={getNavLinkClass}>{t('nav.programmes')}</NavLink>
                                <NavLink to="/news" className={getNavLinkClass}>{t('nav.news')}</NavLink>
                                <NavLink to="/contact" className={getNavLinkClass}>{t('nav.contact')}</NavLink>
                            </div>
                        </nav>
                    </div>

                    <div className="flex items-center w-52 justify-end">
                        {/* Desktop: language switcher + Join Us */}
                        <div className="hidden md:flex items-center gap-3">
                            <div className="relative">
                                <button
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-cyan-600 px-2 py-1 rounded-md"
                                    aria-haspopup="true"
                                        aria-expanded={isLangMenuOpen ? 'true' : 'false'}
                                >
                                    {currentLang.code.toUpperCase()}
                                    <ChevronDownIcon className="h-4 w-4" />
                                </button>

                                {isLangMenuOpen && (
                                    <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg py-1 w-36 z-50">
                                        {languages.map(lang => (
                                            <button
                                                key={lang.code}
                                                                onClick={() => {
                                                                    i18n.changeLanguage(lang.code);
                                                                    try { localStorage.setItem('emanate_lang', lang.code); } catch(e){}
                                                                    try { document.documentElement.lang = lang.code; } catch(e){}
                                                                    setIsLangMenuOpen(false);
                                                                }}
                                                className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <NavLink
                                to="/join"
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors"
                            >
                                {t('join')}
                            </NavLink>
                        </div>

                        {/* Mobile: menu button (kept) */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500"
                                aria-expanded={isMenuOpen ? 'true' : 'false'}
                                aria-label="Toggle navigation"
                            >
                                <span className="sr-only">Open main menu</span>
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu - overlay style */}
            {isMenuOpen && (
                <div className="md:hidden absolute inset-x-0 top-full bg-white shadow-md z-40" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <NavLink to="/" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</NavLink>
                        <NavLink to="/about" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</NavLink>
                        <NavLink to="/programmes" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} onClick={() => setIsMenuOpen(false)}>{t('nav.programmes')}</NavLink>
                        <NavLink to="/news" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} onClick={() => setIsMenuOpen(false)}>{t('nav.news')}</NavLink>
                        <NavLink to="/contact" className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`} onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</NavLink>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
