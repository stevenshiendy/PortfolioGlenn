import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Poppins } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import TopNav from "@/components/TopNav";
import Providers from "@/components/Providers";
import Backdrop from "@/components/story/Backdrop";
import ChapterRail from "@/components/story/ChapterRail";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Steven Glenn Shiendy | Master of Ceremony & Visual Storyteller",
  description: "Portfolio of Steven Glenn Shiendy - Master of Ceremony, Visual Storyteller, and Entrepreneur.",
  icons: {
    icon: "/Steven Glenn Logo.svg",
  },
};

// Let the page draw edge to edge, so Safari's floating toolbar sits over the
// background instead of over a flat strip of color
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#141414",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${instrumentSerif.variable} scroll-smooth`}>
      <body className="antialiased font-body md:cursor-none">
        <Providers>
          <div className="hidden md:block">
            <CustomCursor />
          </div>
          <Backdrop />
          <TopNav />
          {children}
          <ChapterRail />
        </Providers>
      </body>
    </html>
  );
}
