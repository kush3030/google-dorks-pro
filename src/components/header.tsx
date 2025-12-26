"use client";

import { Search, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-cyan-500">
            <Search className="h-4 w-4 text-slate-900" />
          </div>
          <span className="text-lg font-bold text-slate-50">DorkGenius</span>
        </div>

        <nav className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800"
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
