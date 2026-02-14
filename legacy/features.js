/**
 * Portfolio Features - Integrated APIs
 * Author: Antigravity
 */

class PortfolioFeatures {
    constructor() {
        this.init();
    }

    async init() {
        // Run all integrations
        this.initUnsplashBg();
        this.initWeather();
        this.initQuotes();
        this.initPokemon();
    }

    // 1. Unsplash Background Texture
    async initUnsplashBg() {
        const bgContainer = document.createElement('div');
        bgContainer.id = 'unsplash-overlay';
        // Append after bg-overlay to be above it but below content
        const bgOverlay = document.querySelector('.bg-overlay');
        if (bgOverlay) {
            bgOverlay.after(bgContainer);
        } else {
            document.body.prepend(bgContainer);
        }

        // Random nature/abstract texture
        const keywords = ['abstract', 'dark', 'nature', 'mesh', 'gradient'];
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const imageUrl = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920`; // Default fallback

        // Dynamic fetch - using source.unsplash is deprecated, using direct random URL
        // We'll use a curated high-quality abstract image with unique ID to simulate randomness on refresh
        const randomId = Math.floor(Math.random() * 1000);
        bgContainer.style.backgroundImage = `url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=20&w=1920&sig=${randomId}')`;
    }

    // 2. Weather via Open-Meteo (No key required)
    initWeather() {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                // Fetch Weather
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
                const weatherData = await weatherRes.json();

                // Fetch City Name (Reverse Geocoding - BigDataCloud is free/no key for basic)
                let cityName = 'Your Location';
                try {
                    const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=th`);
                    const geoData = await geoRes.json();
                    cityName = geoData.city || geoData.locality || geoData.principalSubdivision || 'Your Location';
                } catch (e) {
                    console.log("Geocoding failed.");
                }

                this.updateWeatherUI(weatherData.current_weather, cityName);
            } catch (err) {
                console.error("Weather fetch failed:", err);
            }
        }, (err) => console.log("Location access denied."));
    }

    updateWeatherUI(weather, cityName) {
        const temp = Math.round(weather.temperature);
        const code = weather.weathercode;
        const condition = code <= 3 ? '☀️' : code <= 67 ? '☁️' : '🌧️';

        // Update Navbar Widget
        const weatherContainer = document.getElementById('weather-widget');
        if (weatherContainer) {
            weatherContainer.innerHTML = `
                <div class="weather-badge">
                    <span class="weather-location" style="font-weight: 600; font-size: 0.75rem; color: #aaa; margin-right: 4px;">${cityName}</span>
                    <span class="weather-icon">${condition}</span>
                    <span class="weather-temp">${temp}°C</span>
                </div>
            `;
        }

        // Update Bento Grid Card
        const bentoWeather = document.getElementById('bento-weather');
        if (bentoWeather) {
            bentoWeather.innerHTML = `
                <span class="text-4xl mb-2">${condition}</span>
                <span class="text-xl font-bold text-white">${temp}°C</span>
                <span class="text-[10px] uppercase tracking-widest text-blue-500 font-bold mt-1">${cityName}</span>
                <span class="text-[10px] text-gray-500">THAILAND</span>
            `;
        }
    }

    // 3. Quotes (Random advice)
    async initQuotes() {
        const quoteText = document.getElementById('daily-quote');
        if (!quoteText) return;

        try {
            const res = await fetch('https://api.adviceslip.com/advice');
            const data = await res.json();
            quoteText.innerText = `"${data.slip.advice}"`;
        } catch (err) {
            quoteText.innerText = `"The best way to predict the future is to create it."`; // Fallback
        }
    }

    // 4. PokéAPI Sidekick
    async initPokemon() {
        const pokeContainer = document.getElementById('poke-assistant');
        if (!pokeContainer) return;

        const randomId = Math.floor(Math.random() * 151) + 1;
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const data = await res.json();

            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default || data.sprites.front_default;

            pokeContainer.innerHTML = `
                <div class="poke-inner">
                    <div class="poke-bubble">สวัสดี! ผมคือ ${name} ยินดีที่ได้รู้จักครับ!</div>
                    <img src="${sprite}" alt="${name}" class="poke-sprite">
                </div>
            `;

            // Auto hide bubble after some time
            setTimeout(() => {
                const bubble = pokeContainer.querySelector('.poke-bubble');
                if (bubble) bubble.style.opacity = '0';
            }, 5000);
        } catch (err) {
            console.error("PokeAPI fail:", err);
        }
    }
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioFeatures();
});
