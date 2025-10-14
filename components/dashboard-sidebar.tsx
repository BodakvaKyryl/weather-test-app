"use client";

import { Navigation } from "./navigation";

export const DashboardSidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden px-4 py-4">
      <Navigation className="flex-col" />
    </div>
  );
};
