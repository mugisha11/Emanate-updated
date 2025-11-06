import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImg from '../../components/img/diverse-group-of-young-professionals-collaborating.jpg';
import { fetchDataGovDatasets } from '../../src/services/externalData';

interface Dataset {
  id: string;
  title: string;
  type: string;
  size: string;
  modified: string;
  url?: string;
}

const sampleDatasets: Dataset[] = [
  { id: 'd1', title: 'Household Survey 2024 (CSV)', type: 'CSV', size: '12.4 MB', modified: 'Oct 02, 2024', url: '#' },
  { id: 'd2', title: 'Education Indicators 2023 (XLSX)', type: 'XLSX', size: '4.1 MB', modified: 'Aug 10, 2024', url: '#' },
  { id: 'd3', title: 'Health Access Dashboard Export (JSON)', type: 'JSON', size: '8.7 MB', modified: 'Jul 05, 2024', url: '#' },
  { id: 'd4', title: 'Youth Employment Survey 2022 (CSV)', type: 'CSV', size: '9.3 MB', modified: 'May 18, 2024', url: '#' },
  { id: 'd5', title: 'School Attendance Panel 2021 (CSV)', type: 'CSV', size: '6.2 MB', modified: 'Mar 12, 2024', url: '#' },
  { id: 'd6', title: 'Public Health Indicators 2020-2023 (XLSX)', type: 'XLSX', size: '5.8 MB', modified: 'Jan 11, 2024', url: '#' },
];

const kpiSummary = {
  datasets: sampleDatasets.length,
  totalSizeMB: 46.5,
  lastUpdated: 'Oct 02, 2024',
};

const KPICard: React.FC<{label: string; value: string | number}> = ({ label, value }) => (
  <div className="bg-white border rounded-lg p-4 flex-1">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-2xl font-semibold text-gray-800 mt-2">{value}</div>
  </div>
);

const SimpleBarChart: React.FC<{data: number[]}> = ({ data }) => {
  const max = Math.max(...data, 1);
  return (
    <svg viewBox={`0 0 ${data.length * 22} 60`} className="w-full h-32">
      {data.map((d, i) => {
        const h = (d / max) * 48;
        return <rect key={i} x={i * 22 + 6} y={60 - h} width={12} height={h} rx={2} fill="#06b6d4" />;
      })}
    </svg>
  );
};

const SimpleLineChart: React.FC<{data: number[]}> = ({ data }) => {
  const max = Math.max(...data, 1);
  const points = data.map((d, i) => `${(i * 100) / (data.length - 1)},${100 - (d / max) * 90}`).join(' ');
  return (
    <svg viewBox="0 0 100 100" className="w-full h-32">
      <polyline fill="none" stroke="#10b981" strokeWidth={2} points={points} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const DataPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const total = sampleDatasets.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const visible = sampleDatasets.slice(start, start + perPage);

  const [externalDatasets, setExternalDatasets] = useState<any[]>([]);
  const [extLoading, setExtLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function loadExternal() {
      setExtLoading(true);
      const q = 'education OR health OR youth OR gender equality';
      const results = await fetchDataGovDatasets(q, 6);
      if (!mounted) return;
      setExternalDatasets(results);
      setExtLoading(false);
    }
    loadExternal();
    return () => { mounted = false; };
  }, []);

  // sample chart data for visuals
  const downloadsByMonth = [12, 18, 25, 30, 22, 28, 34, 40, 36, 30, 26, 20];
  const datasetsByYear = [2, 3, 4, 5, 6];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative h-44 sm:h-56 md:h-72">
        <img src={bannerImg} alt="Data and statistics banner" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">Data & Statistics</h1>
            <p className="text-sm sm:text-base text-white/90 mt-2 max-w-2xl">Download datasets and interactive indicators that underpin EMANATE's research and policy work.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <KPICard label="Datasets" value={kpiSummary.datasets} />
          <KPICard label="Total size (MB)" value={kpiSummary.totalSizeMB} />
          <KPICard label="Last updated" value={kpiSummary.lastUpdated} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Downloads (last 12 months)</h3>
                <SimpleBarChart data={downloadsByMonth} />
                <div className="text-sm text-gray-500 mt-2">Monthly downloads across datasets</div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Datasets added (yearly)</h3>
                <SimpleLineChart data={datasetsByYear} />
                <div className="text-sm text-gray-500 mt-2">New datasets published each year</div>
              </div>
            </div>

            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Open Datasets</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 pr-6">Dataset</th>
                        <th className="py-3 pr-6 hidden sm:table-cell">Type</th>
                        <th className="py-3 pr-6 hidden sm:table-cell">Size</th>
                        <th className="py-3 pr-6">Modified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((d) => (
                        <tr key={d.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 pr-6 align-top">
                            <div className="flex items-start gap-3">
                              <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a2 2 0 0 1 2 2v10l4 4H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h6z"/></svg>
                              <a href={d.url} className="text-cyan-700 hover:underline font-medium">{d.title}</a>
                            </div>
                          </td>
                          <td className="py-4 pr-6 hidden sm:table-cell align-top text-gray-600">{d.type}</td>
                          <td className="py-4 pr-6 hidden sm:table-cell align-top text-gray-600">{d.size}</td>
                          <td className="py-4 pr-6 align-top text-gray-600">{d.modified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

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

            <div className="mt-6 bg-white border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">External datasets matching EMANATE focus</h2>
              {extLoading ? (
                <div className="text-gray-500">Loading external datasets…</div>
              ) : (
                <ul className="space-y-3">
                  {externalDatasets.map((d) => (
                    <li key={d.id} className="flex items-start justify-between">
                      <div>
                        <a href={d.link || '#'} target="_blank" rel="noopener noreferrer" className="text-cyan-700 hover:underline font-medium">{d.title}</a>
                        <div className="text-xs text-gray-500">{d.authors} • {d.source}</div>
                      </div>
                      <div className="text-xs text-gray-400">{d.date}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 bg-gray-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Dataset Archive</h3>
                <p className="text-gray-600 mt-2">Older datasets and archived indicators are available in the data archive.</p>
              </div>
              <div>
                <Link to="/resources/library" className="inline-block bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-cyan-700">Browse Archive</Link>
              </div>
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

export default DataPage;

