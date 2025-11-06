import React from 'react';
import JoinForm from '../components/JoinForm';

const JoinPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-r from-cyan-50 to-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12 items-center">
          <div className="px-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">Join EMANATE</h1>
            <p className="mt-4 text-gray-600">Apply as a partner, volunteer, or collaborator. We're excited to hear from people and organisations who share our mission in research, advocacy and capacity building.</p>

            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3"><span className="inline-block mt-1 h-2 w-2 rounded-full bg-cyan-600" /> Professional mentoring and partnership opportunities</li>
              <li className="flex items-start gap-3"><span className="inline-block mt-1 h-2 w-2 rounded-full bg-cyan-600" /> Community-driven research and advocacy projects</li>
              <li className="flex items-start gap-3"><span className="inline-block mt-1 h-2 w-2 rounded-full bg-cyan-600" /> Flexible volunteering and collaboration models</li>
            </ul>
          </div>

          <div className="px-4">
            <JoinForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
