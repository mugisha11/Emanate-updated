import React, { useMemo, useState } from 'react';
import PostCard from '../components/PostCard';
import { SearchIcon } from '../components/Icons';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import useInstagramPosts from '../src/hooks/useInstagramPosts';

// Categories for Instagram posts
const inferCategoryFromPost = (post: { message: string }) => {
  const msg = post.message.toLowerCase();
  if (msg.includes('research') || msg.includes('study') || msg.includes('findings')) return 'Research';
  if (msg.includes('programme') || msg.includes('program') || msg.includes('initiative')) return 'Programmes';
  if (msg.includes('announcement') || msg.includes('update')) return 'Announcements';
  if (msg.includes('event') || msg.includes('workshop') || msg.includes('seminar')) return 'Events';
  return 'Top stories';
};

const categories = ['All', 'Top stories', 'Research', 'Programmes', 'Announcements', 'Events'];

// News posts array
const samplePosts = [
  {
    post_id: 'sample-0',
    message: "EMANATE's Impact Report 2025: A Year of Community-Driven Change and Evidence-Based Solutions",
    author: 'EMANATE',
    created_time: new Date().toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Top stories',
  },
  {
    post_id: 'sample-1',
    message: "EMANATE launches 'Beyond Survival' — a programme focused on long-term recovery and resilience for communities affected by crises.",
    author: 'EMANATE',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Programmes',
  },
  {
    post_id: 'sample-2',
    message: "New research brief: Strengthening community health systems — key findings and policy recommendations.",
    author: 'Research Team',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Research',
  },
  {
    post_id: 'sample-3',
    message: "Programme update: 'Children and Parenting' completes phase 1 with improved caregiver support packages rolled out.",
    author: 'Programs',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Programmes',
  },
  {
    post_id: 'sample-4',
    message: "EMANATE announces partnership to expand advocacy and policy engagement on gender equality across regions.",
    author: 'Policy Team',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Announcements',
  },
  {
    post_id: 'sample-5',
    message: "Workshop Series: Building Community Resilience Through Data-Driven Approaches",
    author: 'Events Team',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Events',
  },
  {
    post_id: 'sample-6',
    message: "Youth Development Initiative Expands to 5 New Communities",
    author: 'Programs',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Programmes',
  },
  {
    post_id: 'sample-7',
    message: "New Policy Brief: Strengthening Evidence-Based Decision Making in Public Health",
    author: 'Research Team',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Research',
  },
  {
    post_id: 'sample-8',
    message: "EMANATE Launches Digital Resource Hub for Community Organizations",
    author: 'Digital Team',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Announcements',
  },
  {
    post_id: 'sample-9',
    message: "Collaborative Research: Understanding Community Health Barriers and Solutions",
    author: 'Research Team',
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35).toISOString(),
    post_link: '#',
    image_url: undefined,
    category: 'Research',
  }
];

