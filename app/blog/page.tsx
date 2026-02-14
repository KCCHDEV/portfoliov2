"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import { AuraBackground, DarkOverlay } from "@/components/Background";
import AudioPlayer from "@/components/AudioPlayer";

const blogPosts = [
    {
        date: "Early 2017",
        title: "Hello World! ก้าวแรกกับ HTML",
        content:
            "เริ่มต้นจากการใช้ Notepad เขียนโครงสร้างพื้นฐาน <html> <head> <body> ยังจำความรู้สึกตอนเปิดไฟล์ .html ใน Browser แล้วเห็นตัวอักษร \"สวัสดีครับ\" ได้ดี มันคือจุดเริ่มต้นของการสร้างโลกใบใหม่",
        tags: ["Web Basics", "HTML"],
        colors: ["bg-blue-500/10 text-blue-400 border-blue-500/20", "bg-orange-500/10 text-orange-400 border-orange-500/20"],
    },
    {
        date: "Late 2017",
        title: "ตกแต่งหน้าเว็บด้วย CSS & Layout",
        content:
            "เมื่อโครงสร้างเสร็จ ก็ถึงเวลาของความสวยงาม เริ่มลองเล่นกับ Color, Font และ Margin/Padding เรียนรู้เรื่อง Box Model และการจัด Layout แบบ Float (ก่อนที่จะรู้จัก Flexbox)",
        tags: ["Design", "CSS"],
        colors: ["bg-blue-500/10 text-blue-400 border-blue-500/20", "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"],
    },
    {
        date: "Early 2018",
        title: "PHP & MySQL: เว็บไซต์ที่เก็บข้อมูลได้",
        content:
            "ขยับจากการเขียนเว็บ Static มาเป็น Dynamic เริ่มเรียนรู้ PHP เป็นภาษาแรกในการทำ Backend ลองเขียนระบบ Login และ Guestbook แบบดั้งเดิมโดยใช้ MySQL (mysqli_)",
        tags: ["Backend", "PHP/SQL"],
        colors: ["bg-purple-500/10 text-purple-400 border-purple-500/20", "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"],
    },
    {
        date: "Early 2019",
        title: "Python: ภาษาที่ทำให้ชีวิตง่ายขึ้น",
        content:
            "ได้ลองสัมผัส Python ครั้งแรก ทึ่งในความเรียบง่ายของ Syntax เริ่มเอามาเขียน Script เล็กๆ เพื่อจัดการไฟล์ในเครื่อง และลองเขียน Logic เกมทายตัวเลขง่ายๆ",
        tags: ["Automation", "Python"],
        colors: ["bg-green-500/10 text-green-400 border-green-500/20", "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"],
    },
    {
        date: "Late 2019",
        title: "JavaScript ES6+: ยกระดับ Web App",
        content:
            "กลับมาโฟกัสที่ JavaScript อย่างจริงจัง เรียนรู้เรื่อง Arrow Functions, Destructuring และการใช้ Fetch API เพื่อดึงข้อมูลจากโลกภายนอกผ่าน REST API",
        tags: ["Modern Web", "JavaScript"],
        colors: ["bg-yellow-500/10 text-yellow-400 border-yellow-500/20", "bg-blue-500/10 text-blue-400 border-blue-500/20"],
    },
    {
        date: "Early 2020",
        title: "Java & C++: พื้นฐาน Computer Science",
        content:
            "เริ่มศึกษาภาษาที่มีความซับซ้อนขึ้นอย่าง Java และ C++ เพื่อทำความเข้าใจเรื่อง OOP (Object-Oriented Programming) และ Memory Management อย่างลึกซึ้ง",
        tags: ["Core CS", "Java/C++"],
        colors: ["bg-red-500/10 text-red-400 border-red-500/20", "bg-orange-500/10 text-orange-400 border-orange-500/20"],
    },
    {
        date: "Early 2021",
        title: "Node.js: จุดพุ่งทะยานของ Discord Bot",
        content:
            "เริ่มโปรเจกต์ \"Makori\" - Discord Bot ตัวแรกที่เขียนด้วย Node.js และ Discord.js ได้เรียนรู้เรื่อง Event Loop, npm และการจัดการบอทขนาดใหญ่",
        tags: ["Real-time", "Node.js"],
        colors: ["bg-green-500/10 text-green-400 border-green-500/20", "bg-purple-500/10 text-purple-400 border-purple-500/20"],
    },
    {
        date: "Late 2021",
        title: "TypeScript: ความปลอดภัยในโลกของความสับสน",
        content:
            "เมื่อโปรเจกต์เริ่มใหญ่ JavaScript แบบเดิมเริ่มจัดการยาก เลยย้ายมาใช้ TypeScript เพื่อลด Runtime Errors และเพิ่มความมั่นใจในการ Refactor โค้ด",
        tags: ["Type Safety", "TypeScript"],
        colors: ["bg-blue-500/10 text-blue-400 border-blue-500/20", "bg-blue-600/10 text-blue-300 border-blue-600/20"],
    },
    {
        date: "Early 2022",
        title: "React & Vite: ประสบการณ์ใหม่ของ UI",
        content:
            "เริ่มต้นก้าวกระโดดสู่ React ได้เรียนรู้เรื่อง Component-based architecture และการจัดการ State ด้วย Hooks (useState, useEffect) จนสร้างเว็บ SPA ตัวแรกสำเร็จ",
        tags: ["Frontend", "React"],
        colors: ["bg-cyan-500/10 text-cyan-400 border-cyan-500/20", "bg-blue-400/10 text-blue-300 border-blue-400/20"],
    },
    {
        date: "Late 2022",
        title: "Docker & Linux: โลกของ DevOps เบื้องต้น",
        content:
            "เริ่มเบื่อการรันโค้ดแค่เครื่องตัวเอง เลยหันมาศึกษา Docker เริ่มลอง Containerize แอป และเช่า VPS เพื่อรัน Linux สัมผัส Command Line อย่างเต็มรูปแบบ",
        tags: ["Infrastructure", "Docker/Linux"],
        colors: ["bg-gray-500/10 text-gray-400 border-gray-500/20", "bg-blue-500/10 text-blue-400 border-blue-500/20"],
    },
    {
        date: "Early 2023",
        title: "MongoDB & API Architecture",
        content:
            "ออกแบบระบบที่มีความซับซ้อนขึ้นด้วย NoSQL อย่าง MongoDB เรียนรู้เรื่องการทำ API Gateway และระบบ Authentication (JWT) เพื่อความปลอดภัยของข้อมูล",
        tags: ["Secured API", "MongoDB"],
        colors: ["bg-red-500/10 text-red-300 border-red-500/20", "bg-green-600/10 text-green-300 border-green-600/20"],
    },
    {
        date: "Late 2023",
        title: "Go (Golang): ความเร็วคือหัวใจ",
        content:
            "ได้ลองเขียน Go เพื่อทำ Microservices สัมผัสความแรงของ Concurrency ด้วย Goroutines และความเรียบง่ายของภาษานี้ที่ทำให้การทำ Backend สนุกขึ้นมาก",
        tags: ["Performance", "Go Lang"],
        colors: ["bg-cyan-400/10 text-cyan-300 border-cyan-400/20", "bg-blue-300/10 text-blue-200 border-blue-300/20"],
    },
    {
        date: "Early 2024",
        title: "Tailwind CSS & GSAP Animations",
        content:
            "เน้นเรื่อง User Experience มากขึ้น เปลี่ยนมาใช้ Tailwind CSS เพื่อความรวดเร็ว และใช้ GSAP ในการทำ Motion Design ให้หน้าเว็บดู \"มีชีวิต\"",
        tags: ["UI/UX", "Animation"],
        colors: ["bg-teal-500/10 text-teal-400 border-teal-500/20", "bg-pink-500/10 text-pink-400 border-pink-500/20"],
    },
    {
        date: "Late 2024",
        title: "Next.js 15: ยุคปฏิวัติของ Fullstack Framework",
        content:
            "อัปเกรดมาใช้ Next.js 15 เรียนรู้เรื่อง Server Actions และ Partial Prerendering เพื่อระบบที่มีประสิทธิภาพสูงสุดจนถึงปัจจุบัน",
        tags: ["Edge Runtime", "Next.js"],
        colors: ["bg-blue-500/10 text-blue-400 border-blue-500/20", "bg-white/10 text-white border-white/20"],
    },
    {
        date: "Early 2025",
        title: "RAG & Vector Databases",
        content:
            "เริ่มเข้าสู่โลกของ AI อย่างจริงจัง ศึกษาเรื่อง Retrieval-Augmented Generation (RAG) และการใช้ Vector Database อย่าง Pinecone เพื่อทำให้ AI ฉลาดขึ้นในด้านเฉพาะทาง",
        tags: ["Data Science", "AI/VectorDB"],
        colors: ["bg-indigo-500/10 text-indigo-400 border-indigo-500/20", "bg-purple-500/10 text-purple-400 border-purple-500/20"],
    },
    {
        date: "Present Day",
        title: "Agentic AI: ยุคที่ AI คือคู่คิดการทำงาน",
        content:
            "ก้าวสู่จุดปัจจุบันด้วย Agentic AI Architecture การออกแบบ AI ที่สามารถรับคำสั่งและดำเนินการให้สำเร็จได้ด้วยตัวเองอย่างมีประสิทธิภาพและรับผิดชอบ",
        tags: ["Future Architecture", "Agentic AI"],
        colors: [
            "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/20",
            "bg-gradient-to-r from-pink-500/20 to-indigo-500/20 text-pink-300 border-pink-500/20",
        ],
    },
];

