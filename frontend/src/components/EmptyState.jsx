import { ShieldAlert } from 'lucide-react';
import { Card } from './UI';

function EmptyState({ message = 'Heuristic nodes not yet established' }) {
  return (
    <Card className="border-dashed border-2 border-white/10 bg-black/40 p-12 text-center flex flex-col items-center gap-6 group hover:border-cyan-500/20 transition-all duration-500">
      <div className="p-4 bg-black border border-white/5 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
        <ShieldAlert className="w-12 h-12 text-slate-500 group-hover:text-cyan-500" />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-slate-300 transition-colors italic">
          {message}
        </p>
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest max-w-xs mx-auto">
          Please initiate an intelligence ingestion sequence via the terminal to populate these data points.
        </p>
      </div>
    </Card>
  );
}

export default EmptyState;
