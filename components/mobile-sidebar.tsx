"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div>
      <Sheet modal={true} open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size={"default"} variant={"secondary"} className="lg:hidden">
            <MenuIcon className="size-4 text-neutral-500" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-4">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
    </div>
  );
};
