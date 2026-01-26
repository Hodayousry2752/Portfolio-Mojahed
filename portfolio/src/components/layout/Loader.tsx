import { motion } from "framer-motion";
import Logo from "@/assets/logo.svg";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <motion.img
        src={Logo}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-32"
      />
    </div>
  );
}
