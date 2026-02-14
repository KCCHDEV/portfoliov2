"use client";

import React from "react";

const GAMES = [
  {
    img: "/img/game-ico/MonsterHunterWilds.png",
    name: "MH Wilds",
    desc: "รอเล่นมาก — ซีรีส์ที่ชอบ",
  },
  {
    img: "/img/game-ico/MonsterHunterWorldIB.png",
    name: "MH World IB",
    desc: "Iceborne · ลงเวลาล่าสัตว์เยอะมาก",
  },
  {
    img: "/img/game-ico/helldrivers1.webp",
    name: "Helldivers 1",
    desc: "For Super Earth · ชอบเล่นกับเพื่อน",
  },
  {
    img: "/img/game-ico/helldrivers2.webp",
    name: "Helldivers 2",
    desc: "Liberty Spreads · ลงสนามต่อเนื่อง",
  },
];

export default function Games() {
  return (
    <section
      id="games"
      className="section-3d relative py-[var(--section-padding)] bg-[#0a0a0c] border-t border-white/5 z-10"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-12 reveal text-center">
          <h2 className="section-title section-title-center text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight inline-block">
            เกมที่เล่น
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            งานอดิเรกยามว่าง — ชอบเกมแนว co-op และ action
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 md:gap-6 perspective-wrap">
          {GAMES.map((game, index) => (
            <div key={index} className="reveal group">
              <div className="card-3d depth-layer depth-layer-hover w-36 md:w-40 bg-white/[0.04] border border-white/10 rounded-[var(--card-radius)] p-5 md:p-6 text-center transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.2)]">
                <div className="h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={game.img}
                    alt={game.name}
                    className="h-full w-auto object-contain drop-shadow-lg"
                  />
                </div>
                <h3 className="text-white font-semibold text-sm md:text-base">
                  {game.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{game.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
