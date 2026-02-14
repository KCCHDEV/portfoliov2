"use client";

import React, { useState } from "react";
import Taskbar from "@/components/os/Taskbar";
import WindowManager from "@/components/os/WindowManager";
import Desktop from "@/components/os/Desktop";
import StartMenu from "@/components/os/StartMenu";

export default function Win11Page() {
    const [startMenuOpen, setStartMenuOpen] = useState(false);
    const [activeWindows, setActiveWindows] = useState<string[]>(["about"]);

    const handleOpenWindow = (id: string) => {
        if (!activeWindows.includes(id)) {
            setActiveWindows([...activeWindows, id]);
        }
        setStartMenuOpen(false);
    };

    const handleCloseWindow = (id: string) => {
        setActiveWindows(activeWindows.filter(w => w !== id));
    };

    return (
        <div className="h-screen w-screen overflow-hidden relative select-none font-sans text-white text-[14px]">
            {/* Desktop Wallpaper */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-1000"
                style={{
                    backgroundImage: "url('/img/win11-wallpaper.jpg')",
                    background: "linear-gradient(135deg, #1d4ed8 0%, #7e22ce 50%, #1e1b4b 100%)"
                }}
                onClick={() => setStartMenuOpen(false)}
            >
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Desktop Area */}
            <Desktop onOpenItem={handleOpenWindow} />

            {/* Application Windows */}
            <WindowManager
                activeWindowIds={activeWindows}
                onCloseWindow={handleCloseWindow}
            />

            {/* Start Menu */}
            <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />

            {/* Taskbar */}
            <Taskbar onStartClick={() => setStartMenuOpen(!startMenuOpen)} />

            {/* Custom Cursor / Effects could go here */}
            <style jsx global>{`
                body {
                    overflow: hidden;
                }
                * {
                    user-select: none;
                }
            `}</style>
        </div>
    );
}
