import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const linkBase =
    'text-sm font-medium text-slate-200 hover:text-white transition-colors';
  const primaryButtonBase =
    'inline-flex items-center justify-center rounded-lg bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-colors';
  const secondaryButtonBase =
    'inline-flex items-center justify-center rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-800 transition-colors';

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-lg font-semibold tracking-tight text-slate-50"
          >
            PersonaShield
          </button>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className={linkBase}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/about')}
              className={linkBase}
            >
              About
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                type="button"
                onClick={() => navigate('/dashboard/risk-graphs')}
                className={secondaryButtonBase}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className={primaryButtonBase}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className={secondaryButtonBase}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className={primaryButtonBase}
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
