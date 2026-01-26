import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const skills = ["React", "TypeScript", "TailwindCSS", "Framer Motion", "i18next", "shadcn/ui"];

export default function Skills() {
  const { t } = useTranslation();
  return (
    <section className="min-h-screen px-6 md:px-20 py-20 bg-neutral-800 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t("skills.title")}</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {skills.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="px-6 py-3 bg-neutral-700 rounded-lg text-white font-semibold shadow-md hover:scale-105 transition-transform cursor-default"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
