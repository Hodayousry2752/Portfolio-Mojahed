import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  X,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();

  const contacts = [
  {
    icon: Phone,
    label: t("contact.phone"),
    value: "+962 790 304 901", 
  },
  {
    icon: MessageCircle,
    label: t("contact.whatsapp"),
    value: "+962 790 304 901", 
  },
  {
    icon: Mail,
    label: t("contact.email"),
    value: "mojahedasha@gmail.com",
  },
];

  const socials = [
    {
      icon: Instagram,
      label: "Instagram",
      link: "https://instagram.com/mojahed.pro",
    },
    {
      icon: Facebook,
      label: "Facebook",
      link: "https://facebook.com/mojahed.pro90",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      link: "https://www.linkedin.com/in/mojahed-asha-7a03b4102",
    },
    {
      icon: X,
      label: "X",
      link: "https://x.com/MojahedAsha",
    },
  ];

  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-24 px-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {t("contact.title")}
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          {t("contact.subtitle")}
        </p>
      </motion.div>

      <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* Contact Cards */}
        <div className="space-y-6">
          {contacts.map((item, i) => {
            let href = "#";
            if (item.icon === Phone) {
              href = `tel:${item.value.replace(/\s+/g, "")}`;
            } else if (item.icon === MessageCircle) {
              href = `https://wa.me/${item.value.replace(/\s+/g, "").replace("+", "")}`;
            } else if (item.icon === Mail) {
              href = `mailto:${item.value}`;
            }

            return (
              <motion.a
                key={i}
                href={href}
                target={item.icon === Mail || item.icon === MessageCircle ? "_blank" : undefined}
                rel={item.icon === Mail || item.icon === MessageCircle ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 shadow-lg cursor-pointer"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  if (item.icon === Mail) {
                    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${item.value}`, '_blank');
                  }
                }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>

                <div>
                  <p className="text-sm text-zinc-400">{item.label}</p>
                  <p className="text-zinc-200">{item.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-zinc-900/70 backdrop-blur-md border border-zinc-800 rounded-2xl p-8 shadow-lg"
        >
          {/* Glow */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-pink-500/20 blur-3xl rounded-2xl"
          />

          <div className="relative z-10">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {t("contact.socials")}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.06 }}
                  className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-black/40 border border-zinc-800 rounded-xl p-4"
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex-shrink-0"
                  >
                    <social.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <span className="text-zinc-200 text-center sm:text-left break-words">{social.label}</span>
                </motion.a>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-zinc-400 text-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              {t("contact.note")}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
