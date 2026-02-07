import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/atoms/GoogleAnalytics";
import "devicon/devicon.min.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "Portfolio | Developer",
  description: "ものづくりを通して、できるだけ多くの人に良い影響を与えたい。",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Portfolio | Developer",
    description: "ものづくりを通して、できるだけ多くの人に良い影響を与えたい。",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Portfolio | Developer",
    images: [{ url: "/default.png" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Developer",
    description: "ものづくりを通して、できるだけ多くの人に良い影響を与えたい。",
    images: ["/default.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
