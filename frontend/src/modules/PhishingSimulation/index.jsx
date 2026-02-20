import React from 'react';
import { useAnalysis } from '../../contexts/AnalysisContext';
import EmptyState from '../../components/EmptyState';
import { Card, Badge, Button } from '../../components/UI';
import { Mail, Send, User, ChevronRight, ShieldAlert, Clock, Flag } from 'lucide-react';

function PhishingSimulation() {
  const { analysisResult } = useAnalysis();
  const simulation = analysisResult?.phishing_simulation;

  const subject = simulation?.email_subject;
  const body = simulation?.email_body;

  if (!subject && !body) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Email Client View */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden border-2 border-white/10 shadow-2xl">
          {/* Email Toolbar */}
          <div className="p-4 bg-black border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                <Mail className="w-4 h-4 text-red-500" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Tactical Phishing Payload</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Flag className="w-3.5 h-3.5" /></Button>
              <div className="w-[1px] h-6 bg-white/5 mx-1" />
              <Badge variant="danger">Malicious</Badge>
            </div>
          </div>

          {/* Email Header Info */}
          <div className="p-8 bg-black/40 border-b border-white/5 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center border border-white/5 shadow-inner">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-100 uppercase tracking-tight">System Administrator</span>
                    <span className="text-[10px] font-mono text-slate-400 italic">{'<noreply@internal-verify.com>'}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-bold uppercase tracking-widest">To: Operator Node</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <Clock className="w-3 h-3" />
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div className="pl-14">
                <h2 className="text-xl font-black tracking-tight text-slate-100">
                  RE: {subject || 'Verification Required'}
                </h2>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-10 bg-white/[0.02] flex-1">
            <pre className="font-sans text-sm leading-relaxed text-slate-200 whitespace-pre-line border-l-2 border-white/10 pl-8">
              {body || 'Loading tactical data...'}
            </pre>

            <div className="mt-12 pl-8">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 px-8 h-12 uppercase font-black tracking-widest text-xs gap-3">
                Verify Account Stability <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Tactical Metrics sidebar */}
        <div className="space-y-6">
          <Card className="p-8 space-y-8 bg-black/40 border-white/10 border-2">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500">Payload Heuristics</p>
              <h3 className="text-xl font-black tracking-tighter text-slate-100 uppercase italic">Simulation Metrics</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <span>Psychological Urgency</span>
                  <span className="text-red-500">Critical</span>
                </div>
                <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-red-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <span>Correlation Accuracy</span>
                  <span className="text-cyan-500">High</span>
                </div>
                <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-cyan-500 rounded-full" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
                  <span>Link Obfuscation</span>
                  <span className="text-amber-500">Moderate</span>
                </div>
                <div className="h-1.5 w-full bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full w-[55%] bg-amber-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-200">Adversarial POV</span>
              </div>
              <p className="text-[10px] text-slate-300 font-bold uppercase tracking-wider leading-relaxed">
                This simulation uses your skill history to anchor the "Verification" request in a realistic corporate context.
                This technique increases click-through rates by 400% in controlled environments.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-cyan-500/5 border-cyan-500/10 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <ChevronRight className="w-4 h-4 text-cyan-500" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/70">
              Recommend: Implement Hardware-based 2FA <br /> to mitigate this vector.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PhishingSimulation;
