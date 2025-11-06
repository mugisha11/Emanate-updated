import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentCard, { DocumentItem } from '../../components/DocumentCard';

// Sample docs array remains the same
const sampleDocs = [/* ... your existing sample docs ... */];
const types = ['All', 'Report', 'Brief', 'Media', 'Dataset'];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const DigitalLibraryPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [gbQuery, setGbQuery] = useState('community health');
  const [gbResults, setGbResults] = useState<DocumentItem[]>([]);
  const [gbLoading, setGbLoading] = useState(false);
  const [gbError, setGbError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const maxResults = 12;
  const [gbFilter, setGbFilter] = useState<'all' | 'free-ebooks' | 'paid-ebooks'>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filtered EMANATE docs logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sampleDocs.filter((d) => {
      if (filterType !== 'All' && d.type !== filterType) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        (d.authors || '').toLowerCase().includes(q) ||
        (d.excerpt || '').toLowerCase().includes(q)
      );
    });
  }, [query, filterType]);

  // Google Books fetch logic
  const fetchGoogleBooks = async (queryStr: string, index = 0, filter = gbFilter) => {
    if (!queryStr) return;
    setGbLoading(true);
    setGbError(null);
    try {
      const q = encodeURIComponent(queryStr);
      const filterParam = filter === 'all' ? '' : `&filter=${filter}`;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${index}&maxResults=${maxResults}${filterParam}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setTotalItems(data.totalItems ?? 0);
      const items: DocumentItem[] = (data.items || []).map((it: any) => {
        const vi = it.volumeInfo || {};
        return {
          id: it.id,
          title: vi.title || 'Untitled',
          authors: vi.authors ? vi.authors.join(', ') : undefined,
          date: vi.publishedDate,
          type: vi.printType || 'Book',
          excerpt: vi.description,
          thumbnail: vi.imageLinks ? (vi.imageLinks.thumbnail || vi.imageLinks.smallThumbnail) : undefined,
          url: vi.infoLink || undefined,
        };
      });
      setGbResults(items);
    } catch (err: any) {
      console.error('Google Books fetch error', err);
      setGbError('Unable to load external books. Please try again later.');
      setGbResults([]);
      setTotalItems(null);
    } finally {
      setGbLoading(false);
    }
  };

  useEffect(() => {
    fetchGoogleBooks(gbQuery, startIndex, gbFilter);
  }, []);

  const onGbSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    setStartIndex(0);
    fetchGoogleBooks(gbQuery, 0, gbFilter);
  };

  const goNext = () => {
    const next = startIndex + maxResults;
    setStartIndex(next);
    fetchGoogleBooks(gbQuery, next, gbFilter);
  };

  const goPrev = () => {
    const prev = Math.max(0, startIndex - maxResults);
    setStartIndex(prev);
    fetchGoogleBooks(gbQuery, prev, gbFilter);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* Modern floating search bar */}
      <motion.header 
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <motion.h1 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              Digital Library
            </motion.h1>
            
            <form onSubmit={onGbSearch} className="flex-1 w-full">
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="search"
                  value={gbQuery}
                  onChange={(e) => setGbQuery(e.target.value)}
                  placeholder="Search books, reports, and resources..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/80 backdrop-blur-sm"
                />
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              <button
                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                {view === 'grid' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                )}
              </button>
            </motion.div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4 flex flex-wrap items-center gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">Document Type</label>
                    <select
                      id="type"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="rounded-lg border border-gray-200 bg-white/80 px-3 py-1"
                    >
                      {types.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="gbFilter" className="block text-sm font-medium text-gray-600 mb-1">Access Type</label>
                    <select
                      id="gbFilter"
                      value={gbFilter}
                      onChange={(e) => setGbFilter(e.target.value as any)}
                      className="rounded-lg border border-gray-200 bg-white/80 px-3 py-1"
                    >
                      <option value="all">All Books</option>
                      <option value="free-ebooks">Free eBooks</option>
                      <option value="paid-ebooks">Paid eBooks</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">EMANATE Archive</h2>
            <span className="text-sm text-gray-500">{filtered.length} results</span>
          </div>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl"
            >
              <p className="text-gray-500">No documents match your search. Try different keywords or reset filters.</p>
            </motion.div>
          ) : view === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((d) => (
                <motion.div key={d.id} variants={itemVariants}>
                  <DocumentCard doc={d} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((d) => (
                <motion.div key={d.id} variants={itemVariants}>
                  <DocumentCard doc={d} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Books & External Resources
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {totalItems !== null ? `${totalItems.toLocaleString()} results` : ''}
              </span>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goPrev}
                  disabled={startIndex === 0 || gbLoading}
                  className="px-4 py-1.5 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm disabled:opacity-50"
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={goNext}
                  disabled={(totalItems !== null && startIndex + maxResults >= totalItems) || gbLoading}
                  className="px-4 py-1.5 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm disabled:opacity-50"
                >
                  Next
                </motion.button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {gbLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full"
                  />
                  <span className="text-gray-500">Loading books...</span>
                </div>
              </motion.div>
            ) : gbError ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl"
              >
                <p className="text-red-500">{gbError}</p>
              </motion.div>
            ) : gbResults.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-2xl"
              >
                <p className="text-gray-500">No external books found for this query.</p>
              </motion.div>
            ) : view === 'grid' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {gbResults.map((b) => (
                  <motion.div key={b.id} variants={itemVariants}>
                    <DocumentCard doc={b} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {gbResults.map((b) => (
                  <motion.div key={b.id} variants={itemVariants}>
                    <DocumentCard doc={b} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default DigitalLibraryPage;