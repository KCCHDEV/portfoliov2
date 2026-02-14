"use client";

import React from "react";
import {
    LayoutGrid,
    Settings,
    User,
    Folder,
    Mail,
    Image,
    Terminal,
    Github,
    LogOut,
    Power
} from "lucide-react";

interface StartMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

function PinnedApp({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-white/10 cursor-default transition-all group"
        >
            <div className="group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <span className="text-[10px] text-white/90 font-medium">{label}</span>
        </div>
    );
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-[520px] h-[600px] bg-black/60 backdrop-blur-3xl border border-white/20 rounded-xl shadow-2xl z-[3000] overflow-hidden flex flex-col p-8 gap-6 animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* Search Bar */}
            <div className="bg-white/5 border border-white/10 rounded-full flex items-center px-4 py-1.5 gap-3">
                <LayoutGrid className="w-4 h-4 text-white/40" />
                <input
                    type="text"
                    placeholder="Type here to search"
                    className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full"
                />
            </div>

            {/* Pinned Section */}
            <div>
                <div className="flex justify-between items-center mb-4 px-2">
                    <span className="text-xs font-semibold">Pinned</span>
                    <button className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1 rounded-sm border border-white/10 transition-colors">All apps &gt;</button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                    <PinnedApp icon={<User className="text-blue-400 w-7 h-7" />} label="About Me" />
                    <PinnedApp icon={<Folder className="text-yellow-500 w-7 h-7" />} label="Explorer" />
                    <PinnedApp icon={<Settings className="text-gray-400 w-7 h-7" />} label="Settings" />
                    <PinnedApp icon={<Mail className="text-red-400 w-7 h-7" />} label="Contact" />
                    <PinnedApp icon={<Terminal className="text-green-500 w-7 h-7" />} label="Terminal" />
                    <PinnedApp icon={<Github className="text-white w-7 h-7" />} label="GitHub" />
                    <PinnedApp icon={<Image className="text-pink-400 w-7 h-7" />} label="Gallery" />
                </div>
            </div>

            {/* Recommended Section */}
            <div className="mt-4 flex-1">
                <div className="flex justify-between items-center mb-4 px-2">
                    <span className="text-xs font-semibold">Recommended</span>
                    <button className="text-[10px] bg-white/5 hover:bg-white/10 px-3 py-1 rounded-sm border border-white/10 transition-colors">More &gt;</button>
                </div>
                <div className="space-y-4 px-2">
                    <div className="flex items-center gap-4 hover:bg-white/5 p-2 rounded-lg cursor-default transition-all group">
                        <div className="p-2 bg-yellow-500/20 border border-yellow-500/10 rounded-md group-hover:bg-yellow-500/30 transition-all">
                            <Folder className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium">Project_v2_Final</span>
                            <span className="text-[10px] text-white/40">Recently modified</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-auto -mx-8 bg-black/20 border-t border-white/5 px-10 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3 hover:bg-white/5 p-1 px-3 rounded-md transition-all cursor-default group">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">K</div>
                    <span className="text-xs font-medium">KCCHDEV</span>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-md transition-all group">
                    <Power className="w-4 h-4 text-white group-hover:text-red-400 transition-colors" />
                </button>
            </div>
        </div>
    );
}
