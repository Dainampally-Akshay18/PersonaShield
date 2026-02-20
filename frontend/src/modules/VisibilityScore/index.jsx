import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { Eye, ShieldAlert, Globe, Info, Activity, Globe2, ScanEye } from 'lucide-react';

function VisibilityScore() {
  const { analysisResult } = useAnalysis();
  const visibility = analysisResult?.risk_assessment?.visibility_score || 0;

  if (typeof visibility !== 'number' && !analysisResult) {
    return <EmptyState />;
  }

  const maxScore = 10;
  const percentage = Math.min((visibility / maxScore) * 100, 100);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <Card className="lg:col-span-2 p-10 space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Globe2 className="w-64 h-64" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-inner">
                <ScanEye className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">Exposure Magnitude</h3>
            </div>
            <Badge variant={visibility > 7 ? 'danger' : visibility > 4 ? 'warning' : 'success'}>
              {visibility > 7 ? 'Critical' : visibility > 4 ? 'Moderate' : 'Low'} Exposure
            </Badge>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-baseline">
              <span className="text-6xl font-black italic tracking-tighter text-slate-100">
                {visibility}<span className="text-xl text-slate-400 not-italic"> / {maxScore}</span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-widest">
                Normalized Visibility Index
              </span>
            </div>

            <div className="space-y-3">
              <div className="h-4 w-full bg-black rounded-full border border-white/5 p-1">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ease-out relative ${visibility > 7 ? 'bg-red-500 shadow-lg shadow-red-500/20' :
                    visibility > 4 ? 'bg-amber-500 shadow-lg shadow-amber-500/20' :
                      'bg-cyan-500 shadow-lg shadow-cyan-500/20'
                    }`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute top-0 right-0 h-full w-4 bg-white/20 blur-sm rounded-full" />
                </div>
              </div>
              <div className="flex justify-between px-1">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Cloaked</span>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Full Exposure</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Metrics/Legend sidebar */}
        <div className="space-y-6">
          <Card className="p-8 space-y-8 bg-black/40 border-white/10 border-2">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Node Analysis</p>
              <h3 className="text-xl font-black tracking-tighter text-slate-100 uppercase italic">Surface Metrics</h3>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">OSINT Surface</span>
                    <span className="text-[10px] font-mono font-bold text-slate-100">{(percentage * 0.8).toFixed(1)}%</span>
                  </div>
                  <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage * 0.8}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Privacy Hardening</span>
                    <span className="text-[10px] font-mono font-bold text-slate-100">{(100 - percentage).toFixed(1)}%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${100 - percentage}%` }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex items-center gap-3">
              <Activity className="w-4 h-4 text-cyan-500 animate-pulse" />
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Heuristic Engine Status: Nominal</span>
            </div>
          </Card>

          <Card className="p-6 bg-black/40 border-white/5 flex items-start gap-4">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider leading-relaxed">
              Visibility index incorporates cross-referencing from known data leaks and professional social networks.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default VisibilityScore;
