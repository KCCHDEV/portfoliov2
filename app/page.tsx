"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Games from "@/components/Games";
import StatusSection from "@/components/StatusSection";
import ConnectSection from "@/components/ConnectSection";
import AudioPlayer from "@/components/AudioPlayer";
import PokemonAssistant from "@/components/PokemonAssistant";
import ThreeIntro from "@/components/ThreeIntro";
import { VideoBackground, AuraBackground, DarkOverlay, UnsplashBackground } from "@/components/Background";
import { usePortfolioFeatures } from "@/hooks/usePortfolioFeatures";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [introUnmounted, setIntroUnmounted] = useState(false);
  const { bgUrl } = usePortfolioFeatures();

  useEffect(() => {
    if (introFinished) {
      // Trigger Reveals immediately for cross-fade
      document.querySelectorAll(".reveal").forEach((el) => {
        el.classList.add("active");
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }
  }, [introFinished]);

  return (
    <main className={!introFinished ? "intro-active" : ""}>
      <VideoBackground />
      <AuraBackground />
      <DarkOverlay />
      <UnsplashBackground url={bgUrl} />

      {!introUnmounted && (
        <ThreeIntro
          onFinish={() => setIntroFinished(true)}
          onComplete={() => setIntroUnmounted(true)}
        />
      )}

      <div id="web-content" className={introFinished ? "visible" : ""}>
        <Navbar />

        <div className="relative z-10 perspective-wrap" style={{ perspective: "1200px" }}>
          <Hero />
          <BentoGrid />
          <Projects />
          <Gallery />
          <Games />
          <StatusSection />
          <ConnectSection />
        </div>

        <PokemonAssistant />
        <AudioPlayer
          audioUrl="/mp3/PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear) [Official MV] (mp3cut.net).mp3"
          songTitle="PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear)"
          iconUrl="/img/music_icon.jpg"
        />

        <footer className="section-3d relative z-10 py-16 border-t border-white/5 bg-[#050507]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span className="text-gray-500 text-sm">&copy; 2026 KCCHDEV</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <a href="#intro" className="link-hover-underline text-gray-500 hover:text-white transition-colors">หน้าแรก</a>
              <a href="#expertise" className="link-hover-underline text-gray-500 hover:text-white transition-colors">เกี่ยวกับ</a>
              <a href="#showcase" className="link-hover-underline text-gray-500 hover:text-white transition-colors">ผลงาน</a>
              <a href="#connect" className="link-hover-underline text-gray-500 hover:text-white transition-colors">ติดต่อ</a>
              <a href="https://donate-naygolf.netlify.app/" target="_blank" rel="noopener noreferrer" className="link-hover-underline text-gray-500 hover:text-white transition-colors">สนับสนุน</a>
              <a href="https://github.com/KCCHDEV" target="_blank" rel="noopener noreferrer" className="link-hover-underline text-gray-500 hover:text-white transition-colors inline-flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
