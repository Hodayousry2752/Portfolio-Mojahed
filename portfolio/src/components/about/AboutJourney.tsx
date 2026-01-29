import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const parts = ["part1", "part2", "part3", "part4"];

export default function AboutJourney() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (part: string) => {
    setExpanded((prev) => ({ ...prev, [part]: !prev[part] }));
  };

  return (
    <section className="relative py-28 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
      >
        {t("fullStory.title")}
      </motion.h2>

      <div className="flex flex-col gap-6">
        {parts.map((part, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden"
          >
            {/* Short text */}
            <p className="text-white/75 text-lg mb-2">
              {t(`fullStory.${part}Short`)}
            </p>

            {/* Expandable full text */}
            <AnimatePresence>
              {expanded[part] && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/70 text-base mt-2"
                >
                  {t(`fullStory.${part}`)}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
              onClick={() => toggle(part)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-3 flex items-center gap-2 text-primary font-medium"
            >
              <span>
                {expanded[part] ? t("fullStory.showLess") : t("fullStory.showMore")}
              </span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  expanded[part] ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
