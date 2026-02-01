import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AboutNarrativeSection from "../components/home/AboutNarrativeSection";

import img1 from "../assets/images/h1.jpg";
import img2 from "../assets/images/h2.jpg";
import img3 from "../assets/images/6-2.png";
import img4 from "../assets/images/12.png";
import img5 from "../assets/images/h7.jpg";
import img6 from "../assets/images/6.jpg";

const slides = [
  { img: img1, key: "slide1" },
  { img: img2, key: "slide2" },
  { img: img3, key: "slide3" },
  { img: img4, key: "slide4" },
  { img: img5, key: "slide5" },
  { img: img6, key: "slide6" },
];

export default function HomeCinematic() {
  const { t } = useTranslation();
  const navbarHeight = 80;
  const [current, setCurrent] = useState(0);

  // Preload all slides to prevent lag
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.img;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <>
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
    >
      {/* Slider Images */}
      <AnimatePresence>
        <motion.img
          key={slides[current].key}
          src={slides[current].img}
          alt={`Slide ${current + 1}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: 0.3, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.3, scale: 1.05 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero Text */}
      <motion.div
        className="relative z-10 text-center px-4 md:px-20 max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-snug md:leading-tight">
          {t("title.part1")}{" "}
          <span className="text-primary animate-pulse">{t("title.highlight")}</span>{" "}
          {t("title.part2")}
        </h1>

        {/* Text per slide */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="mt-5 md:mt-4 text-white/85 text-sm sm:text-base md:text-xl max-w-xl mx-auto"
          >
            {t(`slides.${current}`)}
          </motion.p>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.a
          href="#projects"
          whileHover={{ scale: 1.05, color: "#000" }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 md:mt-6 inline-block px-6 md:px-8 py-3 md:py-4 bg-primary/90 text-white font-semibold rounded-lg shadow-lg 
            hover:shadow-2xl hover:bg-blur-lg border border-white transition transform-all duration-300 text-sm sm:text-base md:text-lg"
        >
          {t("title.cta")}
        </motion.a>
      </motion.div>

      {/* Slider Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/30 text-white rounded-full hover:bg-black/50 transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-black/30 text-white rounded-full hover:bg-black/50 transition"
      >
        <ChevronRight size={24} />
      </button>
    </section>
      <AboutNarrativeSection/>
  </>

  );
}
