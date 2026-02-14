"use client";

import React from "react";

export function VideoBackground() {
    return (
        <div className="video-background">
            <iframe
                src="https://www.youtube.com/embed/B6ZrAaGpsNI?autoplay=1&mute=1&loop=1&playlist=B6ZrAaGpsNI&controls=0&showinfo=0&rel=0&iv_load_policy=3&fs=0&disablekb=1"
                title="Background video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}

export function AuraBackground() {
    return (
        <div className="aura-container">
            <div className="aura-blob"></div>
            <div className="aura-blob delay"></div>
            <div className="aura-blob delay-2"></div>
        </div>
    );
}

export function DarkOverlay() {
    return <div className="bg-overlay"></div>;
}

export function UnsplashBackground({ url }: { url: string }) {
    if (!url) return null;
    return (
        <div
            id="unsplash-overlay"
            style={{ backgroundImage: `url('${url}')` }}
            aria-hidden
        />
    );
}
