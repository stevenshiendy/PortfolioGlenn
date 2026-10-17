"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

type ScrubTextProps = {
  /** Wrap a word in *asterisks* to tint it amethyst */
  text: string;
  as?: "p" | "h2" | "h3";
  className?: string;
  /** Scroll window over which the words light up */
  offset?: [string, string];
};

// Words light up one by one as the reader scrolls through them
export default function ScrubText({ text, as = "p", className = "", offset = ["start 0.88", "end 0.55"] }: ScrubTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as unknown as NonNullable<Parameters<typeof useScroll>[0]>["offset"],
  });
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag ref={ref} className={className}>
      {words.map((raw, i) => {
        const highlight = raw.startsWith("*");
        const word = raw.replace(/\*/g, "");
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            static={!!reduceMotion}
            className={highlight ? "text-brand-soft" : undefined}
          >
            {word}
          </Word>
        );
      })}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
  static: isStatic,
  className = "",
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  static: boolean;
  className?: string;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={isStatic ? undefined : { opacity }} className={`inline-block mr-[0.25em] last:mr-0 ${className}`}>
      {children}
    </motion.span>
  );
}
