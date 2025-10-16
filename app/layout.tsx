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
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}>
        <div className="from-background to-muted bg-gradient-to-br">
          <Providers>
            <MainNavbar />
            <main className="container mx-auto min-h-screen px-4 py-8">
              {children}
            </main>
            <footer className="supports-[backdrop-filter]:bg-background/30 border-t py-2 backdrop-blur">
              <div className="container mx-auto flex h-16 items-center justify-center px-4">
                <p className="text-muted-foreground text-center text-sm">
                  © {currentYear} Made by{" "}
                  <span className="text-foreground font-semibold">KyrylB</span>
                </p>
              </div>
            </footer>
          </Providers>
        </div>
      </body>
    </html>
  );
}
