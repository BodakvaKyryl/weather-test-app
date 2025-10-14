import { MainNavbar } from "@/components/main-navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Check all weather you need",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <div className="from-background to-muted bg-gradient-to-br">
          <MainNavbar />
          <main className="container mx-auto min-h-screen px-4 py-8">
            <Providers>{children}</Providers>
          </main>
          <footer className="supports-[backdrop-filter]:bg-background/30 border-t py-5 backdrop-blur">
            <div className="container mx-auto px-4 text-center text-neutral-500">
              <p>Made by KyrylB</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
