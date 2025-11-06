import React from 'react';

interface ParallaxSectionProps {
  id: string;
  imageUrl: string;
  title: string;
  children: React.ReactNode;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ id, imageUrl, title, children }) => {
  return (
    <section
      id={id}
      className="relative py-20 lg:py-32 text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-shadow">{title}</h2>
        <p className="text-lg lg:text-xl text-shadow">{children}</p>
      </div>
    </section>
  );
};

export default ParallaxSection;