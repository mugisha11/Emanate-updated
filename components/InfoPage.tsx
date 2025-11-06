import React from 'react';

interface Section {
  heading: string;
  body: React.ReactNode;
}

interface InfoPageProps {
  title: string;
  intro?: React.ReactNode;
  sections?: Section[];
}

const InfoPage: React.FC<InfoPageProps> = ({ title, intro, sections = [] }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>
            {intro && <p className="mt-3 text-gray-600 max-w-3xl">{intro}</p>}
          </div>

          <div className="space-y-8">
            {sections.map((s, i) => (
              <section key={i} className="prose prose-sm sm:prose lg:prose-lg">
                <h2 className="text-2xl font-semibold text-gray-800">{s.heading}</h2>
                <div className="text-gray-700 mt-2">{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
