import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "scontent.*.fna.fbcdn.net", pathname: "/**" },
      { protocol: "https", hostname: "raw.githubusercontent.com", pathname: "/PokeAPI/**" },
    ],
  },
};

export default nextConfig;
