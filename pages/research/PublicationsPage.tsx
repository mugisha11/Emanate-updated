import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../components/img/diverse-group-of-young-professionals-collaborating.jpg';
import { fetchCrossRefPublications, fetchGoogleBooksSimple } from '../../src/services/externalData';

interface DocItem {
  id: string;
  title: string;
  size: string;
  modified: string;
  url?: string;
}

const sampleDocs: DocItem[] = [
  { id: 'd1', title: 'EMANATE_Annual_Report_2024.pdf', size: '2.1 MB', modified: 'Oct 10, 2024', url: '#' },
  { id: 'd2', title: 'Policy_Brief_Gender_Equality_2024.pdf', size: '1.6 MB', modified: 'Sep 15, 2024', url: '#' },
  { id: 'd3', title: 'Capacity_Building_Manual_v2.pdf', size: '3.2 MB', modified: 'Aug 03, 2024', url: '#' },
  { id: 'd4', title: 'Data_Digest_2023.xlsx', size: '900 KB', modified: 'Jul 29, 2024', url: '#' },
  { id: 'd5', title: 'CaseStudy_CommunityDialogues.pdf', size: '2.4 MB', modified: 'Jun 12, 2024', url: '#' },
  { id: 'd6', title: 'Evaluation_Report_MenEngage_2023.pdf', size: '1.8 MB', modified: 'May 22, 2024', url: '#' },
];

const PublicationsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [externalPubs, setExternalPubs] = useState<any[]>([]);
  const [extLoading, setExtLoading] = useState(false);
  const perPage = 5;
  const total = sampleDocs.length;
  const pages = Math.max(1, Math.ceil(total / perPage));

  const start = (page - 1) * perPage;
  const visible = sampleDocs.slice(start, start + perPage);

  useEffect(() => {
    let mounted = true;
    async function loadExternal() {
      setExtLoading(true);
      // Query terms aligned with EMANATE goals
      const q = 'community health OR youth development OR gender equality OR policy advisory';
      const [crossref, books] = await Promise.all([
        fetchCrossRefPublications(q, 4),
        fetchGoogleBooksSimple('community health', 4),
      ]);
      if (!mounted) return;
      setExternalPubs([...crossref, ...books]);
      setExtLoading(false);
    }
    loadExternal();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Sub-header with image and title */}
      <div className="relative h-44 sm:h-56 md:h-72">
  <img src={bannerImg} alt="Publications banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Publications</h1>
            <p className="text-sm sm:text-base text-white/90 mt-2 max-w-2xl">Browse EMANATE's publications, reports and policy briefs. Download full documents or view summaries.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main list */}
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Cabinet Decisions / Publications</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 pr-6">Title</th>
                        <th className="py-3 pr-6 hidden sm:table-cell">Info</th>
                        <th className="py-3 pr-6">Modified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((doc) => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 pr-6 align-top">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/></svg>
                              <a href={doc.url} className="text-cyan-700 hover:underline font-medium">{doc.title}</a>
                            </div>
                          </td>
                          <td className="py-4 pr-6 hidden sm:table-cell align-top text-gray-600">{doc.size}</td>
                          <td className="py-4 pr-6 align-top text-gray-600">{doc.modified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-600">Showing {start + 1} - {Math.min(start + perPage, total)} of {total}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border rounded-md text-sm" disabled={page === 1}>Prev</button>
                    <div className="text-sm">{page} / {pages}</div>
                    <button onClick={() => setPage(Math.min(pages, page + 1))} className="px-3 py-1 border rounded-md text-sm" disabled={page === pages}>Next</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Archives CTA */}
            <div className="mt-6 bg-gray-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Archives</h3>
                <p className="text-gray-600 mt-2">Find more publications and historical documents in our archive.</p>
              </div>
              <div>
                <Link to="/resources/library" className="inline-block bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-700">Go to the Digital Library</Link>
              </div>
            </div>
          </div>
          {/* External publications */}
          <div className="mt-8 bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">External publications matching EMANATE focus</h3>
            {extLoading ? (
              <div className="text-gray-500">Loading external publications…</div>
            ) : (
              <ul className="space-y-3">
                {externalPubs.map((p) => (
                  <li key={p.id} className="flex items-start justify-between">
                    <div>
                      <a href={p.link || '#'} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-medium">{p.title}</a>
                      <div className="text-xs text-gray-500">{p.authors} • {p.source}</div>
                    </div>
                    <div className="text-xs text-gray-400">{p.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Sidebar - contact / map placeholder */}
          <aside className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-600">EMANATE, Kigali, Rwanda</p>
              <p className="text-gray-600 mt-2">Email: <a href="mailto:info@evidencesmatter.org" className="text-cyan-600">info@evidencesmatter.org</a></p>
              <p className="text-gray-600 mt-2">Phone: +250 788 426 428</p>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
              <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d472.46645934737126!2d30.148108714510737!3d-1.991171317612865!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2srw!4v1762293462630!5m2!1sen!2srw" width="100%" height="160" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;
