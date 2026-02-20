import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function CorrelationDepth() {
  const { analysisResult } = useAnalysis();
  const depth = analysisResult?.risk_assessment?.correlation_depth;

  if (typeof depth !== 'number') {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Correlation depth score
      </h2>
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-md shadow-slate-950/40">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Depth of inferred correlations
        </div>
        <div className="mt-4 text-5xl font-semibold text-cyan-300">
          {depth}
        </div>
      </div>
    </div>
  );
}

export default CorrelationDepth;
