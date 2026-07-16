import type { Metadata } from "next";
import { Gabarito, Geist_Mono, Onest } from "next/font/google";
import "./globals.css";

// display: Gabarito — geometric with rounded terminals, echoes the
// stroke-rounded icon caps without Baloo 2's toy-store weight
const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin"],
  weight: ["600", "700"],
});

// body: Onest — quiet humanist sans, slightly soft, stays out of the way
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "hugeicons-animated — animated Hugeicons for React",
  description:
    "Hand-animated Hugeicons for React, built with motion. Hover to preview, install with the shadcn CLI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${onest.variable} ${gabarito.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
