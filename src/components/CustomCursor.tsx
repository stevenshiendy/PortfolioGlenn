"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Use MotionValues for absolute buttery smooth 60fps performance
  // bypassing React's render cycle completely
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [hovering, setHovering] = useState(false);

  // The dot sticks close, the ring trails behind with a softer spring
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 700, mass: 0.4 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 700, mass: 0.4 });
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 260, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 260, mass: 0.6 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const updateHover = (e: MouseEvent) => {
      const target = e.target as Element | null;
      setHovering(!!target?.closest?.("a, button, video"));
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", updateHover);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", updateHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 -ml-1.5 -mt-1.5 bg-brand rounded-full pointer-events-none z-[9999] will-change-transform"
        style={{ x: dotX, y: dotY }}
        animate={{ scale: hovering ? 0 : 1 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border-2 border-white mix-blend-difference pointer-events-none z-[9998] will-change-transform"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.6 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
