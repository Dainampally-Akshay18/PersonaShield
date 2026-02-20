import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

function WeightedRiskScore() {
  const { analysisResult } = useAnalysis();
  const riskAssessment = analysisResult?.risk_assessment;
  const riskScore = riskAssessment?.risk_score;
  const scoreBreakdown = riskAssessment?.score_breakdown;

  const hasData =
    riskAssessment && typeof riskScore === 'number' && scoreBreakdown;

  if (!hasData) {
    return <EmptyState />;
  }

  const totalScore = Object.values(scoreBreakdown).reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0);
  const chartData = [{
    name: 'Risk Score Distribution',
    ...Object.fromEntries(
      Object.entries(scoreBreakdown).map(([key, value]) => [
        key,
        typeof value === 'number' ? value : 0
      ])
    )
  }];

  const colors = ['#06b6d4', '#0ea5e9', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e'];
  const factors = Object.keys(scoreBreakdown);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 mb-4">
          Weighted risk scoring
        </h2>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40 mb-4">
          <div className="text-sm font-medium text-slate-300 mb-4">Risk weight distribution</div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 140, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" tick={{ fontSize: 12 }} width={130} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '0.5rem' }} labelStyle={{ color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              {factors.map((factor, index) => (
                <Bar key={factor} dataKey={factor} stackId="a" fill={colors[index % colors.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-50">
          Weighted risk scoring
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-1 rounded-xl border border-slate-800 bg-slate-900/70 p-6 text-center shadow-md shadow-slate-950/40">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total risk score
          </div>
          <div className="mt-4 text-5xl font-semibold text-cyan-300">
            {riskScore}
          </div>
        </div>
        <div className="md:col-span-2 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
          <div className="mb-3 text-sm font-medium text-slate-300">
            Component contributions
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {Object.entries(scoreBreakdown).map(([key, value]) => (
              <li
                key={key}
                className="flex items-center justify-between rounded-md bg-slate-900/80 px-3 py-2"
              >
                <span className="text-xs text-slate-300">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="text-xs font-medium text-cyan-200">
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default WeightedRiskScore;
