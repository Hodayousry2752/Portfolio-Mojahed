import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function AboutStory() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.3, 1]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(6px)", "blur(0px)"]
  );

  return (
    <section ref={ref} className="py-32 px-6">
      <motion.p
        style={{
          y,
          opacity,
          filter,
        }}
        className="text-xl md:text-2xl leading-relaxed text-white/75 max-w-4xl mx-auto"
      >
        {t("story")}
      </motion.p>
    </section>
  );
}
