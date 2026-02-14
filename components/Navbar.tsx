"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePortfolioFeatures } from "@/hooks/usePortfolioFeatures";

const NAV_LINKS = [
  { href: "#intro", label: "หน้าแรก" },
  { href: "#expertise", label: "เกี่ยวกับผม" },
  { href: "#showcase", label: "ผลงาน" },
  { href: "#connect", label: "ติดต่อ" },
  { href: "https://donate-naygolf.netlify.app/", label: "สนับสนุน", external: true },
  { href: "/setup", label: "อุปกรณ์", external: true },
  { href: "/blog", label: "บล็อก", external: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { weather } = usePortfolioFeatures();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#050507]/92 backdrop-blur-xl border-white/10 shadow-lg shadow-black/25"
          : "bg-transparent backdrop-blur-md border-white/5"
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#intro"
          className="flex items-center gap-2.5 text-white font-semibold tracking-tight transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-500/40" />
          </span>
          <span>KCCH</span>
          <span className="text-gray-500 font-medium">DEV</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {weather && (
            <span className="weather-badge">
              {weather.condition}{" "}
              <span className="font-semibold text-white">{weather.temp}°C</span>
              <span className="text-gray-400"> · {weather.city}</span>
            </span>
          )}
          <div className="flex items-center gap-8 text-sm font-medium text-gray-400">
            {NAV_LINKS.map((item) => {
              const isOutbound = item.href.startsWith("http");
              if (isOutbound) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-hover-underline hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                );
              }
              if (item.external) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="link-hover-underline hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="link-hover-underline hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>

        <a
          href="https://github.com/KCCHDEV"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
          GitHub
        </a>
      </div>
    </nav>
  );
}
