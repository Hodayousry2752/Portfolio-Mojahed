import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";

import g1 from "../assets/images/h1.jpg";
import g2 from "../assets/images/h1.jpg";
import g3 from "../assets/images/h1.jpg";
import g4 from "../assets/images/h1.jpg";
import g5 from "../assets/images/h1.jpg";
import g6 from "../assets/images/h1.jpg";

const images = [
  { src: g1, title: "Commercial Shoot" },
  { src: g2, title: "Product Photography" },
  { src: g3, title: "Cinematic Frame" },
  { src: g4, title: "Creative Direction" },
  { src: g5, title: "Visual Storytelling" },
  { src: g6, title: "Brand Content" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function GallerySection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-28 px-6 bg-black overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-primary/20 to-pink-500/20 rounded-full -top-40 -left-40 blur-3xl" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-pink-500/10 to-primary/10 rounded-full bottom-[-150px] right-[-120px] blur-3xl" />
      </div>

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
          {t("gallery.title", "Gallery")}
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          {t(
            "gallery.subtitle",
            "A selection of cinematic visuals and professional creative work"
          )}
        </p>
      </motion.div>

      {/* grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            variants={item}
            className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 shadow-xl cursor-pointer"
          >
            {/* image */}
            <motion.img
              src={img.src}
              alt={img.title}
              className="w-full h-[320px] object-cover"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t from-black/80 via-black/20 to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity duration-500
              "
            />

            {/* content */}
            <div className="absolute inset-0 flex items-end p-6">
              <div className="w-full flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="text-white font-medium">
                  {img.title}
                </span>

                <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>

            {/* glow on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-pink-500/20 opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
