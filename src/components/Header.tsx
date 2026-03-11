import { Bell, Search, Menu } from "lucide-react";
import type { View } from "../App";

interface HeaderProps {
  currentView: View;
}

export function Header({ currentView }: HeaderProps) {
  const titles: Record<View, string> = {
    dashboard: "Platform Overview",
    production: "Automated Production & Logistics",
    rnd: "AI-Driven Material R&D",
    settings: "System Settings",
  };

  return (
    <header className="h-16 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-zinc-400 hover:text-zinc-100">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-zinc-100">{titles[currentView]}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search operations..."
            className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 w-64 text-zinc-200 placeholder-zinc-500 transition-all"
          />
        </div>
        <button className="relative p-2 text-zinc-400 hover:text-zinc-100 transition-colors rounded-full hover:bg-zinc-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-zinc-950"></span>
        </button>
      </div>
    </header>
  );
}
