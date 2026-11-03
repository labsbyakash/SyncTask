// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chronos — Minimalist Calendar & Task Tracker",
  description: "Timeline & Delay Risk Diagnostic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="bg-white text-mono-900 min-h-screen flex flex-col font-sans"
      >
        {children}
      </body>
    </html>
  );
}