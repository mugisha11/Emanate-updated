import React from 'react';
import { useParams } from 'react-router-dom';

const StoriesPage: React.FC = () => {
  const { slug } = useParams();

  // Minimal stub - content can be expanded
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{slug ? slug.replace(/-/g, ' ') : 'Story'}</h1>
      <p className="text-gray-700">This is a placeholder story page for <strong>{slug}</strong>. Replace with full story content.</p>
    </div>
  );
};

export default StoriesPage;
