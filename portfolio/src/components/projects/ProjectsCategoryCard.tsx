import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, Play, Building, ShoppingBag, Factory, Stethoscope, Users, Home, Car, Coffee, Briefcase, Code } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectCategory } from "../../types/projects";

interface ProjectsCategoryCardProps {
  category: ProjectCategory;
  index: number;
  fullWidth?: boolean;
}

// دالة للحصول على الأيقونة المناسبة لكل فئة
const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'real-estate':
      return Building;
    case 'commercial':
      return ShoppingBag;
    case 'industrial':
      return Factory;
    case 'medical':
      return Stethoscope;
    case 'corporate':
      return Users;
    case 'residential':
      return Home;
    case 'automotive':
      return Car;
    case 'hospitality':
      return Coffee;
    case 'professional':
      return Briefcase;
    case 'tech':
      return Code;
    default:
      return Play;
  }
};

// دالة للحصول على اللون المناسب لكل فئة
const getCategoryColor = (categoryId: string) => {
  switch (categoryId) {
    case 'real-estate':
      return {
        gradient: 'from-green-500/20 to-cyan-500/20',
        border: 'hover:border-green-500/40',
        icon: 'text-green-400',
        bg: 'bg-gradient-to-br from-green-900/10 to-cyan-900/10',
        tagColor: 'green'
      };
    case 'commercial':
      return {
        gradient: 'from-blue-500/20 to-indigo-500/20',
        border: 'hover:border-blue-500/40',
        icon: 'text-blue-400',
        bg: 'bg-gradient-to-br from-blue-900/10 to-indigo-900/10',
        tagColor: 'blue'
      };
    case 'industrial':
      return {
        gradient: 'from-orange-500/20 to-red-500/20',
        border: 'hover:border-orange-500/40',
        icon: 'text-orange-400',
        bg: 'bg-gradient-to-br from-orange-900/10 to-red-900/10',
        tagColor: 'orange'
      };
    case 'medical':
      return {
        gradient: 'from-purple-500/20 to-pink-500/20',
        border: 'hover:border-purple-500/40',
        icon: 'text-purple-400',
        bg: 'bg-gradient-to-br from-purple-900/10 to-pink-900/10',
        tagColor: 'purple'
      };
    case 'corporate':
      return {
        gradient: 'from-yellow-500/20 to-amber-500/20',
        border: 'hover:border-yellow-500/40',
        icon: 'text-yellow-400',
        bg: 'bg-gradient-to-br from-yellow-900/10 to-amber-900/10',
        tagColor: 'yellow'
      };
    case 'motion':
      return {
        gradient: 'from-teal-500/20 to-emerald-500/20',
        border: 'hover:border-teal-500/40',
        icon: 'text-teal-400',
        bg: 'bg-gradient-to-br from-teal-900/10 to-emerald-900/10',
        tagColor: 'teal'
      };
    default:
      return {
        gradient: 'from-primary/20 to-pink-500/20',
        border: 'hover:border-primary/40',
        icon: 'text-primary',
        bg: 'bg-gradient-to-br from-primary/10 to-pink-900/10',
        tagColor: 'primary'
      };
  }
};

// دالة للحصول على لون التاغ بناءً على اللون المحدد
const getTagColors = (color: string) => {
  switch (color) {
    case 'green':
      return {
        bg: 'bg-green-900/20',
        text: 'text-green-300',
        border: 'border-green-700/50',
        hoverBorder: 'hover:border-green-500',
        hoverText: 'hover:text-green-200'
      };
    case 'blue':
      return {
        bg: 'bg-blue-900/20',
        text: 'text-blue-300',
        border: 'border-blue-700/50',
        hoverBorder: 'hover:border-blue-500',
        hoverText: 'hover:text-blue-200'
      };
    case 'orange':
      return {
        bg: 'bg-orange-900/20',
        text: 'text-orange-300',
        border: 'border-orange-700/50',
        hoverBorder: 'hover:border-orange-500',
        hoverText: 'hover:text-orange-200'
      };
    case 'purple':
      return {
        bg: 'bg-purple-900/20',
        text: 'text-purple-300',
        border: 'border-purple-700/50',
        hoverBorder: 'hover:border-purple-500',
        hoverText: 'hover:text-purple-200'
      };
    case 'yellow':
      return {
        bg: 'bg-yellow-900/20',
        text: 'text-yellow-300',
        border: 'border-yellow-700/50',
        hoverBorder: 'hover:border-yellow-500',
        hoverText: 'hover:text-yellow-200'
      };
    case 'teal':
      return {
        bg: 'bg-teal-900/20',
        text: 'text-teal-300',
        border: 'border-teal-700/50',
        hoverBorder: 'hover:border-teal-500',
        hoverText: 'hover:text-teal-200'
      };
    default:
      return {
        bg: 'bg-zinc-800/50',
        text: 'text-zinc-300',
        border: 'border-zinc-700',
        hoverBorder: 'hover:border-zinc-600',
        hoverText: 'hover:text-zinc-200'
      };
  }
};

