import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-white">
      <Navbar />

      <main className="pt-24 pb-12 mx-auto max-w-7xl px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-200 bg-slate-50 backdrop-blur-sm mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              src="/official-logo.png"
              alt="PersonaShield"
              className="h-8 w-auto opacity-60 hover:opacity-100 transition-all duration-200"
              onError={(e) => e.target.src = ''}
            />
          </div>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
            &copy; 2024 Adversarial Research Lab. Educational Simulation Pattern v4.2
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="text-[10px] uppercase font-bold tracking-widest text-slate-500 hover:text-blue-600 transition-colors">Methodology</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout;