const listVariants = {
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

export default function NewsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('Top stories');

  // Use Instagram posts exclusively
  const { posts: igPosts, error: igError, loading: igLoading } = useInstagramPosts();
  const posts = useMemo(() => {
    if (igLoading) return [];
    if (igPosts?.length) {
      // Add categories to Instagram posts based on content
      return igPosts.map(post => ({
        ...post,
        category: post.category || inferCategoryFromPost(post)
      }));
    }
    if (igError) {
      console.error('Failed to load Instagram posts:', igError);
    }

    // Fallback: show curated sample posts tied to EMANATE's mission, programmes and goals
    return samplePosts;
  }, [igPosts, igError, igLoading]);

  const normalized = search.trim().toLowerCase();
  const filtered = posts.filter(p => {
    const matchesCat = activeCat === 'All' || activeCat === 'Top stories' || p.category === activeCat;
    const matchesSearch = !normalized || p.message.toLowerCase().includes(normalized) || (p.author && p.author.toLowerCase().includes(normalized));
    return matchesCat && matchesSearch;
  }).sort((a,b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900">{t('nav.news')}</h2>
              <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                {['Home','World','Research','Programmes','Events'].map(x => (
                  <a key={x} className="hover:text-gray-900">{x}</a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t('news.search_placeholder')} className="w-64 rounded-full border border-gray-200 py-2 pl-10 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-cyan-500" />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon className="w-4 h-4"/></div>
              </div>
              <button className="hidden md:inline-flex items-center gap-2 bg-cyan-600 text-white px-3 py-2 rounded-md text-sm">{t('news.subscribe')}</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left category rail */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-20 space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">{t('news.sections')}</h3>
                <div className="flex flex-col gap-2 text-sm">
                  {categories.map(c => (
                    <button key={c} onClick={()=>setActiveCat(c)} className={`text-left py-2 px-3 rounded-md ${activeCat===c?'bg-cyan-50 text-cyan-700':'text-gray-600 hover:bg-gray-50'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700">{t('news.for_you')}</h4>
                <p className="text-xs text-gray-500 mt-2">{t('news.for_you_sub')}</p>
              </div>
            </div>
          </aside>

          {/* Main feed */}
          <main className="lg:col-span-7">
            <div className="space-y-6">
              {featured && (
                <motion.div initial="hidden" animate="visible" variants={itemVariants}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    {featured.image_url && <img src={featured.image_url} alt="featured" className="w-full h-72 object-cover" />}
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{featured.category}</div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">{featured.message}</h3>
                      <div className="text-sm text-gray-500">{new Date(featured.created_time).toLocaleDateString()}</div>
                      <div className="mt-4">
                        <a href={featured.post_link} className="inline-flex items-center gap-2 text-cyan-600 font-semibold">Read full story</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div variants={listVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rest.map(p => (
                  <motion.div key={p.post_id} variants={itemVariants}>
                    <PostCard {...{
                      post_id: p.post_id,
                      message: p.message,
                      author: p.author,
                      created_time: p.created_time,
                      post_link: p.post_link,
                      image_url: p.image_url,
                      category: p.category,
                    }} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </main>

          {/* Right column - featured news and newsletter */}
          <aside className="lg:col-span-3 space-y-6 sm:block">
            <div className="sticky top-20 space-y-6">
              {/* Featured Stories */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{t('news.trending_heading')}</h4>
                  <span className="px-2 py-1 bg-cyan-50 text-cyan-600 text-xs font-medium rounded-full">Featured</span>
                </div>
                <div className="space-y-4">
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-cyan-600 group-hover:text-cyan-700">�</span>
                      <div>
                        <h5 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">Impact Report 2025</h5>
                        <p className="text-sm text-gray-500">Annual review of community initiatives</p>
                      </div>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-cyan-600 group-hover:text-cyan-700">🌟</span>
                      <div>
                        <h5 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">Success Stories</h5>
                        <p className="text-sm text-gray-500">Community transformation highlights</p>
                      </div>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-cyan-600 group-hover:text-cyan-700">📅</span>
                      <div>
                        <h5 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">Upcoming Events</h5>
                        <p className="text-sm text-gray-500">Workshops and conferences</p>
                      </div>
                    </div>
                  </div>
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl text-cyan-600 group-hover:text-cyan-700">�</span>
                      <div>
                        <h5 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">Latest Reports</h5>
                        <p className="text-sm text-gray-500">Research and policy updates</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl p-6 shadow-lg text-white">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).email.value;
                  // TODO: Handle newsletter subscription with API
                  fetch('/api/join', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, type: 'newsletter' })
                  }).then(res => {
                    if (res.ok) {
                      alert('Thank you for subscribing to our newsletter!');
                      (e.target as HTMLFormElement).reset();
                    } else {
                      alert('There was an error subscribing. Please try again.');
                    }
                  });
                }} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📬</span>
                    <div>
                      <h4 className="font-semibold">Stay Informed</h4>
                      <p className="text-cyan-100 text-sm mt-1">Get weekly updates on community impact and research insights</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <input 
                      name="email"
                      type="email"
                      required
                      placeholder="Enter your email for updates" 
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-2.5 px-4 text-sm text-white placeholder-white/60 focus:ring-2 focus:ring-white/30 focus:outline-none" 
                    />
                    <button 
                      type="submit"
                      className="w-full bg-white text-cyan-600 font-medium py-2.5 px-4 rounded-xl hover:bg-white/90 transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      Subscribe to Newsletter
                      <span className="text-sm opacity-75">✨</span>
                    </button>
                  </div>
                  <p className="text-xs text-cyan-100 flex items-center gap-2">
                    <span>🔒</span>
                    <span>Your email is safe with us. No spam, just valuable updates.</span>
                  </p>
                </form>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}


