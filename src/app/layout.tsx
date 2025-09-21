import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Business Website",
  description: "Professional business website with CMS, blog, and contact form.",
  openGraph: {
    title: "Business Website",
    description: "Professional business website with CMS, blog, and contact form.",
    url: "https://yourdomain.com",
    siteName: "Business",
    images: [
      {
        url: "https://yourdomain.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Business Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900 transition-colors duration-300`}
      >
        <div className="fixed inset-0 w-full h-full bg-white -z-10"></div>
        <div className="min-h-screen w-full transition-colors duration-300">
          <SessionWrapper>{children}</SessionWrapper>
        </div>
      </body>
    </html>
  );
}
