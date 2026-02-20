import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-black">
      {/* Background Decorative Elements - Subtle sky blue glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-sky-500/5 blur-[120px] -z-10" />

      <Navbar />

      <main className="pt-24 pb-12 mx-auto max-w-7xl px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-sm mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="/official-logo.png"
              alt="PersonaShield"
              className="h-8 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              onError={(e) => e.target.src = ''}
            />
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
            &copy; 2024 Adversarial Research Lab. Educational Simulation Pattern v4.2
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-cyan-500 transition-colors">Privacy</a>
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-cyan-500 transition-colors">Methodology</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
