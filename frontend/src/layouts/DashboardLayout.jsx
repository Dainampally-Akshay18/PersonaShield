import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AttackSimulationModal from '../components/AttackSimulationModal';
import { useAnalysis } from '../contexts/AnalysisContext';
import { ShieldCheck, Target, Activity, Clock, ChevronRight, Zap, AlertCircle, Database } from 'lucide-react';
import { Badge, Button } from '../components/UI';
import { motion } from 'framer-motion';

function DashboardLayout() {
  const { analysisResult, scrapeMetadata } = useAnalysis();
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

      <section className="flex-1 flex flex-col gap-8">
        <header className="glass rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group bg-white border-slate-200">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 shadow-sm">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter text-slate-900">
                  Analysis <span className="text-blue-600">Overview</span>
                </h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    <Activity className="w-3 h-3 text-emerald-600" /> {analysisId}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                    <Clock className="w-3 h-3" /> {timestamp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="hidden lg:flex flex-col items-end gap-1 px-4 border-r border-slate-200">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Global Score</p>
              <div className="text-2xl font-mono font-black text-slate-900 flex items-baseline gap-1">
                {riskScore} <span className="text-xs text-slate-600 font-bold">/ 100</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 15px rgba(59, 130, 246, 0.3)",
                    "0 0 0px rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="p-3 bg-blue-50 rounded-xl border border-blue-200 shadow-sm"
              >
                <AlertCircle className="w-6 h-6 text-blue-600" />
              </motion.div>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">Exposure</p>
                <Badge variant={getRiskColor(riskLevel)} className="px-3">
                  {riskLevel} Risk
                </Badge>
              </div>
            </div>
          </div>
        </header>

        {/* Scrape Metadata Card */}
        {scrapeMetadata && (
          <div className="glass rounded-2xl p-6 border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Database className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Source Intelligence</h3>
              </div>
              <Badge variant="primary" className="px-3">{scrapeMetadata.status}</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Source URL</p>
                <p className="text-xs text-blue-600 font-mono truncate">{scrapeMetadata.source_url}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Content Size</p>
                <p className="text-xs text-slate-900 font-bold">{scrapeMetadata.character_count?.toLocaleString() || 0} chars</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Status</p>
                <p className="text-xs font-mono text-emerald-600">{scrapeMetadata.status === 'success' ? '✓ Success' : '⚠ ' + scrapeMetadata.status}</p>
              </div>
            </div>
          </div>
        )}

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
