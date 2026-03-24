import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalysis } from '../contexts/AnalysisContext';
import { analyzePDF, analyzeText, analyzeURL } from '../services/api';
import { FileUp, FileText, Globe, Search, User, ShieldAlert, Terminal, ArrowRight, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { Button, Card, Badge, TypewriterText } from '../components/UI';

const Upload = () => {
  // Input mode: 'file', 'text', or 'url'
  const [inputMode, setInputMode] = useState('file');
  
  // File upload state
  const [file, setFile] = useState(null);
  
  // Text input state
  const [textContent, setTextContent] = useState('');
  
  // URL input state
  const [urlContent, setUrlContent] = useState('');
  
  // Common state
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

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
    setError('');
  };

  const handleUrlChange = (e) => {
    setUrlContent(e.target.value);
    setError('');
  };

  const switchMode = (mode) => {
    setInputMode(mode);
    setError('');
    setFile(null);
    setTextContent('');
    setUrlContent('');
  };

  // Basic URL validation
  const isValidUrl = (str) => {
    try {
      const url = new URL(str);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (inputMode === 'file' && !file) {
      setError('Please select a PDF file');
      return;
    }
    
    if (inputMode === 'text' && !textContent.trim()) {
      setError('Please paste or type some content');
      return;
    }

    if (inputMode === 'url' && !urlContent.trim()) {
      setError('Please paste a valid URL');
      return;
    }

    if (inputMode === 'url' && !isValidUrl(urlContent)) {
      setError('Invalid URL format. Please enter a valid HTTP/HTTPS URL');
      return;
    }

    setIsLoading(true);
    setUploadProgress(10);

    try {
      // Simulate some progress for the "premium" feel
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => prev < 90 ? prev + 10 : prev);
      }, 500);

      let data;
      
      if (inputMode === 'file') {
        data = await analyzePDF(file);
      } else if (inputMode === 'text') {
        data = await analyzeText(textContent);
      } else if (inputMode === 'url') {
        // Use actual URL scraping endpoint
        // setAnalysis will handle both analysis and scrape_metadata
        data = await analyzeURL(urlContent);
      }

      clearInterval(progressInterval);
      setUploadProgress(100);

      setAnalysis(data);
      setTimeout(() => navigate('/dashboard'), 500);
    } catch (err) {
      let errorMsg = '';
      
      // Try to extract backend error message
      if (err.message) {
        errorMsg = err.message;
      } else if (err.response?.data?.detail) {
        errorMsg = err.response.data.detail;
      } else {
        if (inputMode === 'file') {
          errorMsg = 'Intelligence ingestion failed. Ensure the source node is a valid PDF mapping.';
        } else if (inputMode === 'url') {
          errorMsg = 'Intelligence ingestion failed. Ensure the URL is valid and accessible.';
        } else {
          errorMsg = 'Intelligence ingestion failed. Ensure the text content is valid.';
        }
      }
      
      setError(errorMsg);
      console.error('Full error:', err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <div className="text-center space-y-4">
        <Badge variant="primary" className="py-1 px-4">Secure Ingestion Active</Badge>
        <h1 className="text-5xl font-black tracking-tighter text-slate-900 italic uppercase">
          Intelligence <span className="text-blue-600"><TypewriterText text="TERMINAL" /></span>
        </h1>
        <p className="text-slate-700 font-medium max-w-xl mx-auto leading-relaxed">
          Normalize raw data into structured entities for adversarial simulation.
          {inputMode === 'file' 
            ? ' Upload a PDF resume to initialize your digital twin.'
            : ' Paste text content (bio, resume, profile) to initialize your digital twin.'}
        </p>
      </div>

      {/* Input Mode Toggle */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={() => switchMode('file')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
            inputMode === 'file'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          <FileUp className="w-4 h-4" />
          Upload PDF
        </button>
        <button
          onClick={() => switchMode('text')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
            inputMode === 'text'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          Paste Text
        </button>
        <button
          onClick={() => switchMode('url')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold uppercase tracking-wider text-sm transition-all ${
            inputMode === 'url'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          <Globe className="w-4 h-4" />
          Paste URL
        </button>
      </div>

      <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Input */}
        <div className="lg:col-span-2 space-y-6">
          {inputMode === 'file' ? (
            // PDF Upload Card
            <Card className="p-1 overflow-hidden relative group bg-white border-slate-200">
              <div className={`
                border-2 border-dashed rounded-xl p-12 text-center transition-all duration-500 relative
                ${file ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-slate-400 bg-slate-50'}
              `}>
                <input type="file" className="hidden" id="file-upload" onChange={handleFileChange} accept=".pdf" />
                <label htmlFor="file-upload" className="cursor-pointer space-y-6 block">
                  <div className="relative inline-block">
                    <div className={`absolute inset-0 bg-blue-500/20 blur-xl rounded-full transition-opacity duration-500 ${file ? 'opacity-100' : 'opacity-0'}`} />
                    <FileUp className={`w-16 h-16 mx-auto relative z-10 transition-colors duration-500 ${file ? 'text-blue-600' : 'text-slate-600'}`} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-black tracking-tight text-slate-900">
                      {file ? file.name : 'Ingest Intelligence PDF'}
                    </p>
                    <p className="text-xs uppercase font-bold tracking-[0.2em] text-slate-600">
                      Resume, Bio, or Profile Export
                    </p>
                  </div>
                </label>

                {isLoading && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6 rounded-lg">
                    <Activity className="w-12 h-12 text-blue-600" />
                    <div className="w-full max-w-xs space-y-3">
                      <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-blue-700">
                        <span>Transferring Nodes...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-[10px] font-mono text-blue-600 uppercase tracking-widest">
                      Establishing adversarial correlation depth...
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ) : inputMode === 'text' ? (
            // Text Input Card
            <Card className="p-6 overflow-hidden relative group bg-white border-slate-200">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <label className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Paste Intelligence Content
                  </label>
                </div>
                <textarea
                  value={textContent}
                  onChange={handleTextChange}
                  placeholder="Paste your resume, bio, LinkedIn profile, or any personal information here..."
                  className="w-full h-48 p-4 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 resize-none font-mono text-sm leading-relaxed"
                />
                <p className="text-xs text-slate-600 uppercase tracking-widest">
                  {textContent.length} characters — Minimum 20 characters required
                </p>
              </div>

              {isLoading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6 rounded-lg">
                  <Activity className="w-12 h-12 text-blue-600" />
                  <div className="w-full max-w-xs space-y-3">
                    <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-blue-700">
                      <span>Transferring Nodes...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-blue-600 uppercase tracking-widest">
                    Establishing adversarial correlation depth...
                  </p>
                </div>
              )}
            </Card>
          ) : (
            // URL Input Card
            <Card className="p-6 overflow-hidden relative group bg-white border-slate-200">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <label className="text-sm font-black uppercase tracking-wider text-slate-900">
                    Paste URL Reference
                  </label>
                </div>
                <input
                  type="url"
                  value={urlContent}
                  onChange={handleUrlChange}
                  placeholder="Paste a LinkedIn, Instagram, portfolio, or any other profile URL..."
                  className="w-full p-4 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 font-mono text-sm"
                />
                <p className="text-xs text-slate-600 uppercase tracking-widest">
                  {urlContent.length > 0 ? (isValidUrl(urlContent) ? '✓ Valid URL' : '✗ Invalid URL format') : 'Enter a valid HTTP/HTTPS URL'}
                </p>
              </div>

              {isLoading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 space-y-6 rounded-lg">
                  <Activity className="w-12 h-12 text-blue-600" />
                  <div className="w-full max-w-xs space-y-3">
                    <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-blue-700">
                      <span>Transferring Nodes...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-blue-600 uppercase tracking-widest">
                    Establishing adversarial correlation depth...
                  </p>
                </div>
              )}
            </Card>
          )}

          {error && (
            <Card className="p-4 bg-red-50 border-red-200 flex gap-4 items-start">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-xs font-bold uppercase tracking-widest text-red-700 leading-relaxed">
                {error}
              </p>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-white border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Privacy Block</span>
              </div>
              <p className="text-[10px] text-slate-700 uppercase font-bold tracking-wider leading-relaxed">
                Ingested intelligence is processed ephemerally and encrypted at the node level.
              </p>
            </Card>
            <Card className="p-6 bg-white border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Model Sync</span>
              </div>
              <p className="text-[10px] text-slate-700 uppercase font-bold tracking-wider leading-relaxed">
                Synchronizing with the latest adversarial heuristic datasets from the Lab.
              </p>
            </Card>
          </div>
        </div>

        {/* Right: Actions/Settings */}
        <div className="space-y-6">
          <Card className="p-8 space-y-8 bg-slate-50 border-slate-200">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Operations</h3>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-700 leading-relaxed">
                {inputMode === 'file'
                  ? 'The ingestion terminal will normalize PDF data using Groq-Llama3-8b recursive parsers.'
                  : inputMode === 'text'
                  ? 'The ingestion terminal will process text content using advanced NLP analysis.'
                  : 'The ingestion terminal will analyze the reference URL using heuristic intelligence gathering.'}
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-14 gap-3 text-sm font-black uppercase tracking-[0.2em] shadow-md shadow-blue-300 group"
              disabled={isLoading || (
                inputMode === 'file' ? !file : 
                inputMode === 'text' ? !textContent.trim() :
                !urlContent.trim() || !isValidUrl(urlContent)
              )}
            >
              Initiate Analysis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="pt-8 border-t border-slate-300 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Session Statistics</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-700">Node Speed</span>
                  <span className="text-blue-600 font-mono">0.4s p/entity</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-700">Heuristic Depth</span>
                  <span className="text-blue-600 font-mono">Tier 4 Active</span>
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
