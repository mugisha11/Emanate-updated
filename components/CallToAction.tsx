import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-[#00A8E0] text-white pt-36 pb-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Research, Analysis, Advocacy, Programmes</h2>
        <p className="mb-8 max-w-3xl mx-auto">
          We apply our extensive understanding of research, analysis and advocacy on population and family matters to ensure effective and efficient communication, Knowledge generation, management and Sharing—shaping policies, programmes, debates, decisions, and behaviours which influence outcomes, and achieve concrete results.
        </p>
        <button className="bg-white text-[#00A8E0] font-bold py-3 px-8 rounded-md hover:bg-gray-100 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CallToAction;