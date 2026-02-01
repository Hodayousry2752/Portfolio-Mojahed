import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";

export default function AboutNarrativeSection() {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 to-pink-500/20 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1, ease: "easeOut" }}
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="
          relative max-w-5xl mx-auto
          grid md:grid-cols-[40px_1fr]
          gap-6
        "
      >
        {/* glowing line */}
        <div className="relative flex justify-center">
          <div className="w-[2px] h-full bg-gradient-to-b from-primary/0 via-primary/60 to-primary/0" />
          <div className="absolute top-6 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_theme(colors.primary)]" />
        </div>

        {/* content card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="
            relative bg-zinc-900/70 backdrop-blur-xl
            border border-zinc-800
            rounded-3xl
            p-8 md:p-12
            shadow-2xl
            overflow-hidden
          "
        >
          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-pink-500/10 opacity-40" />

          {/* icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="relative mb-6 w-14 h-14 rounded-2xl
            bg-gradient-to-tr from-primary/30 to-pink-500/30
            flex items-center justify-center"
          >
            <Quote className="w-7 h-7 text-primary" />
          </motion.div>

          {/* label */}
          <h4 className="relative text-xs tracking-[0.35em] uppercase text-primary font-semibold mb-6">
            {t("aboutNarrative.label")}
          </h4>

          {/* text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="
              relative text-white/75
              text-lg md:text-xl
              leading-relaxed
            "
          >
            {t("aboutNarrative.main")}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
