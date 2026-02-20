import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function VisibilityScore() {
  const { analysisResult } = useAnalysis();
  const visibility = analysisResult?.risk_assessment?.visibility_score;

  if (typeof visibility !== 'number') {
    return <EmptyState />;
  }

  const maxScore = 10;
  const percentage = ((visibility / maxScore) * 100).toFixed(1);
  
  const data = [
    { name: 'Visibility', value: visibility },
    { name: 'Remaining', value: maxScore - visibility }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 mb-4">
          Public visibility score
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
                    <Cell fill="#0ea5e9" />
                    <Cell fill="#334155" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <div className="text-sm font-medium text-slate-300 mb-2">Visibility exposure level</div>
              <div className="text-3xl font-semibold text-cyan-300">{visibility} / {maxScore}</div>
              <div className="text-xs text-slate-400 mt-1">{percentage}% publicly visible</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-50">
          Public visibility score
        </h3>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-md shadow-slate-950/40">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            How visible your profile is publicly
          </div>
          <div className="mt-4 text-5xl font-semibold text-cyan-300">
            {visibility}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisibilityScore;
