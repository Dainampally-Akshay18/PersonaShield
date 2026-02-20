import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3, User, ShieldAlert, Mail, Link2, Eye, Calendar, Gauge, Brain, Terminal, Activity
} from 'lucide-react';

function Sidebar() {
  const menuItems = [
    { icon: BarChart3, label: 'Risk Graphs', path: '/dashboard/risk-graphs' },
    { icon: User, label: 'Persona Exposure', path: '/dashboard/persona' },
    { icon: ShieldAlert, label: 'Attack Vectors', path: '/dashboard/attack-vectors' },
    { icon: Mail, label: 'Phishing Sim', path: '/dashboard/phishing' },
    { icon: Link2, label: 'Correlation Depth', path: '/dashboard/correlation' },
    { icon: Eye, label: 'Visibility Score', path: '/dashboard/visibility' },
    { icon: Calendar, label: 'Exposure Timeline', path: '/dashboard/timeline' },
    { icon: Gauge, label: 'Weighted Risk', path: '/dashboard/risk-score' },
    { icon: Brain, label: 'Digital Twin', path: '/dashboard/digital-twin' },
  ];

  return (
    <div className="h-full glass rounded-2xl p-6 flex flex-col gap-8 shadow-2xl shadow-slate-950/40 border-white/5 relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Terminal className="w-48 h-48 rotate-12" />
      </div>

      <div className="space-y-1 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6 flex items-center gap-2 px-2">
          <Activity className="w-3 h-3 text-cyan-500" />
          Analysis Modules
        </p>
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300
                ${isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/5'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'}
              `}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-4 relative z-10">
        <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-2">
          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-400">
            <span>Heuristic Sync</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-2/3 bg-cyan-500/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
