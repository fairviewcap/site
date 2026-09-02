import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Inter_Tight, Newsreader } from "next/font/google";
import { VercelToolbar } from "@vercel/toolbar/next";
import { FIRM, FIRM_ENTITY } from "@/lib/firm";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

/** Learn article body — news/long-form serif. */
const newsreader = Newsreader({
  variable: "--font-learn-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(FIRM.siteUrl),
  title: FIRM_ENTITY.homeTitle,
  description: FIRM_ENTITY.homeDescription,
};

function showVercelToolbar(): boolean {
  if (process.env.NODE_ENV === "development") return true;
  if (process.env.VERCEL_ENV === "preview") return true;
  if (process.env.FAIRVIEW_CLIENT_REVIEW === "1") return true;
  return false;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="min-h-dvh font-sans bg-[var(--fv-bg)]">
        {children}
        {showVercelToolbar() ? <VercelToolbar /> : null}
      </body>
    </html>
  );
}