export default function BlogPage() {
    return (
        <div className="antialiased bg-[#050507] text-white min-h-screen">
            <AuraBackground />
            <DarkOverlay />
            <Navbar />

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <header className="text-center mb-20">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text text-white">Learning Journal</h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            บันทึกการเรียนรู้ เส้นทางการพัฒนา และสิ่งใหม่ๆ ที่ได้พบเจอในโลกของเทคโนโลยีแบบเจาะลึกทุกภาษา
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {blogPosts.map((post, idx) => (
                            <article
                                key={idx}
                                className="blog-card bg-white/5 border border-white/5 rounded-[2rem] p-8 hover:bg-white/10 hover:border-blue-500/30 transition duration-500 transform hover:-translate-y-2 flex flex-col h-full"
                            >
                                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 block">
                                    {post.date}
                                </span>
                                <h2 className="text-2xl font-bold mb-4 text-white">{post.title}</h2>
                                <p className="text-gray-400 leading-relaxed mb-6 flex-1">{post.content}</p>
                                <div className="flex items-center gap-2">
                                    {post.tags.map((tag, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className={`px-3 py-1 text-xs rounded-full border ${post.colors[tIdx]}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="py-12 text-center text-gray-500 text-sm relative z-10 border-t border-white/5">
                &copy; 2026 KCCHDEV - Learning Journal
            </footer>

            <AudioPlayer
                audioUrl="/mp3/PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear) [Official MV] (mp3cut.net).mp3"
                songTitle="PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear)"
                iconUrl="/img/music_icon.jpg"
            />
        </div>
    );
}
