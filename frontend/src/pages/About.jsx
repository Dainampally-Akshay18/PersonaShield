import React from 'react';
import { Shield, Target, Cpu, Terminal, Users, Search, Network, Brain } from 'lucide-react';
import { Card, Badge } from '../components/UI';

const About = () => {
  const methodology = [
    {
      step: "01",
      title: "INGEST",
      icon: Search,
      desc: "Raw intelligence harvesting from resumes, LinkedIn profiles, and public records."
    },
    {
      step: "02",
      title: "MAP",
      icon: Network,
      desc: "Deterministic correlation of disparate data nodes to reconstruct your digital footprint."
    },
    {
      step: "03",
      title: "INFER",
      icon: Brain,
      desc: "AI-driven adversarial modeling to simulate target-specific attack vectors."
    },
    {
      step: "04",
      title: "HARDEN",
      icon: Shield,
      desc: "Persona-based counter-heuristics to minimize your discoverable digital risk."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-24 py-12">
      {/* Vision Section */}
      <section className="text-center space-y-8">
        <div className="inline-flex p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20">
          <Target className="w-6 h-6 text-cyan-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-100">
          THE MISSION OF <br />
          <span className="text-cyan-500 italic">PERSONASHIELD</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed font-medium">
          In an era of ubiquitous data, your professional and personal information is a weaponized asset.
          PersonaShield provides the adversarial perspective necessary to harden your digital identity
          against sophisticated correlation attacks and synthetic persona modeling.
        </p>
      </section>

      {/* Core Technology Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">Recursive Logic Engine</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Our proprietary algorithm doesn't just look for keywords. It recursively probes the
            relationships between date ranges, skills, companies, and geographical data to find
            the "Invisible Nodes" an OSINT analyst would exploit.
          </p>
        </Card>

        <Card className="p-10 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-black/40 rounded-xl border border-white/5">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">Adversarial POV</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            By simulating specific attacker personas—from corporate spies to professional
            scammers—we provide actionable intelligence on how different threat actors
            perceive your digital exposure.
          </p>
        </Card>
      </div>

      {/* Methodology Section */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black uppercase tracking-tighter">OUR METHODOLOGY</h2>
          <div className="h-1 w-24 bg-cyan-500/50 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {methodology.map((m, i) => (
            <div key={i} className="relative group">
              <div className="mb-6 flex items-end justify-between">
                <span className="text-5xl font-black text-slate-800/50 group-hover:text-cyan-500/20 transition-colors duration-500">
                  {m.step}
                </span>
                <div className="p-4 bg-black border border-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <m.icon className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <h4 className="text-lg font-black uppercase tracking-widest mb-3 text-slate-200">{m.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-wider">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Terminal Footer */}
      <Card className="p-8 bg-black/40 border-cyan-500/10 border-2">
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="w-4 h-4 text-cyan-500" />
          <span className="text-xs font-mono text-cyan-500/70 uppercase tracking-widest">adversarial_lab.sh</span>
        </div>
        <div className="font-mono text-[10px] md:text-sm text-cyan-500/50 leading-relaxed space-y-1">
          <p className="text-cyan-500/90 tracking-tighter">{`>> initializing PersonaShield Alpha v4.2...`}</p>
          <p>{`>> loading adversarial heuristic datasets... [DONE]`}</p>
          <p>{`>> establishing secure synthetic node environment... [DONE]`}</p>
          <p>{`>> PersonaShield is ready for ingestion.`}</p>
          <div className="w-2 h-4 bg-cyan-500 animate-pulse mt-4" />
        </div>
      </Card>
    </div>
  );
};

export default About;
