"use client";

import { motion } from "framer-motion";
import ScrubText from "./ScrubText";

// A dark stage-like card with the quote lighting up word by word
export default function QuoteCard({ quote }: { quote: string }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-mist/10 bg-ink px-6 py-24 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(126,73,179,0.35),transparent)]" />
      <ScrubText
        text={`“${quote}”`}
        offset={["start 0.8", "end 0.5"]}
        className="relative mx-auto max-w-3xl text-center font-display text-3xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-mist-light"
      />
    </motion.figure>
  );
}
