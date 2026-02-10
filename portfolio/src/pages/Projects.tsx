import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projectCategories } from "../data/projectsCategories";
import { logoDesigns } from "../data/logoDesigns";
import ProjectsCategoryCard from "../components/projects/ProjectsCategoryCard";
import LogoDesignCard from "../components/projects/LogoDesignCard";
import SectionHeader from "../components/common/SectionHeader";

export default function Projects() {
  const { t } = useTranslation();

  // اختيار أول لوجو لعرضه
  const firstLogo = logoDesigns.length > 0 ? logoDesigns[0] : null;

  return (
    <main className="min-h-screen bg-black pt-24 pb-32 px-4 md:px-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            {t("projects.title")}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto mb-12">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Categories Grid - 6 فئات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectCategories.map((category, index) => (
            <ProjectsCategoryCard
              key={category.id}
              category={{
                ...category,
                description: category.description || "",
                tags: category.tags || [],
              }}
              index={index}
            />
          ))}
        </div>
      </section>

      {/* Logo Designs Section */}
      <section className="max-w-7xl mx-auto">
        <SectionHeader
          title={t("projects.logoDesigns.title")}
          subtitle={t("projects.logoDesigns.subtitle")}
        />
        
        <div className="flex justify-center">
          {firstLogo ? (
            <LogoDesignCard  />
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500">No logo designs available</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20 text-center"
      >
        <div className="bg-gradient-to-r from-zinc-900/50 to-black/50 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            {t("title.highlight")} {t("title.part2")}
          </h3>
          <p className="text-zinc-400 mb-6">
            {t("story")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-black px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            {t("title.cta")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}