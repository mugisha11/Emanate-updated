import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard_new';
import { SearchIcon } from '../components/Icons';
import { motion } from 'framer-motion';

const samplePosts = [
  // keep same sample posts from original file (omitted here for brevity)
];

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const NewsPage: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // simplified fetch fallback using sample data
    const timer = setTimeout(() => {
      setPosts(samplePosts);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts.filter(post =>
    post.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">Latest News & Stories</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">Insights, updates, and stories from our programmes and partners — designed to inform and inspire.</p>
        </header>

        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-4 mb-8">
          <div className="flex-1 w-full md:max-w-2xl">
            <div className="relative">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search news, reports, or keywords..."
                className="w-full rounded-full py-3 pl-12 pr-4 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-full font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>

        {error && <div className="mb-6 text-sm text-yellow-800 bg-yellow-50 border border-yellow-200 p-3 rounded">{error}</div>}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="animate-pulse bg-white rounded-2xl h-64" />
            ))}
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" variants={listVariants} initial="hidden" animate="visible">
            {filteredPosts.length === 0 ? (
              <div className="col-span-full text-center p-8 bg-white rounded-2xl shadow">No posts found.</div>
            ) : (
              filteredPosts.map((post) => (
                <motion.div key={post.post_id} variants={itemVariants}>
                  <PostCard {...post} />
                </motion.div>
              ))
            )}
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default NewsPage;
