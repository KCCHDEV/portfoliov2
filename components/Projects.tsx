"use client";

import React from "react";

const PROJECTS = [
  {
    href: "https://github.com/KCCHDEV/base-MSDB-JS",
    icon: "🗄️",
    title: "base-MSDB-JS",
    desc: " lightweight JSON-based database manager สำหรับ Node.js ออกแบบให้ใช้ง่าย รวดเร็ว และเหมาะกับโปรเจกต์ขนาดเล็กถึงกลาง รองรับ query แบบคล้าย SQL และ export/import ข้อมูล",
    tags: ["Node.js", "TypeScript", "JSON"],
    accent: "blue",
    gradient: "from-blue-500/20 to-cyan-500/10",
  },
  {
    href: "https://github.com/KCCHDEV/Makori",
    icon: "🎵",
    title: "Makori Music",
    desc: "Discord Music Bot ที่รองรับ YouTube, Spotify และ streaming คุณภาพสูง มีระบบคิว เล่นเพลงตามคำขอ และคำสั่งสำหรับจัดการเพลลิสต์ เหมาะกับเซิร์ฟเวอร์ขนาดกลาง",
    tags: ["Discord.js", "Node.js", "Lavalink"],
    accent: "purple",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  {
    href: "https://github.com/KCCHDEV",
    icon: "🌐",
    title: "Portfolio 2026",
    desc: "เว็บพอร์ตโฟลิโอนี้สร้างด้วย Next.js 16, TypeScript และ Tailwind CSS มี intro 3D (Three.js), ข้อมูล weather/quote จาก API และ layout แบบ responsive ทั้งหมด",
    tags: ["Next.js", "Three.js", "GSAP"],
    accent: "blue",
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  {
    href: "https://github.com/KCCHDEV",
    icon: "🛠️",
    title: "Side Projects & Tools",
    desc: "สคริปต์เล็กๆ สำหรับ automation, CLI tools และไลบรารีช่วยงานพัฒนาที่ใช้ในโปรเจกต์จริง ดูรายการทั้งหมดได้ที่ GitHub",
    tags: ["Python", "Shell", "Automation"],
    accent: "purple",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
];

export default function Projects() {
  return (
    <section
      id="showcase"
      className="section-3d relative py-[var(--section-padding)] bg-[#050507] border-t border-white/5 z-10"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-16 reveal">
          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            ผลงาน
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl">
            โปรเจกต์ที่ทำและเปิดเผยบน Open Source — ทั้งไลบรารี บอท และเว็บ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 perspective-wrap">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="reveal block group"
            >
              <div className={`card-3d depth-layer depth-layer-hover h-full bg-[#0c0c0e] border border-white/10 rounded-[var(--card-radius)] p-8 md:p-10 transition-all duration-300 group-hover:border-white/20 relative overflow-hidden`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="relative z-10">
                  <div className={`text-4xl md:text-5xl mb-6 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center depth-layer group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/5`}>
                    {project.icon}
                  </div>
                  <h3
                    className={`text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 ${project.accent === "purple" ? "group-hover:text-purple-400" : "group-hover:text-blue-400"}`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 text-gray-500 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ${project.accent === "purple" ? "text-purple-400" : "text-blue-400"}`}
                  >
                    ดูที่ GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
