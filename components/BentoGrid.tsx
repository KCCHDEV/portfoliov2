"use client";

import React from "react";
import { usePortfolioFeatures } from "@/hooks/usePortfolioFeatures";

const STACK = [
  { name: "TypeScript", color: "from-blue-500 to-blue-600" },
  { name: "Node.js", color: "from-green-500 to-emerald-600" },
  { name: "Next.js", color: "from-gray-100 to-gray-300" },
  { name: "React", color: "from-cyan-400 to-blue-500" },
  { name: "Python", color: "from-amber-400 to-yellow-500" },
  { name: "Docker", color: "from-sky-400 to-blue-500" },
  { name: "PostgreSQL", color: "from-blue-400 to-indigo-500" },
  { name: "REST / GraphQL", color: "from-pink-400 to-rose-500" },
];

const FOCUS_AREAS = [
  "System Architecture",
  "Open Source",
  "API Design",
  "Performance",
  "Clean Code",
];

export default function BentoGrid() {
  const { weather } = usePortfolioFeatures();

  return (
    <section
      id="expertise"
      className="section-3d relative py-[var(--section-padding)] border-t border-white/5 z-10"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="reveal section-title section-title-center text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center text-white tracking-tight">
          ตัวตน & ความสนใจ
        </h2>
        <p className="reveal text-center text-gray-500 text-sm md:text-base mb-14 max-w-xl mx-auto">
          เทคโนโลยีที่ใช้เป็นประจำ และสิ่งที่ให้ความสนใจ
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6 auto-rows-[minmax(160px,auto)] perspective-wrap">
          <div className="reveal md:col-span-2 md:row-span-2">
            <div className="card-3d depth-layer h-full min-h-[280px] bg-[#0a0a0c] border border-white/10 rounded-[var(--card-radius)] p-8 md:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-violet-500/5 rounded-full blur-3xl group-hover:from-blue-500/15 group-hover:to-violet-500/10 transition-all duration-500" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                    Who am I
                  </span>
                  <p className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4 tracking-tight">
                    KCCHDEV
                  </p>
                  <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                    ผมชอบออกแบบและเขียนระบบที่รับโหลดได้จริง
                    ใช้ TypeScript/Node เป็นหลัก บางโปรเจกต์ใช้ Python
                    และสนใจ DevOps, Database และการทำ API ที่ maintain ง่าย
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {FOCUS_AREAS.map((label) => (
                    <span
                      key={label}
                      className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-colors cursor-default"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="reveal md:row-span-2">
            <div className="card-3d depth-layer h-full min-h-[160px] bg-[#0a0a0c] border border-white/10 rounded-[var(--card-radius)] p-6 md:p-8 flex flex-col">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                Stack
              </h3>
              <div className="space-y-4 flex-1 flex flex-col justify-center">
                {STACK.map((tech, i) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-3 text-gray-400 text-sm md:text-base group/tech hover:text-white transition-colors"
                  >
                    <span
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color} flex-shrink-0 group-hover/tech:scale-125 transition-transform`}
                    />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="card-3d depth-layer h-full min-h-[140px] bg-[#0a0a0c] border border-white/10 rounded-[var(--card-radius)] p-6 flex flex-col justify-center items-center text-center">
              <span className="text-4xl md:text-5xl font-bold tabular-nums bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                5+
              </span>
              <span className="text-[10px] md:text-xs mt-2 text-gray-500 uppercase tracking-widest">
                Years Exp
              </span>
            </div>
          </div>

          <div className="reveal">
            <div className="card-3d depth-layer h-full min-h-[140px] bg-[#0a0a0c] border border-white/10 rounded-[var(--card-radius)] p-6 flex flex-col justify-center items-center text-center group">
              {weather ? (
                <>
                  <span className="text-3xl md:text-4xl mb-1 transition-transform duration-300 group-hover:scale-110 inline-block">
                    {weather.condition}
                  </span>
                  <span className="text-xl font-bold text-white tabular-nums">{weather.temp}°C</span>
                  <span className="text-[10px] uppercase tracking-widest text-blue-400 font-medium mt-1">
                    {weather.city}
                  </span>
                  <span className="text-[10px] text-gray-500">THAILAND</span>
                </>
              ) : (
                <>
                  <span className="text-3xl mb-1 inline-block animate-pulse">🇹🇭</span>
                  <span className="text-xs text-gray-500">THAILAND</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
