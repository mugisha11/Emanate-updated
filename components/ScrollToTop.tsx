import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './Icons';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = (opts?: ScrollToOptions) => {
        window.scrollTo({
            top: 0,
            behavior: (opts && opts.behavior) || 'smooth'
        });
    };

    // Scroll to top on route change
    useEffect(() => {
        // small timeout to allow page layout to settle
        const t = setTimeout(() => scrollToTop({ behavior: 'auto' }), 10);
        return () => clearTimeout(t);
    }, [location.pathname]);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <>
             {isVisible && (
                <button
                    onClick={() => scrollToTop({ behavior: 'smooth' })}
                    className="fixed bottom-24 right-6 z-40 bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-opacity duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-500"
                    aria-label="Scroll to top"
                >
                    <ArrowUpIcon className="w-8 h-8" />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
