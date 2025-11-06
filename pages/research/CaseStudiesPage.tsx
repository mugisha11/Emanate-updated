import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../components/img/diverse-group-of-young-professionals-collaborating.jpg';
import { fetchCrossRefPublications } from '../../src/services/externalData';

interface CaseStudy {
  id: string;
  title: string;
  excerpt?: string;
  size?: string;
  modified: string;
  url?: string;
}

const sampleCaseStudies: CaseStudy[] = [
  { id: 'c1', title: 'Community Dialogue: Improving Youth Participation', excerpt: 'A case study on youth engagement in local governance.', size: '2.3 MB', modified: 'Oct 01, 2024', url: '#' },
  { id: 'c2', title: 'Gender-Responsive Programming in Schools', excerpt: 'Lessons learned from pilot interventions in three districts.', size: '1.9 MB', modified: 'Aug 20, 2024', url: '#' },
  { id: 'c3', title: 'Strengthening Health Outreach for Rural Women', excerpt: 'A look at community-led outreach strategies and outcomes.', size: '2.7 MB', modified: 'Jun 15, 2024', url: '#' },
  { id: 'c4', title: 'Youth Employability: A Skills Development Initiative', excerpt: 'Program evaluation and participant outcomes.', size: '3.0 MB', modified: 'May 05, 2024', url: '#' },
];

const CaseStudiesPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const total = sampleCaseStudies.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const visible = sampleCaseStudies.slice(start, start + perPage);

  const [external, setExternal] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const q = 'community dialogue OR gender equality OR youth participation';
      const pubs = await fetchCrossRefPublications(q, 4);
      if (!mounted) return;
      setExternal(pubs);
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-44 sm:h-56 md:h-72">
        <img src={bannerImg} alt="Case studies banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Case Studies</h1>
            <p className="text-sm sm:text-base text-white/90 mt-2 max-w-2xl">Explore in-depth case studies from EMANATE's programmes — practical lessons, outcomes and recommendations.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <div className="space-y-4">
              {visible.map((cs) => (
                <article key={cs.id} className="bg-white border rounded-lg p-6 hover:shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800"><a href={cs.url} className="text-cyan-700 hover:underline">{cs.title}</a></h3>
                      {cs.excerpt && <p className="text-gray-600 mt-2">{cs.excerpt}</p>}
                      <div className="mt-3 text-sm text-gray-600">{cs.size} • {cs.modified}</div>
                    </div>
                    <div className="flex-shrink-0">
                      <Link to={cs.url || '#'} className="inline-block bg-cyan-600 text-white px-3 py-2 rounded-md text-sm">Download</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-600">Showing {start + 1} - {Math.min(start + perPage, total)} of {total}</div>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage(Math.max(1, page - 1))} className="px-3 py-1 border rounded-md text-sm" disabled={page === 1}>Prev</button>
                <div className="text-sm">{page} / {pages}</div>
                <button onClick={() => setPage(Math.min(pages, page + 1))} className="px-3 py-1 border rounded-md text-sm" disabled={page === pages}>Next</button>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Archive of Case Studies</h3>
                <p className="text-gray-600 mt-2">Browse older case studies and historic programme reports.</p>
              </div>
              <div>
                <Link to="/resources/library" className="inline-block bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-700">View the Archive</Link>
              </div>
            </div>

            <div className="mt-6 bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Related case studies & publications (external)</h3>
              <ul className="space-y-2">
                {external.map((e) => (
                  <li key={e.id} className="flex items-start justify-between">
                    <div>
                      <a href={e.link || '#'} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-medium">{e.title}</a>
                      <div className="text-xs text-gray-500">{e.authors} • {e.source}</div>
                    </div>
                    <div className="text-xs text-gray-400">{e.date}</div>
                  </li>
                ))}
              </ul>
            </div>
          </main>

          <aside className="space-y-6">
            <div className="bg-white border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Contact</h4>
              <p className="text-gray-600">EMANATE, Kigali, Rwanda</p>
              <p className="text-gray-600 mt-2">Email: <a href="mailto:info@evidencesmatter.org" className="text-cyan-600">info@evidencesmatter.org</a></p>
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

export default CaseStudiesPage;
 
