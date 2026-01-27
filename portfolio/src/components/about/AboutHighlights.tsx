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
    <section className="py-20 px-6 relative bg-black overflow-hidden">
      {/* subtle background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-primary/20 to-pink-500/20 rounded-full top-[-150px] left-[-100px] blur-3xl animate-spin-slow" />
        <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-pink-500/10 to-primary/10 rounded-full bottom-[-120px] right-[-80px] blur-2xl animate-spin-slow-reverse" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight"
        >
          {t("highlights.title")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-400 max-w-2xl mx-auto mb-16 text-base md:text-lg"
        >
          {t("highlights.subtitle")}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative group bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:scale-105 hover:border-primary/60 transition-all duration-400 shadow-lg"
              >
                <div className="relative flex items-center justify-center w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-tr from-primary/30 to-pink-500/30 group-hover:from-primary/50 group-hover:to-pink-500/50 transition-all duration-500">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <p className="text-white/70 leading-relaxed text-sm md:text-base">
                  {t(`highlights.${item.key}`)}
                </p>

                {/* subtle glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-pink-500/20 opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
