import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  Linkedin,
  X as XSocial
  //  Drone
} from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "../common/LanguageSwitcher";
import logo from "../../assets/images/logo.jfif";

export default function Navbar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/skills", label: t("nav.skills") },
    { to: "/projects", label: t("nav.projects") },
    { to: "/experience", label: t("nav.experience") },
    // { to: "/gallary", label: t("nav.gallery") }, 
    { to: "/drone", label: t("nav.drone") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const socials = [
    { icon: Instagram, link: "https://instagram.com/mojahed.pro" },
    { icon: Facebook, link: "https://facebook.com/mojahed.pro90" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/mojahed-asha-7a03b4102" },
    { icon: XSocial, link: "https://x.com/MojahedAsha" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-black backdrop-blur-xl border-b border-white/10"
      >
        {/* Floating particles */}
        <motion.span
          className="absolute left-16 top-6 w-2 h-2 rounded-full bg-primary/40"
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.span
          className="absolute right-24 top-10 w-3 h-3 rounded-full bg-primary/30"
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between">
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="cursor-pointer flex items-center"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="Logo"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </motion.div>

          {/* DESKTOP LINKS */}
          <div className="hidden xl:flex items-center gap-14">
            {links.map((link) => {
              const active = pathname === link.to;
              return (
                <motion.div
                  key={link.to}
                  className="relative group"
                  whileHover={{ y: -2 }}
                >
                  <NavLink
                    to={link.to}
                    className={`uppercase tracking-widest text-[14px] transition-colors duration-300 ${
                      active
                        ? "text-primary"
                        : "text-white/70 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </NavLink>

                  {/* underline */}
                  <motion.span
                    layoutId="navbar-active"
                    className={`absolute -bottom-3 left-1/2 -translate-x-1/2 h-[2px] bg-primary rounded-full ${
                      active ? "w-8" : "w-0 group-hover:w-6"
                    }`}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher />

            <motion.button
              whileHover={{ scale: 1.15, rotate: 90 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setMobileOpen(true)}
              className="xl:hidden text-white/80 hover:text-white"
            >
              <Menu size={28} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="p-10 flex flex-col min-h-screen"
            >
              {/* TOP */}
              <div className="flex justify-between items-center">
                <motion.img
                  src={logo}
                  alt="Logo"
                  className="h-8 w-auto cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    setMobileOpen(false);
                  }}
                />

                <div className="flex items-center gap-4">
                  <LanguageSwitcher />
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <X size={32} />
                  </motion.button>
                </div>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-12 mt-24">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, ease: "easeOut" }}
                  >
                    <NavLink
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-3xl uppercase tracking-widest text-white/70 hover:text-primary transition"
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

              {/* SOCIALS */}
              <div className="mt-auto flex gap-6">
                {socials.map((item, i) => (
                  <motion.a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    className="group"
                  >
                    <div className="relative w-11 h-11 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-center justify-center overflow-hidden">
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/20 to-pink-500/20 transition-opacity" />
                      <item.icon className="relative w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
