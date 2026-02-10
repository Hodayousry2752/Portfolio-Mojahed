// components/ProfessionalLogoGallery.tsx
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Palette,
  FolderOpen,
  Filter,
  LayoutGrid,
  LayoutList,
  X,
  ChevronDown,
  Hash,
  Tag,
  RefreshCw,
  // Loader,
  Image as ImageIcon,
  Sparkles,
  // TrendingUp,
  // Clock,
  Eye
} from "lucide-react";
import { logoDesigns, categories as logoCategories } from "../../data/logoDesigns";

import type { LogoDesign } from "../../types/projects";


// interface LogoDesign {
//   id: number;
//   name: string;
//   category: string;
//   color: string;
//   description: string;
//   createdAt: string;
//   imageUrl: string;
//   featured?: boolean;
// }

export default function ProfessionalLogoGallery() {
  const [logos] = useState<LogoDesign[]>(logoDesigns);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<number>>(new Set());
  const itemsPerPage = 16;

  const categories = useMemo(() => {
    const uniqueCategories = ['all', ...logoCategories];
    return uniqueCategories;
  }, []);

  const filteredLogos = useMemo(() => {
    return logos.filter(logo => {
      const matchesSearch = search === '' || 
        logo.name.toLowerCase().includes(search.toLowerCase()) ||
        (logo.description ?? "")
          .toLowerCase()
          .includes(search.toLowerCase())
        logo.category.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || logo.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [logos, search, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredLogos.length / itemsPerPage);
  const paginatedLogos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLogos.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLogos, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  // حساب الإحصائيات
  const totalDesigns = logos.length;
  const totalCategories = categories.length - 1;

  // الفئات المعروضة
  const displayedCategories = showAllCategories ? categories : categories.slice(0, 8);

  // معالجة خطأ تحميل الصورة
  const handleImageError = (id: number) => {
    setImageLoadErrors(prev => new Set(prev).add(id));
  };

  // Get featured logos
  // const featuredLogos = useMemo(() => {
  //   return logos.filter(logo => logo.featured);
  // }, [logos]);

  return (
    <div className="space-y-8">
      {/* Enhanced Stats */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Total Designs */}
        <motion.div
          whileHover={{ y: -2 }}
          className="relative overflow-hidden group"
        >
          <div className="relative bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{totalDesigns}</div>
                <div className="text-sm text-zinc-400 mt-1">Total Logo Designs</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          whileHover={{ y: -2 }}
          className="relative overflow-hidden group"
        >
          <div className="relative bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-500/10">
                <FolderOpen className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{totalCategories}</div>
                <div className="text-sm text-zinc-400 mt-1">Unique Categories</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Status */}
        <motion.div
          whileHover={{ y: -2 }}
          className="relative overflow-hidden group"
        >
          <div className="relative bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/10">
                <Eye className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{filteredLogos.length}</div>
                <div className="text-sm text-zinc-400 mt-1">
                  {selectedCategory === 'all' ? 'All Designs' : `In ${selectedCategory}`}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl border border-zinc-800/50"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/40 via-black/30 to-zinc-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]" />
        
        <div className="relative p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search with Enhanced Design */}
            <div className="flex-1 w-full">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-pink-500/30 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300" />
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search logo designs by name, description, or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all backdrop-blur-sm"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
                    >
                      <X className="w-4 h-4 text-zinc-400 hover:text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced Controls */}
            <div className="flex flex-wrap gap-3">
              {/* View Toggle */}
              <div className="flex bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-1 backdrop-blur-sm">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'grid' 
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-black shadow-lg shadow-primary/20' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="text-sm font-medium">Grid</span>
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('masonry')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    viewMode === 'masonry' 
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-black shadow-lg shadow-primary/20' 
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                  <span className="text-sm font-medium">List</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Category Filter Section */}
          <div className="mt-6 pt-6 border-t border-zinc-800/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                  <Filter className="w-4 h-4 text-primary" />
                </div>
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <Tag className="w-4 h-4 text-pink-500" />
                  Browse by Category
                </h3>
              </div>
              <div className="text-xs text-zinc-500 hidden md:block">
                {filteredLogos.length} designs available
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {displayedCategories.map((cat) => {
                const count = cat === 'all' 
                  ? logos.length 
                  : logos.filter(l => l.category === cat).length;
                
                return (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-white font-medium shadow-lg shadow-primary/20'
                        : 'bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800/30 backdrop-blur-sm'
                    }`}
                  >
                    {cat === 'all' ? (
                      <>
                        <Hash className="w-3.5 h-3.5" />
                        All Categories
                      </>
                    ) : (
                      <>
                        <div 
                          className="w-3 h-3 rounded-full shadow-md border border-white/10"
                          style={{ backgroundColor: logos.find(l => l.category === cat)?.color || '#6B7280' }} 
                        />
                        {cat}
                      </>
                    )}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                      selectedCategory === cat
                        ? 'bg-white/20 text-white'
                        : 'bg-zinc-800/50 text-zinc-300'
                    }`}>
                      {count}
                    </span>
                  </motion.button>
                );
              })}

              {categories.length > 8 && (
                <motion.button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 text-zinc-400 hover:text-white hover:bg-zinc-800/30 backdrop-blur-sm flex items-center gap-2 text-sm"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAllCategories ? 'rotate-180' : ''}`} />
                  {showAllCategories ? 'Show Less' : `+${categories.length - 8} More`}
                </motion.button>
              )}

              {selectedCategory !== 'all' && (
                <motion.button
                  onClick={() => setSelectedCategory('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800/50 backdrop-blur-sm flex items-center gap-2 text-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset Filter
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Results Info */}
      {filteredLogos.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-white">{paginatedLogos.length}</span> of{" "}
            <span className="font-semibold text-white">{filteredLogos.length}</span> logo designs
            {selectedCategory !== 'all' && (
              <span className="text-primary"> in "{selectedCategory}"</span>
            )}
          </div>
          {search && (
            <motion.button
              onClick={() => setSearch('')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 backdrop-blur-sm text-primary hover:text-primary/80 transition-colors text-sm"
            >
              <X className="w-3.5 h-3.5" />
              Clear search
            </motion.button>
          )}
        </div>
      )}

      {/* Logos Grid */}
      {filteredLogos.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-pink-500/20 flex items-center justify-center">
            <Search className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">No logo designs found</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            {search 
              ? `No designs match "${search}"`
              : selectedCategory !== 'all'
                ? `No designs in "${selectedCategory}" category`
                : 'No designs available at the moment'}
          </p>
          {(search || selectedCategory !== 'all') && (
            <motion.button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
            >
              Show All Designs
            </motion.button>
          )}
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            <AnimatePresence>
              {paginatedLogos.map((logo) => (
                <motion.div
                  key={logo.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  whileHover={{ 
                    y: -4, 
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    } 
                  }}
                  className="group relative"
                  onMouseEnter={() => setHoveredLogo(logo.id)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  {/* Card Container */}
                  <div className="relative overflow-hidden rounded-xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/30 to-black/20 backdrop-blur-sm h-full">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 via-transparent to-zinc-900/30" />
                    
                    {/* Logo Preview */}
                    <div className="relative aspect-square overflow-hidden">
                      {/* Logo Image */}
                      <div className="absolute inset-4 bg-gradient-to-br from-white/5 to-white/2 rounded-lg flex items-center justify-center">
                        {imageLoadErrors.has(logo.id) ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-800/30 rounded-lg">
                            <ImageIcon className="w-12 h-12 text-zinc-600 mb-2" />
                            <span className="text-xs text-zinc-500">Image not available</span>
                          </div>
                        ) : (
                          <motion.img
                            src={logo.imageUrl}
                            alt={logo.name}
                            className="w-4/5 h-4/5 object-contain"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            onError={() => handleImageError(logo.id)}
                            loading="lazy"
                          />
                        )}
                      </div>

                      {/* Category Badge */}
                      <motion.div
                        className="absolute top-3 right-3"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ 
                          y: hoveredLogo === logo.id ? 0 : -10,
                          opacity: hoveredLogo === logo.id ? 1 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-black/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                          <span className="text-xs text-white font-medium">{logo.category}</span>
                        </div>
                      </motion.div>

                      {/* Featured Badge */}
                      {logo.featured && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-primary/30">
                            <span className="text-xs text-primary font-medium flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Featured
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Info */}
                    <div className="relative p-4 border-t border-zinc-800/50">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-white text-sm truncate">{logo.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: logo.color }}
                              />
                              <span className="text-xs text-zinc-400 truncate">{logo.category}</span>
                            </div>
                          </div>
                          <div className="text-xs text-zinc-500 bg-zinc-800/30 px-2 py-1 rounded">
                            #{logo.id}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mt-2">
                          {logo.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 pt-10"
            >
              <motion.button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800/30 transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg shadow-primary/20'
                        : 'bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 text-white hover:bg-zinc-800/30'
                    }`}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}

              <motion.button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg bg-gradient-to-br from-zinc-900/40 to-zinc-900/20 border border-zinc-800/50 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-zinc-800/30 transition-all"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>

              <div className="ml-4 text-sm text-zinc-400 hidden md:block">
                Page <span className="font-semibold text-white">{currentPage}</span> of{" "}
                <span className="font-semibold text-white">{totalPages}</span>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}