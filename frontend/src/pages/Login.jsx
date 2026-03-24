import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Key, AlertCircle, ArrowRight, Lock } from 'lucide-react';
import { Button, Card, Input } from '../components/UI';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = login(username, password);
      if (result.success) {
        navigate('/upload');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected system error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 space-y-8 relative overflow-hidden bg-white border-slate-200">
        <div className="absolute top-0 right-0 p-4 opacity-5">
          <Lock className="w-32 h-32 rotate-12" />
        </div>

        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 mb-2">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">System Access</h2>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-700">
            Adversarial Simulation Terminal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              label="Operator Identifier"
              type="text"
              placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              label="Access Cipher"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3 items-center">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-red-700">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 gap-2 text-sm font-black uppercase tracking-widest shadow-md shadow-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Decrypting...' : 'Initiate Session'}
            {!isLoading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-xs text-slate-700 font-medium tracking-wide">
            Unauthorized access is strictly monitored. <br />
            No account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">Request Access</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;
