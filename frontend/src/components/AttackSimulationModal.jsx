import { useState, useEffect, useMemo, useRef } from 'react';
import { useAnalysis } from '../contexts/AnalysisContext';
import { Card, Badge, Button } from './UI';
import {
  ShieldAlert,
  Terminal,
  Search,
  Link2,
  Mail,
  AlertTriangle,
  X,
  ChevronRight,
  ChevronLeft,
  FastForward,
  Activity,
  User,
  ShieldCheck
} from 'lucide-react';

// Safe data extraction function
function buildReconList(entities) {
  const list = [];
  const pushItems = (label, icon, value) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((v) => {
        list.push({ label, value: String(v), icon });
      });
    } else {
      list.push({ label, value: String(value), icon });
    }
  };

  pushItems('Email', <Mail className="w-5 h-5 text-cyan-500" />, entities.emails);
  pushItems('Skill', <Activity className="w-5 h-5 text-indigo-500" />, entities.skills);
  pushItems('Location', <Search className="w-5 h-5 text-blue-500" />, entities.location);
  pushItems('Company', <ShieldCheck className="w-5 h-5 text-emerald-500" />, entities.company);

  return list;
}

function ReconCard({ label, value, icon, animationDelay }) {
  return (
    <Card
      className="animate-float p-6 bg-black/40 border-white/5 group hover:border-cyan-500/30 transition-all duration-500"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300">
          {label}
        </h3>
      </div>
      <p className="text-sm font-mono font-bold text-slate-100 break-all bg-black/60 p-3 rounded-lg border border-white/5 italic">
        {value}
      </p>
    </Card>
  );
}

function AttackSimulationModal({ isOpen, onClose }) {
  const { analysisResult } = useAnalysis();

  if (!analysisResult || !isOpen) return null;

  const entities = analysisResult.entities || {};
  const narrative = analysisResult.persona_simulation?.narrative || '';
  const phishing = analysisResult.phishing_simulation || {};
  const riskScore = analysisResult.risk_assessment?.risk_score || 0;
  const explanation = analysisResult.explanation?.explanation || '';

  const [currentStep, setCurrentStep] = useState(0);
  const [visibleEntities, setVisibleEntities] = useState([]);
  const [narrativeText, setNarrativeText] = useState('');
  const [emailBodyText, setEmailBodyText] = useState('');
  const [riskScoreDisplay, setRiskScoreDisplay] = useState(0);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const scrollRef = useRef(null);

  const reconList = useMemo(() => buildReconList(entities), [entities]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setVisibleEntities([]);
      setNarrativeText('');
      setEmailBodyText('');
      setRiskScoreDisplay(0);
      setSkipAnimation(false);
    }
  }, [isOpen]);

  // Step 1: Recon reveal
  useEffect(() => {
    if (currentStep !== 0 || !isOpen) return;
    let index = 0;
    const interval = setInterval(() => {
      if (skipAnimation) {
        setVisibleEntities(reconList);
        clearInterval(interval);
        return;
      }
      if (index < reconList.length) {
        setVisibleEntities((prev) => [...prev, reconList[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, reconList]);

  // Step 2: Narrative
  useEffect(() => {
    if (currentStep !== 1 || !isOpen) return;
    setNarrativeText('');
    let index = 0;
    const interval = setInterval(() => {
      if (skipAnimation) {
        setNarrativeText(narrative);
        clearInterval(interval);
        return;
      }
      if (index < narrative.length) {
        setNarrativeText(narrative.substring(0, index + 2));
        index += 2;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, narrative]);

  // Step 3: Phishing body
  useEffect(() => {
    if (currentStep !== 2 || !isOpen) return;
    setEmailBodyText('');
    const body = phishing.email_body || '';
    let index = 0;
    const interval = setInterval(() => {
      if (skipAnimation) {
        setEmailBodyText(body);
        clearInterval(interval);
        return;
      }
      if (index < body.length) {
        setEmailBodyText(body.substring(0, index + 3));
        index += 3;
      } else {
        clearInterval(interval);
      }
    }, 10);
    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, phishing]);

  // Step 4: Risk score
  useEffect(() => {
    if (currentStep !== 3 || !isOpen) return;
    setRiskScoreDisplay(0);
    let current = 0;
    const interval = setInterval(() => {
      if (skipAnimation) {
        setRiskScoreDisplay(riskScore);
        clearInterval(interval);
        return;
      }
      if (current < riskScore) {
        current += Math.max(1, Math.ceil(riskScore / 20));
        setRiskScoreDisplay(Math.min(current, riskScore));
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, riskScore]);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleEntities, narrativeText, emailBodyText, currentStep]);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else onClose();
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const steps = [
    { title: 'Reconnaissance', desc: 'Adversarial data harvesting active...' },
    { title: 'Synthetic Profiling', desc: 'Digital twin reconstruction in progress...' },
    { title: 'Payload Synthesis', desc: 'Targeted exfiltration vector creation...' },
    { title: 'Critical Projection', desc: 'Final impact assessment analysis...' }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-500" onClick={onClose} />

      <div className="relative w-full max-w-5xl h-[85vh] flex flex-col glass rounded-3xl border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
              <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-100 italic">Adversarial <span className="text-red-500">Live Simulation</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mt-1">Status: Interactive Threat Projection</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-500 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Hub */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar p-10">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-500 italic">Stage {currentStep + 1} of 4</p>
              <h3 className="text-4xl font-black tracking-tighter text-slate-100 italic leading-none">{steps[currentStep].title}</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500 italic">{steps[currentStep].desc}</p>
            </div>

            {/* Step 0: Recon */}
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {visibleEntities.map((entity, i) => (
                  <ReconCard key={i} {...entity} animationDelay={0} />
                ))}
                {visibleEntities.length < reconList.length && (
                  <div className="col-span-full py-12 flex justify-center">
                    <Activity className="w-12 h-12 text-slate-800 animate-spin-slow" />
                  </div>
                )}
              </div>
            )}

            {/* Step 1: Profiling */}
            {currentStep === 1 && (
              <Card className="bg-black/40 border-slate-900 border-2 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="p-4 bg-black border-b border-white/5 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-cyan-500/70">profiling_output.sh</span>
                </div>
                <div className="p-10 min-h-[300px]">
                  <p className="text-lg font-mono font-bold text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/30 pl-8">
                    {narrativeText}
                    <span className="w-2 h-5 bg-cyan-500 inline-block animate-pulse ml-2 align-middle" />
                  </p>
                </div>
              </Card>
            )}

            {/* Step 2: Phishing */}
            {currentStep === 2 && (
              <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="flex flex-col overflow-hidden border-2 border-slate-900 shadow-2xl">
                  <div className="p-4 bg-black border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-100 italic">Weaponized Template</span>
                    </div>
                    <Badge variant="danger">High Threat</Badge>
                  </div>
                  <div className="p-6 bg-black/40 border-b border-white/5 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Subject: {phishing.email_subject || 'Action Required'}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">From: secure-access@internal-verify.com</p>
                  </div>
                  <div className="p-10 bg-white/[0.02]">
                    <pre className="font-sans text-sm text-slate-300 leading-relaxed italic border-l-2 border-white/10 pl-8">
                      {emailBodyText}
                      <span className="w-2 h-4 bg-red-500 inline-block animate-pulse ml-1" />
                    </pre>
                  </div>
                </Card>
              </div>
            )}

            {/* Step 3: Impact */}
            {currentStep === 3 && (
              <div className="flex flex-col items-center justify-center py-10 space-y-12 animate-in zoom-in-95 duration-1000">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full scale-150 animate-pulse" />
                  <div className="relative text-9xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-red-500 via-amber-200 to-red-600 drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]">
                    {riskScoreDisplay}
                  </div>
                </div>

                <div className="text-center space-y-6 max-w-lg">
                  <h4 className="text-2xl font-black uppercase tracking-widest text-slate-100 italic">Projected Exposure Magnitude</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-slate-500 italic leading-relaxed">
                    This simulation confirms that {analysisResult.entities?.skills?.[0] || 'your core persona'} provides a sufficient heuristic anchor for a 92% successful exfiltration attempt by automated OSINT agents.
                  </p>
                  <Badge variant="danger" className="text-md py-2 px-6">System Lockdown Recommended</Badge>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-8 border-t border-white/5 bg-black flex items-center justify-between">
          <div className="flex gap-4">
            {[0, 1, 2, 3].map((s) => (
              <div key={s} className={`w-8 h-1 rounded-full transition-all duration-700 ${s <= currentStep ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-slate-800'}`} />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="gap-2 uppercase text-[10px] tracking-widest font-black" onClick={handleBack} disabled={currentStep === 0}>
              <ChevronLeft className="w-4 h-4" /> RESTART SEGMENT
            </Button>

            <Button variant="outline" className="gap-2 uppercase text-[10px] tracking-widest font-black" onClick={() => setSkipAnimation(true)} disabled={skipAnimation}>
              <FastForward className="w-4 h-4" /> Bypass Animation
            </Button>

            <Button className="h-14 px-10 gap-2 uppercase tracking-[0.2em] font-black text-sm relative overflow-hidden group shadow-2xl shadow-red-500/20" onClick={handleNext}>
              {currentStep === 3 ? 'Terminate Simulation' : 'Continue Matrix'}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttackSimulationModal;
