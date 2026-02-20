import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function DigitalTwin() {
  const { analysisResult } = useAnalysis();

  const explanation = analysisResult?.explanation?.explanation;
  const narrative = analysisResult?.persona_simulation?.narrative;
  const primaryThreats = analysisResult?.attack_analysis?.primary_threats;
  const riskLevel = analysisResult?.risk_assessment?.risk_level;
  const scoreBreakdown = analysisResult?.risk_assessment?.score_breakdown;

  const hasData =
    explanation || narrative || (Array.isArray(primaryThreats) && primaryThreats.length > 0);

  if (!hasData) {
    return <EmptyState />;
  }

  const getRiskLevelColor = (level) => {
    const lev = level?.toLowerCase() || '';
    if (lev.includes('critical') || lev.includes('very high')) {
      return { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-300', icon: '🔴' };
    }
    if (lev.includes('high')) {
      return { bg: 'bg-orange-900/30', border: 'border-orange-700', text: 'text-orange-300', icon: '🟠' };
    }
    if (lev.includes('medium')) {
      return { bg: 'bg-amber-900/30', border: 'border-amber-700', text: 'text-amber-300', icon: '🟡' };
    }
    return { bg: 'bg-yellow-900/30', border: 'border-yellow-700', text: 'text-yellow-300', icon: '🟢' };
  };

  const topRisks = scoreBreakdown
    ? Object.entries(scoreBreakdown)
        .map(([key, value]) => ({
          name: key.replace(/_/g, ' '),
          value: typeof value === 'number' ? value : 0,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 4)
    : [];

  const riskColor = getRiskLevelColor(riskLevel);

  const splitParagraphs = (text) => {
    if (!text) return [];
    return text
      .split(/\n\n+/)
      .map((para) => para.trim())
      .filter((para) => para.length > 0);
  };

  const paragraphs = splitParagraphs(explanation);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Top Banner */}
      <div className={`rounded-xl border-2 ${riskColor.border} ${riskColor.bg} p-8 shadow-lg shadow-slate-950/40`}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight text-slate-50 leading-tight">
              An attacker can realistically profile you
            </h1>
            <p className="mt-3 text-lg text-slate-300">
              Your digital footprint reveals more than you think. Here's the threat story.
            </p>
          </div>
          <div className={`rounded-lg border ${riskColor.border} ${riskColor.bg} px-4 py-3 text-center shrink-0`}>
            <div className="text-3xl mb-1">{riskColor.icon}</div>
            <div className={`text-sm font-semibold uppercase tracking-wide ${riskColor.text}`}>
              {riskLevel || 'Unknown'}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            This report shows how an attacker could use the information from your resume to infer your digital identity, target you with social engineering, and exploit your presence online.
          </p>
        </div>
      </div>

      {/* Section 1: How a scammer sees you */}
      {narrative && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">
            How a scammer sees you
          </h2>
          <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-8 shadow-md shadow-slate-950/40">
            <p className="text-base leading-relaxed text-slate-300 whitespace-pre-wrap">
              {narrative}
            </p>
          </div>
        </section>
      )}

      {/* Section 2: How attack happens */}
      {Array.isArray(primaryThreats) && primaryThreats.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">
            How the attack happens
          </h2>
          <div className="space-y-3">
            {primaryThreats.map((threat, index) => (
              <div
                key={index}
                className="flex gap-4 rounded-xl border border-slate-700 bg-slate-900/50 p-6 shadow-md shadow-slate-950/40"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-900/40 border border-cyan-700">
                  <span className="text-sm font-bold text-cyan-300">{index + 1}</span>
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="text-base font-semibold text-slate-50 mb-1">
                    {threat.step || threat.threat || threat}
                  </h3>
                  {threat.description && (
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {threat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Real world impact */}
      {paragraphs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">
            Real-world impact
          </h2>
          <div className="space-y-5 rounded-xl border border-slate-700 bg-slate-900/50 p-8 shadow-md shadow-slate-950/40">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-slate-300 whitespace-pre-wrap"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: What you should fix first */}
      {topRisks.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-50">
            What you should fix first
          </h2>
          <div className="space-y-2">
            {topRisks.map((risk, index) => (
              <div
                key={risk.name}
                className="rounded-xl border border-slate-700 bg-slate-900/50 p-5 shadow-md shadow-slate-950/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-900/40 border border-amber-700">
                      <span className="text-xs font-bold text-amber-300">P{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-50 capitalize">
                        {risk.name}
                      </h3>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-bold text-cyan-300">
                      {risk.value}
                    </div>
                    <div className="text-xs text-slate-500">risk score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer guidance */}
      <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-6 shadow-md shadow-slate-950/40">
        <h3 className="text-lg font-semibold text-slate-50 mb-2">Next steps</h3>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>Review your social media privacy settings</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>Remove or anonymize personal information from public profiles</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>Check which online services have your email listed</span>
          </li>
          <li className="flex gap-2">
            <span className="text-cyan-400">•</span>
            <span>Enable two-factor authentication on critical accounts</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DigitalTwin;
