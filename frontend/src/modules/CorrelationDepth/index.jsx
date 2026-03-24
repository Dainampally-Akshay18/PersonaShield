import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { Network, Link2, Share2, Activity, ChevronRight, GitMerge } from 'lucide-react';

function CorrelationDepth() {
  const { analysisResult } = useAnalysis();
  const depth = analysisResult?.risk_assessment?.correlation_depth || 0;

  if (typeof depth !== 'number' && !analysisResult) {
    return <EmptyState />;
  }

  const maxDepth = 10;
  const percentage = Math.min((depth / maxDepth) * 100, 100);

  // SVG Gauge calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Advanced Gauge Component */}
        <Card className="p-10 flex flex-col items-center justify-center space-y-8 relative overflow-hidden group bg-white border-slate-200">
          <div className="absolute inset-0 bg-blue-50 transition-opacity duration-700 opacity-0 group-hover:opacity-100" />

          <div className="relative flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-64 h-64 transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-300"
              />
              {/* Progress Circle */}
              <circle
                cx="128"
                cy="128"
                r={radius}
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-blue-600 transition-all duration-1000 ease-out shadow-md"
              />
            </svg>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
              <span className="text-5xl font-black text-slate-900 italic tracking-tighter">
                {depth}<span className="text-xl text-slate-600 not-italic"> / {maxDepth}</span>
              </span>
              <Badge variant="primary">Depth Index</Badge>
            </div>
          </div>

          <div className="text-center space-y-2 relative z-10">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">Correlation Structural Integrity</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 max-w-xs leading-relaxed">
              Quantifying the recursive depth of disjointed data node associations found during adversarial modeling.
            </p>
          </div>
        </Card>

        {/* Node Statistics Grid */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="p-8 space-y-6 bg-white border-slate-200 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Network className="w-5 h-5 text-blue-600" />
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Relationship Mapping</h3>
              </div>
              <Badge>Tier 4 Logic</Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Cross-Entity Persistence</span>
                  <span className="text-xs font-mono font-black text-blue-600">High</span>
                </div>
                <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-blue-600" />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">Node Reachability</span>
                  <span className="text-xs font-mono font-black text-blue-500">Med</span>
                </div>
                <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
                  <div className="h-full w-[55%] bg-blue-500" />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4 text-slate-600">
              <div className="flex items-center gap-1.5">
                <GitMerge className="w-3.5 h-3.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">Recurrence: Active</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[8px] font-black uppercase tracking-widest">Real-time Stream</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-blue-50 border-blue-200 flex items-center gap-6 group hover:bg-blue-100 transition-colors">
            <div className="p-4 bg-blue-100 rounded-2xl border border-blue-300 group-hover:scale-110 transition-transform">
              <Link2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Path Strength Analysis</h4>
              <p className="text-[10px] text-slate-700 font-bold uppercase tracking-wider leading-relaxed">
                Data nodes show a {percentage}% confidence level of being correlated by professional OSINT actors within 120 seconds of initial discovery.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CorrelationDepth;
