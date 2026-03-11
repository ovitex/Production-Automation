import { useState } from "react";
import { optimizeLogistics } from "../lib/gemini";
import { AlertCircle, CheckCircle2, Clock, Truck, Factory, ArrowRight, Loader2, Sparkles, X } from "lucide-react";
import { motion } from "motion/react";

const mockBottlenecks = [
  { id: 1, text: "Dyeing facility B operating at 110% capacity, causing 48h delay in batch 402.", status: "Critical" },
  { id: 2, text: "Raw polyester shipment delayed at Port of LA by 3 days.", status: "Pending" },
  { id: 3, text: "Cutting room A experiencing 15% higher defect rate than baseline.", status: "Investigating" },
  { id: 4, text: "Supplier X reported a 10% shortage in organic cotton delivery.", status: "Pending" }
];

export function Production() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    try {
      const result = await optimizeLogistics(mockBottlenecks.map(b => b.text));
      setOptimizationResult(result);
    } catch (error) {
      console.error(error);
      // Fallback if API fails
      setOptimizationResult({
        recommendedActions: [
          "Reroute 30% of batch 402 to Dyeing facility C (currently at 60% capacity).",
          "Air-freight emergency 500kg polyester stock from secondary supplier in Mexico.",
          "Schedule immediate maintenance and recalibration for Cutting room A lasers."
        ],
        predictedEfficiencyGain: 14.5,
        riskLevel: "Medium"
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Column: Current Status */}
        <div className="flex-1 space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-zinc-100 mb-4 flex items-center">
              <Factory className="w-5 h-5 mr-2 text-zinc-400" />
              Active Manufacturing Nodes
            </h2>
            <div className="space-y-4">
              <NodeStatus name="Spinning & Weaving (Vietnam)" status="optimal" load={78} />
              <NodeStatus name="Dyeing Facility B (Taiwan)" status="critical" load={110} />
              <NodeStatus name="Cutting & Assembly (Mexico)" status="warning" load={92} />
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-zinc-100 flex items-center">
                <Truck className="w-5 h-5 mr-2 text-zinc-400" />
                Logistics Alerts
              </h2>
              <button onClick={() => setIsModalOpen(true)} className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {mockBottlenecks.slice(0, 3).map((issue) => (
                <div key={issue.id} className="flex items-start p-3 rounded-xl bg-rose-500/5 border border-rose-500/20">
                  <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 mr-3 shrink-0" />
                  <p className="text-sm text-zinc-300 leading-relaxed">{issue.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Optimization */}
        <div className="flex-1">
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <Sparkles className="w-32 h-32 text-indigo-500" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-medium text-indigo-100 mb-2 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-indigo-400" />
                AI Logistics Engine
              </h2>
              <p className="text-sm text-indigo-200/70 mb-6">
                Run predictive models to resolve current supply chain bottlenecks and optimize routing.
              </p>

              {!optimizationResult ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                    <Factory className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-zinc-200 font-medium mb-2">System Ready</h3>
                  <p className="text-sm text-zinc-500 mb-6 max-w-xs">
                    Analyze current factory loads and transit delays to generate an optimized production plan.
                  </p>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    animate={{ opacity: isOptimizing ? 0.7 : 1, scale: isOptimizing ? 0.98 : 1 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleOptimize}
                    disabled={isOptimizing}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center disabled:cursor-not-allowed"
                  >
                    {isOptimizing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing Network...
                      </>
                    ) : (
                      <>
                        Generate Optimization Plan
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-1">Predicted Gain</p>
                      <p className="text-2xl font-light text-emerald-400">+{optimizationResult.predictedEfficiencyGain}%</p>
                    </div>
                    <div className="bg-zinc-950/50 rounded-xl p-4 border border-zinc-800/50">
                      <p className="text-xs text-zinc-500 mb-1">Execution Risk</p>
                      <p className={`text-2xl font-light ${
                        optimizationResult.riskLevel === 'Low' ? 'text-emerald-400' :
                        optimizationResult.riskLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {optimizationResult.riskLevel}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 mb-3">Recommended Actions</h3>
                    <div className="space-y-3">
                      {optimizationResult.recommendedActions.map((action: string, i: number) => (
                        <div key={i} className="flex items-start p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                          <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 mr-3 shrink-0" />
                          <p className="text-sm text-zinc-300">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end space-x-3">
                    <button 
                      onClick={() => setOptimizationResult(null)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Discard
                    </button>
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-500/20">
                      Execute Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
              <h2 className="text-lg font-medium text-zinc-100 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-rose-400" />
                Active Bottlenecks
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {mockBottlenecks.map((issue) => (
                <div key={issue.id} className="flex items-start justify-between p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
                  <div className="flex items-start pr-4">
                    <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 mr-3 shrink-0" />
                    <p className="text-sm text-zinc-300 leading-relaxed">{issue.text}</p>
                  </div>
                  <div className={`px-2.5 py-1 rounded-md text-xs font-medium border shrink-0 ${
                    issue.status === 'Critical' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' :
                    issue.status === 'Investigating' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' :
                    'text-zinc-400 bg-zinc-800/50 border-zinc-700/50'
                  }`}>
                    {issue.status}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-zinc-800/50 bg-zinc-950/50 flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NodeStatus({ name, status, load }: { name: string, status: 'optimal' | 'warning' | 'critical', load: number }) {
  const statusColors = {
    optimal: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    warning: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    critical: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 border border-zinc-800/50">
      <div>
        <p className="text-sm font-medium text-zinc-200">{name}</p>
        <div className="flex items-center mt-1">
          <Clock className="w-3 h-3 text-zinc-500 mr-1" />
          <span className="text-xs text-zinc-500">Updated 2m ago</span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-xs text-zinc-500 mb-1">Load</p>
          <p className="text-sm font-mono text-zinc-300">{load}%</p>
        </div>
        <div className={`px-2.5 py-1 rounded-md text-xs font-medium border ${statusColors[status]}`}>
          {status.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
