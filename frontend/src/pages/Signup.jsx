import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Key, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button, Card, Input } from '../components/UI';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Ciphers do not match. Verification failed.');
      return;
    }

    setIsLoading(true);

    try {
      const result = signup(username, password);
      if (result.success) {
        navigate('/upload');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected system error occurred during node registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <UserPlus className="w-32 h-32 rotate-12" />
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 mb-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-100 uppercase">Node Registration</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-300">
            Create your Adversarial Profiling Identity
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <Input
              label="Operator Identifier"
              type="text"
              placeholder="Choose a username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Access Cipher"
              type="password"
              placeholder="Create password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="Verify Cipher"
              type="password"
              placeholder="Confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-3 items-center">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-400">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 gap-2 text-sm font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Establish Node'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-xs text-slate-400 font-medium tracking-wide">
            Already have an active system node? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors">Authenticate</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Signup;
