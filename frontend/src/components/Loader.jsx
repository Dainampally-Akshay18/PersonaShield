import React from 'react';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-slate-900 border-t-cyan-500 rounded-full animate-spin shadow-lg shadow-cyan-500/20" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-blue-500/30 rounded-full animate-pulse blur-sm" />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 animate-pulse italic">
          Synchronizing Matrix
        </p>
        <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest italic">
          Heuristic Engine Initializing...
        </p>
      </div>
    </div>
  );
}

export default Loader;
