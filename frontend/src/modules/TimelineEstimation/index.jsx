import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';

function TimelineEstimation() {
  const { analysisResult } = useAnalysis();
  const years = analysisResult?.risk_assessment?.timeline_years;

  if (typeof years !== 'number') {
    return <EmptyState />;
  }

  const maxYears = 10;
  const percentage = ((years / maxYears) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-slate-50 mb-4">
          Exposure timeline estimation
        </h2>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-6 shadow-md shadow-slate-950/40">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-slate-300">Timeline to full profile inference</div>
              <div className="text-2xl font-semibold text-cyan-300">{years} years</div>
            </div>
            
            <div className="w-full">
              <div className="relative h-8 overflow-hidden rounded-lg bg-slate-800/50 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out flex items-center justify-end pr-3"
                  style={{ width: `${percentage}%` }}
                >
                  {percentage > 10 && <span className="text-xs font-semibold text-white">{percentage}%</span>}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between text-xs text-slate-400">
              <div className="flex flex-col items-start">
                <span>Now</span>
                <span className="text-slate-500">0 years</span>
              </div>
              <div className="flex flex-col items-center">
                <span>5 years</span>
              </div>
              <div className="flex flex-col items-end">
                <span>Complete</span>
                <span className="text-slate-500">{maxYears} years</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-slate-900/80 px-3 py-2">
              <div className="text-xs text-slate-400">Exposure phase</div>
              <div className="text-sm font-semibold text-cyan-300 mt-1">
                {years <= 3 ? 'Early' : years <= 6 ? 'Active' : 'Mature'}
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/80 px-3 py-2">
              <div className="text-xs text-slate-400">Time remaining</div>
              <div className="text-sm font-semibold text-cyan-300 mt-1">
                {Math.max(0, maxYears - years)} years
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/80 px-3 py-2">
              <div className="text-xs text-slate-400">Risk velocity</div>
              <div className="text-sm font-semibold text-cyan-300 mt-1">
                {(years / maxYears * 100).toFixed(0)}%/year
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight text-slate-50">
          Exposure timeline estimation
        </h3>
        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-md shadow-slate-950/40">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Estimated years to infer full profile
          </div>
          <div className="mt-4 text-5xl font-semibold text-cyan-300">
            {years}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineEstimation;
