"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Pre-computed burst so server and client render the same pieces
const PIECES = Array.from({ length: 26 }, (_, i) => {
  const angle = (i / 26) * Math.PI * 2;
  const dist = 110 + ((i * 37) % 90);
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    rotate: (i * 67) % 360,
    color: ["#7E49B3", "#141414", "#7E49B3", "#CFCFCF"][i % 4],
    round: i % 3 === 0,
  };
});

// A one-shot confetti pop when the wrapped content scrolls into view
export default function Confetti({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-20" aria-hidden>
        {PIECES.map((p, i) => (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={inView ? { x: p.x * 1.6, y: [0, p.y * 1.4, p.y * 1.4 + 80], opacity: [0, 1, 0], scale: 1, rotate: p.rotate + 180 } : {}}
            transition={{ duration: 1.8, ease: "easeOut", delay: 0.2 + (i % 5) * 0.03 }}
            className={`absolute block ${p.round ? "h-3 w-3 rounded-full" : "h-4 w-2 rounded-sm"}`}
            style={{ backgroundColor: p.color }}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
