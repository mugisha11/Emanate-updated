import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Remove InfoPage for custom layout
import DocumentCard, { DocumentItem } from '../../components/DocumentCard';

const sampleDocs: DocumentItem[] = [
  {
    id: 'r1',
    title: 'Community Health Systems: A Review (2024)',
    authors: 'Emanate Research Team',
    date: '2024-07-12',
    type: 'Report',
    excerpt: 'A comprehensive review of community health systems and recommendations for strengthening local responses to public health challenges.',
    thumbnail: '/img/sample-report-1.jpg',
    url: '/data/sample-docs/community-health-systems.pdf',
  },
  {
    id: 'b1',
    title: 'Youth Engagement Brief (2023)',
    authors: 'Jane Doe, John Smith',
    date: '2023-11-01',
    type: 'Brief',
    excerpt: 'Key takeaways and actionable steps for improving youth participation in civic programs.',
    thumbnail: '/img/sample-brief-1.jpg',
    url: '/data/sample-docs/youth-engagement-brief.pdf',
  },
  {
    id: 'p1',
    title: 'Podcast: Policy Conversations — Episode 5',
    authors: 'Emanate Podcast',
    date: '2024-01-20',
    type: 'Media',
    excerpt: 'A discussion on policy advisory and community-led research.',
    thumbnail: '/img/sample-podcast.jpg',
    url: 'https://example.com/podcast/episode-5',
  },
  {
    id: 'd1',
    title: 'Open Data: Education Metrics 2018-2022',
    authors: 'Data Team',
    date: '2022-08-15',
    type: 'Dataset',
    excerpt: 'A cleaned dataset containing national and regional education indicators from 2018 to 2022.',
    thumbnail: '/img/sample-dataset.jpg',
    url: '/data/sample-docs/education-metrics.csv',
  },
  {
    id: 'r2',
    title: 'Gender Equality Program Evaluation (2022)',
    authors: 'Emanate Monitoring & Evaluation',
    date: '2022-05-30',
    type: 'Report',
    excerpt: 'Evaluation findings and lessons learned from the gender equality programme.',
    thumbnail: '/img/sample-report-2.jpg',
    url: '/data/sample-docs/gender-eval.pdf',
  },
  {
    id: 'b2',
    title: 'Policy Brief: Scaling Community Responses',
    authors: 'Policy Team',
    date: '2021-12-01',
    type: 'Brief',
    excerpt: 'Short brief describing pathways to scale effective community-level interventions.',
    thumbnail: '/img/sample-brief-2.jpg',
    url: '/data/sample-docs/scaling-community-responses.pdf',
  },
];

const types = ['All', 'Report', 'Brief', 'Media', 'Dataset'];

