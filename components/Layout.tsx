import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import HelpChatbot from './HelpChatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="animate-fadeIn">
          {children}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <HelpChatbot />
    </div>
  );
};

export default Layout;
