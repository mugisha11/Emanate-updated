import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function NewsDetailPage() {
  const { slug } = useParams();
  
  // In a real app, this would fetch from an API using the slug
  const post = {
    id: '1',
    title: 'Capacity Expansion: EMANATE Announces New Research Facilities',
    content: `
      EMANATE is proud to announce a significant expansion of our research capabilities with the opening of new state-of-the-art facilities. This expansion marks a crucial step in our mission to deliver evidence-based solutions for community development.

      The new facilities include:
      - Advanced data analysis center
      - Collaborative research spaces
      - Community engagement hub
      - Digital library and resource center

      This expansion will enable us to:
      - Increase our research capacity by 150%
      - Host more community workshops and training sessions
      - Provide better support for partner organizations
      - Accelerate our data-driven decision-making processes

      The facilities are equipped with the latest technology and designed to foster collaboration between researchers, community partners, and stakeholders. This investment reflects our commitment to excellence in research and community development.

      We look forward to leveraging these new capabilities to better serve our communities and advance our mission of evidence-based social change.
    `,
    author: 'EMANATE Research Team',
    created_time: '2025-11-01T09:00:00Z',
    category: 'Announcements',
    image_url: '/path/to/facility-image.jpg'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/news"
            className="inline-flex items-center text-sm font-medium text-cyan-600 hover:text-cyan-500"
          >
            <ChevronLeftIcon className="mr-2 h-5 w-5" />
            Back to News
          </Link>
        </div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <header className="mb-8">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="inline-flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {format(new Date(post.created_time), 'MMMM d, yyyy')}
              </span>
              <span className="text-cyan-600 bg-cyan-50 px-2 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-sm text-gray-500">
              By {post.author}
            </p>
          </header>

          <div className="prose prose-cyan max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              paragraph.trim().startsWith('-') ? (
                <ul key={index} className="list-disc ml-6 my-4">
                  <li>{paragraph.substring(2)}</li>
                </ul>
              ) : (
                paragraph.trim() && (
                  <p key={index} className="mb-4">
                    {paragraph.trim()}
                  </p>
                )
              )
            ))}
          </div>
        </motion.article>
      </div>
    </div>
  );
}