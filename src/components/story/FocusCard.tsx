"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// A frosted card that "lights up" while it holds the centre of the screen
// and dims as it scrolls away, so the reader's focus follows the story.
export default function FocusCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.25, 1, 1, 0.25]);
  const scale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.93, 1, 1, 0.96]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { opacity, scale }}
      className={`relative rounded-[2rem] md:rounded-[2.5rem] border border-mist/15 bg-ink/45 backdrop-blur-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}
