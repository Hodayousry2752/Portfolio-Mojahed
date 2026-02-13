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
  Film,
  MessageCircle,
  Pause,
  Maximize2,
  Minimize2,
  Loader2,
  Grid,
  List,
  Download,
  Share2,
  Building,
  Calendar
} from "lucide-react";
import { realEstateVideos } from "../data/realEstateVideos";
// import type { VideoType } from "../types/projects";

type SortOption = "date" | "duration" | "name";
type ViewMode = "grid" | "list";

export default function RealEstateVideos() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
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
  let videos = [...realEstateVideos];
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    videos = videos.filter((v) => {
      const hasTitle = v.title.toLowerCase().includes(query);
      const hasDescription = v.description?.toLowerCase().includes(query) || false;
      const hasTags = v.tags?.some((tag: string) => tag.toLowerCase().includes(query)) || false;
      return hasTitle || hasDescription || hasTags;
    });
  }
    
    if (sortBy === "duration") {
      videos.sort((a, b) => {
        const toSeconds = (time: string) => {
          const parts = time.split(":").map(Number);
          return parts[0] * 60 + parts[1];
        };
return toSeconds(b.duration || "0:00") - toSeconds(a.duration || "0:00");
      });
    } else if (sortBy === "name") {
      videos.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return videos;
  }, [searchQuery, sortBy]);

  const sortOptions = [
    { id: "date" as const, label: isRTL ? "الأحدث" : "Newest", icon: Film },
    { id: "duration" as const, label: isRTL ? "المدة" : "Duration", icon: Clock },
    { id: "name" as const, label: isRTL ? "الاسم" : "Name", icon: Filter },
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
      console.error("Fullscreen error:", err);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  };

  const modalVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

  const handleDownload = (video: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      const link = document.createElement('a');
      link.href = video.videoUrl;
      
      const fileName = video.videoUrl.split('/').pop() || `video_${video.id}.mp4`;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(isRTL ? `جاري تحميل: ${video.title}` : `Downloading: ${video.title}`);
    } catch (error) {
      console.error('Download error:', error);
      alert(isRTL ? 'حدث خطأ أثناء التحميل' : 'Download failed');
    }
  };

  const handleShare = (video: any, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: isRTL ? 'شاهد هذا الفيديو العقاري الرائع' : 'Check out this amazing real estate video',
        url: window.location.origin + '/real-estate',
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.origin + '/real-estate')
        .then(() => {
          alert(isRTL ? 'تم نسخ الرابط إلى الحافظة' : 'Link copied to clipboard');
        })
        .catch(() => {
          const textArea = document.createElement('textarea');
          textArea.value = window.location.origin + '/real-estate';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert(isRTL ? 'تم نسخ الرابط إلى الحافظة' : 'Link copied to clipboard');
        });
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Simple Header */}
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
                <span className="text-sm font-medium">{isRTL ? "رجوع" : "Back"}</span>
              </motion.button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-cyan-600 flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">{t("projects.categories.realEstate.title", "Real Estate")}</h1>
                  <p className="text-gray-400 text-xs">{realEstateVideos.length} {isRTL ? "فيديو" : "videos"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Simple Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-6"
        >
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {isRTL ? "مكتبة فيديوهات العقارات" : "Real Estate Video Library"}
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {isRTL ? "تصفح مجموعة الفيديوهات العقارية الاحترافية" : "Browse our collection of professional real estate videos"}
            </p>
          </div>

          {/* Simple Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isRTL ? "ابحث في الفيديوهات..." : "Search videos..."}
                  className="w-full px-4 py-3 pl-11 bg-zinc-900/50 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-zinc-900/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === "grid" ? 'bg-green-500/20 text-green-400' : 'hover:bg-zinc-800/50'}`}
                  title={isRTL ? "عرض شبكي" : "Grid view"}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-lg transition-all ${viewMode === "list" ? 'bg-green-500/20 text-green-400' : 'hover:bg-zinc-800/50'}`}
                  title={isRTL ? "عرض قائمة" : "List view"}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/30 transition-all"
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
                              <Check className="w-4 h-4 text-green-400" />
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

        {/* Video Gallery */}
        {filteredVideos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500/10 to-cyan-500/10 flex items-center justify-center">
              <Building className="w-16 h-16 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {isRTL ? "لا توجد فيديوهات" : "No videos found"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              {searchQuery 
                ? (isRTL ? "لم يتم العثور على فيديوهات تطابق بحثك." : "No videos match your search.")
                : (isRTL ? "جرب فلتراً مختلفاً." : "Try a different filter.")}
            </p>
            {searchQuery && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-cyan-600 font-medium"
              >
                {isRTL ? "عرض جميع الفيديوهات" : "Show all videos"}
              </motion.button>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                variants={cardVariants}
                whileHover="hover"
                className="group cursor-pointer"
                onClick={() => handlePlayVideo(video)}
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-800/40 bg-gray-900/30 transition-all duration-300 group-hover:border-green-500/50 group-hover:bg-gray-900/50">
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    {video.thumbnail ? (
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${video.color} flex items-center justify-center`}>
                        <Building className="w-16 h-16 text-white/50" />
                      </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative w-16 h-16 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all">
                          <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Duration Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                    
                  </div>

                  {/* Video Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-green-300 transition-colors">
                      {video.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{(video.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                          onClick={(e) => handleDownload(video, e)}
                          title={isRTL ? "تحميل الفيديو" : "Download video"}
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                          onClick={(e) => handleShare(video, e)}
                          title={isRTL ? "مشاركة الفيديو" : "Share video"}
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // List View
          <motion.div 
            className="space-y-4"
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
                variants={cardVariants}
                whileHover="hover"
                className="group cursor-pointer"
                onClick={() => handlePlayVideo(video)}
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-800/30 bg-gray-900/30 transition-all duration-300 group-hover:border-green-500/50 group-hover:bg-gray-900/50">
                  {/* Thumbnail */}
                  <div className="relative w-40 aspect-video rounded-xl overflow-hidden flex-shrink-0">
                    {video.thumbnail ? (
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${video.thumbnail})` }}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-r ${video.color} flex items-center justify-center`}>
                        <Building className="w-12 h-12 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs">
                      {video.duration}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{video.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                          onClick={(e) => handleDownload(video, e)}
                          title={isRTL ? "تحميل الفيديو" : "Download video"}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          className="p-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                          onClick={(e) => handleShare(video, e)}
                          title={isRTL ? "مشاركة الفيديو" : "Share video"}
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      {/* Video Player Modal */}
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
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`relative ${isFullscreen ? 'w-screen h-screen' : 'w-full max-w-[90vw] xl:max-w-[75vw] h-[85vh]'} bg-gradient-to-br from-gray-900 to-black ${isFullscreen ? 'rounded-none' : 'rounded-2xl'} overflow-hidden border border-gray-800/50 shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 z-20 bg-black/80 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-green-500/30 border-t-green-500"
                    >
                      <Loader2 className="w-full h-full text-green-500 p-4" />
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

              {/* Video Player Container */}
              <div className="relative w-full h-full bg-black">
                {/* Fullscreen Header */}
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


                {/* Center Play Button */}
                {(!isPlaying || showControls) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full blur-2xl opacity-50" />
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

                {/* Video Controls Overlay */}
                {(showControls || !isPlaying) && (
                  <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 z-30"
                  >
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <input
                        type="range"
                        min="0"
                        max={getTotalSeconds(selectedVideo.duration)}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-green-600 [&::-webkit-slider-thumb]:to-cyan-600"
                      />
                      <div className="flex justify-between text-sm text-gray-400 mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{selectedVideo.duration}</span>
                      </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Video Title on the left (only in non-fullscreen) */}
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
                        {/* Play/Pause Button */}
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
                        
                        {/* Fullscreen Toggle */}
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
                            {isFullscreen ? (isRTL ? "الخروج من وضع الشاشة الكاملة" : "Exit fullscreen") : (isRTL ? "شاشة كاملة" : "Fullscreen")}
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Close Button (non-fullscreen) */}
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

                {/* Exit Fullscreen Hint */}
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

      {/* Footer */}
      <footer className="mt-16 pt-12 pb-8 border-t border-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {isRTL ? "مشروع عقاري قادم؟" : "Upcoming real estate project?"}
              </h3>
              <p className="text-gray-400 max-w-lg">
                {isRTL ? "دعنا نعمل معاً لتحويل مشروعك العقاري إلى فيديو مذهل يعرض جميع التفاصيل باحترافية" : "Let's work together to turn your real estate project into an amazing video that showcases all details professionally"}
              </p>
            </div>
            <div className="flex items-center gap-4">
      <MotionLink
        to="/contact"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="px-8 py-3 bg-gradient-to-r from-green-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all font-bold flex items-center gap-3"
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