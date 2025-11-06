import React from 'react';
import heroSrc from './img/hero.jpg';
import { useTranslation } from 'react-i18next';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-6 text-sm text-gray-700">
    <h3 className="font-bold text-[#00A8E0] text-lg mb-1">{title}</h3>
    <p>{children}</p>
  </div>
);

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const cards = [
    { title: t('hero.cards.introduction_title'), body: t('hero.cards.introduction_body') },
    { title: t('hero.cards.vision_title'), body: t('hero.cards.vision_body') },
    { title: t('hero.cards.mission_title'), body: t('hero.cards.mission_body') },
    { title: t('hero.cards.work_title'), body: t('hero.cards.work_body') },
  ];

  return (
    <div className="relative h-[650px] -mt-[30px] flex items-center justify-center text-white">
      {/* Background: fallback image first, then video on top (if present) */}
      <div className="absolute inset-0">
        {/* fallback image (shows when video isn't available or hasn't loaded) */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroSrc})` }} />

        {/* autoplaying, muted, looping video. Place a file named hero.mp4 in components/img/ for this to load */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/components/img/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>

      <div className="relative z-10 text-center -mt-24 px-4">
        <p className="text-2xl md:text-3xl">{t('hero.welcome')}</p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-shadow">{t('hero.title')}</h1>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[90%] max-w-6xl z-20">
        <div className="bg-white rounded-lg shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {cards.map((c, i) => (
            <InfoCard key={i} title={c.title}>{c.body}</InfoCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
