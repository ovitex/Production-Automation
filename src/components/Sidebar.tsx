import React from "react";
import { LayoutDashboard, Factory, Beaker, Settings, Hexagon } from "lucide-react";
import { cn } from "../lib/utils";
import type { View } from "../App";

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
}

export function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems: { id: View; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "production", label: "Production & Logistics", icon: Factory },
    { id: "rnd", label: "Material R&D", icon: Beaker },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-zinc-800/50 bg-zinc-900/50 backdrop-blur-xl flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
        <Hexagon className="w-6 h-6 text-indigo-500 mr-3" />
        <span className="font-semibold text-lg tracking-tight">TexLogic</span>
      </div>
      <nav className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={cn(
                "w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50"
              )}
            >
              <Icon className={cn("w-5 h-5 mr-3", isActive ? "text-indigo-400" : "text-zinc-500")} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-zinc-800/50">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
            JS
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-zinc-200">Jane Smith</p>
            <p className="text-xs text-zinc-500">Production Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
