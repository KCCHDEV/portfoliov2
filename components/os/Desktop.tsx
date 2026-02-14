"use client";

import React from "react";
import { User, Folder, Code, Image, Github, Facebook } from "lucide-react";

interface DesktopItemProps {
    id: string;
    icon: React.ReactNode;
    label: string;
    onOpen: (id: string) => void;
}

function DesktopItem({ id, icon, label, onOpen }: DesktopItemProps) {
    return (
        <div
            onDoubleClick={() => onOpen(id)}
            className="flex flex-col items-center gap-1 p-2 w-24 rounded-sm hover:bg-white/10 border border-transparent hover:border-white/5 cursor-default group transition-all"
        >
            <div className="w-12 h-12 flex items-center justify-center rounded-md filter drop-shadow-lg group-hover:brightness-110 transition-all">
                {icon}
            </div>
            <span className="text-xs text-center text-white drop-shadow-md font-medium px-1 leading-tight break-words">
                {label}
            </span>
        </div>
    );
}

interface DesktopProps {
    onOpenItem: (id: string) => void;
}

export default function Desktop({ onOpenItem }: DesktopProps) {
    return (
        <div className="absolute inset-0 p-4 pt-8 z-10 flex flex-col flex-wrap content-start items-start gap-4 h-[calc(100vh-48px)]">
            <DesktopItem
                id="about"
                icon={<User className="w-10 h-10 text-blue-400" />}
                label="About Me.txt"
                onOpen={onOpenItem}
            />
            <DesktopItem
                id="projects"
                icon={<Folder className="w-10 h-10 text-yellow-500" />}
                label="Projects"
                onOpen={onOpenItem}
            />
            <DesktopItem
                id="skills"
                icon={<Code className="w-10 h-10 text-purple-400" />}
                label="Skills.json"
                onOpen={onOpenItem}
            />
            <DesktopItem
                id="gallery"
                icon={<Image className="w-10 h-10 text-green-400" />}
                label="Gallery"
                onOpen={onOpenItem}
            />

            <div className="mt-auto space-y-4">
                <DesktopItem
                    id="github"
                    icon={<Github className="w-8 h-8 text-white/80" />}
                    label="GitHub"
                    onOpen={() => window.open("https://github.com", "_blank")}
                />
            </div>
        </div>
    );
}
