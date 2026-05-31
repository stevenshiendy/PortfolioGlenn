"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { IconBrandLinkedin, IconBrandInstagram, IconMail, IconBrandWhatsapp } from "@tabler/icons-react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideoInView = useInView(videoRef, { margin: "-20%" });

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

  // Parallax setup for Hero
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);

  // (Horizontal scroll logic removed for a smoother vertical staggered gallery)

  // "The Lens" section will use whileInView for edge animations and inverse out

  return (
    <main 
      id="home" 
      className="min-h-screen bg-[#050505] text-white selection:bg-[#FF5C00] selection:text-white font-inter overflow-x-hidden"
      onContextMenu={(e) => e.preventDefault()}
    >
      
      {/* CHAPTER 1: THE INTRODUCTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="text-center z-10 max-w-5xl"
        >
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-10 leading-none"
          >
            Steven Glenn Shiendy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 1.5 }}
            className="flex flex-col gap-6"
          >
            <p className="font-playfair italic text-xl md:text-3xl text-gray-400">
              I bring events to life through public speaking, capture moments through photography, and build communities through leadership.
            </p>
            <p className="text-sm md:text-base tracking-[0.5em] text-gray-500 uppercase mt-8">
              Master of Ceremony • Photographer & Videographer • Entrepreneur
            </p>
          </motion.div>
        </motion.div>

        {/* Cinematic Down Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 3 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] tracking-[0.3em] text-gray-600 uppercase">Begin the journey</span>
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-16 bg-gradient-to-b from-[#FF5C00] to-transparent"
          />
        </motion.div>
      </section>

      {/* CHAPTER 4: THE HEART (Leadership) */}
      <section id="leadership" className="bg-[#050505]">
        
        {/* Intro to Leadership */}
        <div className="py-40 px-6 md:px-20 max-w-3xl mx-auto text-center">
          <motion.span 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF5C00] text-sm tracking-[0.4em] font-semibold mb-8 block"
          >
            CORE PILLARS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-playfair text-4xl md:text-6xl mb-16"
          >
            Community Leadership
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-gray-400 text-base md:text-base leading-loose max-w-3xl mx-auto font-light"
          >
            True leadership is never about standing at the absolute front and demanding attention. True leadership is about walking closely alongside others. It requires deep empathy, genuine connection, and the unwavering commitment to fostering an environment where every single person can discover their own voice.
          </motion.p>
        </div>

        {/* Full-Screen Feature 1: FYP Leader BINUSIAN 2029 */}
        <div className="min-h-screen flex items-center justify-center py-32 px-6 border-t border-[#111] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1.5 }}
            className="max-w-5xl mx-auto flex flex-col xl:flex-row gap-16 items-center relative z-10"
          >
            <div className="w-full xl:w-1/3">
              <h3 className="font-playfair text-3xl md:text-5xl text-white mb-8">FYP Leader BINUSIAN 2029</h3>
              <div className="w-12 h-[1px] bg-[#FF5C00] mb-8" />
              <p className="font-inter text-gray-400 text-lg md:text-base md:text-base leading-loose font-light">
                Guiding and mentoring the next generation of students is a profound responsibility. It is a continuous journey of active listening, adapting to diverse needs, and helping others realize their own untapped potential through empathetic leadership. Watching individuals grow into confident contributors is the ultimate reward.
              </p>
            </div>
            <div className="w-full xl:w-2/3 flex flex-row items-center justify-center gap-2 md:gap-8 group/media">
              {/* Picture Layer */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
                className="relative flex-1 md:w-auto md:h-[50vh] aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border border-white/5 will-change-transform"
              >
                <Image src="/images/FYP Leader/FYP Leader.png" alt="FYP Leader" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover/media:bg-transparent transition-colors duration-1000" />
              </motion.div>
              {/* Video Layer */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.8 }}
                className="relative flex-1 md:w-auto md:h-[50vh] aspect-[9/16] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 bg-[#111]"
              >
                <video 
                  ref={videoRef}
                  src="/images/FYP Leader/FYPJinglevid.MOV" 
                  loop 
                  playsInline 
                  className="object-cover w-full h-full opacity-90 group-hover/media:opacity-100 transition-opacity duration-1000"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Full-Screen Feature 2: Fostura */}
        <div className="min-h-screen flex items-center justify-center py-20 px-6 border-t border-[#111] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#FF5C00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1.5 }}
            className="max-w-5xl mx-auto flex flex-col gap-16 items-center relative z-10"
          >
            <div className="order-2 w-full flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-10">
              {/* Left Photo */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative order-1 md:order-1 w-[46%] md:w-1/3 aspect-[3/4] rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-[#111]"
              >
                <Image src="/images/Fostura/TeamBehindFostura.jpg" alt="Fostura Team" fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover hover:opacity-80 transition-opacity duration-500" />
              </motion.div>

              {/* Center Video */}
              <motion.div 
                className="relative order-3 md:order-2 w-[75%] md:w-1/3 mt-2 md:mt-0 aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(255,92,0,0.15)] bg-[#111]"
              >
                <video 
                  src="/images/Fostura/Steven Teaching.MOV" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* Right Photo */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative order-2 md:order-3 w-[46%] md:w-1/3 aspect-[3/4] rounded-xl overflow-hidden border border-white/5 shadow-2xl bg-[#111]"
              >
                <Image src="/images/Fostura/Steven Glenn Solo shot.JPG" alt="Steven Fostura" fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover hover:opacity-80 transition-opacity duration-500" />
              </motion.div>
            </div>
            <div className="order-1 w-full max-w-4xl mx-auto text-center">
              <h3 className="font-playfair text-3xl md:text-5xl text-white mb-8">Fostura</h3>
              <div className="w-12 h-[1px] bg-[#FF5C00] mb-8 mx-auto" />
              <p className="font-inter text-gray-400 text-base leading-loose font-light mb-6">
                Spearheading community driven initiatives requires a vision that extends far beyond the individual. It is entirely about building a safe space where creativity seamlessly meets purpose. In Fostura, the mission is to ensure that every single individual feels a deep sense of belonging and empowerment to contribute their unique ideas.
              </p>
              <p className="font-inter text-gray-400 text-base leading-loose font-light mb-10">
                Our inaugural project involved teaching the comprehensive course <span className="text-white font-medium">"Building The Basics of Public Speaking"</span>, empowering students to discover, refine, and confidently share their own voices on stage.
              </p>
              <a 
                href="https://instagram.com/Fostura.id" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-10 py-4 border border-[#FF5C00]/50 text-white font-inter tracking-[0.2em] uppercase text-sm hover:bg-[#FF5C00] hover:border-[#FF5C00] hover:text-white transition-all duration-500 rounded-full bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,92,0,0.1)] hover:shadow-[0_0_30px_rgba(255,92,0,0.4)]"
              >
                Visit Us
              </a>
            </div>
          </motion.div>
        </div>

      </section>

      {/* CHAPTER 2: THE VOICE (Extended Horizontal Scroll) */}
      <section id="mc" className="bg-[#050505] pt-40 pb-20 relative z-20">
        <div className="max-w-3xl mx-auto px-6 md:px-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#FF5C00] text-sm tracking-[0.4em] font-semibold mb-8 block"
          >
            CORE PILLARS
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair text-4xl md:text-6xl mb-12 leading-tight"
          >
            Master of Ceremonies
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.5 }}
            className="space-y-8 text-gray-400 text-base md:text-base leading-loose font-light"
          >
            <p>
              For me, holding a microphone has never been about simply commanding a stage. It stems from an innate, deeply rooted passion for understanding people. Every event is an opportunity to look into the crowd, listen to their unwritten stories, and connect with individuals on a profoundly human level.
            </p>
            <p>
              Whether I am guiding the roaring energy of large-scale festivals like ONEFEST and Sagarmatha or hosting an intimate, high-stakes ceremony, my goal remains the same: to completely break down the barrier between the stage and the audience.
            </p>
            <p className="text-gray-200 font-medium">
              The stage isn't a pedestal. It is a bridge to truly get to know the people standing in front of me.
            </p>
            <blockquote className="border-t border-b border-[#FF5C00]/30 py-8 my-8 font-playfair italic text-3xl text-gray-200">
              "It is not just about what is spoken. It is about the authentic human connection forged in those fleeting moments."
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Symmetric Grid Gallery for MC Images */}
      <section className="pt-8 pb-16 relative bg-[#050505]">
        <div className="max-w-3xl mx-auto px-12 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { src: "/images/MC/SAGARMATHA 8.0/MCSagarmatha9.0.jpg", title: "Sagarmatha 8.0" },
              { src: "/images/MC/Sagarmatha 9.0/MCSagarmatha9.0-1.jpg", title: "Sagarmatha 9.0" },
              { src: "/images/MC/ONEFEST/StevenGlenn solo shot.jpg", title: "ONEFEST" },
              { src: "/images/MC/Sweet 17 Kezia Novelina/MCSweet17Kezia.jpg", title: "Sweet 17 Parties" },
              { src: "/images/MC/Manawa/MCManawaFest.jpg", title: "Manawa Fest" },
              { src: "/images/MC/TKK 164 Zootastic/MCZootastic.jpg", title: "Zootastic" },
              { src: "/images/MC/Nawasena/IMG_5486.jpg", title: "Nawasena" },
              { src: "/images/MC/60th SMAK 1 Pesta Diamond/MCPestaDiamond60th.jpg", title: "Pesta Diamond" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                transition={{ duration: 1 }}
                className="relative w-full aspect-[3/4] group rounded-2xl overflow-hidden shadow-2xl bg-[#111] will-change-transform will-change-opacity"
              >
                <Image src={item.src} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-all duration-1000 scale-105 group-hover:scale-100 group-hover:blur-sm" />
                <div className="absolute inset-0 bg-transparent group-hover:bg-gray-900/60 transition-colors duration-1000 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <h3 className="font-playfair text-2xl md:text-4xl text-white font-bold tracking-widest text-center px-4">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Outro Text in Gallery */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full text-center mt-16 mb-8"
          >
            <h3 className="font-playfair text-2xl md:text-4xl mb-8">Every stage is a conversation.</h3>
            <p className="text-lg md:text-xl text-gray-400 font-light tracking-widest">Every event is a memory.</p>
          </motion.div>
        </div>
      </section>
      {/* CHAPTER 3: THE LENS (Photography) */}
      <section id="lens" className="py-20 md:py-32 relative bg-[#0a0a0a] overflow-hidden">
        <div className="w-full max-w-[1800px] mx-auto px-2 md:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5 }}
            className="max-w-3xl text-center mx-auto mb-16 md:mb-40"
          >
            <span className="text-[#FF5C00] text-sm tracking-[0.4em] font-semibold mb-8 block">CORE PILLARS</span>
            <h2 className="font-playfair text-4xl md:text-6xl mb-12 leading-tight">Photography & Videography</h2>
            <div className="space-y-8 text-gray-400 text-base md:text-base leading-loose font-light text-left md:text-center">
              <p>
                There is a profound unspoken truth hidden in every photograph and frame of video. Through my lens, whether in still frames or motion, I actively seek out the unfiltered emotion and the quiet intensity that words often fail to capture. 
              </p>
              <p>
                A moment is fleeting. It exists for a mere fraction of a second and then it is gone forever. But inside a frame, that moment is granted eternity. Whether capturing the gritty energy of a live event, documenting the subtle nuances of a portrait, or directing a compelling visual narrative on video, the core philosophy remains identical.
              </p>
              <p className="text-gray-200">
                It is entirely about freezing time. It is about holding onto a feeling long after the reality has faded away.
              </p>
            </div>
          </motion.div>

          {/* Edge Reveal Image Section */}
          <div className="w-full flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 mt-10">
            
            {/* ITEM 1 */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-[31%] md:flex-1 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden shadow-2xl will-change-transform will-change-opacity"
            >
              <Image src="/images/Photography & Videography/JENETBDAY-4.JPG" alt="Event Photography" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover hover:scale-110 transition-transform duration-[2000ms]" />
            </motion.div>

            {/* ITEM 2 (Center Video) */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
              className="relative w-[31%] md:flex-1 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden shadow-2xl z-10 will-change-transform will-change-opacity"
            >
              <video 
                src="/images/Photography & Videography/KJ 2.MP4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2000ms]"
              />
            </motion.div>

            {/* ITEM 3 */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              className="relative w-[31%] md:flex-1 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden shadow-2xl will-change-transform will-change-opacity"
            >
              <Image src="/images/Photography & Videography/Territory-4.jpg" alt="Creative Photography" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover hover:scale-110 transition-transform duration-[2000ms]" />
            </motion.div>

            {/* ITEM 4 */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="relative w-[31%] md:flex-1 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden shadow-2xl will-change-transform will-change-opacity"
            >
              <video 
                src="/images/Photography & Videography/ADERA 3.MOV" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2000ms]"
              />
            </motion.div>

            {/* ITEM 5 */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              className="relative w-[31%] md:flex-1 aspect-[9/16] rounded-lg md:rounded-xl overflow-hidden shadow-2xl will-change-transform will-change-opacity"
            >
              <Image src="/images/Photography & Videography/DSC01890.JPG" alt="Photography Portrait" fill sizes="(max-width: 768px) 33vw, 20vw" className="object-cover hover:scale-110 transition-transform duration-[2000ms]" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* AWARDS & RECOGNITION */}
      <section id="awards" className="py-32 bg-[#0a0a0a] border-t border-[#111] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <span className="text-[#FF5C00] text-sm tracking-[0.4em] font-semibold mb-6 block">HONORS</span>
            <h2 className="font-playfair text-2xl md:text-4xl text-white">Awards & Achievements</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Award Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/5 will-change-transform"
            >
              <Image 
                src="/images/Duta Bahasa BINUS 2025 Terbaik Dua Award.JPG" 
                alt="Terbaik Dua Duta Bahasa BINUS 2025" 
                fill 
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-[2000ms]"
              />
            </motion.div>

            {/* Award Description */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h3 className="font-playfair text-2xl md:text-4xl text-white mb-6 leading-snug">Terbaik Dua <br /> Duta Bahasa BINUS 2025</h3>
              <div className="w-12 h-[1px] bg-[#FF5C00] mb-8" />
              <p className="font-inter text-gray-400 text-base leading-loose font-light">
                Recognized for excellence in communication, linguistic articulation, and public speaking. This achievement reflects a deep commitment to preserving and promoting the Indonesian language while effectively bridging cultural communication gaps on the main stage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* THE FOOTER: THE HANDSHAKE */}
      <footer id="contact" className="py-32 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-[#020202]">
        {/* Deep Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] bg-[#FF5C00] rounded-full blur-[200px] opacity-[0.04]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="relative z-10"
        >
          <p className="text-gray-500 tracking-[0.4em] text-sm mb-6 uppercase">CONNECT WITH ME</p>
          <a
            href="mailto:glennshiendy@gmail.com"
            className="block font-playfair text-6xl md:text-[9rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:from-[#FF5C00] hover:to-[#ff8a47] transition-all duration-1000 mb-12 text-shadow-glow"
          >
            LET'S TALK.
          </a>
        </motion.div>
        
        <div className="flex flex-row flex-wrap justify-center gap-6 md:gap-16 font-inter text-sm tracking-[0.3em] text-gray-500 relative z-10">
          <a href="https://linkedin.com/in/stevenglennshiendy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#FF5C00] transition-colors duration-500">
            <IconBrandLinkedin stroke={1.5} className="w-5 h-5" />
            LINKEDIN
          </a>
          <a href="https://instagram.com/stvenglenn" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#FF5C00] transition-colors duration-500">
            <IconBrandInstagram stroke={1.5} className="w-5 h-5" />
            INSTAGRAM
          </a>
          <a href="mailto:glennshiendy@gmail.com" className="flex items-center gap-3 hover:text-[#FF5C00] transition-colors duration-500">
            <IconMail stroke={1.5} className="w-5 h-5" />
            GMAIL
          </a>
          <a href="https://wa.me/6285156262813" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#FF5C00] transition-colors duration-500">
            <IconBrandWhatsapp stroke={1.5} className="w-5 h-5" />
            WHATSAPP
          </a>
        </div>
      </footer>
    </main>
  );
}
