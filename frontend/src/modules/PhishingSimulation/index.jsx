import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function PhishingSimulation() {
  const { analysisResult } = useAnalysis();
  const simulation = analysisResult?.phishing_simulation;

  const subject = simulation?.email_subject;
  const body = simulation?.email_body;

  if (!subject && !body) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight text-slate-50">
        Phishing email simulation
      </h2>
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
        {subject ? (
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Subject
            </div>
            <div className="mt-1 text-sm text-slate-100">{subject}</div>
          </div>
        ) : null}
        {body ? (
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Email body
            </div>
            <pre className="mt-1 overflow-x-auto rounded-lg bg-slate-950/80 p-4 text-xs text-slate-200">
              {body}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PhishingSimulation;
