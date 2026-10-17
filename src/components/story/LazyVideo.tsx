"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";

// A muted looping clip that shows its poster first, only downloads once it is
// close to the screen, and only plays while it is actually visible.
export default function LazyVideo({ src, poster, className = "" }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useInView(ref, { once: true, margin: "400px" });
  const visible = useInView(ref, { amount: 0.25 });

  useEffect(() => {
    const video = ref.current;
    if (!video || !near) return;
    if (visible) video.play().catch(() => {});
    else video.pause();
  }, [near, visible]);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
