// realEstateVideos.ts
export interface VideoType {
  id: number;
  title: string;
  description?: string; 
  tags?: string[];
  duration?:string;
  videoUrl: string;
  thumbnail: string;
  date?: string;
  color?: string;
}
export const realEstateVideos: VideoType[] = [
  {
    id: 1,
    title: "Dron Video 1",
    duration: "1:06",
    videoUrl: "public/videos/Real Estate & Development/Dron Video 1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    date: "2023-09-19",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 2,
    title: "Reel 1",
    duration: "0:33",
    videoUrl: "public/videos/Real Estate & Development/Reel 1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    date: "2026-02-04",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: 3,
    title: "Reel-1",
    duration: "0:33",
    videoUrl: "public/videos/Real Estate & Development/Reel-1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
    date: "2025-09-02",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    id: 4,
    title: "Reel 1-1",
    duration: "1:03",
    videoUrl: "public/videos/Real Estate & Development/Reel 1-1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    date: "2025-06-30",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    id: 5,
    title: "Reel 2",
    duration: "0:25",
    videoUrl: "public/videos/Real Estate & Development/Reel 2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    date: "2025-10-29",
    color: "from-teal-500/20 to-cyan-500/20"
  },
  {
    id: 6,
    title: "Reel 2-2",
    duration: "1:40",
    videoUrl: "public/videos/Real Estate & Development/Reel 2-2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop",
    date: "2025-11-30",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    id: 7,
    title: "Reel 6",
    duration: "0:50",
    videoUrl: "public/videos/Real Estate & Development/Reel 6.mp4",
    thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop",
    date: "2025-08-21",
    color: "from-lime-500/20 to-green-500/20"
  },
  {
    id: 8,
    title: "Reels 1",
    duration: "0:16",
    videoUrl: "public/videos/Real Estate & Development/Reels 1.mp4",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    date: "2024-02-14",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 9,
    title: "Reels 2",
    duration: "0:24",
    videoUrl: "public/videos/Real Estate & Development/Reels 2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
    date: "2024-02-18",
    color: "from-rose-500/20 to-pink-500/20"
  },
  {
    id: 10,
    title: "Reels 7",
    duration: "0:33",
    videoUrl: "public/videos/Real Estate & Development/Reels 7.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
    date: "2024-02-19",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 11,
    title: "فندق ومنتجع رويال",
    duration: "0:44",
    videoUrl: "public/videos/Real Estate & Development/فندق ومنتجع رويال م.mp4",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    date: "2024-07-20",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: 12,
    title: "مشروع سما اليادودة 2",
    duration: "0:56",
    videoUrl: "public/videos/Real Estate & Development/مشروع سما اليادودة 2.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
    date: "2025-09-23",
    color: "from-orange-500/20 to-red-500/20"
  }
];