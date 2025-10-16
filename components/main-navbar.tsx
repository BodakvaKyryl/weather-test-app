"use client";

import { CloudRain } from "lucide-react";
import Link from "next/link";
import CitySearch from "./city-search";
import ThemeToggle from "./theme-toggle";

export function MainNavbar() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/30 sticky top-0 z-50 w-full border-b py-2 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={"/weather-dashboard"} className="group">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 px-4 py-2 backdrop-blur-sm transition-all hover:border-white/20 hover:from-blue-500/20 hover:to-cyan-500/20">
            <div className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-blue-500" />
              <h1 className="text-lg font-bold">Weather App</h1>
            </div>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 blur-xl transition-opacity group-hover:opacity-20" />
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="max-w-[200px] md:max-w-none">
            <CitySearch />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
