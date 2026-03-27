import type { Metadata } from "next";
import { Cormorant_Garamond, Lora } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Open Spice Box",
  description:
    "Food is medicine — curated recipes and ingredient knowledge from traditional medicine systems and modern nutrition science.",
  openGraph: {
    siteName: "Open Spice Box",
    title: "Open Spice Box",
    description:
      "Food is medicine — curated recipes and ingredient knowledge from traditional medicine systems and modern nutrition science.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Spice Box",
    description:
      "Food is medicine — curated recipes and ingredient knowledge from traditional medicine systems and modern nutrition science.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${lora.variable}`}>
      <body className="font-body antialiased bg-parchment-50 text-charcoal-900">
        {children}
      </body>
    </html>
  );
}
