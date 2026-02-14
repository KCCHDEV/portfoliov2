import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { PortfolioFeaturesProvider } from "@/context/PortfolioFeaturesContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "แนะนำตัว - KCCHDEV",
  description: "Portfolio of KCCHDEV - Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="scroll-smooth">
      <body
        className={`${inter.variable} ${notoThai.variable} font-sans antialiased`}
      >
        <PortfolioFeaturesProvider>{children}</PortfolioFeaturesProvider>
      </body>
    </html>
  );
}
