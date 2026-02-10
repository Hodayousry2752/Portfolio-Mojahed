// medicalVideos.ts
export type VideoType = {
  id: number;
  title: string;
  duration?: string;
  videoUrl: string;
  thumbnail: string;
  date?: string;
  color?: string;
  tags?: string[];
  description?: string;
  featured?: boolean;
};

export const medicalVideos: VideoType[] = [
  {
    id: 1,
    title: "15",
    duration: "00:21",
    videoUrl: "public/videos/Medical & Wellness/15.mp4",
     thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdPOZEZqbDUNrYj-2bouaAqPzJnrrw2nUjTA&s"
  },
    {
    id: 2,
    title: "16",
    duration: "00:20",
    videoUrl: "public/videos/Medical & Wellness/16.mp4",
    thumbnail: "data:image/jpeg;base64,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",
    date: "2025-04-12",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    title: "17",
    duration: "00:34",
    videoUrl: "public/videos/Medical & Wellness/17.mp4",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFgihLt8agOiarlKpOmGAk-p09Ubb6WvV-Q&s",
    date: "2025-04-12",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    title: "18",
    duration: "00:32",
    videoUrl: "public/videos/Medical & Wellness/18.mp4",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6zDNRRrVpjYbqc7UKAqAigvDfbDMezIYdg&s",
    date: "2025-04-13",
    color: "from-teal-500/20 to-green-500/20"
  },
  {
    id: 5,
    title: "19",
    duration: "00:29",
    videoUrl: "public/videos/Medical & Wellness/19.mp4",
    thumbnail: "https://media.ulta.com/i/ulta/Skinfat_WK3424_Hero_S_NoLockup?w=1400&$Neutral00BGLight$&fmt=auto",
    date: "2025-04-13",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 6,
    title: "20",
    duration: "00:20",
    videoUrl: "public/videos/Medical & Wellness/20.mp4",
    thumbnail: "https://assets.boots.com/content/dam/boots/advice/beauty-and-skincare/skincare/skincare-routines/what-is-k-beauty/advice_what-is-k-beauty_skincare_onward-journey.dam.ts%3D1727709509667.jpg",
    date: "2025-04-13",
    color: "from-red-500/20 to-orange-500/20"
  },
  {
    id: 7,
    title: "Reels 1",
    duration: "01:17",
    videoUrl: "public/videos/Medical & Wellness/Reels 1.mp4",
    thumbnail: "https://cdn.aarp.net/content/dam/aarpe/en/home/entertainment/beauty-style/gray-hair/_jcr_content/root/container_main/container_moreAarp_main/container_moreAarp/container_moreAarp_cmp/featuredlist/tabItem/makeup-tips1.coreimg.50.932.jpeg/content/dam/aarp/entertainment/beauty-and-style/2023/09/1140-makeup-skin-care-table.jpg",
    date: "2024-11-17",
    color: "from-indigo-500/20 to-violet-500/20"
  },
  {
    id: 8,
    title: "Reels 2",
    duration: "00:40",
    videoUrl: "public/videos/Medical & Wellness/Reels 2.mp4",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGQsWDA8DYrfXyrhqpc5e3r28nf0fMGt3kEA&s",
    date: "2024-12-04",
    color: "from-violet-500/20 to-purple-500/20"
  },
  {
    id: 9,
    title: "Reels 3",
    duration: "01:29",
    videoUrl: "public/videos/Medical & Wellness/Reels 3.mp4",
    thumbnail: "https://i.guim.co.uk/img/media/01f87bf222d7a5480efed804f97fc34d3b76e20c/0_200_6000_3600/master/6000.jpg?width=465&dpr=1&s=none&crop=none",
    date: "2024-12-25",
    color: "from-amber-500/20 to-yellow-500/20"
  },
  {
    id: 10,
    title: "Reels 4",
    duration: "00:44",
    videoUrl: "public/videos/Medical & Wellness/Reels 4.mp4",
    thumbnail: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEje4zN6Vdl_ICYsp0lJu0XA_blmLG3AzEAgxIbSLasn6vPhBgHRPhgK5pFxTDsNTmt8QE8iDI1cM-R5EdwLyrTbp9g8vjZdSXK6qKhg7lPUCZzYwRiWLH4jdb6evRNhgEOSxU6X2Y1wj80/s1600/Barely-There-Beauty-flatlay-beauty-lifestyle-photography-skincare-routine-1.jpg",
    date: "2025-01-08",
    color: "from-lime-500/20 to-green-500/20"
  },
  {
    id: 11,
    title: "Reels 5",
    duration: "01:03",
    videoUrl: "public/videos/Medical & Wellness/Reels 5.mp4",
    thumbnail: "https://www.okbeautybox.co.uk/cdn/shop/files/Featuredimage.jpg?v=1769693149",
    date: "2025-11-24",
    color: "from-emerald-500/20 to-teal-500/20"
  },
  {
    id: 12,
    title: "Reels 6",
    duration: "00:55",
    videoUrl: "public/videos/Medical & Wellness/Reels 6.mp4",
    thumbnail: "https://theadamskilt.com/wp-content/uploads/2023/09/skin-1-e1695314912117.jpeg",
    date: "2025-10-02",
    color: "from-cyan-500/20 to-blue-500/20"
  },
  {
    id: 13,
    title: "Reels 7",
    duration: "00:40",
    videoUrl: "public/videos/Medical & Wellness/Reels 7.mp4",
    thumbnail: "https://i.pinimg.com/736x/a3/bb/56/a3bb5608a85de2b0d3a5229322ae830f.jpg",
    date: "2024-08-05",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 14,
    title: "Reels 8",
    duration: "00:24",
    videoUrl: "public/videos/Medical & Wellness/Reels 8.mp4",
    thumbnail: "https://media.glamourmagazine.co.uk/photos/68d6a342c2925708d04110ce/1:1/w_2560%2Cc_limit/GLAM-GLASSSKIN-MAIN-02.jpg",
    date: "2024-08-26",
    color: "from-rose-500/20 to-pink-500/20"
  }
];