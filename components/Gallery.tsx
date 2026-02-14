"use client";

import React from "react";

const GALLERY_ITEMS = [
  {
    img: "/img/workstation.jpg",
    title: "My Workspace",
    desc: "มุมทำงานหลักที่ใช้เขียนโค้ด ออกแบบระบบ และทดสอบโปรเจกต์ — จอใหญ่ คีย์บอร์ดที่ถนัดมือ และแสงพอดี",
  },
  {
    img: "/img/job.jpg",
    title: "Professional Life",
    desc: "บรรยากาศตอนโฟกัสกับงาน — ความมุ่งมั่นในการเรียนรู้และส่งมอบผลงานที่มีคุณภาพ",
  },
  {
    img: "/img/Game.jpg",
    title: "Gaming Session",
    desc: "เวลาพักผ่อนกับเกมที่ชอบ เป็นทั้งการปล่อยสมองและได้ไอเดียจาก game design / UX",
  },
  {
    img: "/img/myfood.jpg",
    title: "Daily Treats",
    desc: "อาหารมื้อโปรดช่วยเติมพลังงานและอารมณ์ดี — ชอบลองของกินใหม่และร้านในย่าน",
  },
  {
    img: "/img/cleanNintendo.jpg",
    title: "Maintenance",
    desc: "ดูแลของใช้ให้อยู่กับเราไปนาน ๆ — ทำความสะอาดและเก็บของให้เป็นระเบียบ",
  },
  {
    img: "/img/LoveForYou.jpg",
    title: "Special Memories",
    desc: "ช่วงเวลาที่เก็บไว้ — ความทรงจำกับคนและสถานที่ที่สำคัญ",
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="section-3d relative py-[var(--section-padding)] bg-[#050507] border-t border-white/5 z-10 perspective-wrap"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-12 reveal">
          <h2 className="section-title section-title-center text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white tracking-tight mb-2">
            คลังภาพ
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto text-center">
            บางส่วนของชีวิตประจำวัน — ตั้งแต่มุมทำงาน งานอดิเรก ไปจนถึงความทรงจำพิเศษ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div key={index} className="reveal perspective-wrap group">
              <div className="gallery-item">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-72 md:h-80 object-cover rounded-[var(--card-radius)] transition duration-500 group-hover:scale-105"
                />
                <div className="gallery-overlay rounded-[var(--card-radius)]">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
