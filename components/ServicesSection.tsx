import React from 'react';
import { Link } from 'react-router-dom';
import { WomenIcon, MenEngageIcon, EqualityIcon, CapacityBuildingIcon } from './Icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  description: string;
  slug: string;
  image: string;
}

const services = [
    {
      icon: <WomenIcon className="w-10 h-10" />,
      title: "Women and Girls' Involvement",
      category: "Empowerment",
      description: "We work to improve the effectiveness of policies and programmes that inspire and improve women and girls holistic competitiveness.",
      slug: "women-and-girls",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80"
    },
    {
      icon: <MenEngageIcon className="w-10 h-10" />,
      title: 'Men Engage Approach',
      category: 'Gender Equality',
      description: 'We use the Men Engage approach for sustainable gender equality and involvement of men in addressing destructive gender norms.',
      slug: 'men-engage',
      image: "https://images.unsplash.com/photo-1552642986-ccb41e7059e7?auto=format&fit=crop&q=80"
    },
    {
      icon: <EqualityIcon className="w-10 h-10" />,
      title: 'Equality',
      category: 'Social Justice',
      description: 'EMANATE looks at issues that affect equality, in consideration of gender, age, physical, economic and social inequalities.',
      slug: 'equality-social-justice',
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
    },
    {
      icon: <CapacityBuildingIcon className="w-10 h-10" />,
      title: 'Capacity Building',
      category: 'Development',
      description: 'We provide vocational skills, financial literacy, educational support, health awareness, and entrepreneurial skills.',
      slug: 'capacity-building',
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
    },
  ];

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, category, description, slug, image }) => (
  <div className="group bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
    <div className="aspect-w-16 aspect-h-9 bg-purple-900/20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/50"></div>
      </div>
      
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
        <div className="w-20 h-20 text-white/90 relative z-10">
          {icon}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <div className="mb-4">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-purple-800 rounded-full">
          {category}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-white/90 mb-6">
        {description}
      </p>
      <Link 
        to={`/programmes/${slug}`} 
        className="inline-flex items-center space-x-2 text-white font-medium group/link"
      >
        <span className="relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-white/50 after:origin-right after:scale-x-0 group-hover/link:after:scale-x-100 after:transition-transform after:duration-300">
          Read more
        </span>
        <svg 
          className="w-5 h-5 transform translate-x-0 group-hover/link:translate-x-1 transition-transform duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 12h13" />
        </svg>
      </Link>
    </div>
  </div>
);

export const ServicesSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#00A8E0] sm:text-5xl lg:text-6xl tracking-tight">
            Our Services
          </h2>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We offer a range of services to help organizations and communities achieve their goals and make a lasting impact.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
