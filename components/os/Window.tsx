"use client";

import React, { useState } from "react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
    id: string;
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    isMinimized: boolean;
    zIndex: number;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onFocus: (id: string) => void;
}

export function Window({
    id,
    title,
    icon,
    children,
    isOpen,
    isMinimized,
    zIndex,
    onClose,
    onMinimize,
    onFocus
}: WindowProps) {
    const [position, setPosition] = useState({ x: 100, y: 50 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        // Randomize initial position only on client to avoid hydration mismatch
        setPosition({
            x: 100 + Math.random() * 50,
            y: 50 + Math.random() * 50
        });
    }, []);

    if (!isOpen || isMinimized) return null;

    const handleMouseDown = (e: React.MouseEvent) => {
        onFocus(id);
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            className="absolute rounded-lg overflow-hidden flex flex-col bg-[#1c1c1c]/90 backdrop-blur-xl border border-white/20 shadow-2xl"
            style={{
                left: position.x,
                top: position.y,
                width: 700,
                height: 500,
                zIndex: zIndex
            }}
            onMouseDown={() => onFocus(id)}
        >
            {/* Title Bar */}
            <div
                onMouseDown={handleMouseDown}
                className="h-9 flex items-center justify-between px-3 bg-white/5 active:bg-white/10 cursor-default"
            >
                <div className="flex items-center gap-2">
                    {icon && <div className="w-4 h-4">{icon}</div>}
                    <span className="text-xs font-medium text-white/90">{title}</span>
                </div>
                <div className="flex">
                    <button
                        onClick={() => onMinimize(id)}
                        className="p-2 hover:bg-white/10 transition-colors"
                    >
                        <Minus className="w-4 h-4 text-white/80" />
                    </button>
                    <button className="p-2 hover:bg-white/10 transition-colors">
                        <Square className="w-3.5 h-3.5 text-white/80" />
                    </button>
                    <button
                        onClick={() => onClose(id)}
                        className="p-2 hover:bg-red-500 transition-colors"
                    >
                        <X className="w-4 h-4 text-white/80" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto bg-[#0a0a0a]/50 p-6 scrollbar-thin scrollbar-thumb-white/10">
                {children}
            </div>
        </div>
    );
}


