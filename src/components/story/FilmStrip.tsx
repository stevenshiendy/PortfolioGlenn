"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import LazyVideo from "./LazyVideo";

type Frame = { src: string; alt: string; video?: boolean; poster?: string };

// The section pins in place while the frames glide sideways, like scrubbing a reel
export default function FilmStrip({ frames }: { frames: Frame[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const distance = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (track) distance.set(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-center gap-4 md:gap-6 px-[8vw]">
          <div className="w-[70vw] md:w-[30vw] shrink-0 pr-4">
            <p className="font-display text-sm font-medium text-brand-soft">Frame by frame</p>
            <p className="mt-3 font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight text-mist-light">
              Freezing time, one moment at a time.
            </p>
            <p className="mt-4 text-mist/60">Keep scrolling to roll the reel.</p>
          </div>
          {frames.map((f, i) => (
            <motion.div
              key={f.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative h-[62vh] md:h-[70vh] aspect-[9/16] shrink-0 overflow-hidden rounded-[1.75rem] border border-mist/15 bg-ink ${i % 2 ? "md:translate-y-8" : "md:-translate-y-6"}`}
            >
              {f.video ? (
                <LazyVideo src={f.src} poster={f.poster ?? ""} className="h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              ) : (
                <Image src={f.src} alt={f.alt} fill sizes="(max-width: 768px) 60vw, 25vw" className="object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
