"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useState } from "react";
import { useActiveChapter } from "./useActiveChapter";

export default function TopNav() {
  const active = useActiveChapter();
  const navItems = [
    { label: "Leadership", href: "#leadership", id: "leadership" },
    { label: "Business", href: "#business", id: "business" },
    { label: "Master of Ceremonies", href: "#mc", id: "mc" },
    { label: "Photography", href: "#lens", id: "lens" },
    { label: "Honors", href: "#awards", id: "awards" },
  ];

  // Tuck the header away while reading down, bring it back on any scroll up
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (Math.abs(y - prev) < 4) return;
    setHidden(y > prev && y > 120);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? "-160%" : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-[max(1rem,env(safe-area-inset-top))] left-3 right-3 md:left-6 md:right-6 z-[100] mx-auto max-w-6xl pl-4 md:pl-5 pr-1.5 py-1.5 flex items-center justify-between gap-3 rounded-full border border-mist/15 bg-ink/50 backdrop-blur-xl"
    >
      {/* Left: Name */}
      <a href="#home" className="font-serif text-lg md:text-2xl leading-none whitespace-nowrap text-mist-light hover:text-brand-soft transition-colors">
        Steven Glenn Shiendy
      </a>

      {/* Middle: Chapters (hidden on smaller screens) */}
      <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`relative rounded-full px-4 py-2 transition-colors duration-300 ${isActive ? "text-ink" : "text-mist/70 hover:text-mist-light"}`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-mist"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Right: Connect Button */}
      <a
        href="https://wa.me/6285156262813"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex shrink-0 items-center gap-2 px-3.5 md:px-5 py-2.5 bg-mist text-ink text-sm font-semibold rounded-full hover:bg-brand hover:text-mist-light transition-colors duration-300"
      >
        <IconBrandWhatsapp stroke={2} className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
        Connect
      </a>
    </motion.header>
  );
}
