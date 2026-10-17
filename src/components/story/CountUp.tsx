"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// A number that counts up from `from` to `to` the first time it scrolls into view
export default function CountUp({ to, from = 0, duration = 1.6, className = "" }: { to: number; from?: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, from, to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {reduceMotion ? to : value}
    </span>
  );
}
