import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
// import gimbal1 from "../assets/images/rs4-gimbal1.jpg";
// import gimbal2 from "../assets/images/rs4-gimbal2.jpg";
// import gimbal3 from "../assets/images/rs4-gimbal3.jpg";
// import drone1 from "../assets/images/rs4-drone1.jpg";
// import drone2 from "../assets/images/rs4-drone2.jpg";

const projects = [
//   {
//     title: "RS-4 Gimbal Stabilizer",
//     img: gimbal1,
//     description: "Precision cinematic stabilization for professional video shooting.",
//   },
//   {
//     title: "Cinematic Drone Shots",
//     img: drone1,
//     description: "High quality aerial footage with smooth motion capture.",
//   },
//   {
//     title: "Motion Capture & Control",
//     img: gimbal2,
//     description: "Advanced gimbal motion for filmmakers and content creators.",
//   },
//   {
//     title: "Drone Closeups",
//     img: drone2,
//     description: "Detailed shots capturing every angle with clarity.",
//   },
//   {
//     title: "Cinematic Studio",
//     img: gimbal3,
//     description: "Versatile product shots for cinematic web experiences.",
//   },
];

export default function Projects() {
  const { t } = useTranslation();
  return (
    <section id="projects" className="min-h-screen px-6 md:px-20 py-20 bg-neutral-900">
      {/* <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">{t("projects.title")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="rounded-xl overflow-hidden shadow-2xl hover:scale-105 transition-transform cursor-pointer relative group bg-neutral-800"
          >
            <img src={project.img} alt={project.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-white/70 text-sm">{project.description}</p>
            </div>
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-lg font-semibold">{project.title}</span>
            </div>
          </motion.div>
        ))}
      </div> */}
    </section>
  );
}
