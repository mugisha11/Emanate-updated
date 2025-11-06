// Lightweight connectors to public data sources used by the Digital Library and research pages.
// These functions are intentionally simple wrappers around public APIs (no API keys required)
// and return normalized items the UI can render. They include basic error handling and
// fall back to an empty array if the external call fails.

export interface ExternalItem {
  id: string;
  title: string;
  authors?: string;
  date?: string;
  source?: string;
  link?: string;
  excerpt?: string;
}

export async function fetchCrossRefPublications(query: string, rows = 6): Promise<ExternalItem[]> {
  if (!query) return [];
  try {
    const q = encodeURIComponent(query);
    const url = `https://api.crossref.org/works?query.title=${q}&rows=${rows}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('CrossRef error');
    const json = await res.json();
    const items = (json.message?.items || []).map((it: any) => ({
      id: it.DOI || it.id || Math.random().toString(36).slice(2),
      title: it.title?.[0] || it.title || 'Untitled',
      authors: it.author ? it.author.map((a: any) => `${a.given || ''} ${a.family || ''}`).join(', ') : undefined,
      date: it.created?.['date-time'] || it.published?.['date-time'] || it.issued?.['date-parts']?.[0]?.join('-'),
      source: 'CrossRef',
      link: (it.URL || (it['link'] && it['link'][0] && it['link'][0].URL)) || undefined,
      excerpt: it.abstract || undefined,
    }));
    return items;
  } catch (err) {
    console.error('fetchCrossRefPublications failed', err);
    return [];
  }
}

export async function fetchDataGovDatasets(query: string, rows = 6): Promise<ExternalItem[]> {
  if (!query) return [];
  try {
    const q = encodeURIComponent(query);
    const url = `https://catalog.data.gov/api/3/action/package_search?q=${q}&rows=${rows}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Data.gov error');
    const json = await res.json();
    const results = (json.result?.results || []).map((r: any) => ({
      id: r.id,
      title: r.title,
      authors: r.organization?.title || r.publisher || undefined,
      date: r.metadata_created || r.metadata_modified,
      source: 'Data.gov',
      link: r.url || (r.resources && r.resources[0] && r.resources[0].url) || undefined,
      excerpt: r.notes || undefined,
    }));
    return results;
  } catch (err) {
    console.error('fetchDataGovDatasets failed', err);
    return [];
  }
}

export async function fetchGoogleBooksSimple(query: string, maxResults = 6) {
  if (!query) return [];
  try {
    const q = encodeURIComponent(query);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=${maxResults}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Google Books error');
    const data = await res.json();
    return (data.items || []).map((it: any) => ({
      id: it.id,
      title: it.volumeInfo?.title,
      authors: it.volumeInfo?.authors ? it.volumeInfo.authors.join(', ') : undefined,
      date: it.volumeInfo?.publishedDate,
      source: 'Google Books',
      link: it.volumeInfo?.infoLink,
      excerpt: it.volumeInfo?.description,
    }));
  } catch (err) {
    console.error('fetchGoogleBooksSimple failed', err);
    return [];
  }
}
