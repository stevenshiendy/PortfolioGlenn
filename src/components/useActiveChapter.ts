"use client";

import { useEffect, useState } from "react";

// Story chapters in page order. The active one is the last whose top edge has
// crossed the middle of the viewport.
export const CHAPTER_IDS = ["intro", "leadership", "business", "mc", "lens", "awards", "contact"] as const;
export type ChapterId = (typeof CHAPTER_IDS)[number];

export function useActiveChapter(): ChapterId {
  const [active, setActive] = useState<ChapterId>("intro");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let current: ChapterId = "intro";
      for (const id of CHAPTER_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      // The footer is short, so treat "scrolled to the bottom" as reaching it
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = "contact";
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}
