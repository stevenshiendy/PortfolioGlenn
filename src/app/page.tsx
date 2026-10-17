"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";
import {
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMail,
  IconBrandWhatsapp,
  IconArrowDown,
  IconArrowRight,
  IconArrowUpRight,
} from "@tabler/icons-react";
import ChapterHeading from "@/components/story/ChapterHeading";
import ScrubText from "@/components/story/ScrubText";
import FocusCard from "@/components/story/FocusCard";
import Marquee from "@/components/story/Marquee";
import QuoteCard from "@/components/story/QuoteCard";
import StageReel from "@/components/story/StageReel";
import FilmStrip from "@/components/story/FilmStrip";
import CountUp from "@/components/story/CountUp";

const MC_EVENTS = [
  { src: "/images/MC/SAGARMATHA 8.0/MCSagarmatha9.0.jpg", title: "Sagarmatha 8.0" },
  { src: "/images/MC/Sagarmatha 9.0/MCSagarmatha9.0-1.jpg", title: "Sagarmatha 9.0" },
  { src: "/images/MC/ONEFEST/StevenGlenn solo shot.jpg", title: "ONEFEST" },
  { src: "/images/MC/Sweet 17 Kezia Novelina/MCSweet17Kezia.jpg", title: "Sweet 17 Parties" },
  { src: "/images/MC/Manawa/MCManawaFest.jpg", title: "Manawa Fest" },
  { src: "/images/MC/TKK 164 Zootastic/MCZootastic.jpg", title: "Zootastic" },
  { src: "/images/MC/Nawasena/IMG_5486.jpg", title: "Nawasena" },
  { src: "/images/MC/60th SMAK 1 Pesta Diamond/MCPestaDiamond60th.jpg", title: "Pesta Diamond" },
];

const LENS_WORK = [
  { src: "/images/Photography & Videography/JENETBDAY-4.JPG", alt: "Event Photography" },
  { src: "/images/Photography & Videography/KJ 2.MP4", alt: "Event Videography", video: true },
  { src: "/images/Photography & Videography/Territory-4.jpg", alt: "Creative Photography" },
  { src: "/images/Photography & Videography/ADERA 3.MOV", alt: "Creative Videography", video: true },
  { src: "/images/Photography & Videography/DSC01890.JPG", alt: "Photography Portrait" },
];

const SOCIALS = [
  { href: "https://linkedin.com/in/stevenglennshiendy", label: "LinkedIn", Icon: IconBrandLinkedin, external: true },
  { href: "https://instagram.com/stvenglenn", label: "Instagram", Icon: IconBrandInstagram, external: true },
  { href: "mailto:glennshiendy@gmail.com", label: "Gmail", Icon: IconMail, external: false },
  { href: "https://wa.me/6285156262813", label: "WhatsApp", Icon: IconBrandWhatsapp, external: true },
];

const ease = [0.22, 1, 0.36, 1] as const;

