"use client";

import React, { useEffect, useState } from "react";

export default function StatusSection() {
  const [timer, setTimer] = useState("กำลังคำนวณเวลา...");

  useEffect(() => {
    const startDate = new Date("2025-11-04T00:00:00");

    const updateTimer = () => {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - startDate.getTime());
      const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);
      setTimer(`${days} วัน ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`);
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="partner"
      className="section-3d relative py-[var(--section-padding)] bg-[#050507] border-t border-white/5 z-10"
    >
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="reveal text-xs font-bold text-blue-400 tracking-widest uppercase">
          Personal Status
        </span>
        <p className="reveal text-gray-500 text-sm mt-2 max-w-md mx-auto">
          นับเวลาตั้งแต่ประกาศตัวโสดอย่างเป็นทางการ
        </p>

        <div className="reveal perspective-wrap mt-10 flex justify-center">
          <div className="card-3d depth-layer depth-layer-hover relative w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-[var(--card-radius)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 hover:border-blue-500/25 transition-all duration-300 overflow-hidden group">
            <div className="absolute inset-0 rounded-[var(--card-radius)] bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/img/partner_temple.jpg"
                alt="Status"
                className="w-full h-full object-cover rounded-full border-2 border-white/10 depth-layer"
              />
              <span className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg ring-2 ring-[#0a0a0c]">
                💙
              </span>
            </div>

            <div className="relative text-center md:text-left flex-1">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                ครองโสดในโหมดสันโดษ
              </h3>
              <p className="text-gray-400 leading-relaxed italic mb-3 text-sm md:text-base">
                &quot;ไม่มีคนข้างกายมานานเท่าไหร่แล้วนะ...&quot;
              </p>
              <div className="font-mono text-sm md:text-base mb-3 tabular-nums bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
                {timer}
              </div>
              <p className="text-gray-400 text-sm mb-4">
                โสดนะครับ พร้อมหาคนมาคู่กายแล้ว 🚀
              </p>
              <span className="inline-block text-xs bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-colors">
                Since 04/11/2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
