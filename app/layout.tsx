import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feranet",
  description: "Feranet is a web development company",
  alternates: {
    canonical: "https://feranet.com",
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`max-h-screen bg-slate-900 text-white ${inter.className}`}
        id="home"
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
