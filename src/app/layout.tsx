import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "馬郡コンサルティング | AI・IT導入の伴走支援",
  description: "福岡県を拠点に、中小企業のAI活用・DX推進を伴走支援。中小企業診断士・ITコーディネータが経営者の視点で最適な解決策を一緒に考えます。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${shipporiMincho.variable}`}>
      <body>{children}</body>
    </html>
  );
}
