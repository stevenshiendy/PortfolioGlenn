"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// One continuous atmosphere behind the whole story: Nox Noir night with an
// Royal Amethyst glow that drifts as you scroll, and soft Steel Mist haze.
export default function Backdrop() {
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const glowX = useTransform(p, [0, 0.35, 0.7, 1], ["-10vw", "30vw", "-20vw", "10vw"]);
  const glowY = useTransform(p, [0, 1], ["-20vh", "40vh"]);
  const hazeY = useTransform(p, [0, 1], ["0vh", "-60vh"]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute left-[10vw] top-0 h-[110vh] w-[90vw] rounded-full bg-brand opacity-60 blur-[140px]"
      />
      <motion.div style={{ y: hazeY }} className="absolute inset-0">
        <motion.div
          animate={{ x: ["0vw", "6vw", "0vw"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[55vw] top-[70vh] h-[40vh] w-[50vw] rounded-full bg-mist opacity-[0.12] blur-[90px]"
        />
        <motion.div
          animate={{ x: ["0vw", "-5vw", "0vw"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[10vw] top-[120vh] h-[45vh] w-[45vw] rounded-full bg-mist opacity-[0.1] blur-[100px]"
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-brand-deep/30 to-transparent" />
    </div>
  );
}
