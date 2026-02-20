import React, { useState, useEffect } from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge } from '../../components/UI';
import { Terminal, User, Shield, Share2, Info } from 'lucide-react';

function PersonaExposure() {
  const { analysisResult } = useAnalysis();
  const narrative = analysisResult?.persona_simulation?.narrative;
  const adversarialPersona = analysisResult?.persona_simulation?.adversarial_persona;

  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  // Typewriter effect for the narrative
  useEffect(() => {
    if (narrative && index < narrative.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + narrative[index]);
        setIndex(prev => prev + 1);
      }, 5); // Fast typing
      return () => clearTimeout(timeout);
    }
  }, [narrative, index]);

  if (!narrative) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Advesarial Persona Card */}
        <Card className="lg:col-span-1 p-8 space-y-6 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />

          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full scale-150 animate-pulse" />
            <div className="w-24 h-24 bg-black border-2 border-cyan-500/30 rounded-full flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
              <User className="w-12 h-12 text-cyan-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="danger" className="px-3">Threat Profile</Badge>
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-100 italic">
              {adversarialPersona || 'The Recon Analyst'}
            </h3>
          </div>

          <div className="w-full pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Skill Tier</p>
              <p className="text-xs font-mono font-bold text-slate-200 uppercase">Advanced</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase tracking-widest text-slate-400">Intent</p>
              <p className="text-xs font-mono font-bold text-slate-200 uppercase">Exfiltration</p>
            </div>
          </div>
        </Card>

        {/* Narrative Terminal */}
        <Card className="lg:col-span-3 bg-black/40 border-white/10 border-2 relative group flex flex-col">
          <div className="p-4 bg-black border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-500" />
              <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-500/70">adversary_recon_report.txt</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-cyan-500/30" />
            </div>
          </div>
          <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
            <div className="font-mono text-sm leading-relaxed text-slate-300 space-y-4">
              <p className="text-cyan-500/80 italic mb-4 font-bold border-l-2 border-cyan-500/30 pl-4 py-1">
                BEGIN ADVERSARIAL RECONNAISSANCE LOG...
              </p>
              <div className="whitespace-pre-line border-l border-white/5 pl-4 ml-0.5">
                {displayedText}
                <span className="w-2 h-4 bg-cyan-500 inline-block animate-pulse ml-1 align-middle" />
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/20 border-t border-white/5 flex items-center gap-4">
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">Encrypted Stream</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">Read Only Mode</span>
              </div>
            </div>
            <div className="ml-auto">
              <Info className="w-3.5 h-3.5 text-slate-700 hover:text-cyan-500 transition-colors cursor-help" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-8 bg-cyan-500/5 border-cyan-500/10 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-cyan-500" />
          <h4 className="text-sm font-black uppercase tracking-widest text-slate-100">Analytical Recommendation</h4>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed font-medium">
          This narrative is constructed by synthesizing your skill-to-location mapping and cross-referencing industry standard OSINT playbooks.
          To mitigate this exposure, consider decoupling your specific project keywords from your public geographic data points in professional profiles.
        </p>
      </Card>
    </div>
  );
}

export default PersonaExposure;
