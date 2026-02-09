export interface YouTubeInfo {
  videoId: string;
  timestamp?: number;
}

export function parseYouTubeUrl(url: string): YouTubeInfo | null {
  try {
    const urlObj = new URL(url);
    let videoId: string | null = null;
    let timestamp: number | undefined;

    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
      const t = urlObj.searchParams.get('t');
      if (t) {
        timestamp = parseYouTubeTimestamp(t);
      }
    } else if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname === '/watch') {
        videoId = urlObj.searchParams.get('v');
        const t = urlObj.searchParams.get('t');
        if (t) {
          timestamp = parseYouTubeTimestamp(t);
        }
      } else if (urlObj.pathname.startsWith('/embed/')) {
        videoId = urlObj.pathname.split('/')[2];
        const t = urlObj.searchParams.get('start');
        if (t) timestamp = parseInt(t, 10);
      } else if (urlObj.pathname.startsWith('/v/')) {
        videoId = urlObj.pathname.split('/')[2];
        const t = urlObj.searchParams.get('t');
        if (t) timestamp = parseYouTubeTimestamp(t);
      }
    }

    // Handle case where videoId might have other query params if not using URL constructor correctly for some formats
    if (videoId && videoId.includes('&')) {
      videoId = videoId.split('&')[0];
    }
    if (videoId && videoId.includes('?')) {
      videoId = videoId.split('?')[0];
    }

    if (videoId && videoId.length === 11) {
      return { videoId, timestamp };
    }
  } catch (e) {
    // Fallback to regex if URL parsing fails
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
       return { videoId: match[2] };
    }
  }
  return null;
}

function parseYouTubeTimestamp(t: string): number {
  if (t.includes('h') || t.includes('m') || t.includes('s')) {
    const h = t.match(/(\d+)h/);
    const m = t.match(/(\d+)m/);
    const s = t.match(/(\d+)s/);
    return (h ? parseInt(h[1], 10) * 3600 : 0) + 
           (m ? parseInt(m[1], 10) * 60 : 0) + 
           (s ? parseInt(s[1], 10) : 0);
  }
  return parseInt(t, 10);
}

export function getThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}
