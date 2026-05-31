import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import TopNav from "@/components/TopNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Steven Glenn Shiendy | Master of Ceremony & Visual Storyteller",
  description: "Portfolio of Steven Glenn Shiendy - Master of Ceremony, Visual Storyteller, and Leader.",
  icons: {
    icon: "/Steven Glenn Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="antialiased font-inter md:cursor-none">
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
