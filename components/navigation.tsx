"use client";

import { cn } from "@/lib/utils";
import {
  Building2,
  CloudRainWindIcon,
  HomeIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
    activeIcon: HomeIcon,
  },
  {
    label: "Dashboard",
    href: "/weather-dashboard",
    icon: CloudRainWindIcon,
    activeIcon: CloudRainWindIcon,
  },
  {
    label: "City Page",
    href: "/city-page",
    icon: Building2,
    activeIcon: Building2,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
];

export const Navigation = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <ul className={cn("flex flex-col gap-1", className)}>
      {routes.map((item) => {
        const isActive = pathname === item.href;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "hover:text-primary flex items-center gap-2.5 rounded-md p-2.5 font-medium text-neutral-500 transition",
                isActive &&
                  "text-primary dark:bg-accent/20 bg-white shadow-sm hover:opacity-100"
              )}>
              <Icon
                className={cn(
                  "size-5",
                  isActive ? "text-primary" : "text-neutral-500"
                )}
              />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
