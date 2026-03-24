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
    <div className="h-full glass rounded-2xl p-6 flex flex-col gap-8 shadow-md shadow-slate-200/50 border-slate-200 relative overflow-hidden group bg-white">
      <div className="space-y-1 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-6 flex items-center gap-2 px-2">
          <Activity className="w-3 h-3 text-blue-600" />
          Analysis Modules
        </p>
        <nav className="space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200
                ${isActive
                  ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'}
              `}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto space-y-4 relative z-10">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-slate-600">
            <span>Analysis Status</span>
            <span className="text-emerald-600">Ready</span>
          </div>
          <div className="h-0.5 w-full bg-slate-300 rounded-full overflow-hidden">
            <div className="h-full w-full bg-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
