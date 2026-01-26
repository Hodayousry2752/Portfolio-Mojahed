import { motion } from "framer-motion";
import { Camera, Video, Code } from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { icon: Camera, key: "photography" },
  { icon: Video, key: "video" },
  { icon: Code, key: "development" },
];

export default function AboutHighlights() {
  const { t } = useTranslation();

  return (
    <section className="py-24 px-6">
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border rounded-2xl p-8 text-center"
            >
              <Icon className="mx-auto text-primary mb-6" size={42} />
              <p className="text-white/70 leading-relaxed">
                {t(`highlights.${item.key}`)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
