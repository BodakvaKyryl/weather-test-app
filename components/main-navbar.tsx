"use client";

import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { MobileSidebar } from "./mobile-sidebar";
import { Navigation } from "./navigation";

export function MainNavbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="supports-[backdrop-filter]:bg-background/30 bg-background/95 sticky top-0 z-50 w-full border-b px-4 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <MobileSidebar />
          <div className="mr-10 hidden flex-col lg:flex">
            <h1 className="text-2xl font-semibold">Weather App</h1>
          </div>
        </div>
        <Navigation className="hidden flex-row space-x-6 lg:flex" />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button
            className="border-1"
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
