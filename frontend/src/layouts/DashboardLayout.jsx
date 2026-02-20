import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AttackSimulationModal from '../components/AttackSimulationModal';
import { useAnalysis } from '../contexts/AnalysisContext';
import { ShieldCheck, Target, Activity, Clock, ChevronRight, Zap } from 'lucide-react';
import { Badge, Button } from '../components/UI';
import { motion } from 'framer-motion';

function DashboardLayout() {
  const { analysisResult } = useAnalysis();
  const [isSimulationOpen, setIsSimulationOpen] = useState(false);

  const analysisId = analysisResult?.analysis_id || 'ANALYSIS-T-1002';
  const timestamp = analysisResult?.input_summary?.timestamp || new Date().toLocaleString();
  const riskScore = analysisResult?.risk_assessment?.risk_score || 0;
  const riskLevel = analysisResult?.risk_assessment?.risk_level || 'Low';

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'high': return 'primary';
      case 'moderate': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-160px)] relative">
      <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-24 h-fit">
        <Sidebar />
      </aside>

      <section className="flex-1 flex flex-col gap-8 animate-in fade-in slide-in-from-right-6 duration-700">
        <header className="glass rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-cyan-500/50" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-inner">
                <Target className="w-6 h-6 text-cyan-500" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-100">
                  Analysis <span className="text-cyan-500">Overview</span>
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <Activity className="w-3 h-3 text-emerald-500" /> {analysisId}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> {timestamp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="hidden lg:flex flex-col items-end gap-1 px-4 border-r border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Global Score</p>
              <div className="text-2xl font-mono font-black text-slate-100 flex items-baseline gap-1">
                {riskScore} <span className="text-xs text-slate-400 font-bold">/ 100</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(56, 189, 248, 0)",
                    "0 0 20px rgba(56, 189, 248, 0.4)",
                    "0 0 0px rgba(56, 189, 248, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="rounded-full"
              >
                <Button
                  onClick={() => setIsSimulationOpen(true)}
                  className="gap-2 px-8 h-12 !rounded-full shadow-2xl shadow-sky-500/40 group relative overflow-hidden border-2 border-sky-400/30"
                >
                  <Zap className="w-4 h-4 fill-sky-400" />
                  Simulate Adversary
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </motion.div>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-400">Exposure</p>
                <Badge variant={getRiskColor(riskLevel)} className="px-3">
                  {riskLevel} Risk
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1">
          <Outlet />
        </div>
      </section>

      <AttackSimulationModal
        isOpen={isSimulationOpen}
        onClose={() => setIsSimulationOpen(false)}
      />
    </div>
  );
}

export default DashboardLayout;
