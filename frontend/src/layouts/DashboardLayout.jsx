import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAnalysis } from '../contexts/AnalysisContext';

function DashboardLayout() {
  const { analysisResult } = useAnalysis();

  const analysisId = analysisResult?.analysis_id;
  const timestamp = analysisResult?.input_summary?.timestamp;
  const riskScore = analysisResult?.risk_assessment?.risk_score;
  const riskLevel = analysisResult?.risk_assessment?.risk_level;

  let riskLevelClasses =
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium';

  if (riskLevel === 'High') {
    riskLevelClasses +=
      ' border-red-500/60 bg-red-500/10 text-red-300';
  } else if (riskLevel === 'Moderate') {
    riskLevelClasses +=
      ' border-amber-500/60 bg-amber-500/10 text-amber-200';
  } else if (riskLevel === 'Low') {
    riskLevelClasses +=
      ' border-emerald-500/60 bg-emerald-500/10 text-emerald-200';
  } else {
    riskLevelClasses +=
      ' border-slate-600 bg-slate-800/60 text-slate-200';
  }

  return (
    <div className="mt-6 flex gap-6">
      <aside className="w-64 shrink-0">
        <Sidebar />
      </aside>
      <section className="flex-1 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/40">
        <header className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-50">
              Analysis overview
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              {analysisId ? <span>ID: {analysisId}</span> : null}
              {timestamp ? (
                <span className="text-slate-500">• {timestamp}</span>
              ) : null}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {typeof riskScore === 'number' ? (
              <div className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">
                Risk score
                <span className="ml-2 text-sm text-cyan-100">
                  {riskScore}
                </span>
              </div>
            ) : null}
            {riskLevel ? (
              <span className={riskLevelClasses}>{riskLevel}</span>
            ) : null}
          </div>
        </header>
        <Outlet />
      </section>
    </div>
  );
}

export default DashboardLayout;
