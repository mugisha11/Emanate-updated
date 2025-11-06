import React from 'react';
import { Link } from 'react-router-dom';

const DonatePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Support EMANATE</h1>
      <p className="text-gray-700 mb-6">Thank you for considering a donation. This is a placeholder donate page — wire up your payment provider here.</p>
  <Link to="/contact" className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-md">Contact Us about Donations</Link>
    </div>
  );
};

export default DonatePage;
