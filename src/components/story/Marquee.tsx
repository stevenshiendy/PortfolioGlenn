// A quiet, endless row of names, like a wall of logos
export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {row.map((item, i) => (
              <span key={i} className="px-8 md:px-12 font-display text-xl md:text-3xl font-semibold tracking-tight text-mist/45 whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
