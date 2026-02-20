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
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Deterministic Graphing",
      desc: "Map how disjointed data nodes correlate through recursive logic to reveal hidden identities.",
      color: "text-cyan-400"
    },
    {
      icon: UserCheck,
      title: "Persona Verification",
      desc: "Validate the adversarial strength of your professional and personal aliases against synthetic modeling.",
      color: "text-emerald-400"
    },
  ];

  return (
    <div className="space-y-32 pb-24 bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative px-6 flex flex-col items-center text-center">
        <div className="max-w-4xl space-y-12 relative z-10">
          <div className="flex flex-col items-center space-y-4">
            <Badge variant="primary" className="animate-in fade-in slide-in-from-top-4 duration-1000">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                Next-Gen Adversarial Simulation Logic
              </span>
            </Badge>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-100 uppercase">
              Quantify your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 italic">
                <TypewriterText text="DIGITAL SHADOW" />
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
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
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 border border-cyan-500/30 rounded-full flex items-center justify-center backdrop-blur-3xl animate-float">
            <div className="absolute inset-0 border-2 border-dashed border-cyan-500/10 rounded-full animate-spin-slow" />
            <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40 rotate-12 group hover:rotate-0 transition-transform duration-700">
              <Shield className="w-16 h-16 md:w-24 md:h-24 text-slate-950" />
            </div>
            {/* Pulsing rings */}
            <div className="absolute -inset-4 border border-white/5 rounded-full" />
            <div className="absolute -inset-16 border border-white/5 rounded-full" />

            <div className="absolute top-0 right-0 p-3 bg-black border border-white/10 rounded-xl -translate-y-1/2 translate-x-1/2 shadow-xl">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="absolute bottom-10 left-0 p-3 bg-black border border-white/10 rounded-xl -translate-x-1/2 shadow-xl">
              <Network className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <Card key={i} className="p-10 group" hover>
            <div className={`p-4 rounded-xl w-fit mb-8 bg-black/40 border border-white/5 transition-transform duration-500 group-hover:-translate-y-2`}>
              <f.icon className={`w-8 h-8 ${f.color}`} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-100">{f.title}</h3>
            <p className="text-slate-400 leading-relaxed text-sm">{f.desc}</p>
          </Card>
        ))}
      </section>

      {/* Trust & Lab Quote */}
      <section className="max-w-5xl mx-auto px-6">
        <Card className="p-16 relative overflow-hidden text-center space-y-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-30" />
          <ShieldAlert className="w-16 h-16 text-cyan-500/20 mx-auto" />
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter text-slate-200 leading-tight">
            "The strongest encryption is useless if your digital shadow reveals the secret key through correlation."
          </h2>
          <div className="flex flex-col items-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-500/70">
              Adversarial Logic Lab
            </p>
            <div className="h-0.5 w-12 bg-black/60" />
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
