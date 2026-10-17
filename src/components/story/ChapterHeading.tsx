"use client";

import { motion } from "framer-motion";
import ScrubText from "./ScrubText";

type ChapterHeadingProps = {
  number: string;
  kicker: string;
  title: string;
  className?: string;
};

// Quiet glass label, then a big title that lights up word by word on scroll
export default function ChapterHeading({ number, kicker, title, className = "" }: ChapterHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 rounded-full border border-mist/20 bg-mist/10 px-4 py-1.5 text-sm text-mist backdrop-blur-md"
      >
        <span className="font-semibold text-brand-soft">{number}</span>
        <span className="h-1 w-1 rounded-full bg-mist/50" />
        {kicker}
      </motion.span>
      <ScrubText
        as="h2"
        text={title}
        offset={["start 0.95", "end 0.65"]}
        className="mt-6 font-display font-semibold text-4xl md:text-7xl leading-[1.02] tracking-tight text-mist-light"
      />
    </div>
  );
}
