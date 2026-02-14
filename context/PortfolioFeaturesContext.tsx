"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type WeatherState = { temp: number; condition: string; city: string } | null;

type PortfolioFeaturesState = {
  weather: WeatherState;
  quote: string;
  bgUrl: string;
};

const defaultState: PortfolioFeaturesState = {
  weather: null,
  quote: "",
  bgUrl: "",
};

const PortfolioFeaturesContext = createContext<PortfolioFeaturesState>(defaultState);

export function PortfolioFeaturesProvider({ children }: { children: React.ReactNode }) {
  const [weather, setWeather] = useState<WeatherState>(null);
  const [quote, setQuote] = useState("");
  const [bgUrl, setBgUrl] = useState("");

  const fetchQuote = useCallback(async () => {
    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      setQuote(`"${data.slip?.advice ?? "The best way to predict the future is to create it."}"`);
    } catch {
      setQuote(`"The best way to predict the future is to create it."`);
    }
  }, []);

  useEffect(() => {
    setBgUrl(
      `https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=20&w=1920&sig=${Math.floor(Math.random() * 1000)}`
    );

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherRes = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );
            const weatherData = await weatherRes.json();
            let cityName = "Your Location";
            try {
              const geoRes = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=th`
              );
              const geoData = await geoRes.json();
              cityName =
                geoData.city ||
                geoData.locality ||
                geoData.principalSubdivision ||
                "Your Location";
            } catch {
              // use default
            }
            const temp = Math.round(weatherData.current_weather?.temperature ?? 0);
            const code = weatherData.current_weather?.weathercode ?? 0;
            const condition = code <= 3 ? "☀️" : code <= 67 ? "☁️" : "🌧️";
            setWeather({ temp, condition, city: cityName });
          } catch (err) {
            console.error("Weather fetch failed:", err);
          }
        },
        () => {},
        { timeout: 8000 }
      );
    }

    fetchQuote();
  }, [fetchQuote]);

  const value: PortfolioFeaturesState = { weather, quote, bgUrl };

  return (
    <PortfolioFeaturesContext.Provider value={value}>
      {children}
    </PortfolioFeaturesContext.Provider>
  );
}

export function usePortfolioFeatures(): PortfolioFeaturesState {
  const ctx = useContext(PortfolioFeaturesContext);
  return ctx ?? defaultState;
}
