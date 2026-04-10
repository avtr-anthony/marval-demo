import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";

import { siteConfig } from "@/config/site";
import { buildThemeCssVariables } from "@/config/theme";

import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${siteConfig.brand.name} | Demo Frontend`,
  description:
    "Demo institucional en Next.js para consultas tributarias de Neuquén con landing premium y chat full screen.",
  icons: {
    icon: "/nqn-logo.png",
    shortcut: "/nqn-logo.png",
    apple: "/nqn-logo.png"
  }
};

/**
 * Root application layout that applies fonts, global styles and centralized theme tokens.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${sans.variable} ${serif.variable} bg-bg font-sans text-ink antialiased`}>
        <style id="theme-tokens">{buildThemeCssVariables()}</style>
        {children}
      </body>
    </html>
  );
}
