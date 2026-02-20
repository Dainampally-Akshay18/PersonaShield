import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { Gauge, ShieldAlert, Zap, Activity, Info, TrendingUp, AlertTriangle } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine
} from 'recharts';

function WeightedRiskScore() {
  const { analysisResult } = useAnalysis();
  const riskAssessment = analysisResult?.risk_assessment;
  const riskScore = riskAssessment?.risk_score || 0;
  const scoreBreakdown = riskAssessment?.score_breakdown;

  if (!riskAssessment || !scoreBreakdown) {
    return <EmptyState />;
  }

  const chartData = Object.entries(scoreBreakdown).map(([key, value]) => ({
    name: key.replace(/_/g, ' ').toUpperCase(),
    value: typeof value === 'number' ? value : 0,
  })).sort((a, b) => b.value - a.value);

  const riskLevel = riskScore > 75 ? 'Critical' : riskScore > 50 ? 'High' : riskScore > 25 ? 'Moderate' : 'Low';
  const riskColor = riskLevel === 'Critical' ? 'text-red-500' : riskLevel === 'High' ? 'text-amber-500' : 'text-cyan-500';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Risk Hero Card */}
        <Card className="lg:col-span-1 p-10 flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="w-32 h-32 bg-black border-2 border-cyan-500/30 rounded-full flex items-center justify-center relative z-10 shadow-2xl shadow-cyan-500/20">
              <Gauge className="w-16 h-16 text-cyan-500" />
            </div>
          </div>

          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Compound Index</p>
            <h2 className={`text-6xl font-black italic tracking-tighter text-slate-100`}>
              {riskScore}
            </h2>
            <Badge variant={riskLevel === 'Critical' ? 'danger' : 'primary'} className="mt-2 uppercase tracking-widest font-black">
              {riskLevel} Exposure
            </Badge>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300 leading-relaxed max-w-xs relative z-10">
            Weighted algorithmic quantification of adversarial risk across all discoverable intelligence nodes.
          </p>
        </Card>

        {/* Factor analysis bar chart */}
        <Card className="lg:col-span-2 p-10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black border border-white/5 rounded-lg">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-100 italic">Weighted Factorization</h3>
            </div>
            <Badge variant="outline" className="border-white/10 text-slate-500">Tier 4 Analysis</Badge>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 80, right: 30 }}>
                <defs>
                  <linearGradient id="weightedGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#475569"
                  fontSize={8}
                  fontWeight="black"
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase' }}
                />
                <Bar dataKey="value" fill="url(#weightedGradient)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Numerical Matrix */}
      <Card className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-cyan-500" />
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-100">Weighted Risk Matrix</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {chartData.map((item, i) => (
            <div key={i} className="p-5 bg-black/40 border border-white/5 rounded-2xl space-y-3 group hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </span>
                <Badge variant={item.value > 15 ? 'danger' : 'default'} className="scale-75 origin-top-right">
                  {((item.value / riskScore) * 100).toFixed(0)}%
                </Badge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black italic tracking-tighter text-slate-100">{item.value.toFixed(1)}</span>
                <span className="text-[10px] font-mono text-slate-400">/ 25.0</span>
              </div>
              <div className="h-0.5 w-full bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500/50" style={{ width: `${(item.value / 25) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-8 bg-red-500/5 border-red-500/10 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
        <div className="space-y-2">
          <h4 className="text-xs font-black uppercase tracking-widest text-red-400">Tactical Risk Warning</h4>
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest leading-relaxed">
            Your compound risk score has crossed the threshold for automated target selection by large-scale OSINT botnets.
            Immediate hardening of your "Shadow Entities" (disjointed personal and professional data points) is recommended to lower this index.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default WeightedRiskScore;
