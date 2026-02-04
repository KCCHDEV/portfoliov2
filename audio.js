/**
 * Simple MP3 Player for Portfolio - Updated
 * Author: Antigravity
 */

class AudioPlayer {
    constructor(audioUrl, songTitle, iconUrl, volume = 0.2) {
        this.audioUrl = audioUrl;
        this.songTitle = songTitle;
        this.iconUrl = iconUrl;
        this.defaultVolume = volume;
        this.isPlaying = false;

        this.createAudioElement();
        this.createPlayerUI();
        this.initEvents();

        // Show notification on load
        this.showNotification();

        // Try to auto-play
        this.tryAutoPlay();
    }

    createAudioElement() {
        this.audio = new Audio(this.audioUrl);
        this.audio.loop = false;
        this.audio.volume = this.defaultVolume;
    }

    createPlayerUI() {
        const playerContainer = document.createElement('div');
        playerContainer.id = 'music-player-container';
        playerContainer.innerHTML = `
            <div id="music-notification" class="music-notification visible">
                <div class="music-details">
                    <p class="now-playing">กำลังเล่น</p>
                    <p class="song-title">${this.songTitle}</p>
                </div>
                <button id="close-notification" class="close-btn">&times;</button>
            </div>
            <button id="music-toggle-btn" class="music-player-btn">
                <img src="${this.iconUrl}" alt="Music" class="music-icon-img">
                <div class="music-waves">
                    <span></span><span></span><span></span>
                </div>
                <div id="play-pause-overlay" class="overlay-icon">
                    <svg id="music-icon-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <svg id="music-icon-pause" class="hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                </div>
            </button>
        `;
        document.body.appendChild(playerContainer);

        this.toggleBtn = document.getElementById('music-toggle-btn');
        this.playIcon = document.getElementById('music-icon-play');
        this.pauseIcon = document.getElementById('music-icon-pause');
        this.notification = document.getElementById('music-notification');
        this.closeNotifyBtn = document.getElementById('close-notification');
    }

    initEvents() {
        this.toggleBtn.addEventListener('click', () => this.togglePlayback());
        this.closeNotifyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hideNotification();
        });

        this.audio.onplay = () => this.updateUI(true);
        this.audio.onpause = () => this.updateUI(false);

        // Global trigger for first interaction
        const startAudio = () => {
            if (this.audio.paused) {
                this.audio.play().then(() => {
                    this.removeInteractionListeners(startAudio);
                    setTimeout(() => this.hideNotification(), 5000);
                }).catch(() => { });
            }
        };

        this.addInteractionListeners(startAudio);
    }

    addInteractionListeners(handler) {
        ['click', 'touchstart', 'keydown', 'mousedown'].forEach(event => {
            document.addEventListener(event, handler, { once: true });
        });
    }

    removeInteractionListeners(handler) {
        ['click', 'touchstart', 'keydown', 'mousedown'].forEach(event => {
            document.removeEventListener(event, handler);
        });
    }

    togglePlayback() {
        if (this.audio.paused) {
            this.audio.play().catch(err => console.log("Playback blocked:", err));
        } else {
            this.audio.pause();
        }
    }

    updateUI(playing) {
        this.isPlaying = playing;
        if (playing) {
            this.playIcon.classList.add('hidden');
            this.pauseIcon.classList.remove('hidden');
            this.toggleBtn.classList.add('playing');
        } else {
            this.playIcon.classList.remove('hidden');
            this.pauseIcon.classList.add('hidden');
            this.toggleBtn.classList.remove('playing');
        }
    }

    showNotification() {
        this.notification.classList.add('visible');
    }

    hideNotification() {
        this.notification.classList.remove('visible');
    }

    tryAutoPlay() {
        this.audio.play().then(() => {
            setTimeout(() => this.hideNotification(), 5000);
        }).catch(() => {
            console.log("Auto-play blocked, waiting for gesture.");
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const isSubPage = window.location.pathname.includes('/pages/');
    const mp3Name = 'PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear) [Official MV] (mp3cut.net).mp3';
    const relativePath = isSubPage ? '../mp3/' : 'mp3/';
    const audioUrl = relativePath + encodeURI(mp3Name);
    const iconPath = isSubPage ? '../img/music_icon.jpg' : 'img/music_icon.jpg';

    new AudioPlayer(
        audioUrl,
        'PURPEECH - กลัวว่าฉันจะไม่เสียใจ (Fear)',
        iconPath
    );
});
