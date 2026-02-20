import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function AttackVectors() {
  const { analysisResult } = useAnalysis();
  const attackVectors = analysisResult?.attack_analysis?.attack_vectors;

  if (!Array.isArray(attackVectors) || attackVectors.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Attack vector categorization
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {attackVectors.map((vector, index) => {
          const contributing =
            Array.isArray(vector.contributing_factors) ||
            typeof vector.contributing_factors === 'string'
              ? vector.contributing_factors
              : [];

          return (
            <article
              key={`${vector.category || 'vector'}-${index}`}
              className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-200 shadow-md shadow-slate-950/40"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-50">
                  {vector.category || 'Unknown category'}
                </h3>
                {vector.severity ? (
                  <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs font-medium text-slate-200">
                    {vector.severity}
                  </span>
                ) : null}
              </div>
              {contributing && contributing.length !== 0 ? (
                <div className="mt-3">
                  <div className="text-xs font-medium text-slate-400">
                    Contributing factors
                  </div>
                  {Array.isArray(contributing) ? (
                    <ul className="mt-1 list-disc space-y-1 pl-4 text-xs text-slate-300">
                      {contributing.map((item, factorIndex) => (
                        <li key={factorIndex}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-xs text-slate-300">
                      {contributing}
                    </p>
                  )}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default AttackVectors;
