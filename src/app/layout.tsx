import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.scss";

// Fonte temática para títulos
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

// Fonte base para corpo do texto
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harry Potter Personagens",
  description: "Explore personagens do universo mágico de Harry Potter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${cinzel.variable} ${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
