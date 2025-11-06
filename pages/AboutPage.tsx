import React from 'react';
import LeadershipSection from '../components/LeadershipSection';
import ParallaxSection from '../components/ParallaxSection';
import kidsImg from '../components/img/kids.jpg';
import programmesImg from '../components/img/20251002_1310_Diverse Group Discussion_remix_01k6j9pq4qfmxv7hzsxckym6mz.png';
import { ResearchIcon, AdvocacyIcon, CapacityBuildingPillarIcon, VisionIcon, MissionIcon } from '../components/Icons';
import bannerImg from '../components/img/diverse-group-of-young-professionals-collaborating.jpg';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center shadow-sm">
        <p className="text-2xl font-bold text-cyan-600">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
    </div>
);

const PillarCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="text-center">
        <div className="mx-auto bg-cyan-100 rounded-full h-16 w-16 flex items-center justify-center text-cyan-600">
            {icon}
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600">{children}</p>
    </div>
);

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-white p-8 rounded-lg shadow-md border flex flex-col items-center text-center">
         <div className="text-cyan-600 mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{children}</p>
    </div>
);


const AboutPage: React.FC = () => {
    return (
        <div className="bg-white">
            {/* Banner Header - Commented Out
            <div className="relative h-44 sm:h-56 md:h-72">
                <img src={bannerImg} alt="About EMANATE banner" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">About EMANATE</h1>
                        <p className="text-sm sm:text-base text-white/90 mt-2 max-w-2xl">Learn about our mission, vision, and the dedicated team working to empower communities through evidence-based research and advocacy.</p>
                    </div>
                </div>
            </div>
            */}

            {/* Overview Section - Commented Out
            <section id="overview" className="py-12 lg:py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Our Purpose</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            EMANATE is a research and advocacy driven institute, builds on positive culture and new insights into policy, programmes and attitude change. It draws on data collected from the field and data collected by government and non-government actors to identify issues and propose interventions that can be adopted, while addressing Family and Population matter.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <StatCard value="Objective 1" label="Influence Policies" />
                        <StatCard value="Objective 2" label="Build Capacity" />
                        <StatCard value="Objective 3" label="Use Real-Time Data" />
                        <StatCard value="Objective 4" label="Shift Social Norms" />
                        <StatCard value="Objective 5" label="Encourage Participation" />
                        <StatCard value="Objective 6" label="Design Inclusive Programs" />
                    </div>
                </div>
            </section>
            */}

            {/* Pillars Section - Commented Out
            <section className="py-16 lg:py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <PillarCard icon={<ResearchIcon className="w-8 h-8"/>} title="Research & Analysis">
                        We promote evidence-based decision making through research and analysis of data produced by various institutions.
                    </PillarCard>
                    <PillarCard icon={<AdvocacyIcon className="w-8 h-8"/>} title="Advocacy">
                        We apply profound expertise in policies and programs that help address inequality and social injustice.
                    </PillarCard>
                    <PillarCard icon={<CapacityBuildingPillarIcon className="w-8 h-8"/>} title="Capacity Building">
                        We provide vocational skills, financial literacy, educational support, health awareness, and entrepreneurial skills.
                    </PillarCard>
                </div>
            </section>
            */}
            
            {/* Our Work Parallax */}
            <ParallaxSection id="our-work" imageUrl={kidsImg} title="About us">
                We apply our extensive understanding of research, analysis and advocacy on population and family matters to ensure effective and efficient communication, Knowledge generation, management and Sharing—shaping policies, programmes, debates, decisions, and behaviours which influence outcomes, and achieve concrete results.
            </ParallaxSection>

            {/* Programmes Parallax 
                         <ParallaxSection id="programmes" imageUrl={programmesImg} title="Programmes">
                Our initiatives include Women and Girls’ Involvement to improve competitiveness, a Men Engage approach for sustainable gender equality, a focus on Equality and Social Justice, promoting environmental protection, and developing Critical Thinking skills.
            </ParallaxSection>
            */}

            {/* Vision & Mission Section */}
             <section className="py-16 lg:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
                    <InfoCard icon={<VisionIcon className="w-10 h-10" />} title="Our Vision">
                        To become a Center of reference for population and Family holistic evidence-based advocacy, programmes, and Decision making.
                    </InfoCard>
                    <InfoCard icon={<MissionIcon className="w-10 h-10" />} title="Our Mission">
                        EMANATE harnesses the use of evidence for sustainable solutions to population and family problems.
                    </InfoCard>
                </div>
            </section>
            
            {/* History Parallax */}
            <ParallaxSection id="history" imageUrl="https://images.unsplash.com/photo-1521790797524-3f202a3b5a02?auto=format&fit=crop&w=1600&q=80" title="Our History">
                Evidence Matter-Emanate was founded in 2013, with the legal personality No 051/2014. under the name of Organised for Governance and Sustainable Development (OGaSD) to analyze and advocate for the principles of good governance. The name changed to EMANATE in 2021, focusing on population and family data, advocacy and programming. We identify issues, causes and propose interventions that can be adopted—with a particular focus on Social justice and equality.
            </ParallaxSection>
            
            {/* Leadership Section */}
            <LeadershipSection />
        </div>
    );
};

export default AboutPage;