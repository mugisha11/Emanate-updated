import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    WomenIcon,
    MenEngageIcon,
    EqualityIcon,
    CapacityBuildingIcon,
    EnvironmentIcon,
    ThinkingIcon,
} from '../components/Icons';

const programmeDetails: Record<string, any> = {
    'women-and-girls': {
        icon: <WomenIcon className="w-16 h-16" />,
        title: "Women and Girls' Involvement",
        category: 'Empowerment',
        imageUrl: 'https://images.unsplash.com/photo-1573166599380-3ab2d73b3d3b?auto=format&fit=crop&w=800&q=80',
        description:
            "Empowering women and girls through comprehensive programs and policies that promote equality and opportunity.",
        objectives: [
            "Increase women's participation in leadership roles",
            'Provide educational opportunities for girls',
            'Support women entrepreneurs',
            'Combat gender-based violence',
        ],
        activities: [
            { title: 'Leadership Development', description: "Workshops and mentorship programs to develop leadership skills among women and girls." },
            { title: 'Educational Support', description: "Scholarships and educational resources to support girls' education at all levels." },
            { title: 'Economic Empowerment', description: 'Business training, microfinance initiatives, and entrepreneurship support for women.' },
            { title: 'Advocacy', description: "Campaigns and policy advocacy for women's rights and gender equality." },
        ],
        impact: [
            'Over 1,000 women trained in leadership skills',
            '200+ girls supported through education programs',
            '50 women-led businesses established',
            '10 policy changes influenced',
        ],
    },
    'men-engage': {
        icon: <MenEngageIcon className="w-16 h-16" />,
        title: 'Men Engage Approach',
        category: 'Gender Equality',
        imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
        description: 'Engaging men and boys as allies in achieving gender equality and challenging harmful gender norms.',
        objectives: ['Transform masculine norms', 'Prevent gender-based violence', 'Promote equal partnerships', 'Engage men in caregiving'],
        activities: [
            { title: 'Community Dialogues', description: 'Facilitated discussions on masculinity, gender roles, and equality.' },
            { title: 'Male Champions Program', description: 'Training men to be advocates for gender equality in their communities.' },
            { title: 'Father Involvement', description: 'Programs promoting active fatherhood and equal parenting.' },
            { title: 'Youth Engagement', description: 'Working with young men to challenge gender stereotypes.' },
        ],
        impact: ['500+ men trained as gender equality advocates', '30 community dialogue sessions conducted', 'Reduction in reported domestic violence cases', 'Increased father participation in childcare'],
    },
    'equality-social-justice': {
        icon: <EqualityIcon className="w-16 h-16" />,
        title: 'Equality and Social Justice',
        category: 'Advocacy',
        imageUrl: 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=800&q=80',
        description: 'Promoting equal rights and opportunities for all members of society through advocacy and action.',
        objectives: ['Address systemic inequalities', 'Promote inclusive policies', 'Support marginalized groups', 'Foster social cohesion'],
        activities: [
            { title: 'Policy Research', description: 'Conducting research on inequality and developing policy recommendations.' },
            { title: 'Advocacy Campaigns', description: 'Running campaigns to raise awareness about social justice issues.' },
            { title: 'Community Support', description: 'Providing resources and support to marginalized communities.' },
            { title: 'Coalition Building', description: 'Creating networks of organizations working for social justice.' },
        ],
        impact: ['15 policy briefs published', '3 major advocacy campaigns completed', '1000+ individuals supported', '20+ partner organizations engaged'],
    },
    'capacity-building': {
        icon: <CapacityBuildingIcon className="w-16 h-16" />,
        title: 'Capacity Building',
        category: 'Development',
        imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80',
        description: 'Building skills and knowledge to empower individuals and strengthen communities.',
        objectives: ['Develop practical skills', 'Enhance financial literacy', 'Promote entrepreneurship', 'Strengthen community leadership'],
        activities: [
            { title: 'Skills Training', description: 'Vocational and technical skills training programs.' },
            { title: 'Financial Education', description: 'Workshops on budgeting, saving, and financial management.' },
            { title: 'Business Development', description: 'Support for starting and growing small businesses.' },
            { title: 'Leadership Training', description: 'Programs to develop community leaders and change-makers.' },
        ],
        impact: ['2000+ individuals trained', '300 new businesses started', '80% employment rate among graduates', '40 community projects initiated'],
    },
    'climate-change': {
        icon: <EnvironmentIcon className="w-16 h-16" />,
        title: 'Climate Change',
        category: 'Environment',
        imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80',
        description: 'Promoting environmental protection and climate change awareness at all institutional and advocacy levels.',
        objectives: ['Increase environmental awareness', 'Promote sustainable practices', 'Support climate action initiatives', 'Advocate for environmental policies'],
        activities: [
            { title: 'Environmental Education', description: 'Workshops and training on environmental protection and climate change.' },
            { title: 'Green Initiatives', description: 'Community projects promoting sustainable practices and environmental conservation.' },
            { title: 'Policy Advocacy', description: 'Advocating for environmental policies and climate action.' },
            { title: 'Research', description: 'Conducting research on climate change impacts and mitigation strategies.' },
        ],
        impact: ['1000+ people educated on climate change', '20 green initiatives implemented', '5 environmental policies influenced', 'Reduction in local carbon footprint'],
    },
    'critical-thinking': {
        icon: <ThinkingIcon className="w-16 h-16" />,
        title: 'Critical Thinking',
        category: 'Education',
        imageUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80',
        description: 'Fostering critical thinking skills and analytical capabilities for better decision-making and problem-solving.',
        objectives: ['Develop analytical thinking skills', 'Enhance problem-solving abilities', 'Promote evidence-based decision making', 'Foster intellectual curiosity'],
        activities: [
            { title: 'Critical Thinking Workshops', description: 'Interactive workshops focusing on analytical and critical thinking skills.' },
            { title: 'Research Training', description: 'Training in research methodology and evidence-based analysis.' },
            { title: 'Problem-Solving Sessions', description: 'Group sessions focused on solving complex problems through critical thinking.' },
            { title: 'Debate Programs', description: 'Structured debates to develop argumentative and analytical skills.' },
        ],
        impact: ['500+ participants in critical thinking workshops', '30 research projects completed', 'Improved decision-making skills reported', 'Enhanced analytical capabilities demonstrated'],
    },
};

const ProgrammeDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const programme = id ? programmeDetails[id as keyof typeof programmeDetails] : null;

    if (!programme) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Programme Not Found</h2>
                    <button
                        onClick={() => navigate('/programmes')}
                        className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                        Back to Programmes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative rounded-2xl overflow-hidden mb-16">
                    <div className="h-96 relative">
                        <img src={programme.imageUrl} alt={programme.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <div className="flex items-center mb-4">
                            <div className="text-cyan-400 mr-4">{programme.icon}</div>
                            <div>
                                <p className="text-sm uppercase tracking-wider text-cyan-400">{programme.category}</p>
                                <h1 className="text-4xl font-bold">{programme.title}</h1>
                            </div>
                        </div>
                        <p className="text-lg max-w-3xl text-gray-200">{programme.description}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <section className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Objectives</h2>
                            <ul className="space-y-4">
                                {programme.objectives.map((objective: string, index: number) => (
                                    <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="ml-3 text-gray-600">{objective}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-white rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Activities</h2>
                            <div className="space-y-6">
                                {programme.activities.map((activity: any, index: number) => (
                                    <div key={index} className="border-l-4 border-cyan-500 pl-4">
                                        <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                                        <p className="text-gray-600">{activity.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 shadow-lg text-white sticky top-8">
                            <h2 className="text-2xl font-bold mb-6">Impact & Achievements</h2>
                            <div className="space-y-4">
                                {programme.impact.map((item: string, index: number) => (
                                    <div key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mt-1">
                                            <span className="font-semibold">{index + 1}</span>
                                        </div>
                                        <p className="ml-3">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button onClick={() => navigate('/programmes')} className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors inline-flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Programmes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProgrammeDetailPage;