import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Camera, Code, Layers, Zap } from "lucide-react";
import { useRef, useEffect } from "react";
import type { ReactNode } from "react";

type SkillSectionKey = "gear" | "software" | "development";

interface SkillSection {
  key: SkillSectionKey;
  icon: ReactNode;
}

export default function SkillsPage() {
  const { t } = useTranslation();

  const sections: SkillSection[] = [
    { key: "gear", icon: <Camera className="w-5 h-5" /> },
    { key: "software", icon: <Layers className="w-5 h-5" /> },
    { key: "development", icon: <Code className="w-5 h-5" /> },
  ];

  const cardRefs = useRef<HTMLDivElement[]>([]);

  // 3D tilt physics
  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    const rotateX = ((y / rect.height) - 0.5) * -15;
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.03)`;
    card.style.boxShadow = `${-rotateY}px ${rotateX}px 25px rgba(255,255,255,0.05), ${rotateY}px ${-rotateX}px 40px rgba(0,0,0,0.3)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    card.style.boxShadow = "0px 15px 30px rgba(0,0,0,0.25)";
  };

  // floating particles
  useEffect(() => {
    const container = document.getElementById("particles");
    if (!container) return;
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1.5 h-1.5 rounded-full bg-white/10 animate-pulse-slow";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      container.appendChild(particle);
    }
  }, []);

  return (
    <section className="relative py-24 bg-black overflow-hidden font-sans">
      {/* Background layers */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 to-pink-500/20 rounded-full top-[-150px] left-[-150px] blur-3xl animate-spin-slow" />
        <div className="absolute w-[350px] h-[350px] bg-gradient-to-br from-pink-500/10 to-primary/10 rounded-full bottom-[-100px] right-[-100px] blur-2xl animate-spin-slow-reverse" />
        <div id="particles" className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.015),transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            {t("skills.title")}
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {sections.map((section, i) => {
            const items = t(`skills.${section.key}`, { returnObjects: true }) as string[];
            return (
              <motion.div
                key={section.key}
                ref={(el) => {
                  if (el) cardRefs.current[i] = el;
                }}
                initial={{ opacity: 0, y: 40, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="relative group perspective-1000 rounded-3xl bg-zinc-900/85 backdrop-blur-lg p-8 border border-zinc-800 hover:border-primary/50 transition-all duration-400 shadow-[0_15px_30px_rgba(0,0,0,0.25)] cursor-pointer"
                onMouseMove={(e) => handleMouseMove(i, e)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                {/* Icon */}
                <motion.div
                  animate={{ y: [0, -4, 0], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/20 text-primary mb-6"
                >
                  {section.icon}
                </motion.div>

                {/* Section Title */}
                <h3 className="text-2xl font-semibold text-white mb-4 tracking-wide">
                  {t(`skills.sections.${section.key}`)}
                </h3>

                {/* Items List */}
                <ul className="space-y-2">
                  {items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 0.45, delay: idx * 0.1 }}
                      className="flex items-start gap-2 text-zinc-300 hover:text-primary transition-colors duration-300 text-sm md:text-base"
                    >
                      <Zap className="w-4 h-4 mt-1 text-primary opacity-80" />
                      <span className="leading-relaxed">{item}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Glow overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-pink-500/20 opacity-0 group-hover:opacity-70 transition-opacity duration-500 blur-2xl" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}