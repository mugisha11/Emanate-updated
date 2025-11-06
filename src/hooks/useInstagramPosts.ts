import { useEffect, useState } from 'react';

export type InstaPost = {
  post_id: string;
  message: string;
  author?: string;
  created_time: string;
  post_link?: string;
  image_url?: string;
  category?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  caption?: string;
  timestamp?: string;
};

export default function useInstagramPosts() {
  const businessId = '772767865931242'; // Your Instagram Business Account ID
  const endpoint = `/api/instagram?business_id=${businessId}`;
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(endpoint, { 
      cache: 'no-store',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to fetch Instagram posts (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data?.data)) {
          // Transform Instagram API response to our format
          const transformedPosts = data.data.map((post: any) => ({
            post_id: post.id,
            message: post.caption || '',
            author: 'EMANATE',
            created_time: post.timestamp,
            post_link: post.permalink,
            image_url: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
            category: 'Top stories', // Will be inferred by NewsPage
            media_type: post.media_type,
            media_url: post.media_url,
            permalink: post.permalink,
            caption: post.caption,
            timestamp: post.timestamp
          }));
          setPosts(transformedPosts);
        } else {
          setPosts([]);
        }
      })
      .catch((err) => {
        if (!mounted) return;
        console.error('Instagram fetch error:', err);
        setError(err as Error);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [endpoint]);

  return { posts, loading, error };
}
