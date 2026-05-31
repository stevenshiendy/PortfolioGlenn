"use client";

import { motion } from "framer-motion";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function TopNav() {
  const navItems = [
    { label: "Leadership", href: "#leadership" },
    { label: "Master of Ceremonies", href: "#mc" },
    { label: "Photography", href: "#lens" },
    { label: "Honors", href: "#awards" },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-12 py-5 flex items-center justify-between bg-[#050505]/60 backdrop-blur-xl border-b border-white/5"
    >
      {/* Left: Logo */}
      <a href="#home" className="font-playfair font-bold text-lg md:text-xl tracking-widest text-white hover:text-[#FF5C00] transition-colors uppercase">
        Steven Glenn
      </a>

      {/* Middle: Chapters (hidden on very small screens) */}
      <nav className="hidden lg:flex items-center gap-12 font-inter text-xs tracking-[0.2em] text-gray-400">
        {navItems.map((item, idx) => (
          <a 
            key={idx} 
            href={item.href}
            className="hover:text-white transition-colors duration-300"
          >
            {item.label.toUpperCase()}
          </a>
        ))}
      </nav>

      {/* Right: Connect Button */}
      <a 
        href="https://wa.me/6285156262813"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-6 py-2.5 bg-white text-black font-inter text-xs font-bold tracking-[0.2em] rounded-full hover:bg-[#FF5C00] hover:text-white transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,92,0,0.4)]"
      >
        <IconBrandWhatsapp stroke={2} className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
        CONNECT
      </a>
    </motion.header>
  );
}
