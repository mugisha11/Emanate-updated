import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentPreview from './DocumentPreview';

export interface DocumentItem {
  id: string;
  title: string; 
  authors?: string;
  date?: string;
  type?: string;
  excerpt?: string;
  thumbnail?: string;
  url?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  }
};

const imageVariants = {
  hover: { 
    scale: 1.1
  }
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
};

const DocumentCard: React.FC<{ doc: DocumentItem }> = ({ doc }) => {
  const formattedDate = doc.date ? new Date(doc.date).toLocaleDateString() : '';

  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
    <motion.article
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100/50 flex flex-col transform-gpu hover:scale-[1.01]"
      aria-labelledby={`doc-${doc.id}-title`}
    >
      {doc.thumbnail ? (
        <div className="h-40 overflow-hidden bg-gray-100">
          <motion.img 
            src={doc.thumbnail} 
            alt={`${doc.title} cover`} 
            className="w-full h-full object-cover" 
            variants={imageVariants}
          />
        </div>
      ) : (
        <div className="h-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ["0%", "200%"],
              transition: { duration: 1.5, repeat: Infinity, ease: "linear" }
            }}
          />
          <span className="relative z-10">{doc.type || 'Document'}</span>
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col backdrop-blur-sm bg-white/50">
        <div className="mb-2">
          <h3 id={`doc-${doc.id}-title`} className="text-md font-semibold text-gray-800 leading-tight tracking-tight">
            {doc.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{doc.authors}</p>
        </div>

        <AnimatePresence>
          {doc.excerpt && (
            <motion.p 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm text-gray-600 line-clamp-3 mb-3"
            >
              {doc.excerpt}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t border-gray-100/50">
          <div className="text-xs font-medium text-gray-500">{doc.type} {doc.date && `• ${formattedDate}`}</div>

          <div className="flex items-center gap-2">
            {doc.url && (
              <motion.a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-sm"
                aria-label={`View ${doc.title}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                View
              </motion.a>
            )}

            {doc.url && (
              <motion.button
                onClick={async (e) => {
                  e.preventDefault();
                  const url = doc.url as string;
                  const safeName = (doc.title || 'document').replace(/[^a-z0-9\-_. ]/gi, '').replace(/\s+/g, '-').toLowerCase();
                  try {
                    // Try fetching the file and creating a blob download (works when CORS allows)
                    const resp = await fetch(url);
                    if (!resp.ok) throw new Error('Network response was not ok');
                    const blob = await resp.blob();
                    const blobUrl = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = blobUrl;
                    // try to infer extension
                    const extMatch = (url.match(/\.(pdf|csv|xlsx|docx|zip)(?:\?|$)/i) || []);
                    const ext = extMatch[1] ? '.' + extMatch[1] : '';
                    a.download = safeName + ext;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(blobUrl);
                  } catch (err) {
                    // Fallback: open in new tab if download fails
                    window.open(url, '_blank', 'noopener');
                  }
                }}
                className="inline-flex items-center gap-2 border border-gray-200/50 hover:border-gray-300 bg-white/50 hover:bg-white text-gray-700 px-3 py-1.5 rounded-md text-sm shadow-sm backdrop-blur-sm"
                aria-label={`Download ${doc.title}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Download
              </motion.button>
            )}
            <button
              onClick={() => setShowPreview(true)}
              className="inline-flex items-center gap-2 border border-gray-200/50 hover:border-gray-300 bg-white/50 hover:bg-white text-gray-700 px-3 py-1.5 rounded-md text-sm shadow-sm backdrop-blur-sm"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </motion.article>
    <AnimatePresence>
      {showPreview && (
        <DocumentPreview url={doc.url} title={doc.title} onClose={() => setShowPreview(false)} />
      )}
    </AnimatePresence>
    </>
  );
};

export default DocumentCard;
