import { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext(null);

function readHistoryFromStorage() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem('analysisHistory');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistoryToStorage(history) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem('analysisHistory', JSON.stringify(history));
  } catch {
    // ignore storage errors
  }
}

export function AnalysisProvider({ children }) {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisHistory, setAnalysisHistory] = useState(() =>
    readHistoryFromStorage(),
  );

  function setAnalysis(result) {
    setAnalysisResult(result);
    setAnalysisHistory((prev) => {
      const next = [...prev, result];
      writeHistoryToStorage(next);
      return next;
    });
  }

  function clearAnalysis() {
    setAnalysisResult(null);
  }

  const value = {
    analysisResult,
    analysisHistory,
    setAnalysis,
    clearAnalysis,
  };
  return (
    <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error('useAnalysis must be used within AnalysisProvider');
  return ctx;
}
