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

  const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#ec4899'];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart Analysis */}
        <Card className="p-8 space-y-6 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Factor Distribution</h3>
            </div>
            <Badge variant="primary">Heuristic Logic</Badge>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#dbeafe" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  fontSize={10}
                  fontWeight="bold"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fill: '#64748b' }}
                />
                <YAxis stroke="#64748b" fontSize={10} fontWeight="bold" tick={{ fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#2563eb', fontSize: '12px', fontWeight: 'bold' }}
                  labelStyle={{ color: '#64748b', fontSize: '10px', textTransform: 'uppercase', marginBottom: '4px' }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart Analysis */}
        <Card className="p-8 space-y-6 bg-white border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200">
                <PieIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Weighted Contribution</h3>
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
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1f2937' }}
                />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  formatter={(value) => <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Numerical Breakdown table */}
      <Card className="overflow-hidden bg-white border-slate-200">
        <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Entity Score Matrix</h3>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 italic">Score values are normalized to 100-max heuristic scale</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-700">
                <th className="px-8 py-4">Risk Factor Identifier</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Heuristic Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.entries(scoreBreakdown).map(([key, value], i) => (
                <tr key={key} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors uppercase tracking-widest">
                      {key.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <Badge variant={value > 15 ? 'danger' : value > 10 ? 'warning' : 'success'}>
                      {value > 15 ? 'Critical' : value > 10 ? 'High' : 'Normal'}
                    </Badge>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <span className="font-mono text-sm font-black text-slate-900 italic">
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