export default function ProjectsCategoryCard({ 
  category, 
  index, 
  fullWidth = false 
}: ProjectsCategoryCardProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  
  if (!category) {
    return null;
  }
  
  const categoryTranslation = t(`projects.categories.${category.key}`, { 
    returnObjects: true 
  });

  interface CategoryTranslation {
    title?: string;
    description?: string;
    tags?: string[];
  }

  const translation = categoryTranslation as CategoryTranslation;

  //   fallbacks
  const title = translation?.title || category.title || '';
  const description = translation?.description || category.description || '';
  const translatedTags = translation?.tags || category.tags || [];
  
  const tags = translatedTags.length > 0 ? translatedTags : (category.tags || []);
  
  // Format index with leading zero
  const formattedIndex = (index + 1).toString().padStart(2, '0');
  
  // Get icon and color for this category
  const Icon = getCategoryIcon(category.id);
  const colors = getCategoryColor(category.id);
  const tagColors = getTagColors(colors.tagColor);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: true, 
        margin: "-50px",
        amount: 0.2 
      }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-3xl border border-zinc-800 ${colors.bg} backdrop-blur-sm p-6 md:p-8 ${colors.border} transition-all duration-500 ${
        fullWidth ? "md:col-span-2" : ""
      }`}
    >
      {/* صورة الخلفية */}
      {category.image && (
        <div className="absolute inset-0 -z-10 opacity-30 group-hover:opacity-40 transition-opacity duration-700">
          <img 
            src={category.image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
      )}

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-green-500/15 to-cyan-500/15 rounded-full -top-32 -right-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute w-48 h-48 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full -bottom-24 -left-24 blur-3xl" />
      </div>

      {/* Content */}
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4 md:mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1 + 0.2, 
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ rotate: 10, scale: 1.05 }}
              className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${colors.gradient} flex items-center justify-center border border-green-500/30 shadow-lg shadow-green-500/10`}
            >
              <Icon className={`w-5 h-5 ${colors.icon}`} />
            </motion.div>
            
            <div className="flex flex-col items-end">
              <span className="text-sm text-zinc-300 font-medium tabular-nums">
                {formattedIndex}
              </span>
              {category.videoCount && (
                <span className="text-xs text-zinc-500 mt-1">
                  {category.videoCount} {isRTL ? "فيديو" : "videos"}
                </span>
              )}
            </div>
          </div>

          <motion.h3 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 line-clamp-2"
          >
            {title}
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-3"
          >
            {description}
          </motion.p>

          {/* Tags - مع التحقق من وجود tags */}
          {tags.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {tags.slice(0, 3).map((tag: string, i: number) => (
                <span
                  key={`${tag}-${i}`}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors duration-300 ${tagColors.bg} ${tagColors.text} ${tagColors.border} ${tagColors.hoverBorder} ${tagColors.hoverText}`}
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className={`px-3 py-1 text-xs rounded-full border ${tagColors.bg} text-zinc-500 ${tagColors.border}`}>
                  +{tags.length - 3}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Button */}
        <Link
          to={category.link || '#'}
          className="group/btn inline-flex items-center justify-between w-full mt-auto p-3 md:p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          aria-label={`View videos in ${title} category`}
        >
          <span className="text-green-400 font-medium text-sm md:text-base">
            {t("projects.viewVideos")}
          </span>
          <div className="relative overflow-hidden">
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-green-400 transition-transform group-hover/btn:translate-x-1 group-hover/btn:scale-110" />
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-green-400/50 absolute inset-0 translate-x-4 opacity-0 group-hover/btn:translate-x-0 group-hover/btn:opacity-100 transition-all" />
          </div>
        </Link>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/20 rounded-3xl transition-all duration-500 pointer-events-none" />
      
      {/* Subtle shimmer effect on hover */}
      <div className="absolute inset-0 -z-5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </motion.article>
  );
}