function FadeUp({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const mediaFrame = "relative overflow-hidden rounded-[1.5rem] border border-mist/15 bg-ink";
// Frosted pill used for every social / brand link
const socialPill = "group mt-8 inline-flex items-center gap-2 rounded-full border border-mist/25 bg-mist/10 px-6 py-3 font-semibold text-mist-light backdrop-blur-md hover:bg-mist hover:text-ink transition-colors";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { margin: "-20%" });
  const heroRef = useRef<HTMLElement>(null);

  // Always force the user to start at the top on page load/refresh
  useEffect(() => {
    if (typeof window !== "undefined" && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.75;
      videoRef.current.muted = false;
      if (isVideoInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVideoInView]);

  // Hero: the wordmark shrinks and lifts away as the story begins
  const { scrollYProgress: heroP } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const markScale = useTransform(heroP, [0, 1], [1, 0.55]);
  const markY = useTransform(heroP, [0, 1], ["0vh", "-22vh"]);
  const markOpacity = useTransform(heroP, [0.45, 0.9], [1, 0]);
  const copyOpacity = useTransform(heroP, [0, 0.35], [1, 0]);
  const copyY = useTransform(heroP, [0, 0.35], [0, -40]);

  return (
    <main
      id="home"
      className="min-h-screen text-mist-light selection:bg-brand selection:text-mist-light font-body overflow-x-clip"
      onContextMenu={(e) => e.preventDefault()}
    >

      {/* CHAPTER 0: THE INTRODUCTION */}
      <section id="intro" ref={heroRef} className="relative h-[175vh]">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-4 pt-16 overflow-hidden">
          <motion.div style={{ scale: markScale, y: markY, opacity: markOpacity }} className="relative">
            <h1 className="font-display font-extrabold text-center leading-[0.88] tracking-[-0.05em] text-[15vw] md:text-[10.5vw] xl:text-[9.5rem]">
              {["Steven Glenn", "Shiendy"].map((line, l) => (
                <span key={line} className="block whitespace-nowrap">
                  {line.split("").map((ch, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: "30%", filter: "blur(12px)" }}
                      animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                      transition={{ duration: 1.1, delay: 0.2 + (l * 12 + i) * 0.04, ease }}
                      className="inline-block bg-gradient-to-b from-mist-light via-mist to-brand-soft bg-clip-text text-transparent pb-[0.08em]"
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="mt-6 md:mt-10 max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
              className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-mist-light"
            >
              Master of Ceremony, visual storyteller &amp; entrepreneur.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease }}
              className="mt-4 text-base md:text-lg text-mist/70 leading-relaxed"
            >
              I bring events to life through public speaking, capture moments through photography, and build communities through leadership.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, ease }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              <a href="#leadership" className="group inline-flex items-center gap-2 rounded-full bg-mist px-6 py-3 font-semibold text-ink hover:bg-mist-light transition-colors">
                Start the story
                <IconArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 rounded-full border border-mist/25 bg-mist/10 px-6 py-3 font-semibold text-mist-light backdrop-blur-md hover:bg-mist/20 transition-colors">
                Let&apos;s talk
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: copyOpacity }}
            className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-mist/50"
          >
            Scroll to begin
            <span className="relative h-10 w-[1.5px] overflow-hidden rounded-full bg-mist/15">
              <motion.span
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-brand-soft"
              />
            </span>
          </motion.div>
        </div>
      </section>

      {/* THE PREMISE */}
      <section className="px-5 md:px-10 pb-24 md:pb-32">
        <ScrubText
          text="I hold the *mic.* I frame the *moment.* I build the *community.*"
          offset={["start 0.85", "end 0.45"]}
          className="mx-auto max-w-6xl font-display font-extrabold uppercase leading-[0.92] tracking-[-0.03em] text-[13vw] md:text-[7.5vw] xl:text-[7rem] text-mist-light"
        />
      </section>

      <section className="pb-24">
        <p className="mb-8 text-center text-sm text-mist/50">Stages I&apos;ve hosted</p>
        <Marquee items={MC_EVENTS.map((e) => e.title)} />
      </section>

      {/* CHAPTER 1: THE HEART (Leadership) */}
      <section id="leadership" className="relative px-4 md:px-10 pt-24 md:pt-32 pb-24">
        <ChapterHeading number="01" kicker="Core pillar" title="Community Leadership" />
        <ScrubText
          text="True leadership is never about standing at the absolute front and demanding attention. It is about *walking closely alongside others.*"
          className="mx-auto mt-12 max-w-4xl text-center font-display text-2xl md:text-4xl font-medium leading-snug tracking-tight text-mist-light"
        />
        <FadeUp className="mx-auto mt-6 max-w-2xl text-center text-mist/65 leading-relaxed">
          It requires deep empathy, genuine connection, and the unwavering commitment to fostering an environment where every single person can discover their own voice.
        </FadeUp>

        {/* Feature 1: FYP Leader BINUSIAN 2029 */}
        <FocusCard className="mx-auto mt-24 max-w-6xl p-6 md:p-12">
          <div className="grid xl:grid-cols-[1fr_1.35fr] gap-10 items-center">
            <div>
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-mist-light">Mentor mode</span>
              <h3 className="mt-5 font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight">FYP Leader BINUSIAN 2029</h3>
              <p className="mt-6 text-mist/70 text-base md:text-lg leading-relaxed">
                Guiding and mentoring the next generation of students is a profound responsibility. It is a continuous journey of active listening, adapting to diverse needs, and helping others realize their own untapped potential through empathetic leadership. Watching individuals grow into confident contributors is the ultimate reward.
              </p>
            </div>
            <div className="flex flex-row items-center justify-center gap-3 md:gap-5">
              <div className={`${mediaFrame} flex-1 md:flex-none md:w-auto md:h-[50vh] aspect-[3/4]`}>
                <Image src="/images/FYP Leader/FYP Leader.png" alt="FYP Leader" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
              <div className={`${mediaFrame} flex-1 md:flex-none md:w-auto md:h-[50vh] aspect-[9/16]`}>
                <video
                  ref={videoRef}
                  src="/images/FYP Leader/FYPJinglevid_compressed.mp4"
                  preload="auto"
                  loop
                  playsInline
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </FocusCard>

        {/* Feature 2: Fostura */}
        <FocusCard className="mx-auto mt-16 max-w-6xl p-6 md:p-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-mist-light">Founder story</span>
            <h3 className="mt-5 font-display text-3xl md:text-5xl font-semibold tracking-tight">Fostura</h3>
            <p className="mt-6 text-mist/70 text-base md:text-lg leading-relaxed">
              Spearheading community driven initiatives requires a vision that extends far beyond the individual. It is entirely about building a safe space where creativity seamlessly meets purpose. In Fostura, the mission is to ensure that every single individual feels a deep sense of belonging and empowerment to contribute their unique ideas.
            </p>
            <p className="mt-5 text-mist/70 text-base md:text-lg leading-relaxed">
              Our inaugural project involved teaching the comprehensive course{" "}
              <span className="font-semibold text-brand-soft">&quot;Building The Basics of Public Speaking&quot;</span>, empowering students to discover, refine, and confidently share their own voices on stage.
            </p>
            <a
              href="https://instagram.com/Fostura.id"
              target="_blank"
              rel="noopener noreferrer"
              className={socialPill}
            >
              Visit Us
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-3 md:gap-6">
            {[
              { kind: "img", src: "/images/Fostura/TeamBehindFostura.jpg", alt: "Fostura Team", cls: "order-1 w-[47%] md:w-1/3" },
              { kind: "video", src: "/images/Fostura/Steven Teaching.MOV", alt: "Steven teaching", cls: "order-3 md:order-2 w-[75%] md:w-1/3 mt-2 md:mt-0 md:-translate-y-6" },
              { kind: "img", src: "/images/Fostura/Steven Glenn Solo shot.JPG", alt: "Steven Fostura", cls: "order-2 md:order-3 w-[47%] md:w-1/3" },
            ].map((m, i) => (
              <FadeUp key={m.src} delay={i * 0.1} className={m.cls}>
                <div className={`${mediaFrame} aspect-[3/4]`}>
                  {m.kind === "img" ? (
                    <Image src={m.src} alt={m.alt} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                  ) : (
                    <video src={m.src} autoPlay muted loop playsInline className="object-cover w-full h-full" />
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </FocusCard>
      </section>

      {/* CHAPTER 2: THE BUSINESS (Entrepreneurship) */}
      <section id="business" className="relative px-4 md:px-10 pt-24 md:pt-32 pb-24">
        <ChapterHeading number="02" kicker="Entrepreneur" title="Brands You Can Taste" />
        <ScrubText
          text="Good food is a story you can *taste.* These are the ones I get to tell every day."
          className="mx-auto mt-12 max-w-4xl text-center font-display text-2xl md:text-4xl font-medium leading-snug tracking-tight"
        />

        {/* Kaaramel Juice */}
        <FocusCard className="mx-auto mt-20 max-w-6xl overflow-hidden p-6 md:p-12">
          <span aria-hidden className="pointer-events-none absolute -right-6 -bottom-10 select-none font-display font-extrabold leading-none tracking-tighter text-[28vw] md:text-[16rem] text-mist/[0.04]">
            2009
          </span>
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-mist-light">No. 1 Dessert Juice in Indonesia</span>
              <h3 className="mt-6">
                <span className="sr-only">Kaaramel Juice</span>
                <Image
                  src="/images/Brands/KJ White.png"
                  alt=""
                  width={924}
                  height={310}
                  sizes="(max-width: 768px) 70vw, 360px"
                  className="h-auto w-[min(70vw,360px)]"
                />
              </h3>
              <p className="mt-2 font-serif text-2xl md:text-3xl italic text-brand-soft">Dessert you can drink.</p>
              <p className="mt-6 max-w-xl text-mist/70 text-base md:text-lg leading-relaxed">
                It began with a family&apos;s love for daily fruit juice and a Taiwanese habit: a cold, refreshing drink right after a meal. Blend the two and you get the dessert smoothie: thick, indulgent and guilt-free. Not just a new drink, a whole new category.
              </p>
              <a
                href="https://kaarameljuice.com"
                target="_blank"
                rel="noopener noreferrer"
                className={socialPill}
              >
                kaarameljuice.com
                <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-3 md:gap-4">
              {[
                { value: 2009, from: 1990, label: "First pour, 12 April" },
                { value: 2013, from: 2000, label: "Wirausaha Mandiri award" },
                { value: 3, from: 0, label: "Cities: Jakarta, Bandung, Gading Serpong" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-mist/10 bg-mist/[0.06] p-4 md:p-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl md:text-4xl font-semibold tracking-tight text-mist-light">
                    <CountUp from={stat.from} to={stat.value} />
                  </dd>
                  <p className="mt-2 text-xs md:text-sm text-mist/60 leading-snug" aria-hidden>{stat.label}</p>
                </div>
              ))}
            </dl>
          </div>
        </FocusCard>

        {/* Hanashuya */}
        <FocusCard className="mx-auto mt-16 max-w-6xl overflow-hidden p-6 md:p-12">
          <div className="relative max-w-2xl">
            <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-mist-light">Japanese-style cream puffs</span>
            <h3 className="mt-6">
              <span className="sr-only">Hanashuya</span>
              <Image
                src="/images/Brands/Hanashuya Logo Web.png"
                alt=""
                width={693}
                height={756}
                sizes="200px"
                className="h-[150px] md:h-[190px] w-auto brightness-0 invert"
              />
            </h3>
            <p className="mt-4 font-serif text-2xl md:text-3xl italic text-brand-soft">Where every crunch tells a story.</p>
            <p className="mt-6 text-mist/70 text-base md:text-lg leading-relaxed">
              Golden shells, creamy centres and a little mood booster in every bite. Hanashuya brings the Japanese cream puff to Bandung, made to be shared and remembered.
            </p>
            <p className="mt-4 text-sm text-mist/55">Papaya Fresh Gallery, Bandung</p>
            <a
              href="https://instagram.com/hanashuya.id"
              target="_blank"
              rel="noopener noreferrer"
              className={socialPill}
            >
              @hanashuya.id
              <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </FocusCard>
      </section>

      {/* CHAPTER 3: THE VOICE (Master of Ceremonies) */}
      <section id="mc" className="relative pt-24 md:pt-32">
        <div className="px-4 md:px-10">
          <ChapterHeading number="03" kicker="Core pillar" title="Master of Ceremonies" />
          <ScrubText
            text="The stage isn't a pedestal. It's a *bridge* to the people in front of me."
            className="mx-auto mt-12 max-w-4xl text-center font-display text-2xl md:text-4xl font-medium leading-snug tracking-tight"
          />
          <FadeUp className="mx-auto mt-6 max-w-xl text-center text-mist/65 leading-relaxed">
            From ONEFEST and Sagarmatha to intimate ceremonies, one goal: break the wall between stage and crowd.
          </FadeUp>
          <div className="mt-20">
            <QuoteCard quote="It is not just about what is spoken. It is about the authentic human connection forged in those fleeting moments." />
          </div>
        </div>

        <StageReel events={MC_EVENTS} />

        <div className="px-5 md:px-10 py-24">
          <ScrubText
            text="Every stage is a *conversation.* Every event is a *memory.*"
            className="mx-auto max-w-5xl text-center font-display font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[10vw] md:text-[6vw] xl:text-[5.5rem]"
          />
        </div>
      </section>

      {/* CHAPTER 4: THE LENS (Photography) */}
      <section id="lens" className="relative pt-16 md:pt-24">
        <div className="px-4 md:px-10">
          <ChapterHeading number="04" kicker="Core pillar" title="Photography & Videography" />
          <div className="mx-auto mt-12 max-w-3xl space-y-6 text-center text-lg text-mist/70 leading-relaxed">
            <FadeUp>
              There is a profound unspoken truth hidden in every photograph and frame of video. Through my lens, whether in still frames or motion, I actively seek out the unfiltered emotion and the quiet intensity that words often fail to capture.
            </FadeUp>
            <FadeUp delay={0.1}>
              A moment is fleeting. It exists for a mere fraction of a second and then it is gone forever. But inside a frame, that moment is granted eternity. Whether capturing the gritty energy of a live event, documenting the subtle nuances of a portrait, or directing a compelling visual narrative on video, the core philosophy remains identical.
            </FadeUp>
          </div>
          <ScrubText
            text="It is entirely about *freezing time.* It is about holding onto a feeling long after the reality has faded away."
            className="mx-auto mt-14 max-w-4xl text-center font-display text-2xl md:text-4xl font-medium leading-snug tracking-tight"
          />
        </div>

        <FilmStrip frames={LENS_WORK} />
      </section>

      {/* CHAPTER 5: AWARDS & RECOGNITION */}
      <section id="awards" className="px-4 md:px-10 pt-24 md:pt-32 pb-32">
        <ChapterHeading number="05" kicker="Honors" title="Awards & Achievements" />

        <FocusCard className="mx-auto mt-16 max-w-5xl p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-center">
            <div className={`${mediaFrame} aspect-[4/3]`}>
              <Image
                src="/images/Duta Bahasa BINUS 2025 Terbaik Dua Award.JPG"
                alt="Terbaik Dua Duta Bahasa BINUS 2025"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div>
              <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-mist-light">2025</span>
              <h3 className="mt-5 font-display text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
                Terbaik Dua <br /> <span className="text-brand-soft">Duta Bahasa BINUS 2025</span>
              </h3>
              <p className="mt-6 text-mist/70 text-base md:text-lg leading-relaxed">
                Recognized for excellence in communication, linguistic articulation, and public speaking. This achievement reflects a deep commitment to preserving and promoting the Indonesian language while effectively bridging cultural communication gaps on the main stage.
              </p>
            </div>
          </div>
        </FocusCard>
      </section>

      {/* THE FOOTER: THE HANDSHAKE */}
      <footer id="contact" className="relative px-4 md:px-10 pt-16 pb-10 text-center">
        <p className="text-sm text-mist/60">The end of the story... or the start of ours?</p>
        <motion.a
          href="mailto:glennshiendy@gmail.com"
          initial={{ opacity: 0, scale: 0.7, filter: "blur(16px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease }}
          className="mt-4 block font-display font-extrabold leading-[0.9] tracking-[-0.05em] text-[20vw] md:text-[14vw] xl:text-[13rem] bg-gradient-to-b from-mist-light via-mist to-brand-soft bg-clip-text text-transparent"
          aria-label="Let's talk: email Steven"
        >
          Let&apos;s talk.
        </motion.a>

        <div className="mt-12 flex flex-row flex-wrap justify-center gap-3">
          {SOCIALS.map(({ href, label, Icon, external }, i) => (
            <FadeUp key={label} delay={0.05 * i}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-2 rounded-full border border-mist/20 bg-mist/10 px-5 py-3 text-sm font-semibold text-mist-light backdrop-blur-md hover:bg-mist hover:text-ink transition-colors"
              >
                <Icon stroke={2} className="w-5 h-5" />
                {label}
              </a>
            </FadeUp>
          ))}
        </div>

        <p className="mt-24 text-xs text-mist/40">
          © {new Date().getFullYear()} Steven Glenn Shiendy
        </p>
      </footer>
    </main>
  );
}
