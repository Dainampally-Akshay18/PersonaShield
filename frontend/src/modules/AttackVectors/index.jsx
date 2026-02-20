import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function AttackVectors() {
  const { analysisResult } = useAnalysis();
  const attackVectors = analysisResult?.attack_analysis?.attack_vectors;

  if (!Array.isArray(attackVectors) || attackVectors.length === 0) {
    return <EmptyState />;
  }

  const getSeverityColor = (severity) => {
    const sev = severity?.toLowerCase() || '';
    if (sev.includes('high')) return { bg: 'bg-red-900/20', border: 'border-red-700', text: 'text-red-300', label: 'bg-red-900 border-red-700 text-red-200' };
    if (sev.includes('medium')) return { bg: 'bg-amber-900/20', border: 'border-amber-700', text: 'text-amber-300', label: 'bg-amber-900 border-amber-700 text-amber-200' };
    if (sev.includes('low')) return { bg: 'bg-green-900/20', border: 'border-green-700', text: 'text-green-300', label: 'bg-green-900 border-green-700 text-green-200' };
    return { bg: 'bg-slate-900/20', border: 'border-slate-700', text: 'text-slate-300', label: 'bg-slate-900 border-slate-700 text-slate-200' };
  };

  const severityCounts = {
    high: attackVectors.filter(v => v.severity?.toLowerCase().includes('high')).length,
    medium: attackVectors.filter(v => v.severity?.toLowerCase().includes('medium')).length,
    low: attackVectors.filter(v => v.severity?.toLowerCase().includes('low')).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 mb-4">
          Attack vector categorization
        </h2>
        
        <div className="grid gap-3 md:grid-cols-3 mb-6">
          <div className="rounded-xl border border-red-700/50 bg-red-900/10 p-4 shadow-md shadow-slate-950/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-red-300">High severity</div>
                <div className="text-2xl font-semibold text-red-300 mt-2">{severityCounts.high}</div>
              </div>
              <div className="text-3xl opacity-20">⚠️</div>
            </div>
          </div>
          <div className="rounded-xl border border-amber-700/50 bg-amber-900/10 p-4 shadow-md shadow-slate-950/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-amber-300">Medium severity</div>
                <div className="text-2xl font-semibold text-amber-300 mt-2">{severityCounts.medium}</div>
              </div>
              <div className="text-3xl opacity-20">⚡</div>
            </div>
          </div>
          <div className="rounded-xl border border-green-700/50 bg-green-900/10 p-4 shadow-md shadow-slate-950/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-green-300">Low severity</div>
                <div className="text-2xl font-semibold text-green-300 mt-2">{severityCounts.low}</div>
              </div>
              <div className="text-3xl opacity-20">✓</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-50">
          Attack vector categorization
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
        {attackVectors.map((vector, index) => {
          const contributing =
            Array.isArray(vector.contributing_factors) ||
            typeof vector.contributing_factors === 'string'
              ? vector.contributing_factors
              : [];
          const sevColor = getSeverityColor(vector.severity);

          return (
            <article
              key={`${vector.category || 'vector'}-${index}`}
              className={`rounded-xl border ${sevColor.border} ${sevColor.bg} p-5 text-sm ${sevColor.text} shadow-md shadow-slate-950/40`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-50">
                  {vector.category || 'Unknown category'}
                </h3>
                {vector.severity ? (
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${sevColor.label}`}>
                    {vector.severity}
                  </span>
                ) : null}
              </div>
              {contributing && contributing.length !== 0 ? (
                <div className="mt-3">
                  <div className={`text-xs font-medium ${sevColor.text} opacity-75`}>
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
    </div>
  );
}

export default AttackVectors;
