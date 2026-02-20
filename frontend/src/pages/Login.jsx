import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard/risk-graphs', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = login(username, password);

    if (result?.success) {
      setError('');
      navigate('/dashboard/risk-graphs');
    } else if (result?.message) {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/50">
        <h1 className="text-xl font-semibold tracking-tight text-slate-50">
          Login
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Access your PersonaShield dashboard.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-500/0 placeholder:text-slate-500 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-cyan-500/0 placeholder:text-slate-500 focus:border-transparent focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            Login
          </button>
        </form>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
