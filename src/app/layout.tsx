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
  title: "rujuu.com",
  description: "Bringing a little more joy into everyday life.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "rujuu.com",
    description: "Bringing a little more joy into everyday life.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "rujuu.com",
    images: [{ url: "/default.png" }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "rujuu.com",
    description: "Bringing a little more joy into everyday life.",
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
