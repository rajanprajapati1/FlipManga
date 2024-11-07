import localFont from "next/font/local";
import "./globals.css";
import ThemeProviderNext from "@/lib/ThemeProvider";
import { Toaster } from 'react-stacked-toast';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "FlipManga - Read Manga Online",
  description: "FlipManga is your go-to platform for reading manga online with a seamless, interactive reading experience. Explore thousands of chapters and manga series in high quality.",
  keywords: "Manga, Manga Reader, Read Manga, Manga Chapters, Online Manga, Manga Flipbook",
  author: "FlipManga Team",
  creator: "FlipManga Team",
  applicationName: "FlipManga",
  openGraph: {
    title: "FlipManga - Read Manga Online",
    description: "FlipManga is your go-to platform for reading manga online with a seamless, interactive reading experience.",
    url: "https://www.flipmanga.com", // Set to your website URL
    siteName: "FlipManga",
    images: [
      {
        url: "/image.png", // Path to your Open Graph image
        width: 1200,
        height: 630,
        alt: "FlipManga Manga Reading Platform"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "FlipManga - Read Manga Online",
    description: "FlipManga is your go-to platform for reading manga online with a seamless, interactive reading experience.",
    image: "/image.png", // Path to your Twitter image
    site: "@flipmanga" // Set your Twitter handle if applicable
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProviderNext
        >
          <Toaster/>
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Navbar />
      </header>
        {children}
        <Footer/>
        </ThemeProviderNext>
      </body>
    </html>
  );
}
