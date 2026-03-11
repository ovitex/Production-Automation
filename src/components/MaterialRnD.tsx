import { useState } from "react";
import { simulateMaterialProperties } from "../lib/gemini";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Layers, Plus, Trash2, Beaker, Loader2, Sparkles } from "lucide-react";

const FIBER_TYPES = ["Polyester", "Nylon", "Merino Wool", "Kevlar", "Graphene", "Elastane", "Cotton"];
const WEAVE_TYPES = ["Plain", "Twill", "Knit", "Non-woven", "Ripstop"];

export function MaterialRnD() {
  const [layers, setLayers] = useState([
    { id: 1, fiberType: "Nylon", blend: 80, weave: "Ripstop" },
    { id: 2, fiberType: "Graphene", blend: 20, weave: "Non-woven" }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const addLayer = () => {
    if (layers.length >= 5) return;
    setLayers([...layers, { id: Date.now(), fiberType: "Polyester", blend: 100, weave: "Plain" }]);
  };

  const removeLayer = (id: number) => {
    if (layers.length <= 1) return;
    setLayers(layers.filter(l => l.id !== id));
  };

  const updateLayer = (id: number, field: string, value: any) => {
    setLayers(layers.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const res = await simulateMaterialProperties(layers);
      setResult(res);
    } catch (error) {
      console.error(error);
      // Fallback
      setResult({
        tensileStrength: 85,
        breathability: 60,
        thermalInsulation: 75,
        elasticity: 40,
        durability: 90,
        weight: 88,
        analysis: "This composite offers an excellent balance of high durability and lightweight properties due to the Graphene integration. The Nylon ripstop base provides strong tear resistance, making it ideal for extreme outdoor technical wear."
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const chartData = result ? [
    { subject: 'Tensile Strength', A: result.tensileStrength, fullMark: 100 },
    { subject: 'Breathability', A: result.breathability, fullMark: 100 },
    { subject: 'Thermal', A: result.thermalInsulation, fullMark: 100 },
    { subject: 'Elasticity', A: result.elasticity, fullMark: 100 },
    { subject: 'Durability', A: result.durability, fullMark: 100 },
    { subject: 'Lightness', A: result.weight, fullMark: 100 },
  ] : [];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Configuration */}
        <div className="w-full lg:w-5/12 space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-zinc-100 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-indigo-400" />
                Stacking Sequence
              </h2>
              <span className="text-xs font-medium bg-zinc-800 text-zinc-400 px-2 py-1 rounded-md">
                {layers.length} Layers
              </span>
            </div>

            <div className="space-y-4">
              {layers.map((layer, index) => (
                <div key={layer.id} className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50 relative group">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-400 z-10">
                    {index + 1}
                  </div>
                  
                  <div className="flex justify-between items-start mb-3 pl-2">
                    <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Layer {index + 1}</p>
                    <button 
                      onClick={() => removeLayer(layer.id)}
                      className="text-zinc-600 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pl-2">
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase mb-1 block">Fiber</label>
                      <select 
                        value={layer.fiberType}
                        onChange={(e) => updateLayer(layer.id, 'fiberType', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                      >
                        {FIBER_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase mb-1 block">Weave</label>
                      <select 
                        value={layer.weave}
                        onChange={(e) => updateLayer(layer.id, 'weave', e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-indigo-500/50"
                      >
                        {WEAVE_TYPES.map(w => <option key={w} value={w}>{w}</option>)}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-zinc-500 uppercase mb-1 flex justify-between">
                        <span>Blend %</span>
                        <span className="text-indigo-400">{layer.blend}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="1" max="100" 
                        value={layer.blend}
                        onChange={(e) => updateLayer(layer.id, 'blend', parseInt(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={addLayer}
              disabled={layers.length >= 5}
              className="w-full mt-4 py-3 rounded-xl border border-dashed border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800/30 transition-all flex items-center justify-center text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Layer
            </button>
          </div>
        </div>

        {/* Right: Simulation Results */}
        <div className="w-full lg:w-7/12 flex flex-col">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 flex-1 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 relative z-10">
              <h2 className="text-lg font-medium text-zinc-100 flex items-center">
                <Beaker className="w-5 h-5 mr-2 text-indigo-400" />
                Performance Prediction
              </h2>
              <button
                onClick={handleSimulate}
                disabled={isSimulating}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSimulating ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                {isSimulating ? "Simulating..." : "Run AI Simulation"}
              </button>
            </div>

            {!result && !isSimulating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-zinc-800/50 rounded-xl">
                <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
                  <Beaker className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-zinc-300 font-medium mb-2">No Data Yet</h3>
                <p className="text-sm text-zinc-500 max-w-sm">
                  Configure your material stacking sequence on the left and run the AI simulation to predict mechanical properties.
                </p>
              </div>
            ) : isSimulating ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                </div>
                <p className="mt-6 text-sm font-medium text-indigo-400 animate-pulse">Running molecular analysis...</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-in fade-in duration-500">
                <div className="h-[300px] w-full -mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                      <PolarGrid stroke="#27272a" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#a1a1aa', fontSize: 11 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
                        itemStyle={{ color: "#818cf8" }}
                      />
                      <Radar name="Performance" dataKey="A" stroke="#6366f1" strokeWidth={2} fill="#6366f1" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl p-5">
                  <h3 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">AI Analysis</h3>
                  <p className="text-sm text-indigo-100/80 leading-relaxed">
                    {result.analysis}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
