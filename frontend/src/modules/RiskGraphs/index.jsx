import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Card, Badge } from '../../components/UI';
import { Activity, PieChart as PieIcon, BarChart3, Info } from 'lucide-react';

function RiskGraphs() {
  const { analysisResult } = useAnalysis();

  const riskAssessment = analysisResult?.risk_assessment;
  const scoreBreakdown = riskAssessment?.score_breakdown;

  const hasData = riskAssessment && scoreBreakdown;

  if (!hasData) {
    return <EmptyState />;
  }

  const chartData = Object.entries(scoreBreakdown).map(([key, value]) => ({
    name: key.replace(/_/g, ' ').toUpperCase(),
    value: typeof value === 'number' ? value : 0,
  }));

  const colors = ['#38bdf8', '#34d399', '#fbbf24', '#f43f5e', '#818cf8', '#e879f9'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Analysis */}
        <Card className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <BarChart3 className="w-5 h-5 text-cyan-500" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-100">Factor Distribution</h3>
            </div>
            <Badge variant="primary">Heuristic Logic</Badge>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#475569"
                  fontSize={10}
                  fontWeight="bold"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis stroke="#475569" fontSize={10} fontWeight="bold" tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.6)'
                  }}
                  itemStyle={{ color: '#06b6d4', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart Analysis */}
        <Card className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                <PieIcon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-100">Weighted Contribution</h3>
            </div>
            <Badge>Correlation Weight</Badge>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} className="outline-none hover:opacity-80 transition-opacity" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000000',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Numerical Breakdown table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-white/5 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-cyan-500" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-100">Entity Score Matrix</h3>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 italic">Score values are normalized to 100-max heuristic scale</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                <th className="px-8 py-4">Risk Factor Identifier</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Heuristic Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(scoreBreakdown).map(([key, value], i) => (
                <tr key={key} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">
                      {key.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <Badge variant={value > 15 ? 'danger' : value > 10 ? 'warning' : 'success'}>
                      {value > 15 ? 'Critical' : value > 10 ? 'High' : 'Normal'}
                    </Badge>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span className="font-mono text-sm font-black text-slate-100 italic">
                      {value?.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default RiskGraphs;
