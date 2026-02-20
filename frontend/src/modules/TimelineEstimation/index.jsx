import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function TimelineEstimation() {
  const { analysisResult } = useAnalysis();
  const years = analysisResult?.risk_assessment?.timeline_years;

  if (typeof years !== 'number') {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Exposure timeline estimation
      </h2>
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-md shadow-slate-950/40">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Estimated years to infer full profile
        </div>
        <div className="mt-4 text-5xl font-semibold text-cyan-300">
          {years}
        </div>
      </div>
    </div>
  );
}

export default TimelineEstimation;
