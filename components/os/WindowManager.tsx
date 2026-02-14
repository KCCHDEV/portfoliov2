"use client";

import React, { useState } from "react";
import { Window } from "./Window";
import { User, Folder } from "lucide-react";

interface WindowManagerProps {
    activeWindowIds: string[];
    onCloseWindow: (id: string) => void;
}

export default function WindowManager({ activeWindowIds, onCloseWindow }: WindowManagerProps) {
    const [windowStates, setWindowStates] = useState<any[]>([
        {
            id: "about",
            title: "About Me.txt - Notepad",
            icon: <User className="text-blue-400" />,
            zIndex: 100,
            content: (
                <div className="text-white/90 font-mono space-y-4">
                    <h1 className="text-2xl font-bold border-b border-white/10 pb-2">KCCHDEV Profile</h1>
                    <p>สวัสดีครับ! ผมชื่อ กอล์ฟ (Golft) เป็น Full Stack Developer ที่หลงรักในการสร้างสรรค์ประสบการณ์บนเว็บไซต์ที่น่าตื่นเต้นและสวยงาม</p>
                    <p>ผมมีความเชี่ยวชาญในด้านการพัฒนา Web Application ด้วยเทคโนโลยีสมัยใหม่ และการสร้าง Interactive UI ที่สามารถดึงดูดผู้ใช้งานได้เป็นอย่างดี</p>
                    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-300">"Technology is best when it brings people together."</p>
                    </div>
                </div>
            )
        },
        {
            id: "projects",
            title: "Projects - File Explorer",
            icon: <Folder className="text-yellow-500" />,
            zIndex: 101,
            content: (
                <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex flex-col items-center gap-2 p-4 hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all cursor-pointer group">
                            <div className="w-16 h-16 bg-blue-500/10 rounded flex items-center justify-center group-hover:scale-105 transition-transform">
                                <Folder className="w-8 h-8 text-yellow-500" />
                            </div>
                            <span className="text-xs text-white/80">Project_{i}</span>
                        </div>
                    ))}
                </div>
            )
        }
    ]);

    const handleFocus = (id: string) => {
        const maxZ = Math.max(...windowStates.map(w => w.zIndex));
        setWindowStates(windowStates.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w));
    };

    return (
        <>
            {windowStates.map(win => (
                <Window
                    key={win.id}
                    {...win}
                    isOpen={activeWindowIds.includes(win.id)}
                    isMinimized={false}
                    onFocus={handleFocus}
                    onClose={onCloseWindow}
                    onMinimize={() => { }}
                >
                    {win.content}
                </Window>
            ))}
        </>
    );
}
