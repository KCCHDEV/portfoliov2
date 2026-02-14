"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { AuraBackground, DarkOverlay } from "@/components/Background";
import AudioPlayer from "@/components/AudioPlayer";

export default function SetupPage() {
    return (
        <div className="antialiased bg-[#050507] text-white min-h-screen">
            <AuraBackground />
            <DarkOverlay />
            <Navbar />

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <header className="text-center mb-20">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">Workspace Setup</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            เปิดกรุอุปกรณ์ทำงานที่ผมใช้สร้างสรรค์ผลงานในทุกๆ วัน ทั้งฝั่ง Hardware และ Peripherals
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Laptop / PC Engine */}
                        <div className="setup-card bg-white/5 border border-white/5 rounded-[2rem] p-8 hover:bg-white/10 hover:border-white/20 transition duration-500 transform hover:-translate-y-2">
                            <div className="text-4xl mb-6">💻</div>
                            <h3 className="text-2xl font-bold mb-4">Acer Aspire 7</h3>
                            <ul className="text-gray-400 space-y-2">
                                <li>
                                    <strong className="text-white">CPU:</strong> AMD Ryzen 5 5500U
                                </li>
                                <li>
                                    <strong className="text-white">GPU:</strong> NVIDIA GTX 1650 4GB
                                </li>
                                <li>
                                    <strong className="text-white">RAM:</strong> 16GB DDR4 2666MHz
                                </li>
                                <li>
                                    <strong className="text-white">Storage:</strong> 512GB NVMe SSD
                                </li>
                            </ul>
                        </div>

                        {/* Peripherals & Mobile */}
                        <div className="setup-card bg-white/5 border border-white/5 rounded-[2rem] p-8 hover:bg-white/10 hover:border-white/20 transition duration-500 transform hover:-translate-y-2">
                            <div className="text-4xl mb-6">📱</div>
                            <h3 className="text-2xl font-bold mb-4">Mobile & Phone</h3>
                            <ul className="text-gray-400 space-y-2">
                                <li>
                                    <strong className="text-white">Device:</strong> Vivo V60
                                </li>
                                <li>
                                    <strong className="text-white">Display:</strong> 6.77" AMOLED 120Hz
                                </li>
                                <li>
                                    <strong className="text-white">CPU:</strong> Snapdragon 7 Gen 4
                                </li>
                                <li>
                                    <strong className="text-white">Battery:</strong> 6500mAh | 90W
                                </li>
                                <li>
                                    <strong className="text-white">Camera:</strong> 50MP ZEISS System
                                </li>
                            </ul>
                        </div>

                        {/* Home Server */}
                        <div className="setup-card bg-white/5 border border-white/5 rounded-[2rem] p-8 hover:bg-white/10 hover:border-white/20 transition duration-500 transform hover:-translate-y-2">
                            <div className="text-4xl mb-6">🖥️</div>
                            <h3 className="text-2xl font-bold mb-4">Custom Server</h3>
                            <ul className="text-gray-400 space-y-2">
                                <li>
                                    <strong className="text-white">CPU:</strong> AMD Ryzen 9 9950X3D
                                </li>
                                <li>
                                    <strong className="text-white">RAM:</strong> 128GB DDR5
                                </li>
                                <li>
                                    <strong className="text-white">GPU:</strong> NVIDIA Quadro P1000
                                </li>
                                <li>
                                    <strong className="text-white">Storage:</strong> 2TB NVMe Gen5
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Gallery Sub-section */}
                    <section className="mt-32">
                        <h2 className="text-3xl font-bold mb-12 text-center text-white">มุมทำงาน</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="gallery-item group relative overflow-hidden rounded-2xl aspect-video">
                                <img
                                    src="/img/workstation.jpg"
                                    className="w-full h-80 object-cover rounded-2xl transition duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="gallery-item group relative overflow-hidden rounded-2xl aspect-video">
                                <img
                                    src="/img/job_cleanNB.jpg"
                                    className="w-full h-80 object-cover rounded-2xl transition duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="py-12 text-center text-gray-500 text-sm relative z-10 border-t border-white/5">
                &copy; 2026 KCCHDEV - Workspace Overview
            </footer>

            <AudioPlayer
                audioUrl="/mp3/PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear) [Official MV] (mp3cut.net).mp3"
                songTitle="PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear)"
                iconUrl="/img/music_icon.jpg"
            />
        </div>
    );
}
