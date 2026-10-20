import type { Metadata, Viewport } from "next";
import { Oswald, Bebas_Neue } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stem & Grain",
  description: "Unique, high-tech and advanced technologies in Agri, Dairy and Aqua sectors.",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfbf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full antialiased ${oswald.variable} ${bebasNeue.variable}`}>
      <body className="min-h-full flex flex-col overflow-x-hidden selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
