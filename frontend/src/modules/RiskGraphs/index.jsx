import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RiskGraphs() {
  const { analysisResult } = useAnalysis();

  const riskAssessment = analysisResult?.risk_assessment;
  const riskScore = riskAssessment?.risk_score;
  const scoreBreakdown = riskAssessment?.score_breakdown;

  const hasData =
    riskAssessment && typeof riskScore === 'number' && scoreBreakdown;

  if (!hasData) {
    return <EmptyState />;
  }

  const chartData = Object.entries(scoreBreakdown).map(([key, value]) => ({
    name: key.replace(/_/g, ' '),
    value: typeof value === 'number' ? value : 0,
  }));

  const totalScore = chartData.reduce((sum, item) => sum + item.value, 0);
  const pieData = chartData.map((item) => ({
    ...item,
    percentage: totalScore > 0 ? ((item.value / totalScore) * 100).toFixed(1) : 0,
  }));

  const colors = ['#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 mb-4">
          Risk score breakdown
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
            <div className="text-sm font-medium text-slate-300 mb-4">Score contributions by factor</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '0.5rem' }} labelStyle={{ color: '#e2e8f0' }} />
                <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
            <div className="text-sm font-medium text-slate-300 mb-4">Contribution percentages</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => name + ': ' + percentage + '%'} outerRadius={80} fill="#06b6d4" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '0.5rem' }} labelStyle={{ color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-50">
          Risk score breakdown
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
            <div className="text-sm font-medium text-slate-300">
              Overall risk score
            </div>
            <div className="mt-3 text-4xl font-semibold text-cyan-300">
              {riskScore}
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
            <div className="mb-3 text-sm font-medium text-slate-300">
              Score contributions
            </div>
            <div className="overflow-x-auto text-sm">
              <table className="min-w-full border-separate border-spacing-y-1 text-left">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-400">
                    <th className="px-2 py-1.5">Factor</th>
                    <th className="px-2 py-1.5 text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(scoreBreakdown).map(([key, value]) => (
                    <tr
                      key={key}
                      className="rounded-md bg-slate-900/80 text-slate-100"
                    >
                      <td className="px-2 py-1.5 text-xs">
                        {key.replace(/_/g, ' ')}
                      </td>
                      <td className="px-2 py-1.5 text-right text-xs text-slate-200">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskGraphs;
