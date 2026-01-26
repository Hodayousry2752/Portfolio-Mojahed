import { motion } from "framer-motion";


export default function PageTransition({ children }: { children: React.ReactNode }) {
return (
<motion.main
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="pt-16"
>
{children}
</motion.main>
);
}