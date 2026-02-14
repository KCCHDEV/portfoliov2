"use client";

import React, { useState, useEffect } from "react";
import {
    LayoutGrid,
    Search,
    Monitor,
    Folder,
    Chrome,
    Wifi,
    Volume2,
    Battery,
    ChevronUp
} from "lucide-react";

interface TaskbarProps {
    onStartClick: () => void;
}

export default function Taskbar({ onStartClick }: TaskbarProps) {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' });
    };

    if (!mounted) return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-2xl border-t border-white/10 flex items-center px-3 z-[2000]">
            <div className="flex-1 flex justify-center items-center gap-1">
                {/* Placeholder to keep layout stable during hydration */}
                <div className="w-9 h-9" />
            </div>
        </div>
    );

    return (
        <div className="fixed bottom-0 left-0 right-0 h-12 bg-black/20 backdrop-blur-2xl border-t border-white/10 flex items-center px-3 z-[2000]">
            {/* Center Icons */}
            <div className="flex-1 flex justify-center items-center gap-1">
                <button
                    onClick={onStartClick}
                    className="p-2 hover:bg-white/10 rounded-md transition-all group"
                >
                    <LayoutGrid className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                </button>
                <div className="p-2 hover:bg-white/10 rounded-md transition-all cursor-pointer">
                    <Search className="w-5 h-5 text-white/80" />
                </div>
                <div className="p-2 hover:bg-white/10 rounded-md transition-all cursor-pointer">
                    <Monitor className="w-5 h-5 text-white/80" />
                </div>
                <div className="w-[1px] h-6 bg-white/10 mx-1" />
                <div className="p-2 hover:bg-white/10 rounded-md transition-all cursor-pointer">
                    <Folder className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="p-2 hover:bg-white/10 rounded-md transition-all cursor-pointer">
                    <Chrome className="w-5 h-5 text-white/80" />
                </div>
            </div>

            {/* System Tray */}
            <div className="flex items-center gap-2 text-xs font-medium pr-1">
                <div className="p-1 px-2 hover:bg-white/10 rounded-md flex items-center gap-1 cursor-pointer transition-all">
                    <ChevronUp className="w-3 h-3 text-white/60" />
                </div>
                <div className="p-1 px-2 hover:bg-white/10 rounded-md flex items-center gap-2 cursor-pointer transition-all">
                    <Wifi className="w-3.5 h-3.5" />
                    <Volume2 className="w-3.5 h-3.5" />
                    <Battery className="w-3.5 h-3.5" />
                </div>
                <div className="p-1 px-2 hover:bg-white/10 rounded-md flex flex-col items-end cursor-pointer transition-all leading-tight">
                    <span>{formatTime(currentTime)}</span>
                    <span className="text-[10px] text-white/60">{formatDate(currentTime)}</span>
                </div>
                <div className="w-[2px] h-10 hover:bg-white/20 transition-all border-l border-white/5 ml-1" />
            </div>
        </div>
    );
}
