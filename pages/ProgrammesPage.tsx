import React from 'react';
import { Link } from 'react-router-dom';
import progBanner from '../components/img/IMG-20190516-WA0002.jpg';
import { 
  WomenIcon, 
  MenEngageIcon, 
  EqualityIcon, 
  CapacityBuildingIcon,
  EnvironmentIcon,
  ThinkingIcon,
  SurvivalIcon,
  ParentingIcon
} from '../components/Icons';
import './ProgrammesPage.css';

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, description, delay = 0 }) => (
  <div className={`flex flex-col items-center p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in delay-${delay}`}>
    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">{value}</div>
    <div className="text-xl font-semibold text-gray-800 mt-3">{label}</div>
    <div className="text-base text-gray-600 text-center mt-2 leading-relaxed">{description}</div>
  </div>
);

interface ProgrammeCardProps {
  icon: React.ReactNode;
  title: string;
  category: string;
  children: React.ReactNode;
  imageUrl?: string;
  slug?: string;
}

const ProgrammeCard: React.FC<ProgrammeCardProps> = ({ icon, title, category, children, imageUrl, slug }) => (
  <article className="group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white border border-gray-100">
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-br from-[#00A8E0] to-[#0077B6] p-6 relative overflow-hidden">
        {/* hover image overlay */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={`${title} image`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100`}
          />
        )}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
            <span className="px-3 py-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full group-hover:bg-white/30 transition-colors duration-300">
              {category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="text-gray-700 text-sm mb-4">{children}</div>

        <div className="mt-4">
          <Link to={`/programmes/${(slug || title).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}`} className="text-[#00A8E0] font-medium inline-flex items-center">
            Read more
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M5 12h13" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  </article>
);

const ProgrammesPage: React.FC = () => {
  // Component mounted

  // Key Objectives
  const stats = [
    {
      value: "01",
      label: "Evidence-Based Policy",
      description: "Influence policies through comprehensive research and data-driven analysis",
      delay: 0
    },
    {
      value: "02",
      label: "Build Capacity",
      description: "Strengthen institutions and empower individuals with evidence-based methodologies",
      delay: 200
    },
    {
      value: "03",
      label: "Real-Time Data",
      description: "Collect, analyze, and utilize real-time data for informed decision making",
      delay: 400
    },
    {
      value: "04",
      label: "Community Engagement",
      description: "Foster active participation and drive sustainable community development",
      delay: 600
    },
  ];
const programmes = [
    {
      icon: <WomenIcon className="w-12 h-12" />,
      title: "Women and Girls' Involvement",
      category: "Empowerment",
      slug: "women-and-girls",
      imageUrl: "https://images.unsplash.com/photo-1573166599380-3ab2d73b3d3b?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>We work to improve the effectiveness of policies and programmes, through programmes that inspire and improve women and girls holistic competitiveness at all levels.</p>
        </>
      ),
    },
    {
      icon: <MenEngageIcon className="w-12 h-12" />,
      title: "Men Engage Approach",
      category: "Gender Equality",
      slug: "men-engage",
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>We use Men engage approach for sustainable gender equality, consideration of men challenges and involvement of men in addressing gender inequality and destructive gender norms.</p>
        </>
      ),
    },
    {
      icon: <EqualityIcon className="w-12 h-12" />,
      title: "Equality and Social Justice",
      category: "Social Justice",
      slug: "equality-social-justice",
      imageUrl: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>EMANATE looks at issues that affect equality, in consideration of gender, women/girls, men/boys; age, children and the elderly, physical, economic and social inequalities, for harmonious families and social justice.</p>
        </>
      ),
    },
    {
      icon: <EnvironmentIcon className="w-12 h-12" />,
      title: "Climate Change",
      category: "Environment",
      slug: "climate-change",
      imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>EMANATE promotes environmental protection at all levels, institutional, institutional and advocacy level.</p>
        </>
      ),
    },
    {
      icon: <ThinkingIcon className="w-12 h-12" />,
      title: "Critical Thinking",
      category: "Education",
      slug: "critical-thinking",
      imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>Developing a sense of critical thinking in schools and institutions of learning, debate, spelling bee and essay writing and creative presentation of solutions to key national and international issues.</p>
        </>
      ),
    },
    {
      icon: <CapacityBuildingIcon className="w-12 h-12" />,
      title: "Capacity Building",
      category: "Development",
      slug: "capacity-building",
      imageUrl: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>Vocational skills, Financial literacy, Educational support, Health awareness, Entrepreneurial skills, Agricultural skill, Digital skills Social protection awareness and Psychosocial support.</p>
        </>
      ),
    },
    {
      icon: <SurvivalIcon className="w-12 h-12" />,
      title: "Beyond Survival",
      category: "Economic Empowerment",
      slug: "beyond-survival",
      imageUrl: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>EMANATE works with vulnerable groups and individuals to reduce multidimensional poverty and build resilience by: building pathways out of poverty and vulnerability; fostering self-reliance and reducing vulnerability; and enabling populations to achieve economic security and resilience.</p>
        </>
      ),
    },
    {
      icon: <ParentingIcon className="w-12 h-12" />,
      title: "Children and Parenting",
      category: "Family Support",
      slug: "children-and-parenting",
      imageUrl: "https://images.unsplash.com/photo-1571624436279-b272aff752b5?auto=format&fit=crop&w=800&q=80",
      content: (
        <>
          <p>EMANATE promotes children's rights and positive parenting. We conduct workshops for pregnant women and breastfeeding women; families and communities ensuring they are safe, their needs are met, and their voice is heard.</p>
        </>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-900">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={progBanner} 
            alt="Programmes banner" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Our Programmes
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-blue-100">
            Discover our comprehensive range of programmes designed to empower communities and drive positive change through research and advocacy.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative -mt-12 pb-12 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <StatCard 
                key={idx}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                delay={stat.delay}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Programmes Grid */}
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((prog, idx) => (
            <ProgrammeCard
              key={idx}
              icon={prog.icon}
              title={prog.title}
              category={prog.category}
              imageUrl={prog.imageUrl}
              slug={prog.slug}
            >
              {prog.content}
            </ProgrammeCard>
          ))}
        </div>
      </div>

      {/* CTA Section 
      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join us in our mission to create positive change through research and advocacy.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-300"
          >
            Contact Us
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>*/}
    </div>
  );
};

export default ProgrammesPage;
