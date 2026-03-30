import type { Metadata } from "next";
import {
  ABeeZee,
  Abril_Fatface,
  Geist_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { PawCursor } from "@/components/paw-cursor";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const abeezee = ABeeZee({
  variable: "--font-body-alt",
  subsets: ["latin"],
  weight: "400",
});

const abrilFatface = Abril_Fatface({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Two Tails | Freeze-Dried Duck & Tuna Bites for Dogs & Cats",
  description:
    "Product landing page for Signature Market's Two Tails Freeze-Dried Duck & Tuna Bites, built in Next.js from the provided visual template.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} ${abeezee.variable} ${abrilFatface.variable} antialiased`}
      >
        <PawCursor />
        {children}
      </body>
    </html>
  );
}
