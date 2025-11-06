import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updates, UpdateCardProps } from '../components/UpdatesSection';
import { motion } from 'framer-motion';
import { ChevronRightIcon, ArrowLeftIcon, UserGroupIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const ObjectiveDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const objective = slug ? updates.find(u => u.slug === slug) : undefined;

    if (!objective) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Objectives Not Found</h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Custom content for citizen participation page
    const participationMetrics = objective.slug === 'citizen-participation-inclusivity' ? [
        { 
            icon: <UserGroupIcon className="w-6 h-6" />,
            title: 'Community Engagement',
            value: '10,000+',
            description: 'Active community members'
        },
        {
            icon: <ChartBarIcon className="w-6 h-6" />,
            title: 'Program Success',
            value: '85%',
            description: 'Participation rate'
        },
        {
            icon: <DocumentTextIcon className="w-6 h-6" />,
            title: 'Policy Impact',
            value: '25+',
            description: 'Local policies influenced'
        }
    ] : [];

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-blue-900 to-cyan-800">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:16px]"></div>
                <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link 
                            to="/programmes" 
                            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group"
                        >
                            <ArrowLeftIcon className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
                            Back to Programmes
                        </Link>
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                            <div>
                                <motion.h1 
                                    className="text-4xl lg:text-6xl font-bold text-white mb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    {objective.title}
                                </motion.h1>
                                <motion.div 
                                    className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-200 text-sm backdrop-blur-sm"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {objective.date}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Metrics Section - Only for citizen participation page */}
            {objective.slug === 'citizen-participation-inclusivity' && (
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {participationMetrics.map((metric, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex items-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm border border-gray-100"
                                >
                                    <div className="mr-6 p-3 bg-cyan-500/10 rounded-lg text-cyan-600">
                                        {metric.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{metric.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                        <p className="text-sm text-gray-500">{metric.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="prose prose-lg max-w-none"
                        >
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                {objective.excerpt}
                            </p>
                            
                            {objective.objectives && (
                                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Objectives</h2>
                                    <div className="space-y-6">
                                        {objective.objectives.map((obj, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                                className="flex items-start p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                                                    <ChevronRightIcon className="w-5 h-5 text-white" />
                                                </div>
                                                <span className="ml-4 text-gray-600 group-hover:text-gray-900 transition-colors">{obj}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Additional content for citizen participation */}
                            {objective.slug === 'citizen-participation-inclusivity' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                                >
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Implementation Approach</h2>
                                    <div className="space-y-4">
                                        <div className="p-4 bg-cyan-50 rounded-lg">
                                            <h3 className="font-semibold text-cyan-900 mb-2">Community Engagement</h3>
                                            <p className="text-cyan-800">Regular community dialogues and participatory decision-making processes to ensure local voices are heard.</p>
                                        </div>
                                        <div className="p-4 bg-blue-50 rounded-lg">
                                            <h3 className="font-semibold text-blue-900 mb-2">Inclusive Programming</h3>
                                            <p className="text-blue-800">Tailored programs that address the unique needs of different community segments, ensuring no one is left behind.</p>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-lg">
                                            <h3 className="font-semibold text-purple-900 mb-2">Capacity Building</h3>
                                            <p className="text-purple-800">Training and support to strengthen local leadership and community-based organizations.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-8">
                            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 shadow-lg text-white">
                                <h3 className="text-xl font-bold mb-4">Why This Matters</h3>
                                <p className="text-white/90 mb-6">
                                    {objective.slug === 'citizen-participation-inclusivity' 
                                        ? "Active citizen participation and inclusive programming are fundamental to creating sustainable community development and ensuring that no one is left behind in our initiatives."
                                        : "Our objectives are carefully designed to create lasting positive impact in communities through evidence-based approaches and sustainable solutions."
                                    }
                                </p>
                                <Link 
                                    to="/contact" 
                                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-white text-cyan-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Get Involved
                                </Link>
                            </div>

                            {objective.slug === 'citizen-participation-inclusivity' && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">Success Stories</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                            <span>15 community-led initiatives launched</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                                            <span>8 policy recommendations adopted</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                                            <span>3,000+ community members trained</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ObjectiveDetailPage;
