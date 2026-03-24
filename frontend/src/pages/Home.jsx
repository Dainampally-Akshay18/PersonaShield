import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Search, Zap, UserCheck, AlertCircle, ArrowRight, ShieldAlert, Cpu, Network } from 'lucide-react';
import { Button, Card, Badge, TypewriterText } from '../components/UI';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Search,
      title: "OSINT Mapping",
      desc: "Automated reconnaissance of your public digital footprint using open-source intelligence heuristics.",
      color: "text-blue-600"
    },
    {
      icon: Zap,
      title: "Deterministic Graphing",
      desc: "Map how disjointed data nodes correlate through recursive logic to reveal hidden identities.",
      color: "text-blue-500"
    },
    {
      icon: UserCheck,
      title: "Persona Verification",
      desc: "Validate the adversarial strength of your professional and personal aliases against synthetic modeling.",
      color: "text-emerald-600"
    },
  ];

  return (
    <div className="space-y-32 pb-24 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-12 relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <Badge variant="primary" className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Next-Gen Adversarial Simulation Logic
              </span>
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-900 uppercase">
              Quantify your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 italic">
                <TypewriterText text="DIGITAL SHADOW" />
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
            PersonaShield is a deterministic risk engine that models how sophisticated attackers
            correlate your public intelligence to uncover hidden vulnerabilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="px-10 h-14 text-base gap-2 group" onClick={() => navigate('/signup')}>
              Launch Simulation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="px-10 h-14 text-base" onClick={() => navigate('/about')}>
              View Methodology
            </Button>
          </div>
        </div>

        {/* Hero Visual Element */}
        <div className="mt-20 relative w-full max-w-2xl aspect-square flex items-center justify-center">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 border border-blue-400/40 rounded-full flex items-center justify-center backdrop-blur-3xl animate-float">
            <div className="absolute inset-0 border-2 border-dashed border-blue-400/20 rounded-full animate-spin-slow" />
            <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md shadow-blue-300 rotate-12 group hover:rotate-0 transition-transform duration-700">
              <Shield className="w-16 h-16 md:w-24 md:h-24 text-white" />
            </div>
            {/* Pulsing rings */}
            <div className="absolute -inset-4 border border-slate-300/40 rounded-full" />
            <div className="absolute -inset-16 border border-slate-300/20 rounded-full" />

            <div className="absolute top-0 right-0 p-3 bg-white border border-slate-200 rounded-xl -translate-y-1/2 translate-x-1/2 shadow-md shadow-slate-200">
              <Cpu className="w-6 h-6 text-blue-600" />
            </div>
            <div className="absolute bottom-10 left-0 p-3 bg-white border border-slate-200 rounded-xl -translate-x-1/2 shadow-md shadow-slate-200">
              <Network className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <Card key={i} className="p-10 group bg-white border-slate-200" hover>
            <div className={`p-4 rounded-xl w-fit mb-8 bg-slate-50 border border-slate-200 transition-transform duration-500 group-hover:-translate-y-2`}>
              <f.icon className={`w-8 h-8 ${f.color}`} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900">{f.title}</h3>
            <p className="text-slate-700 leading-relaxed text-sm">{f.desc}</p>
          </Card>
        ))}
      </section>

      {/* Trust & Lab Quote */}
      <section className="max-w-5xl mx-auto px-6">
        <Card className="p-16 relative overflow-hidden text-center space-y-8 bg-white border-slate-200">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent opacity-30" />
          <ShieldAlert className="w-16 h-16 text-blue-600/20 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-900 leading-tight">
            "The strongest encryption is useless if your digital shadow reveals the secret key through correlation."
          </h2>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-blue-700/70">
              Adversarial Logic Lab
            </p>
            <div className="h-0.5 w-12 bg-slate-300" />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
