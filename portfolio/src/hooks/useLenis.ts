import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";


export const useLenis = () => {
useEffect(() => {
const lenis = new Lenis({ smooth: true, lerp: 0.08 });
const raf = (time: number) => {
lenis.raf(time);
requestAnimationFrame(raf);
};
requestAnimationFrame(raf);
}, []);
};