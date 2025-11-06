import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Props {
  url?: string;
  title?: string;
  onClose: () => void;
}

const DocumentPreview: React.FC<Props> = ({ url, title, onClose }) => {
  const [canEmbed, setCanEmbed] = useState(true);

  useEffect(() => {
    // Basic check: if url is external and not PDF, embedding may be blocked by X-Frame-Options.
    if (!url) return;
    const isPdf = url.toLowerCase().endsWith('.pdf') || url.toLowerCase().includes('pdf');
    if (!isPdf && url.includes('google.com')) {
      // Google Books infoLink usually allows embedding, but some pages may not.
      setCanEmbed(true);
    } else if (!isPdf) {
      // attempt embedding, but we will provide fallback link
      setCanEmbed(true);
    }
  }, [url]);

  if (!url) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl w-full h-[80vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="text-sm font-semibold text-gray-800">{title || 'Preview'}</div>
          <div className="flex items-center gap-2">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline">Open in new tab</a>
            <button onClick={onClose} className="px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">Close</button>
          </div>
        </div>

        <div className="flex-1 bg-gray-50">
          {canEmbed ? (
            <iframe
              src={url}
              title={title}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className="text-center">
                <p className="mb-4 text-gray-600">This document cannot be previewed in the site. You can open it in a new tab.</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-indigo-600 text-white rounded">Open document</a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DocumentPreview;
