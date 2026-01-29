import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone, Mail, Instagram, Facebook, Linkedin, X } from "lucide-react";
import logo from "../../assets/images/logo2.jpg";

export default function Footer() {
  const { t } = useTranslation();

  const socials = [
    { icon: Instagram, link: "https://instagram.com/mojahed.pro" },
    { icon: Facebook, link: "https://facebook.com/mojahed.pro90" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/mojahed-asha-7a03b4102" },
    { icon: X, link: "https://x.com/MojahedAsha" },
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/20 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col items-center md:items-stretch">
        {/* grid: Mobile vertical, Desktop 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 items-start text-center md:text-left w-full">
          {/* Column 1: Logo + Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center md:items-start"
          >
            <img
              src={logo}
              alt="Footer Logo"
              className="w-32 h-auto object-contain mb-4"
            />
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </motion.div>

          {/* Column 2: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-medium mb-6">{t("footer.contact")}</h4>

            <ul className="space-y-4 text-zinc-400">
              <motion.li whileHover={{ y: -3 }} className="transition-colors">
                <a
                  href="tel:+962790304901"
                  className="flex items-center gap-3 hover:text-primary transition-colors justify-center md:justify-start"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  +962 790 304 901
                </a>
              </motion.li>

              <motion.li whileHover={{ y: -3 }} className="transition-colors">
                <a
                  href="mailto:mojahedasha@gmail.com"
                  className="flex items-center gap-3 hover:text-primary transition-colors justify-center md:justify-start"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      `https://mail.google.com/mail/?view=cm&fs=1&to=mojahedasha@gmail.com`,
                      "_blank"
                    );
                  }}
                >
                  <Mail className="w-4 h-4 text-primary" />
                  mojahedasha@gmail.com
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Column 3: Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-medium mb-6">{t("footer.follow")}</h4>

            <div className="flex justify-center md:justify-start gap-4">
              {socials.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  className="group relative"
                >
                  <div
                    className="relative w-11 h-11 rounded-xl
                    bg-zinc-900/70 backdrop-blur
                    border border-zinc-800
                    flex items-center justify-center
                    overflow-hidden
                    transition-all"
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100
                      bg-gradient-to-r from-primary/20 to-pink-500/20
                      transition-opacity"
                    />
                    <item.icon className="relative w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="mt-20 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-center md:justify-center gap-4 text-center w-full">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
