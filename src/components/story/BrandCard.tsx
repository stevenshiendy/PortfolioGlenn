import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import FocusCard from "./FocusCard";

type BrandCardProps = {
  name: string;
  badge: string;
  logo: { src: string; width: number; height: number; className?: string };
  tagline: string;
  story: string;
  facts: string[];
  link: { href: string; label: string };
};

// One brand story: badge, logo, tagline, story, a quiet line of facts and a link
// pinned to the bottom so side-by-side cards line up.
export default function BrandCard({ name, badge, logo, tagline, story, facts, link }: BrandCardProps) {
  return (
    <FocusCard className="flex h-full flex-col p-6 md:p-10">
      <span className="self-start rounded-full bg-brand px-3 py-1 text-xs font-semibold text-mist-light">{badge}</span>

      {/* Fixed-height logo slot keeps both taglines on the same line */}
      <h3 className="mt-6 flex h-[130px] md:h-[160px] items-end">
        <span className="sr-only">{name}</span>
        <Image
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          sizes="320px"
          className={`max-h-full w-auto ${logo.className ?? ""}`}
        />
      </h3>

      <p className="mt-4 font-serif text-2xl md:text-3xl italic text-brand-soft">{tagline}</p>
      <p className="mt-5 text-mist/70 text-base md:text-lg leading-relaxed">{story}</p>

      <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-mist/55">
        {facts.map((fact, i) => (
          <li key={fact} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-mist/40" />}
            {fact}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-mist/25 bg-mist/10 px-6 py-3 font-semibold text-mist-light backdrop-blur-md hover:bg-mist hover:text-ink transition-colors"
        >
          {link.label}
          <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </FocusCard>
  );
}
