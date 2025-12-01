"use client";

import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { SidebarNav } from "./SidebarNav";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col justify-between border-r bg-sidebar text-sidebar-foreground">
              <div className="p-4">
                <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-sidebar-primary-foreground">
                  Inventaire App
                </Link>
                <SidebarNav />
              </div>
              <MadeWithDyad />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <aside className="hidden md:flex md:w-64 flex-col justify-between border-r bg-sidebar text-sidebar-foreground">
          <div className="p-4">
            <Link to="/" className="flex items-center gap-2 font-semibold text-lg text-sidebar-primary-foreground">
              Inventaire App
            </Link>
            <SidebarNav />
          </div>
          <MadeWithDyad />
        </aside>
      )}
      <main className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background p-4 shadow-sm">
          <div className="container mx-auto flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Inventaire Central</h2>
            {/* Future header content like user menu, notifications */}
          </div>
        </header>
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;