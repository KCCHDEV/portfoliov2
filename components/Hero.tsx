"use client";

import React, { useRef, useState } from "react";
import { usePortfolioFeatures } from "@/hooks/usePortfolioFeatures";

export default function Hero() {
  const { quote } = usePortfolioFeatures();
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform({ x: y * 8, y: -x * 8 });
  };

  const handleMouseLeave = () => setTransform({ x: 0, y: 0 });

  return (
    <section
      id="intro"
      className="section-3d relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden perspective-wrap"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[420px] h-[420px] bg-blue-500/15 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/12 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 tracking-widest uppercase px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/25 depth-layer hover:border-blue-500/40 hover:bg-blue-500/15 transition-all duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Portfolio 2026
              </span>
            </div>

            <h1 className="reveal text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.08] glow-text">
              สวัสดีครับ,
              <br />
              ผมชื่อ <span className="gradient-text">กอล์ฟ</span>
            </h1>

            <p className="reveal text-lg text-gray-400 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
              ยินดีต้อนรับสู่พื้นที่ของผม — ผมเป็น{" "}
              <strong className="text-white">Full Stack Developer</strong> จากไทย
              เน้น Backend, API Design และการออกแบบระบบที่ scale ได้
              ชอบเขียนโค้ดที่อ่านง่าย ดูแลได้ยาว และแบ่งปันผ่าน Open Source
            </p>
            <div className="reveal flex flex-wrap gap-3 justify-center lg:justify-start text-sm text-gray-500">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Backend</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">API Design</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Open Source</span>
            </div>

            <div className="reveal mt-6 mb-4 min-h-12 flex items-center justify-center lg:justify-start">
              <p
                id="daily-quote"
                className="text-sm italic text-gray-400 border-l-2 border-blue-500/50 pl-4 max-w-md"
              >
                {quote || "กำลังโหลด..."}
              </p>
            </div>

            <div className="reveal flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="#expertise"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              >
                <span className="relative z-10">ทำความรู้จัก</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://github.com/KCCHDEV"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/30 hover:scale-[1.02] transition-all duration-300"
              >
                <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                ดูผลงาน GitHub
              </a>
            </div>
          </div>

          <div className="hidden lg:flex order-1 lg:order-2 justify-center lg:justify-end perspective-wrap">
            <div
              ref={cardRef}
              className="tilt-wrap relative w-full max-w-[380px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="tilt-card card-3d depth-layer rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0c]"
                style={{
                  transform: `perspective(1000px) rotateX(${transform.x}deg) rotateY(${transform.y}deg) translateZ(0)`,
                }}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src="https://scontent.fcnx1-1.fna.fbcdn.net/v/t39.30808-6/604535160_1155715186761954_3726721749365428528_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF1UouCN_H4MUgMuync4UTqJAYeVq4-AEokBh5Wrj4ASqu2uOCCAi7A5puQwBqbUvYLi2M9Zi8biTYvJ_h6DiHZ&_nc_ohc=yW1TbXsgAlwQ7kNvwHKnmlj&_nc_oc=Admt5QFkkmSCGptvEA1b9RwIi1Q6LcJurUkW3y6JugHSTSVOaS7W0j_HjpJc-GMXMbg&_nc_zt=23&_nc_ht=scontent.fcnx1-1.fna&_nc_gid=Ai20S93zCmD1ISsgZ5Iv5g&oh=00_AfuqHHnRZwC-m-5Zc2RhI1qioyyMcxsmX_GERC7Uq2SQng&oe=6988ABA5"
                    alt="NAYGOLF Profile"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-xl p-4 depth-layer">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/20 flex items-center justify-center text-xl depth-layer">
                          🚀
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Full Stack Developer</p>
                          <p className="text-gray-400 text-xs">Based in Thailand 🇹🇭</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute -inset-4 rounded-[2.4rem] bg-gradient-to-br from-blue-500/25 to-violet-500/20 blur-3xl opacity-50 -z-10 transition-opacity duration-500 hover:opacity-70"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 text-gray-500"
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-widest text-gray-600">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDuration: "2s" }} />
        </div>
      </div>
    </section>
  );
}
