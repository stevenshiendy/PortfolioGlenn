"use client";

import { motion } from "framer-motion";
import { IconBuildingStore, IconCamera, IconHome, IconMail, IconMicrophone, IconTrophy, IconUsers } from "@tabler/icons-react";
import { useActiveChapter, type ChapterId } from "../useActiveChapter";

const RAIL: { id: ChapterId; label: string; Icon: typeof IconHome }[] = [
  { id: "intro", label: "Intro", Icon: IconHome },
  { id: "leadership", label: "Leadership", Icon: IconUsers },
  { id: "business", label: "Business", Icon: IconBuildingStore },
  { id: "mc", label: "On stage", Icon: IconMicrophone },
  { id: "lens", label: "Behind the lens", Icon: IconCamera },
  { id: "awards", label: "Honors", Icon: IconTrophy },
  { id: "contact", label: "Say hi", Icon: IconMail },
];

// Slim chapter rail on the right edge, highlighting where you are in the story
export default function ChapterRail() {
  const active = useActiveChapter();
  return (
    <nav
      aria-label="Story chapters"
      className="fixed right-4 top-1/2 z-[95] hidden -translate-y-1/2 flex-col gap-1 rounded-full border border-mist/15 bg-ink/50 p-1.5 backdrop-blur-xl md:flex"
    >
      {RAIL.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-label={label}
            aria-current={isActive ? "step" : undefined}
            className="group relative grid h-9 w-9 place-items-center rounded-full"
          >
            {isActive && (
              <motion.span layoutId="rail-pill" className="absolute inset-0 rounded-full bg-mist" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <Icon className={`relative h-[18px] w-[18px] transition-colors ${isActive ? "text-ink" : "text-mist/60 group-hover:text-mist"}`} stroke={2} />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-mist px-3 py-1 text-xs font-medium text-ink opacity-0 transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
