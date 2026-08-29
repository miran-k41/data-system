import type { Metadata } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "حکومەتی هەرێمی کوردستان | سیستەمی نووسراوە فەرمییەکان",
  description: "سیستەمی بەڕێوەبردنی نووسراو و نامە فەرمییەکان، داڕشتەی وۆرد و چاپکردن",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ckb"
      dir="rtl"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans" dir="rtl">{children}</body>
    </html>
  );
}
