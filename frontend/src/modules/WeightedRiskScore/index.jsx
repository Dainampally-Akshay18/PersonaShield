import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Weighted risk scoring
      </h2>
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
  );
}

export default WeightedRiskScore;
