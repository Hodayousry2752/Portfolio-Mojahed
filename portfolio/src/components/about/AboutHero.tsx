import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { MapPin, Laptop, Film, Camera } from "lucide-react";

import profile1 from "../../assets/images/1.png";
import profile2 from "../../assets/images/10.jpg";
import profile3 from "../../assets/images/11.png";
import profile4 from "../../assets/images/imag 2.png";

const profileImages = [profile1, profile2, profile3, profile4];

const iconMap: Record<string, any> = {
  MapPin,
  Laptop,
  Film,
  Camera,
};

export default function AboutHero() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  // Preload all images without hidingهم
  useEffect(() => {
    profileImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % profileImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const info = t("info", { returnObjects: true }) as Array<{ icon: string; text: string }>;

  return (
    <section className="relative pt-32 sm:pt-40 md:pt-48 min-h-[90vh] flex items-center justify-center px-6">
      <div className="grid md:grid-cols-2 gap-14 max-w-6xl items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            {t("hero.titleA")}
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl">
            {t("hero.subtitle")}
          </p>

          <ul className="mt-6 space-y-4">
            {info.map((item, idx) => {
              const Icon = iconMap[item.icon] || MapPin;
              return (
                <li key={idx} className="flex items-center text-white/70 text-base gap-3">
                  <Icon className="text-primary w-5 h-5 flex-shrink-0" />
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* IMAGE SLIDER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl"
        >
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />

          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={profileImages[current]}
              alt={`Profile ${current + 1}`}
              className="relative z-10 w-full h-96 object-cover rounded-2xl"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8 }}
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
