import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

export interface UpdateCardProps {
    title: string;
    date: string;
    excerpt: string;
    imageUrl?: string;
    slug: string;
    objectives?: string[];
}

const UpdateCard: React.FC<UpdateCardProps> = ({ title, date, excerpt, imageUrl, slug }) => (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div 
            className="h-40 bg-gray-100 bg-cover bg-center"
            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
        >
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">{date}</p>
            <h3 className="text-md font-bold text-gray-800 mb-2 leading-tight">{title}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{excerpt}</p>
            <Link to={`/objectives/${slug}`} className="font-semibold text-cyan-600 hover:text-cyan-700 text-sm self-start">
                Read more &rarr;
            </Link>
        </div>
    </div>
);

export const updates: UpdateCardProps[] = [
    {
        title: "Influence Policy & Build Capacity",
        date: "Objectives 1 & 2",
        excerpt: "To influence policies and practices by providing evidences, and to build the capacity of institutions and individuals.",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80",
        slug: 'influence-policy-build-capacity',
        objectives: [
            'Influence policies through evidence and research',
            'Strengthen institutional capacity and partnerships',
        ],
    },
    {
        title: "Data-driven Decisions & Social Norms",
        date: "Objectives 3 & 4",
        excerpt: "Use real-time data for policy decisions and involve community leaders to shift social norms around gender and climate change.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
        slug: 'data-driven-and-social-norms',
        objectives: [
            'Deliver actionable real-time data for policymakers',
            'Engage community leaders to change harmful social norms',
        ],

    },
    {
        title: "Citizen Participation & Inclusivity",
        date: "Objectives 5 & 6",
        excerpt: "Encourage citizen participation for community-led development and design inclusive programs that reach marginalized groups.",
        imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
        slug: 'citizen-participation-inclusivity',
        objectives: [
            'Promote citizen participation in decision making',
            'Design inclusive programs that reach marginalized groups',
        ],
    },
];

const UpdatesSection: React.FC = () => {

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Key Objectives</h2>
                    <div className="flex space-x-2">
                        <button aria-label="previous objectives" className="p-2 border rounded-md text-gray-600 hover:bg-gray-100"><ChevronLeftIcon className="w-5 h-5" /></button>
                        <button aria-label="next objectives" className="p-2 border rounded-md text-gray-600 hover:bg-gray-100"><ChevronRightIcon className="w-5 h-5" /></button>
                    </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {updates.map((update, index) => <UpdateCard key={index} {...update} />)}
        </div>
         <div className="text-center mt-16">
            <Link to="/programmes" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-md hover:bg-cyan-600 transition-colors">
                Get Involved
            </Link>
        </div>
      </div>
    </section>
  );
};

export default UpdatesSection;