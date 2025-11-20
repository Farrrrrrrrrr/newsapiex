import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "News Articles - Generated News",
  description: "Browse the latest generated news articles with beautiful images from DALL·E. Stay informed with fresh content updated regularly.",
  openGraph: {
    title: "News Articles - Generated News",
    description: "Browse the latest generated news articles with beautiful images from DALL·E.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Articles - Generated News",
    description: "Browse the latest generated news articles with beautiful images from DALL·E.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
