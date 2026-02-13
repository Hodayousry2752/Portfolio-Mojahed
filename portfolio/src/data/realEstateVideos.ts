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
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/q_auto,f_auto,vc_auto/v1770938374/Dron_Video_1_dyybxb",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
    date: "2023-09-19",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 2,
    title: "Reel 1",
    duration: "0:33",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940291/Reel_1_u7b45z.mp4",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    date: "2026-02-04",
    color: "from-yellow-500/20 to-orange-500/20"
  },
  {
    id: 3,
    title: "Reel-1",
    duration: "0:33",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940463/Reel-_1_z6qrjd.mp4",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop",
    date: "2025-09-02",
    color: "from-red-500/20 to-rose-500/20"
  },
  {
    id: 4,
    title: "Reel 1-1",
    duration: "1:03",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940599/Reel_1-1_hfgynw.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    date: "2025-06-30",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    id: 5,
    title: "Reel 2",
    duration: "0:25",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940530/Reel_2_v3nvwh.mp4",
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
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940580/Reel_6_ckdsew.mp4",
    thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&auto=format&fit=crop",
    date: "2025-08-21",
    color: "from-lime-500/20 to-green-500/20"
  },
  {
    id: 8,
    title: "Reels 1",
    duration: "0:16",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940503/Reels_1_wuczzk.mp4",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop",
    date: "2024-02-14",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 9,
    title: "Reels 2",
    duration: "0:24",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940531/Reels_2_houtnh.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
    date: "2024-02-18",
    color: "from-rose-500/20 to-pink-500/20"
  },
  {
    id: 10,
    title: "Reels 7",
    duration: "0:33",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940616/Reels_7_l2gkhw.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
    date: "2024-02-19",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 11,
    title: "فندق ومنتجع رويال",
    duration: "0:44",
    videoUrl: "public/videos/Real Estate & Development/فندق ومنتجع رويال مون.mp4",
    thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
    date: "2024-07-20",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: 12,
    title: "مشروع سما اليادودة 2",
    duration: "0:56",
    videoUrl: "https://res.cloudinary.com/driyz3pac/video/upload/v1770940720/%D9%85%D8%B4%D8%B1%D9%88%D8%B9_%D8%B3%D9%85%D8%A7_%D8%A7%D9%84%D9%8A%D8%A7%D8%AF%D9%88%D8%AF%D8%A9_2_oosuqo.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
    date: "2025-09-23",
    color: "from-orange-500/20 to-red-500/20"
  }
];