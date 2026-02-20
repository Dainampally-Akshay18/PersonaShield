import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, LogOut, User as UserIcon, LogIn, UserPlus, Zap, Activity, Search as SearchIcon, Globe, Terminal } from 'lucide-react';
import { Button } from './UI';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Globe },
    { name: 'Methodology', path: '/about', icon: Terminal },
    { name: 'Intelligence Hub', path: '/upload', icon: Activity, protected: true },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/official-logo.png"
              alt="PersonaShield"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-2">
              <div className="p-2 bg-sky-500 rounded-lg shadow-lg shadow-sky-500/20">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-black tracking-tighter text-slate-100 uppercase italic lead-none">
                Persona<span className="text-sky-400">Shield</span>
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              (!link.protected || isAuthenticated) && (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition-colors
                    ${location.pathname === link.path ? 'text-sky-400' : 'text-slate-400 hover:text-slate-100'}
                  `}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <link.icon className="w-3 h-3" />
                    {link.name}
                  </span>
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-sky-500/10 border border-sky-500/20 rounded-lg z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Tactical Status Indicator */}
          <div className="hidden xl:flex items-center gap-3 px-4 py-1.5 bg-black/40 border border-white/5 rounded-full">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-sky-400" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Surface Magnitude</span>
            </div>
            <div className="w-[1px] h-3 bg-white/10" />
            <span className="text-[10px] font-mono font-bold text-sky-400 animate-pulse">4.2 TB/s</span>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
                  Secure Node: <span className="text-slate-100">{user?.username}</span>
                </span>
              </div>
              <Button size="sm" onClick={() => navigate('/upload')} variant="secondary" className="gap-2">
                Analyze
              </Button>
              <Button variant="danger" size="sm" onClick={handleLogout} className="p-2">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')} className="gap-2">
                <LogIn className="w-4 h-4" />
                Login
              </Button>
              <Button size="sm" onClick={() => navigate('/signup')} className="gap-2 shadow-cyan-500/40">
                <UserPlus className="w-4 h-4" />
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
