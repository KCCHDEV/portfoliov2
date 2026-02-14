"use client";

import React from "react";
import Link from "next/link";

const LINKS = [
  {
    href: "https://github.com/KCCHDEV",
    label: "GitHub",
    desc: "โปรเจกต์และรีโปที่เปิดเผย",
    icon: "↗",
  },
  {
    href: "https://donate-naygolf.netlify.app/",
    label: "สนับสนุน",
    desc: "Donate สนับสนุนให้มีกำลังใจทำระบบมาแจกต่อ",
    icon: "♥",
  },
  {
    href: "/blog",
    label: "บล็อก",
    desc: "บันทึกการเรียนรู้และบทความ",
    icon: "→",
  },
  {
    href: "/setup",
    label: "อุปกรณ์",
    desc: "เครื่องและอุปกรณ์ที่ใช้ทำงาน",
    icon: "→",
  },
];

export default function ConnectSection() {
  return (
    <section
      id="connect"
      className="section-3d relative py-[var(--section-padding)] bg-[#050507] border-t border-white/5 z-10"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="reveal section-title section-title-center text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-2">
          ติดต่อ & ลิงก์
        </h2>
        <p className="reveal text-gray-500 text-sm md:text-base mb-12 max-w-lg mx-auto">
          ชอบคุยเรื่องเทค โปรเจกต์ หรือโอกาสร่วมงาน — ตามหาผมได้จากช่องทางด้านล่าง
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 perspective-wrap">
          {LINKS.map((item) => {
            const isExternal = item.href.startsWith("http");
            const content = (
              <div className="card-3d depth-layer depth-layer-hover h-full rounded-[var(--card-radius)] p-6 md:p-8 bg-[#0a0a0c] border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                <span className="text-2xl mb-3 inline-block group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">
                  {item.label}
                </h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            );
            return isExternal ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal block group"
              >
                {content}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="reveal block group">
                {content}
              </Link>
            );
          })}
        </div>

        <div className="reveal mt-14 w-full max-w-4xl mx-auto space-y-8">
          <p className="text-gray-500 text-sm text-center">
            จาก <a href="https://donate-naygolf.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Stream Donation</a>
          </p>

          <div>
            <h3 className="text-lg font-bold text-white mb-3 text-center">
              Goal — เป้าหมายการสนับสนุน
            </h3>
            <div className="rounded-[var(--card-radius)] overflow-hidden border border-white/10 bg-[#0a0a0c] depth-layer">
              <iframe
                src="https://donate-naygolf.netlify.app/overlay/goal"
                title="Donation Goal"
                className="w-full h-[200px] border-0 block"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-3 text-center">
              Top Donors — ผู้อุปถัมภ์ล่าสุด
            </h3>
            <div className="rounded-[var(--card-radius)] overflow-hidden border border-white/10 bg-[#0a0a0c] depth-layer">
              <iframe
                src="https://donate-naygolf.netlify.app/overlay/leaderboard"
                title="Top Donors Leaderboard"
                className="w-full h-[380px] border-0 block"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <p className="reveal mt-10 text-gray-500 text-sm">
          มีไอเดียหรืออยากร่วมงาน? เปิด issue หรือติดต่อผ่าน GitHub ได้เลย
        </p>
      </div>
    </section>
  );
}
