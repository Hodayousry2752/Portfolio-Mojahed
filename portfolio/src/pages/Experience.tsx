import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Laptop,
  Camera,
  Film,
  Code2,
  Sparkles,
  Layers,
  Zap,
} from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points?: string[];
  phase?: string;
  icon?: "laptop" | "camera" | "film";
}

export default function ExperiencePage() {
  const { t } = useTranslation();

  const timeline =
    (t("experience.timeline", { returnObjects: true }) as ExperienceItem[]) ?? [];

  const getIcon = (icon?: string) => {
    switch (icon) {
      case "laptop":
        return <Laptop className="w-6 h-6 text-white" />;
      case "camera":
        return <Camera className="w-6 h-6 text-white" />;
      case "film":
        return <Film className="w-6 h-6 text-white" />;
      default:
        return <Laptop className="w-6 h-6 text-white" />;
    }
  };

  return (
    <section className="relative py-28 bg-black overflow-hidden px-4 sm:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        className="text-center mb-24"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {t("experience.title")}
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          {t("experience.subtitle")}
        </p>
      </motion.div>

      <div className="relative max-w-6xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-pink-500 to-primary animate-pulse" />

        {timeline.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative mb-24 flex flex-col md:flex-row items-center justify-between ${
                isLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Main Card */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="bg-zinc-900/70 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-zinc-800 shadow-lg w-full md:w-5/12 mx-2 sm:mx-0"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary p-2 rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center">
                    <div className="hidden md:block">{getIcon(item.icon)}</div>
                  </div>

                  {item.phase && (
                    <span className="text-sm uppercase tracking-widest text-primary">
                      {item.phase}
                    </span>
                  )}
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {item.role}
                </h3>
                <p className="text-zinc-400">{item.company}</p>
                <span className="block mt-1 text-xs text-zinc-500">
                  {item.period}
                </span>

                <ul className="mt-4 space-y-2 text-zinc-300">
                  {(item.points || []).map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <Sparkles className="w-4 h-4 text-primary mt-1" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* 🎉 Animated Side Celebration */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: false }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                className="hidden md:flex w-5/12 justify-center relative"
              >
                {/* Glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 blur-3xl rounded-full"
                />

                <div className="relative z-10 space-y-4">
                  {[
                    { icon: Code2, text: "Clean Architecture" },
                    { icon: Layers, text: "Scalable Components" },
                    { icon: Zap, text: "High Performance UI" },
                  ].map((el, i) => (
                    <motion.div
                      key={i}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8, rotate: -6 },
                        show: { opacity: 1, scale: 1, rotate: 0 },
                      }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      whileHover={{ scale: 1.06 }}
                      className="flex items-center gap-3 bg-zinc-900/70 border border-zinc-800 rounded-xl p-4 shadow-lg"
                    >
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <el.icon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <span className="text-zinc-200">{el.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4 }}
                className="absolute left-1/2 -translate-x-1/2 top-6 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-pink-500 border border-zinc-800 shadow-xl"
              >
                {getIcon(item.icon)}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
