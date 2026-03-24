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
  const entities = analysisResult?.entities || {};
  const visibilityScore = analysisResult?.risk_assessment?.visibility_score || 0;

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

  // Convert extracted entities into displayable nodes
  const extractedNodes = [];
  const entityColors = {
    emails: 'text-blue-600',
    phones: 'text-blue-500',
    company: 'text-indigo-600',
    job_title: 'text-emerald-600',
    location: 'text-amber-600',
    college: 'text-rose-600',
    graduation_year: 'text-orange-600',
    skills: 'text-purple-600',
    dob: 'text-red-600',
  };

  Object.entries(entities).forEach(([key, value]) => {
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      const count = Array.isArray(value) ? value.length : 1;
      const weight = count > 2 ? 'High' : count > 0 ? 'Med' : 'Low';
      const displayName = key.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      
      extractedNodes.push({
        name: displayName,
        weight,
        color: entityColors[key] || 'text-slate-400',
        count
      });
    }
  });

  // Calculate synthetic confidence based on visibility score
  const syntheticConfidence = Math.round(visibilityScore)

  return (
    <div className="space-y-12">
      {/* Top Reconstruction Banner */}
      <Card className="p-12 space-y-8 relative overflow-hidden group bg-white border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
          <Fingerprint className="w-64 h-64" />
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 relative z-10">
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <Badge variant={getRiskColor(riskLevel)} className="px-4">Adversarial Priority: {riskLevel}</Badge>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-tight">
                ENTITY <span className="text-blue-600 italic">RECONSTRUCTION</span>
              </h1>
            </div>
            <p className="text-lg text-slate-700 font-medium leading-relaxed max-w-2xl">
              Your digital twin is a high-fidelity synthetic model derived from correlated intelligence.
              Below are the primary nodes an attacker would use to verify your identity.
            </p>
          </div>

          <Card className="bg-blue-50 border-blue-200 p-8 text-center space-y-4 shrink-0 min-w-[200px]">
            <div className="flex justify-center">
              <div className="p-4 bg-blue-100 rounded-full border border-blue-300">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Synthetic Confidence</p>
              <p className="text-3xl font-black italic tracking-tighter text-slate-900">{syntheticConfidence}%</p>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Entity Cloud */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-8 space-y-8 h-full bg-white border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 border border-slate-300 rounded-lg text-blue-600">
                <Network className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Node Cluster</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {extractedNodes.length > 0 ? (
                extractedNodes.map((e, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 rounded-xl bg-slate-100 border border-slate-300 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:border-blue-400 cursor-default ${e.color}`}
                    title={`${e.count} ${e.name.toLowerCase()}`}
                  >
                    {e.name}
                  </div>
                ))
              ) : (
                <p className="text-[10px] text-slate-500 italic">No entities extracted</p>
              )}
            </div>

            <div className="pt-8 border-t border-slate-200 space-y-4">
              <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-600">
                <span>Reconstruction Depth</span>
                <span>High Fidelity</span>
              </div>
              <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right: Narrative/Explanation */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 space-y-6 h-full relative overflow-hidden bg-white border-slate-200">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 border border-slate-300 rounded-lg text-blue-600">
                <User className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 italic">Analytical Narrative</h3>
            </div>

            <div className="space-y-6">
              {explanation && (
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                  <p className="text-sm text-slate-800 leading-relaxed italic font-medium">
                    {explanation}
                  </p>
                </div>
              )}
              {narrative && (
                <div className="p-6 bg-slate-50 rounded-2xl space-y-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Adversarial Projection</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold uppercase tracking-widest">
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
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-xl font-black uppercase tracking-tighter italic">Attack Vector Sequence</h2>
            </div>
            <div className="h-px bg-red-200 flex-1 mx-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {primaryThreats.map((threat, index) => (
              <Card key={index} className="p-6 flex gap-6 hover:border-red-300 transition-colors group bg-white border-slate-200">
                <div className="w-12 h-12 shrink-0 bg-red-100 border border-red-300 flex items-center justify-center rounded-2xl text-xl font-black italic text-red-600 group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
                    {threat.step || threat.threat || threat}
                  </h3>
                  {threat.description && (
                    <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest leading-relaxed">
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
      <Card className="p-8 bg-blue-50 border-blue-200 border-2 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">Priority hardening</h3>
          </div>
          <ul className="space-y-2">
            {['Review PII Exposure', 'Anonymize Geographic data', 'Enable Hardware 2FA', 'Limit Skill keywords'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-700">
                <span className="w-1 h-1 bg-blue-600 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 italic">System Status</h3>
          </div>
          <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest leading-relaxed">
            All adversarial modeling is complete. Hardening metrics have been updated in the global risk index.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default DigitalTwin;
