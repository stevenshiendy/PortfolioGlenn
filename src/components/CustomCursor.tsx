"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Use MotionValues for absolute buttery smooth 60fps performance 
  // bypassing React's render cycle completely
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Add a slight spring physics for an organic feel
  const springConfig = { damping: 40, stiffness: 600, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Glowing Dot - Fixed Size */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#FF5C00] rounded-full pointer-events-none z-[9999] shadow-[0_0_15px_3px_rgba(255,92,0,0.6)] will-change-transform"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
    </>
  );
}
