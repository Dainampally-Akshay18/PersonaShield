import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function VisibilityScore() {
  const { analysisResult } = useAnalysis();
  const visibility = analysisResult?.risk_assessment?.visibility_score;

  if (typeof visibility !== 'number') {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Public visibility score
      </h2>
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-md shadow-slate-950/40">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
          How visible your profile is publicly
        </div>
        <div className="mt-4 text-5xl font-semibold text-cyan-300">
          {visibility}
        </div>
      </div>
    </div>
  );
}

export default VisibilityScore;
