import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Production } from "./components/Production";
import { MaterialRnD } from "./components/MaterialRnD";

export type View = "dashboard" | "production" | "rnd" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-50 font-sans overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header currentView={currentView} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto w-full h-full">
            {currentView === "dashboard" && <Dashboard setCurrentView={setCurrentView} />}
            {currentView === "production" && <Production />}
            {currentView === "rnd" && <MaterialRnD />}
            {currentView === "settings" && (
              <div className="flex items-center justify-center h-full text-zinc-500">
                Settings module coming soon.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
