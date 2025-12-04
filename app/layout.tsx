import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  variable: "--font-noto-sans-tc",
  weight: ["300", "400", "500"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "半山輕語 | Midway Spark",
  description:
    "在輕語中尋找微光，在微光中繼續前行。記錄育兒、生活與身心靈探索的溫柔時刻。",
  keywords: ["部落格", "週記", "ORID", "身心靈", "育兒", "反思", "正念"],
  authors: [{ name: "半山輕語" }],
  openGraph: {
    title: "半山輕語 | Midway Spark",
    description: "在輕語中尋找微光，在微光中繼續前行",
    type: "website",
    locale: "zh_TW",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-TW"
      className={`${inter.variable} ${playfair.variable} ${notoSansTC.variable}`}
    >
      <body className="bg-soft-mist text-charcoal font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
