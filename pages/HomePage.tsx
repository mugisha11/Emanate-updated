import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import UpdatesSection from '../components/UpdatesSection';
import CallToAction from '../components/CallToAction';
import PartnersSection from '../components/PartnersSection';
import LeadershipSection from '../components/LeadershipSection';

const HomePage: React.FC = () => {
    return (
        <div>
            <HeroSection />
            <CallToAction />
            {/* <ServicesSection /> */}
            <UpdatesSection />
            <LeadershipSection memberLimit={4} />
            <PartnersSection />
        </div>
    );
};

export default HomePage;