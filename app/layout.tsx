import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Is This True? - AI-Powered Fact-Checking Extension",
  description:
    "A Chrome extension that allows users to fact-check highlighted text on any webpage instantly using AI-powered truth assessment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
