import { NavLink } from 'react-router-dom';

const baseLinkClasses =
  'block rounded-md px-3 py-2 text-sm transition-colors hover:bg-slate-800/70';

function Sidebar() {
  return (
    <div className="h-full rounded-xl border border-slate-800 bg-slate-900/70 p-4 text-sm text-slate-200 shadow-lg shadow-slate-950/40">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Dashboard
      </div>
      <nav className="space-y-1 text-sm">
        <NavLink
          to="/dashboard/risk-graphs"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Risk Graphs
        </NavLink>
        <NavLink
          to="/dashboard/persona"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Persona Exposure
        </NavLink>
        <NavLink
          to="/dashboard/attack-vectors"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Attack Vectors
        </NavLink>
        <NavLink
          to="/dashboard/phishing"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Phishing Simulation
        </NavLink>
        <NavLink
          to="/dashboard/correlation"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Correlation Depth
        </NavLink>
        <NavLink
          to="/dashboard/visibility"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Public Visibility
        </NavLink>
        <NavLink
          to="/dashboard/timeline"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Exposure Timeline
        </NavLink>
        <NavLink
          to="/dashboard/risk-score"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Weighted Risk Score
        </NavLink>
        <NavLink
          to="/dashboard/digital-twin"
          className={({ isActive }) =>
            `${baseLinkClasses} ${
              isActive
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-slate-100'
            }`
          }
        >
          Your Digital Twin
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
