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
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Email Client View */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden border-2 border-slate-300 shadow-md">
          {/* Email Toolbar */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg border border-red-200">
                <Mail className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Phishing Email Simulation</span>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0"><Flag className="w-3.5 h-3.5" /></Button>
              <div className="w-[1px] h-6 bg-slate-300 mx-1" />
              <Badge variant="danger">Malicious</Badge>
            </div>
          </div>

          {/* Email Header Info */}
          <div className="p-8 bg-slate-50 border-b border-slate-200 space-y-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 shadow-sm">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-slate-900 uppercase tracking-tight">System Administrator</span>
                    <span className="text-[10px] font-mono text-slate-600 italic">{'<noreply@internal-verify.com>'}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-bold uppercase tracking-widest">To: Operator Node</p>
                </div>
                <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-slate-600">
                  <Clock className="w-3 h-3" />
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div className="pl-14">
                <h2 className="text-xl font-black tracking-tight text-slate-900">
                  RE: {subject || 'Verification Required'}
                </h2>
              </div>
            </div>
          </div>

          {/* Email Body */}
          <div className="p-10 bg-white flex-1">
            <pre className="font-sans text-sm leading-relaxed text-slate-800 whitespace-pre-line border-l-2 border-slate-300 pl-8">
              {body || 'Loading tactical data...'}
            </pre>

            <div className="mt-12 pl-8">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white shadow-red-300 px-8 h-12 uppercase font-black tracking-widest text-xs gap-3">
                Verify Account Stability <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Tactical Metrics sidebar */}
        <div className="space-y-6">
          <Card className="p-8 space-y-8 bg-white border-slate-200 border-2">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Payload Heuristics</p>
              <h3 className="text-xl font-black tracking-tighter text-slate-900 uppercase italic">Simulation Metrics</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
                  <span>Psychological Urgency</span>
                  <span className="text-red-600">Critical</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[90%] bg-red-600 rounded-full" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
                  <span>Correlation Accuracy</span>
                  <span className="text-blue-600">High</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[75%] bg-blue-600 rounded-full" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-700">
                  <span>Link Obfuscation</span>
                  <span className="text-amber-600">Moderate</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-[55%] bg-amber-600 rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Adversarial POV</span>
              </div>
              <p className="text-[10px] text-slate-700 font-bold uppercase tracking-wider leading-relaxed">
                This simulation uses your skill history to anchor the "Verification" request in a realistic corporate context.
                This technique increases click-through rates by 400% in controlled environments.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl border border-blue-300">
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-700">
              Recommend: Implement Hardware-based 2FA <br /> to mitigate this vector.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PhishingSimulation;
