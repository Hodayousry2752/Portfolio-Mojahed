import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { 
  ChevronLeft, 
  Play, 
  X, 
  Clock,
  Filter,
  ChevronDown,
  Check,
  Search,
  MessageCircle,
  Pause,
  Maximize2,
  Minimize2,
  Loader2,
  Grid,
  List,
  Download,
  Share2,
  MapPin,
  Camera,
  Navigation,
  Calendar,
  Film,
  // Eye,
  Wind,
  Target,
  // Zap
} from "lucide-react";
import { droneVideos } from "../data/droneVideos";

type SortOption = "date" | "duration" | "name" | "location";
type ViewMode = "grid" | "list";

interface DroneVideo {
  id: number;
  title: string;
  duration: string;
  date: string;
  altitude: string;
  color: string;
  videoUrl: string;
  thumbnail: string;
  location?: string;    
  resolution?: string;  
  featured?: boolean;   
}

export default function DroneGallery() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
const [selectedVideo, setSelectedVideo] = useState<DroneVideo | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);

  const isRTL = i18n.language === "ar";
  const MotionLink = motion(Link);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedVideo) return;
      
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVideo]);

  const filteredVideos = useMemo(() => {
    let videos = [...droneVideos] as DroneVideo[];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      videos = videos.filter(v => 
        v.title.toLowerCase().includes(query) ||
        (v.location && v.location.toLowerCase().includes(query))
      );
    }
    
    if (sortBy === "duration") {
      videos.sort((a, b) => {
        const toSeconds = (time: string) => {
          const parts = time.split(":").map(Number);
          return parts[0] * 60 + parts[1];
        };
        return toSeconds(b.duration) - toSeconds(a.duration);
      });
    } else if (sortBy === "name") {
      videos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "location") {
      videos.sort((a, b) => (a.location || "").localeCompare(b.location || ""));
    }
    
    return videos;
  }, [searchQuery, sortBy]);

  const sortOptions = [
    { id: "date" as const, label: t("droneGallery.sortOptions.date"), icon: Film },
    { id: "duration" as const, label: t("droneGallery.sortOptions.duration"), icon: Clock },
    { id: "name" as const, label: t("droneGallery.sortOptions.name"), icon: Filter },
    { id: "location" as const, label: t("droneGallery.sortOptions.location"), icon: MapPin },
  ];

  const handlePlayVideo = (video: any) => {
  setSelectedVideo(video);
  setIsLoading(true);
  setIsPlaying(false);
  setCurrentTime(0);
  setShowControls(true);

  requestAnimationFrame(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
      });
    }
  });
};


  const togglePlay = () => {
  if (!videoRef.current) return;

  videoRef.current.muted = false;

  if (isPlaying) {
    videoRef.current.pause();
  } else {
    videoRef.current.play();
  }

  setIsPlaying(!isPlaying);
};


  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const toggleFullscreen = async () => {
    if (!modalRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await modalRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error("خطأ في الشاشة الكاملة:", err);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getTotalSeconds = (duration?: string) => {
    const parts = (duration || "0:00").split(":").map(Number);
    return parts[0] * 60 + parts[1];
  };

  const handleDownload = (video: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("تحميل الفيديو:", video.title);
    
    if (video.videoUrl) {
      const link = document.createElement('a');
      link.href = video.videoUrl;
      link.download = `${video.title.replace(/\s+/g, '_')}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(isRTL ? `جاري تحميل ${video.title}` : `Downloading ${video.title}`);
    }
  };

  const handleShare = (video: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("مشاركة الفيديو:", video.title);
    
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: t("droneGallery.contactCta"),
        url: window.location.href,
      }).catch(err => console.log("خطأ في المشاركة:", err));
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert(isRTL ? "تم نسخ الرابط إلى الحافظة" : "Link copied to clipboard"))
        .catch(err => console.log("خطأ في النسخ:", err));
    } else {
      alert(isRTL ? "تم نسخ الرابط" : "Link copied to clipboard");
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-all"
              >
                <ChevronLeft className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} />
                <span className="text-sm font-medium">{t("nav.projects") || "رجوع"}</span>
              </motion.button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">{t("nav.drone")}</h1>
                  <p className="text-gray-400 text-xs">{droneVideos.length} {isRTL ? "مقطع جوي" : "aerial clips"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {isRTL ? "تصوير جوي باحترافية" : "Professional Aerial Photography"}
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-3xl mx-auto mb-8">
            {isRTL ? "استكشف مجموعة اللقطات الجوية عالية الجودة بتقنية 4K، مصممة لعرض المناظر الطبيعية والمواقع من منظور فريد" : "Explore high-quality 4K aerial footage designed to showcase landscapes and locations from unique perspectives"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-6 rounded-2xl bg-gradient-to-br from-zinc-900/30 to-black/30 border border-zinc-800/30">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? "ابحث في المقاطع الجوية..." : "Search aerial clips..."}
                  className="w-full px-4 py-3 pl-11 bg-black/30 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-black/30 rounded-xl p-1 border border-zinc-800">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === "grid" ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-zinc-800/30'}`}
                  title={isRTL ? "عرض شبكي" : "Grid view"}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === "list" ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-zinc-800/30'}`}
                  title={isRTL ? "عرض قائمة" : "List view"}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-black/30 border border-zinc-800 hover:border-blue-500/30 transition-all"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">{isRTL ? "ترتيب" : "Sort"}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showSortDropdown ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {showSortDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 border border-zinc-800 shadow-xl z-50"
                    >
                      {sortOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id);
                              setShowSortDropdown(false);
                            }}
                            className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4" />
                              <span className="text-sm">{option.label}</span>
                            </div>
                            {sortBy === option.id && (
                              <Check className="w-4 h-4 text-blue-400" />
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {filteredVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
              <Navigation className="w-16 h-16 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {isRTL ? "لا توجد مقاطع جوية" : "No aerial clips found"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              {searchQuery 
                ? (isRTL ? "لم يتم العثور على مقاطع تطابق بحثك." : "No clips match your search.")
                : (isRTL ? "جرب فلتراً مختلفاً." : "Try a different filter.")}
            </p>
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 font-medium"
              >
                {isRTL ? "عرض جميع المقاطع" : "Show all clips"}
              </motion.button>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => handlePlayVideo(video)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-800/40 bg-gradient-to-br from-zinc-900/30 to-black/30 transition-all duration-300 group-hover:border-blue-500/50 group-hover:from-zinc-900/50 group-hover:to-black/50">
                  <div className="relative aspect-video overflow-hidden">
                    {video.thumbnail ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallbackDiv = e.currentTarget.parentElement?.querySelector('.thumbnail-fallback');
                            if (fallbackDiv) {
                              (fallbackDiv as HTMLDivElement).style.display = 'flex';
                            }
                          }}
                        />
                        <div className={`thumbnail-fallback absolute inset-0 bg-gradient-to-r ${video.color} flex items-center justify-center`} style={{ display: 'none' }}>
                          <Navigation className="w-16 h-16 text-white/80" />
                        </div>
                      </div>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${video.color} flex items-center justify-center relative`}>
                        <Navigation className="w-16 h-16 text-white/80" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative transform transition-transform group-hover:scale-110">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                        <div className="relative w-20 h-20 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border-2 border-white/20 group-hover:border-blue-400/50 transition-all">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {video.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-400 text-sm mb-1">{isRTL ? "التاريخ" : "Date"}</div>
                        <div className="text-white font-medium">{video.date}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/30">
                        <Camera className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-xs text-gray-400">{isRTL ? "الدقة" : "Resolution"}</div>
                          <div className="text-white font-medium">{video.resolution}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/30">
                        <Target className="w-5 h-5 text-cyan-400" />
                        <div>
                          <div className="text-xs text-gray-400">{isRTL ? "الارتفاع" : "Altitude"}</div>
                          <div className="text-white font-medium">{video.altitude}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800/30">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
                          onClick={(e) => handleDownload(video, e)}
                          title={isRTL ? "تحميل الفيديو" : "Download video"}
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
                          onClick={(e) => handleShare(video, e)}
                          title={isRTL ? "مشاركة الفيديو" : "Share video"}
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-300 hover:from-blue-600/30 hover:to-cyan-600/30 transition-all text-sm">
                        {isRTL ? "مشاهدة" : "Watch"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {filteredVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: isRTL ? -5 : 5 }}
                className="group cursor-pointer"
                onClick={() => handlePlayVideo(video)}
              >
                <div className="flex items-center gap-6 p-6 rounded-2xl border border-gray-800/30 bg-gradient-to-r from-zinc-900/30 to-black/30 transition-all duration-300 group-hover:border-blue-500/50 group-hover:from-zinc-900/50 group-hover:to-black/50">
                  <div className="relative w-48 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                    {video.thumbnail ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallbackDiv = e.currentTarget.parentElement?.querySelector('.thumbnail-fallback');
                            if (fallbackDiv) {
                              (fallbackDiv as HTMLDivElement).style.display = 'flex';
                            }
                          }}
                        />
                        <div className={`thumbnail-fallback absolute inset-0 bg-gradient-to-r ${video.color} flex items-center justify-center`} style={{ display: 'none' }}>
                          <Navigation className="w-12 h-12 text-white/70" />
                        </div>
                      </div>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${video.color} flex items-center justify-center`}>
                        <Navigation className="w-12 h-12 text-white/70" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs">
                      {video.duration}
                    </div>
                    {video.featured && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded text-xs">
                        {isRTL ? "مميز" : "Featured"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {video.title}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{video.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{video.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
                          onClick={(e) => handleDownload(video, e)}
                          title={isRTL ? "تحميل الفيديو" : "Download video"}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors"
                          onClick={(e) => handleShare(video, e)}
                          title={isRTL ? "مشاركة الفيديو" : "Share video"}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/30">
                        <Camera className="w-4 h-4 text-blue-400" />
                        <div>
                          <div className="text-xs text-gray-400">{isRTL ? "الدقة" : "Resolution"}</div>
                          <div className="text-white font-medium">{video.resolution}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-800/30">
                        <Target className="w-4 h-4 text-cyan-400" />
                        <div>
                          <div className="text-xs text-gray-400">{isRTL ? "الارتفاع" : "Altitude"}</div>
                          <div className="text-white font-medium">{video.altitude}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredVideos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-blue-900/10 to-cyan-900/10 border border-blue-500/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center mb-6">
                  <Navigation className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {isRTL ? "تقنية تصوير الدرون المتقدمة" : "Advanced Drone Photography Technology"}
                </h3>
                <p className="text-gray-300">
                  {isRTL ? "جميع المقصورات الجوية مسجلة بتقنية 4K عالية الجودة مع استقرار متطور للحصول على لقطات سلسة واحترافية." : "All aerial footage recorded in high-quality 4K with advanced stabilization for smooth, professional shots."}
                </p>
              </div>
              
              <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-xl bg-black/30 border border-gray-800/30">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="font-bold text-white mb-1">4K Ultra HD</div>
                  <div className="text-gray-400 text-sm">{isRTL ? "دقة تصوير عالية" : "High recording resolution"}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-black/30 border border-gray-800/30">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="font-bold text-white mb-1">200m+</div>
                  <div className="text-gray-400 text-sm">{isRTL ? "ارتفاع تصوير" : "Shooting altitude"}</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-black/30 border border-gray-800/30">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="font-bold text-white mb-1">30min+</div>
                  <div className="text-gray-400 text-sm">{isRTL ? "زمن طيران" : "Flight time"}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'} bg-black/95 backdrop-blur-xl`}
            onClick={() => {
              if (isPlaying) {
                videoRef.current?.pause();
              }
              setSelectedVideo(null);
            }}
            onMouseMove={handleMouseMove}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative ${isFullscreen ? 'w-screen h-screen' : 'w-full max-w-[90vw] xl:max-w-[75vw] h-[85vh]'} bg-gradient-to-br from-gray-900 to-black ${isFullscreen ? 'rounded-none' : 'rounded-2xl'} overflow-hidden border border-gray-800/50 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {isLoading && (
                <div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-500/30 border-t-blue-500"
                    >
                      <Loader2 className="w-full h-full text-blue-500 p-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isRTL ? "جاري تحميل الفيديو" : "Loading video"}
                    </h3>
                    <p className="text-gray-400">
                      {isRTL ? "يرجى الانتظار..." : "Please wait..."}
                    </p>
                  </div>
                </div>
              )}

              <div className="relative w-full h-full bg-black">
                {isFullscreen && (
                  <div className="absolute top-4 right-4 z-30 flex items-center gap-4">
                    <h2 className="text-xl font-bold text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                      {selectedVideo.title}
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (isPlaying) {
                          videoRef.current?.pause();
                        }
                        setSelectedVideo(null);
                      }}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex-shrink-0"
                      title={isRTL ? "إغلاق" : "Close"}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </div>
                )}

                <video
                ref={videoRef}
                src={selectedVideo.videoUrl}
                muted
                playsInline
                preload="metadata"
                className={`w-full h-full ${isFullscreen ? 'object-cover' : 'object-contain'}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() => {
                  setIsLoading(false);
                  setCurrentTime(0);
                }}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />


                {(!isPlaying || showControls) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-2xl opacity-50" />
                      <div className="relative w-20 h-20 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border-2 border-white/20">
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </div>
                    </motion.button>
                  </div>
                )}

                {(showControls || !isPlaying) && (
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-30"
                  >
                    <div className="mb-4">
                      <input
                        type="range"
                        min="0"
                        max={getTotalSeconds(selectedVideo.duration)}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-600 [&::-webkit-slider-thumb]:to-cyan-600"
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{selectedVideo.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {!isFullscreen && (
                          <div className="flex items-center gap-3">
                            <h3 className="text-sm font-medium text-white">{selectedVideo.title}</h3>
                            <div className="flex items-center gap-2 text-gray-300 text-sm">
                              <Clock className="w-4 h-4" />
                              <span>{selectedVideo.duration}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={togglePlay}
                          className="p-3 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center gap-2"
                        >
                          {isPlaying ? (
                            <Pause className="w-5 h-5" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                          <span className="text-sm">
                            {isPlaying ? (isRTL ? "إيقاف مؤقت" : "Pause") : (isRTL ? "تشغيل" : "Play")}
                          </span>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={toggleFullscreen}
                          className="p-3 rounded-xl bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-colors flex items-center gap-2"
                        >
                          {isFullscreen ? (
                            <Minimize2 className="w-5 h-5" />
                          ) : (
                            <Maximize2 className="w-5 h-5" />
                          )}
                          <span className="text-sm">
                            {isFullscreen ? (isRTL ? "الخروج من الشاشة الكاملة" : "Exit fullscreen") : (isRTL ? "شاشة كاملة" : "Fullscreen")}
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {!isFullscreen && (
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (isPlaying) {
                        videoRef.current?.pause();
                      }
                      setSelectedVideo(null);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-800/50 transition-colors flex-shrink-0 z-10"
                    title={isRTL ? "إغلاق" : "Close"}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                )}

                {isFullscreen && !showControls && (
                  <div className="absolute top-4 left-4 text-gray-400 text-sm bg-black/50 px-3 py-2 rounded-lg">
                    {isRTL ? "اضغط Esc للخروج من وضع الشاشة الكاملة" : "Press Esc to exit fullscreen"}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-16 pt-12 pb-8 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                  <Camera className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {isRTL ? "مشروع يحتاج تصوير جوي؟" : "Need aerial photography for your project?"}
                  </h3>
                  <p className="text-gray-400 text-lg max-w-2xl">
                    {isRTL ? "دعنا نعمل معاً لإنشاء محتوى درون احترافي يعرض مشروعك من منظور فريد وجذاب." : "Let's work together to create professional drone content that showcases your project from a unique and engaging perspective."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <MotionLink
                to="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all font-bold flex items-center gap-3"
              >
                <MessageCircle className="w-5 h-5" />
                {isRTL ? "تواصل معي" : "Contact me"}
              </MotionLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}