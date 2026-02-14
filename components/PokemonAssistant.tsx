"use client";

import React, { useEffect, useState } from "react";

export default function PokemonAssistant() {
  const [pokemon, setPokemon] = useState<{ name: string; sprite: string } | null>(null);
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      const randomId = Math.floor(Math.random() * 151) + 1;
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await res.json();

        const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        const sprite =
          data.sprites.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ||
          data.sprites.front_default;

        setPokemon({ name, sprite });

        const t = setTimeout(() => setShowBubble(false), 5000);
        return () => clearTimeout(t);
      } catch (err) {
        console.error("PokeAPI fail:", err);
      }
    };

    fetchRandomPokemon();
  }, []);

  if (!pokemon) return null;

  return (
    <div id="poke-assistant">
      <div className="poke-inner">
        <div
          className={`poke-bubble transition-all duration-500 ${!showBubble ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100"}`}
        >
          สวัสดี! ผมคือ {pokemon.name} ยินดีที่ได้รู้จักครับ!
        </div>
        <img src={pokemon.sprite} alt={pokemon.name} className="poke-sprite" />
      </div>
    </div>
  );
}
