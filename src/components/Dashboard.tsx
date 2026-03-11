import { ArrowUpRight, ArrowDownRight, Activity, Box, Zap, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { View } from "../App";

const data = [
  { name: "Mon", efficiency: 82, target: 85 },
  { name: "Tue", efficiency: 84, target: 85 },
  { name: "Wed", efficiency: 81, target: 85 },
  { name: "Thu", efficiency: 86, target: 85 },
  { name: "Fri", efficiency: 89, target: 85 },
  { name: "Sat", efficiency: 92, target: 85 },
  { name: "Sun", efficiency: 94, target: 85 },
];

export function Dashboard({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Production Efficiency"
          value="94%"
          trend="+2.4%"
          isPositive={true}
          icon={Activity}
        />
        <StatCard
          title="Active Supply Routes"
          value="128"
          trend="-1.2%"
          isPositive={false}
          icon={Box}
        />
        <StatCard
          title="R&D Simulations"
          value="42"
          trend="+12%"
          isPositive={true}
          icon={Zap}
        />
        <StatCard
          title="Critical Bottlenecks"
          value="2"
          trend="-1"
          isPositive={true}
          icon={AlertTriangle}
          alert
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-zinc-100">Efficiency Trend</h2>
              <p className="text-sm text-zinc-500">7-day rolling average vs target</p>
            </div>
            <button
              onClick={() => setCurrentView("production")}
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center"
            >
              View Logistics <ArrowUpRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
                  itemStyle={{ color: "#e4e4e7" }}
                />
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEfficiency)"
                />
                <Area
                  type="step"
                  dataKey="target"
                  stroke="#52525b"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-zinc-100">Recent R&D</h2>
            <button
              onClick={() => setCurrentView("rnd")}
              className="text-sm text-indigo-400 hover:text-indigo-300 font-medium"
            >
              Simulate
            </button>
          </div>
          <div className="flex-1 space-y-4">
            {[
              { name: "Graphene-infused Nylon", status: "Completed", score: 92 },
              { name: "Recycled PET + Merino", status: "Analyzing", score: null },
              { name: "Kevlar Weave Beta", status: "Failed", score: 45 },
              { name: "Ultra-light Poly Blend", status: "Completed", score: 88 },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-800/50">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{item.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{item.status}</p>
                </div>
                {item.score ? (
                  <div className={`text-sm font-mono font-medium ${item.score > 80 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.score}/100
                  </div>
                ) : (
                  <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, isPositive, icon: Icon, alert }: any) {
  return (
    <div className={`bg-zinc-900/50 border rounded-2xl p-5 backdrop-blur-sm transition-colors ${alert ? 'border-rose-500/30 bg-rose-500/5' : 'border-zinc-800/50'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${alert ? 'bg-rose-500/20 text-rose-400' : 'bg-zinc-800 text-zinc-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center text-xs font-medium ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {trend}
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-light text-zinc-100 tracking-tight">{value}</h3>
        <p className="text-sm text-zinc-500 mt-1">{title}</p>
      </div>
    </div>
  );
}