const DigitalLibraryPage: React.FC = () => {
  // Local EMANATE archive (keeps internal content)
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

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

  // Google Books integration (external resources)
  const [gbQuery, setGbQuery] = useState('community health');
  const [gbResults, setGbResults] = useState<DocumentItem[]>([]);
  const [gbLoading, setGbLoading] = useState(false);
  const [gbError, setGbError] = useState<string | null>(null);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const maxResults = 12;
  const [gbFilter, setGbFilter] = useState<'all' | 'free-ebooks' | 'paid-ebooks'>('all');

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
    // initial fetch
    fetchGoogleBooks(gbQuery, startIndex, gbFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Google Books and EMANATE archive in unified layout
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {/* Top search bar */}
      <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex-1">Digital Library</h1>
          <form onSubmit={onGbSearch} className="flex-1 flex gap-2 items-center">
            <input
              id="gb-search"
              type="search"
              value={gbQuery}
              onChange={(e) => setGbQuery(e.target.value)}
              placeholder="Search books, reports, media..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">Search</button>
          </form>
        </div>
      </header>

  <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0">
          <div className="bg-white rounded-2xl shadow p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter</h2>
            <div className="mb-4">
              <label htmlFor="type" className="block text-sm font-medium text-gray-600 mb-1">Type</label>
              <select
                id="type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
                aria-label="Filter by document type"
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="gbFilter" className="block text-sm font-medium text-gray-600 mb-1">Google Books</label>
              <select
                id="gbFilter"
                value={gbFilter}
                onChange={(e) => setGbFilter(e.target.value as any)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-white"
                aria-label="Filter Google Books by type"
              >
                <option value="all">All</option>
                <option value="free-ebooks">Free eBooks</option>
                <option value="paid-ebooks">Paid eBooks</option>
              </select>
            </div>
            <div className="mb-4">
              <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')} className="w-full bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-3 text-sm font-medium">{view === 'grid' ? 'List View' : 'Grid View'}</button>
            </div>
            <div className="text-xs text-gray-400">{filtered.length} EMANATE docs<br />{totalItems !== null ? `${totalItems.toLocaleString()} Google Books` : ''}</div>
          </div>
        </aside>

        {/* Main results area */}
        <section className="flex-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">EMANATE Archive</h2>
          {filtered.length === 0 ? (
            <div className="mb-8 text-center text-gray-500">No documents match your search. Try different keywords or reset filters.</div>
          ) : view === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-8">
              {filtered.map((d) => (
                <DocumentCard key={d.id} doc={d} />
              ))}
            </div>
          ) : (
            <div className="mb-8 divide-y divide-gray-100">
              {filtered.map((d) => (
                <div key={d.id} className="py-4"><DocumentCard doc={d} /></div>
              ))}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-700 mb-4">Books & External Resources</h2>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">{totalItems !== null ? `${totalItems.toLocaleString()} results` : ''}</div>
            <div className="flex items-center gap-2">
              <button onClick={goPrev} disabled={startIndex === 0 || gbLoading} className="px-3 py-1 rounded border bg-white">Prev</button>
              <button onClick={goNext} disabled={(totalItems !== null && startIndex + maxResults >= (totalItems || 0)) || gbLoading} className="px-3 py-1 rounded border bg-white">Next</button>
            </div>
          </div>
          {gbLoading && <div className="py-8 text-center text-gray-500">Loading books…</div>}
          {gbError && <div className="py-6 text-center text-red-500">{gbError}</div>}
          {gbResults.length === 0 && !gbLoading ? (
            <div className="mt-6 text-center text-gray-500">No external books found for this query.</div>
          ) : view === 'grid' ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {gbResults.map((b) => (
                <DocumentCard key={b.id} doc={b} />
              ))}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {gbResults.map((b) => (
                <div key={b.id} className="py-4"><DocumentCard doc={b} /></div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Mobile action bar: filters & view toggle */}
      <div className="md:hidden fixed inset-x-4 bottom-4 z-40">
        <div className="bg-white/90 backdrop-blur rounded-full shadow-lg px-3 py-2 flex items-center justify-between gap-2">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200"
            aria-label="Open filters"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>

          <button
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="px-4 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium"
            aria-label="Toggle view"
          >
            {view === 'grid' ? 'List' : 'Grid'}
          </button>
        </div>
      </div>

      {/* Mobile filters sheet */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', stiffness: 300 }} className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold">Filters</div>
              <button onClick={() => setShowMobileFilters(false)} className="px-3 py-2 rounded bg-gray-100">Close</button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="mobile-type" className="block text-sm font-medium text-gray-600 mb-1">Type</label>
                <select id="mobile-type" value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full rounded-lg border border-gray-200 px-3 py-2" title="Document type">
                  {types.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mobile-gbfilter" className="block text-sm font-medium text-gray-600 mb-1">Google Books</label>
                <select id="mobile-gbfilter" value={gbFilter} onChange={(e) => setGbFilter(e.target.value as any)} className="w-full rounded-lg border border-gray-200 px-3 py-2" title="Google Books filter">
                  <option value="all">All</option>
                  <option value="free-ebooks">Free eBooks</option>
                  <option value="paid-ebooks">Paid eBooks</option>
                </select>
              </div>

              <div>
                <button onClick={() => { setShowMobileFilters(false); }} className="w-full px-4 py-3 rounded-lg bg-indigo-600 text-white">Apply</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DigitalLibraryPage;

