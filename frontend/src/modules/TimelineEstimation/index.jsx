import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { Calendar, Clock, History, Activity, TrendingUp, ShieldAlert } from 'lucide-react';

function TimelineEstimation() {
  const { analysisResult } = useAnalysis();
  const years = analysisResult?.risk_assessment?.timeline_years || 0;

  if (typeof years !== 'number' && !analysisResult) {
    return <EmptyState />;
  }

  const maxYears = 10;
  const percentage = Math.min((years / maxYears) * 100, 100);

  const phases = [
    { year: 0, label: 'Discovery', desc: 'Initial node identification and OSINT gathering.', icon: History },
    { year: 3, label: 'Correlation', desc: 'Active linkage between disjointed professional data.', icon: Activity },
    { year: 6, label: 'Profiling', desc: 'Synthetic personality modeling and vector mapping.', icon: TrendingUp },
    { year: 10, label: 'Saturation', desc: 'Full digital identity reconstruction.', icon: ShieldAlert }
  ];

  const currentPhaseIndex = phases.findIndex((p, i) => {
    const nextPhase = phases[i + 1];
    return years >= p.year && (!nextPhase || years < nextPhase.year);
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Timeline Card */}
        <Card className="lg:col-span-2 p-10 space-y-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <Calendar className="w-64 h-64" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-inner">
                <Clock className="w-6 h-6 text-cyan-500" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">Exposure Velocity</h3>
            </div>
            <Badge variant="primary" className="px-4">Chronological Mapping</Badge>
          </div>

          {/* Graphical timeline */}
          <div className="relative pt-12 pb-8 px-4 z-10">
            <div className="h-1.5 w-full bg-black rounded-full border border-white/5 relative">
              {/* Progress bar */}
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-cyan-500/20"
                style={{ width: `${percentage}%` }}
              />

              {/* Phase markers */}
              {phases.map((p, i) => {
                const xPos = (p.year / maxYears) * 100;
                const isActive = years >= p.year;
                return (
                  <div key={i} className="absolute top-0 -translate-y-1/2 -translate-x-1/2" style={{ left: `${xPos}%` }}>
                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-700 ${isActive ? 'bg-black border-cyan-500 scale-125' : 'bg-black border-slate-700'}`} />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-32">
                      <span className={`text-[8px] font-black uppercase tracking-widest transition-colors duration-500 ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>
                        {p.label}
                      </span>
                      <span className="text-[7px] font-mono text-slate-500">Year {p.year}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-12 text-center relative z-10">
            <h2 className="text-6xl font-black italic tracking-tighter text-slate-100 italic">
              {years} <span className="text-xl text-slate-300 not-italic uppercase tracking-[0.2em] font-black ml-2">Estimated Years</span>
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-300 mt-4 max-w-lg mx-auto leading-relaxed">
              Calculated time required for an automated adversarial agent to reconstruct 95% of your digital footprint from available OSINT nodes.
            </p>
          </div>
        </Card>

        {/* Phase Details Sidebar */}
        <div className="space-y-6">
          <Card className="p-8 bg-black/40 border-white/10 border-2 space-y-8 flex-1">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Active Stage</p>
              <h3 className="text-xl font-black tracking-tighter text-slate-100 uppercase italic">
                {phases[currentPhaseIndex]?.label || 'Initialization'}
              </h3>
            </div>

            <div className="space-y-4">
              {phases.map((p, i) => {
                const isActive = years >= p.year;
                const Icon = p.icon;
                return (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${isActive ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-transparent border-transparent opacity-40 grayscale'}`}>
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-cyan-500/10 text-cyan-400' : 'bg-black/40 text-slate-500'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-slate-100' : 'text-slate-400'}`}>Stage {i + 1}: {p.label}</h4>
                      <p className="text-[9px] font-bold text-slate-300 leading-relaxed uppercase tracking-wider">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TimelineEstimation;
