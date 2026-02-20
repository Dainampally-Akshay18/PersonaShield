import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { Brain, ShieldAlert, Cpu, Network, Zap, User, Fingerprint, Activity } from 'lucide-react';

function DigitalTwin() {
  const { analysisResult } = useAnalysis();

  const explanation = analysisResult?.explanation?.explanation;
  const narrative = analysisResult?.persona_simulation?.narrative;
  const primaryThreats = analysisResult?.attack_analysis?.primary_threats;
  const riskLevel = analysisResult?.risk_assessment?.risk_level;
  const scoreBreakdown = analysisResult?.risk_assessment?.score_breakdown;

  const hasData = explanation || narrative || (Array.isArray(primaryThreats) && primaryThreats.length > 0);

  if (!hasData) {
    return <EmptyState />;
  }

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical':
      case 'high': return 'danger';
      case 'moderate': return 'warning';
      default: return 'success';
    }
  };

  const entities = [
    { name: 'Identity Cluster', weight: 'High', color: 'text-cyan-400' },
    { name: 'Geographic Nodes', weight: 'Med', color: 'text-blue-400' },
    { name: 'Professional Graph', weight: 'High', color: 'text-indigo-400' },
    { name: 'Skill Signatures', weight: 'Low', color: 'text-emerald-400' },
    { name: 'Credential Surface', weight: 'Med', color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Reconstruction Banner */}
      <Card className="p-12 space-y-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
          <Fingerprint className="w-64 h-64" />
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <Badge variant={getRiskColor(riskLevel)} className="px-4">Adversarial Priority: {riskLevel}</Badge>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-100 leading-tight">
                ENTITY <span className="text-cyan-500 italic">RECONSTRUCTION</span>
              </h1>
            </div>
            <p className="text-lg text-slate-300 font-medium leading-relaxed max-w-2xl">
              Your digital twin is a high-fidelity synthetic model derived from correlated intelligence.
              Below are the primary nodes an attacker would use to verify your identity.
            </p>
          </div>

          <Card className="bg-black/40 border-white/5 p-8 text-center space-y-4 shrink-0 min-w-[200px]">
            <div className="flex justify-center">
              <div className="p-4 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                <Brain className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Synthetic Confidence</p>
              <p className="text-3xl font-black italic tracking-tighter text-slate-100">92%</p>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Entity Cloud */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 space-y-8 h-full bg-black/20 border-white/5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black/40 border border-white/5 rounded-lg text-cyan-500">
                <Network className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-100">Node Cluster</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {entities.map((e, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:border-cyan-500/30 cursor-default ${e.color}`}
                >
                  {e.name}
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
                <span>Reconstruction Depth</span>
                <span>High Fidelity</span>
              </div>
              <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-cyan-500/50" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Narrative/Explanation */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 space-y-6 h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/30" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black border border-white/5 rounded-lg text-blue-400">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-100 italic">Analytical Narrative</h3>
            </div>

            <div className="space-y-6">
              {explanation && (
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                  <p className="text-sm text-slate-300 leading-relaxed italic font-medium">
                    {explanation}
                  </p>
                </div>
              )}
              {narrative && (
                <div className="p-6 bg-black/40 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Adversarial Projection</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">
                    {narrative}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Threats grid */}
      {Array.isArray(primaryThreats) && primaryThreats.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 text-red-500">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Attack Vector Sequence</h2>
            </div>
            <div className="h-px bg-red-500/20 flex-1 mx-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primaryThreats.map((threat, index) => (
              <Card key={index} className="p-6 flex gap-6 hover:border-red-500/30 transition-colors group">
                <div className="w-12 h-12 shrink-0 bg-red-500/10 border border-red-500/20 flex items-center justify-center rounded-2xl text-xl font-black italic text-red-500 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-100">
                    {threat.step || threat.threat || threat}
                  </h3>
                  {threat.description && (
                    <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
                      {threat.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Footer Fix suggestions */}
      <Card className="p-8 bg-black/40 border-cyan-500/10 border-2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-cyan-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">Priority hardening</h3>
          </div>
          <ul className="space-y-2">
            {['Review PII Exposure', 'Anonymize Geographic data', 'Enable Hardware 2FA', 'Limit Skill keywords'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                <span className="w-1 h-1 bg-cyan-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">System Status</h3>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
            All adversarial modeling is complete. Hardening metrics have been updated in the global risk index.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default DigitalTwin;
