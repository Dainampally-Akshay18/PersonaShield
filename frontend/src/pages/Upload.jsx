import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../contexts/AnalysisContext';
import { uploadResume } from '../services/api'; // user's provided api
import { FileUp, Search, User, Globe, ShieldAlert, Terminal, ArrowRight, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { Button, Card, Badge, TypewriterText } from '../components/UI';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const { setAnalysis } = useAnalysis();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setUploadProgress(10);

    try {
      // Simulate some progress for the "premium" feel
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => prev < 90 ? prev + 10 : prev);
      }, 500);

      const data = await uploadResume(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      setAnalysis(data);
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      setError('Intelligence ingestion failed. Ensure the source node is a valid PDF mapping.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="text-center space-y-4">
        <Badge variant="primary" className="py-1 px-4">Secure Ingestion Active</Badge>
        <h1 className="text-5xl font-black tracking-tighter text-slate-100 italic uppercase">
          Intelligence <span className="text-cyan-500"><TypewriterText text="TERMINAL" /></span>
        </h1>
        <p className="text-slate-300 font-medium max-w-xl mx-auto leading-relaxed">
          Normalize raw data into structured entities for adversarial simulation.
          Upload a PDF resume to initialize your digital twin.
        </p>
      </div>

      <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Input */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-1 overflow-hidden relative group">
            <div className={`
              border-2 border-dashed rounded-xl p-12 text-center transition-all duration-500 relative
              ${file ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-white/5 hover:border-white/10 bg-black/60'}
            `}>
              <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} accept=".pdf" />
              <label htmlFor="file-upload" className="cursor-pointer space-y-6 block">
                <div className="relative inline-block">
                  <div className={`absolute inset-0 bg-cyan-500/20 blur-xl rounded-full transition-opacity duration-500 ${file ? 'opacity-100' : 'opacity-0'}`} />
                  <FileUp className={`w-16 h-16 mx-auto relative z-10 transition-colors duration-500 ${file ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-black tracking-tight text-slate-200">
                    {file ? file.name : 'Ingest Intelligence PDF'}
                  </p>
                  <p className="text-xs uppercase font-bold tracking-[0.2em] text-slate-400">
                    Resume, Bio, or Profile Export
                  </p>
                </div>
              </label>

              {isLoading && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6">
                  <Activity className="w-12 h-12 text-cyan-500 animate-pulse" />
                  <div className="w-full max-w-xs space-y-3">
                    <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-cyan-500/70">
                      <span>Transferring Nodes...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1 w-full bg-black/60 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-500 transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-cyan-500/50 uppercase tracking-widest animate-pulse">
                    Establishing adversarial correlation depth...
                  </p>
                </div>
              )}
            </div>
          </Card>

          {error && (
            <Card className="p-4 bg-red-500/5 border-red-500/20 flex gap-4 items-start">
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-400 leading-relaxed">
                {error}
              </p>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-black/40 border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-500">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Privacy Block</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-relaxed">
                Ingested intelligence is processed ephemerally and encrypted at the node level.
              </p>
            </Card>
            <Card className="p-6 bg-black/40 border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-blue-400">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Model Sync</span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-relaxed">
                Synchronizing with the latest adversarial heuristic datasets from the Lab.
              </p>
            </Card>
          </div>
        </div>

        {/* Right: Actions/Settings */}
        <div className="space-y-6">
          <Card className="p-8 space-y-8 bg-black/20 border-white/10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-500" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Operations</h3>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
                The ingestion terminal will normalize PDF data using Groq-Llama3-8b recursive parsers.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 gap-3 text-sm font-black uppercase tracking-[0.2em] shadow-2xl shadow-cyan-500/20 group"
              disabled={isLoading || !file}
            >
              Initiate Analysis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="pt-8 border-t border-white/5 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Session Statistics</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400">Node Speed</span>
                  <span className="text-cyan-500 font-mono">0.4s p/entity</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-400">Heuristic Depth</span>
                  <span className="text-cyan-500 font-mono">Tier 4 Active</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Upload;
