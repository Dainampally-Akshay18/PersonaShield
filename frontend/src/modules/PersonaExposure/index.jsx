import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function PersonaExposure() {
  const { analysisResult } = useAnalysis();
  const narrative = analysisResult?.persona_simulation?.narrative;

  if (!narrative) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Attacker persona narrative
      </h2>
      <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-200 shadow-md shadow-slate-950/40">
        <p className="whitespace-pre-line leading-relaxed">{narrative}</p>
      </div>
    </div>
  );
}

export default PersonaExposure;
