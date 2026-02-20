import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { ShieldAlert, AlertTriangle, Zap, ShieldCheck, ChevronRight, Info } from 'lucide-react';

function AttackVectors() {
  const { analysisResult } = useAnalysis();
  const attackVectors = analysisResult?.attack_analysis?.attack_vectors;

  if (!Array.isArray(attackVectors) || attackVectors.length === 0) {
    return <EmptyState />;
  }

  const getSeverityData = (severity) => {
    const sev = severity?.toLowerCase() || '';
    if (sev.includes('high')) return { color: 'danger', icon: AlertTriangle, label: 'Critical' };
    if (sev.includes('medium')) return { color: 'warning', icon: Zap, label: 'Moderate' };
    if (sev.includes('low')) return { color: 'success', icon: ShieldCheck, label: 'Minimal' };
    return { color: 'default', icon: Info, label: 'Informational' };
  };

  const severityStats = {
    high: attackVectors.filter(v => v.severity?.toLowerCase().includes('high')).length,
    medium: attackVectors.filter(v => v.severity?.toLowerCase().includes('medium')).length,
    low: attackVectors.filter(v => v.severity?.toLowerCase().includes('low')).length,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-red-500/20 bg-red-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400">High Severity</p>
            <h4 className="text-3xl font-black text-slate-100 italic">{severityStats.high}</h4>
          </div>
        </Card>
        <Card className="p-6 border-amber-500/20 bg-amber-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <Zap className="w-16 h-16 text-amber-500" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">Medium Severity</p>
            <h4 className="text-3xl font-black text-slate-100 italic">{severityStats.medium}</h4>
          </div>
        </Card>
        <Card className="p-6 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <ShieldCheck className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Low Severity</p>
            <h4 className="text-3xl font-black text-slate-100 italic">{severityStats.low}</h4>
          </div>
        </Card>
      </div>

      {/* Vectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {attackVectors.map((vector, index) => {
          const sev = getSeverityData(vector.severity);
          const Icon = sev.icon;
          const factors = Array.isArray(vector.contributing_factors)
            ? vector.contributing_factors
            : typeof vector.contributing_factors === 'string'
              ? [vector.contributing_factors]
              : [];

          return (
            <Card key={index} className="flex flex-col group" hover>
              <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg bg-black border border-white/5 transition-transform duration-500 group-hover:-rotate-6 shadow-xl shadow-black/40`}>
                    <Icon className={`w-5 h-5 ${sev.color === 'danger' ? 'text-red-500' : sev.color === 'warning' ? 'text-amber-500' : 'text-emerald-500'}`} />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 leading-tight">
                    {vector.category || 'Unknown Vector'}
                  </h3>
                </div>
                <Badge variant={sev.color}>{sev.label}</Badge>
              </div>

              <div className="p-6 flex-1 space-y-4 bg-black/40">
                <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                  Synthesized probability factor based on correlated persona data.
                </p>

                {factors.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-cyan-500" /> Contributing Factors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {factors.map((f, fi) => (
                        <span key={fi} className="px-3 py-1 bg-black/60 border border-white/5 rounded-md text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default AttackVectors;
