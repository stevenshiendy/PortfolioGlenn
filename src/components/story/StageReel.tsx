"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type StageEvent = { src: string; title: string };

// A pinned "stage" that flips through every event Steven has hosted as you scroll,
// with a tab row whose bars fill up like a playlist.
export default function StageReel({ events }: { events: StageEvent[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  const n = events.length;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(p * n))));
  });

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + travel * ((i + 0.5) / n), behavior: "smooth" });
  };

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 55 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center gap-6 md:gap-8 px-4 md:px-10 pt-20 pb-6">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 md:gap-12 md:grid-cols-[1fr_auto]">
          {/* Caption */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="font-display text-sm font-medium text-mist/60 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · On stage
            </p>
            <div className="relative mt-2 h-[1.2em] overflow-hidden font-display text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-mist-light">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h3
                  key={events[active].title}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 whitespace-nowrap"
                >
                  {events[active].title}
                </motion.h3>
              </AnimatePresence>
            </div>
            <p className="mt-4 hidden md:block max-w-sm text-mist/60 leading-relaxed">
              Keep scrolling. Every stage is a new crowd, a new energy, a new conversation.
            </p>
          </div>

          {/* The stage frame */}
          <div className="order-1 md:order-2 relative mx-auto h-[48vh] md:h-[62vh] aspect-[3/4] overflow-hidden rounded-[2rem] border border-mist/15 bg-ink shadow-[0_30px_80px_-20px_rgba(126,73,179,0.6)]">
            {events.map((e, i) => (
              <motion.div
                key={e.src}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.08 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image src={e.src} alt={e.title} fill sizes="(max-width: 768px) 70vw, 40vw" className="object-cover" />
              </motion.div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>
        </div>

        {/* Playlist tabs */}
        <div className="mx-auto w-full max-w-6xl overflow-x-auto [scrollbar-width:none]">
          <div className="flex min-w-max gap-2 xl:grid xl:min-w-0 xl:grid-cols-8">
            {events.map((e, i) => (
              <Tab key={e.src} index={i} total={n} progress={scrollYProgress} active={i === active} onClick={() => jumpTo(i)}>
                {e.title}
              </Tab>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tab({
  children,
  index,
  total,
  progress,
  active,
  onClick,
}: {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  active: boolean;
  onClick: () => void;
}) {
  const fill = useTransform(progress, [index / total, (index + 1) / total], [0, 1]);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative overflow-hidden rounded-full border px-4 py-2 text-left text-xs md:text-[13px] font-medium whitespace-nowrap transition-colors ${
        active ? "border-mist/40 bg-mist/15 text-mist-light" : "border-mist/10 bg-ink/30 text-mist/50 hover:text-mist"
      }`}
    >
      <span className="relative z-10">{children}</span>
      <motion.span style={{ scaleX: fill }} className="absolute inset-x-0 bottom-0 h-[3px] origin-left bg-brand-soft" />
    </button>
  );
}
