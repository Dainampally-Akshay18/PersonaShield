import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Risk score breakdown
      </h2>
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
  );
}

export default RiskGraphs;
