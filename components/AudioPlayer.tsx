"use client";

import React, { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  audioUrl: string;
  songTitle: string;
  iconUrl: string;
}

export default function AudioPlayer({ audioUrl, songTitle, iconUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.volume = 0.2;
    audioRef.current.loop = false;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audioRef.current.addEventListener("play", handlePlay);
    audioRef.current.addEventListener("pause", handlePause);

    const startAudio = () => {
      if (audioRef.current?.paused) {
        audioRef.current.play().then(() => {
          setTimeout(() => setShowNotification(false), 5000);
        }).catch(() => {});
      }
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
    };

    window.addEventListener("click", startAudio);
    window.addEventListener("keydown", startAudio);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("play", handlePlay);
        audioRef.current.removeEventListener("pause", handlePause);
      }
      window.removeEventListener("click", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, [audioUrl]);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <div id="music-player-container">
      <div id="music-notification" className={`music-notification ${showNotification ? "visible" : ""}`}>
        <div className="music-details">
          <p className="now-playing">กำลังเล่น</p>
          <p className="song-title">{songTitle}</p>
        </div>
        <button type="button" className="close-btn" onClick={() => setShowNotification(false)} aria-label="ปิด">
          &times;
        </button>
      </div>
      <button
        type="button"
        className={`music-player-btn ${isPlaying ? "playing" : ""}`}
        onClick={togglePlayback}
        aria-label={isPlaying ? "หยุด" : "เล่น"}
      >
        <img src={iconUrl} alt="Music" className="music-icon-img" />
        <div className="music-waves">
          <span />
          <span />
          <span />
        </div>
        <div id="play-pause-overlay" className="overlay-icon">
          {!isPlaying ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}
