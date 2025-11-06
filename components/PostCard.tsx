import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post_id: string;
  message: string;
  author: string;
  created_time: string;
  post_link: string;
  image_url?: string;
  category?: string;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
};

const PostCard: React.FC<PostCardProps> = ({ message, author, created_time, post_link, image_url, category, className = '' }) => {
  const formatTimestamp = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
      <motion.article
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.35 }}
      className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${className}`}
    >
      {image_url ? (
        <Link to={`/news/${encodeURIComponent(message.toLowerCase().slice(0, 50).replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'))}`} className="block h-48 sm:h-56 lg:h-56 overflow-hidden">
          <img src={image_url} alt="Post attachment" loading="lazy" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500" />
        </Link>
      ) : (
        <div className="h-40 sm:h-48 lg:h-36 bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold"> 
          <span>EMANATE Update</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-semibold mr-3">
              {author ? author.charAt(0) : 'E'}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{author}</p>
              <p className="text-xs text-gray-400">{formatTimestamp(created_time)}</p>
            </div>
          </div>
          <Link 
            to={`/news/${encodeURIComponent(message.toLowerCase().slice(0, 50).replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'))}`}
            className="text-cyan-600 hover:text-cyan-700 text-sm font-medium"
          >
            View
          </Link>
        </div>

        <p className="text-gray-700 t
        ext-sm leading-relaxed mb-4 line-clamp-4 whitespace-pre-wrap">{message}</p>

        <div className="flex items-center justify-between">
          <Link 
            to={`/news/${encodeURIComponent(message.toLowerCase().slice(0, 50).replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'))}`} 
            className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-all"
          >
            Read More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {category && <div className="text-gray-400 text-xs">{category}</div>}
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
