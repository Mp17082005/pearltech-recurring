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
  title: "PearlTech Recurring Date Picker | Advanced Next.js Component",
  description: "A powerful, enterprise-grade recurring date picker component built with Next.js 15, TypeScript, and modern React patterns. Perfect for scheduling, appointments, and recurring events.",
  keywords: ["Next.js", "TypeScript", "React", "Date Picker", "Recurring", "Calendar", "Component", "Scheduling"],
  authors: [{ name: "PearlTech" }],
  creator: "PearlTech",
  publisher: "PearlTech",
  openGraph: {
    title: "PearlTech Recurring Date Picker",
    description: "Advanced Next.js component with TypeScript for recurring date selection",
    url: "https://pearltech-recurring.vercel.app",
    siteName: "PearlTech Recurring",
    type: "website",
    images: [
      {
        url: "/hero-image.svg",
        width: 800,
        height: 400,
        alt: "Recurring Date Picker Component Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PearlTech Recurring Date Picker",
    description: "Advanced Next.js component with TypeScript for recurring date selection",
    images: ["/hero-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
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
