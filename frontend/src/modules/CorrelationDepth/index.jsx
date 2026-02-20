import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function CorrelationDepth() {
  const { analysisResult } = useAnalysis();
  const depth = analysisResult?.risk_assessment?.correlation_depth;

  if (typeof depth !== 'number') {
    return <EmptyState />;
  }

  const maxDepth = 10;
  const percentage = ((depth / maxDepth) * 100).toFixed(1);
  
  const data = [
    { name: 'Correlation Depth', value: depth },
    { name: 'Remaining', value: maxDepth - depth }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 mb-4">
          Correlation depth score
        </h2>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 shadow-md shadow-slate-950/40">
          <div className="flex flex-col items-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell fill="#06b6d4" />
                    <Cell fill="#334155" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm font-medium text-slate-300 mb-2">Correlation depth progress</div>
              <div className="text-3xl font-semibold text-cyan-300">{depth} / {maxDepth}</div>
              <div className="text-xs text-slate-400 mt-1">{percentage}% correlated</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-50">
          Correlation depth score
        </h3>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-md shadow-slate-950/40">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Depth of inferred correlations
          </div>
          <div className="mt-4 text-5xl font-semibold text-cyan-300">
            {depth}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorrelationDepth;
