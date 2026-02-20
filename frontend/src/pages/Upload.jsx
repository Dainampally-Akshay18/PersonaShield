import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadResume } from '../services/api';
import { useAnalysis } from '../contexts/AnalysisContext';

function Upload() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAnalysis } = useAnalysis();

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];

    if (!selected) {
      return;
    }

    if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      setFile(null);
      return;
    }

    setError('');
    setFile(selected);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dropped = event.dataTransfer.files?.[0];

    if (!dropped) {
      return;
    }

    if (dropped.type !== 'application/pdf' && !dropped.name.endsWith('.pdf')) {
      setError('Please upload a PDF file.');
      setFile(null);
      return;
    }

    setError('');
    setFile(dropped);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Please select a PDF file to upload.');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const result = await uploadResume(file);
      setAnalysis(result);
      navigate('/dashboard/risk-graphs');
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-slate-950/50">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
          Upload resume
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Upload a PDF resume to analyze your public digital footprint and
          generate a full cyber-risk profile.
        </p>

        <form onSubmit={handleUpload} className="mt-6 space-y-4">
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center transition-colors hover:border-cyan-500/70 hover:bg-slate-900"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <input
              id="resume-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="resume-upload"
              className="text-sm font-medium text-slate-200"
            >
              Drag and drop a PDF here, or click to browse
            </label>
            <p className="mt-2 text-xs text-slate-500">
              Only PDF files are supported.
            </p>
            {file ? (
              <p className="mt-3 text-xs text-cyan-300">Selected: {file.name}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? 'Uploading...' : 'Upload and analyze'}
          </button>
        </form>

        {isLoading ? (
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <span>Analyzing digital footprint...</span>
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Upload;
