import { useState, useEffect, useMemo } from 'react';
import { useAnalysis } from '../contexts/AnalysisContext';

// Safe data extraction function
function buildReconList(entities) {
  const list = [];

  const pushItems = (label, icon, value) => {
    if (!value) return;

    if (Array.isArray(value)) {
      value.filter(Boolean).forEach((v) => {
        list.push({ label, value: String(v), icon });
      });
    } else {
      list.push({ label, value: String(value), icon });
    }
  };

  // Safe entity extraction with exact keys
  pushItems('Email', '✉️', entities.emails);
  pushItems('Phone', '📱', entities.phones);
  pushItems('Skill', '🎯', entities.skills);
  pushItems('Location', '📍', entities.location);
  pushItems('Company', '🏢', entities.company);

  return list;
}

// Recon Card Component
function ReconCard({ label, value, icon, animationDelay }) {
  return (
    <div
      className="animate-slide-in rounded-lg border border-slate-700 bg-slate-800/50 p-6"
      style={{
        animationDelay: `${animationDelay}s`,
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">
        {label}
      </h3>
      <p className="text-lg font-mono text-cyan-300 break-all">
        {value}
      </p>
    </div>
  );
}

function AttackSimulationModal({ isOpen, onClose }) {
  const { analysisResult } = useAnalysis();

  // Top-level safety check
  if (!analysisResult) {
    return null;
  }

  // Safe data extraction
  const analysis = analysisResult || {};
  const entities = analysis.entities || {};
  const narrative = analysis.persona_simulation?.narrative || '';
  const phishing = analysis.phishing_simulation || {};
  const riskScore = analysis.risk_assessment?.risk_score || 0;
  const explanation = analysis.explanation?.explanation || '';

  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleEntities, setVisibleEntities] = useState([]);
  const [narrativeText, setNarrativeText] = useState('');
  const [emailBodyText, setEmailBodyText] = useState('');
  const [riskScoreDisplay, setRiskScoreDisplay] = useState(0);
  const [skipAnimation, setSkipAnimation] = useState(false);

  // Memoized recon list for stable reference in effects
  const reconList = useMemo(() => buildReconList(entities), [entities]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setVisibleEntities([]);
      setNarrativeText('');
      setEmailBodyText('');
      setRiskScoreDisplay(0);
      setSkipAnimation(false);
    }
  }, [isOpen]);

  // Step 1: Entity cards reveal
  useEffect(() => {
    if (currentStep !== 0 || !isOpen) return;

    let index = 0;
    const interval = setInterval(() => {
      if (skipAnimation) {
        setVisibleEntities(reconList);
        clearInterval(interval);
        return;
      }
      if (index < reconList.length) {
        setVisibleEntities((prev) => [...prev, reconList[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, reconList]);

  // Step 2: Typewriter animation for narrative
  useEffect(() => {
    if (currentStep !== 1 || !isOpen) return;

    setNarrativeText('');
    let index = 0;

    const interval = setInterval(() => {
      if (skipAnimation) {
        setNarrativeText(narrative);
        clearInterval(interval);
        return;
      }
      if (index < narrative.length) {
        setNarrativeText(narrative.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, narrative]);

  // Step 3: Email body typewriter
  useEffect(() => {
    if (currentStep !== 2 || !isOpen) return;

    setEmailBodyText('');
    const emailBody = phishing.email_body || '';
    let index = 0;

    const interval = setInterval(() => {
      if (skipAnimation) {
        setEmailBodyText(emailBody);
        clearInterval(interval);
        return;
      }
      if (index < emailBody.length) {
        setEmailBodyText(emailBody.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, phishing]);

  // Step 4: Risk score counter
  useEffect(() => {
    if (currentStep !== 3 || !isOpen) return;

    setRiskScoreDisplay(0);
    let currentValue = 0;

    const interval = setInterval(() => {
      if (skipAnimation) {
        setRiskScoreDisplay(riskScore);
        clearInterval(interval);
        return;
      }
      if (currentValue < riskScore) {
        currentValue += Math.ceil(riskScore / 30);
        setRiskScoreDisplay(Math.min(currentValue, riskScore));
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep, isOpen, skipAnimation, riskScore]);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setVisibleEntities([]);
      setNarrativeText('');
      setEmailBodyText('');
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setVisibleEntities([]);
      setNarrativeText('');
      setEmailBodyText('');
    }
  };

  const handleSkip = () => {
    setSkipAnimation(true);
  };

  if (!isOpen) {
    return null;
  }

  try {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className="relative z-10 h-screen max-h-screen w-full max-w-4xl overflow-y-auto rounded-xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-950 p-8 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Step 1: Reconnaissance */}
          {currentStep === 0 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-4xl font-bold text-slate-50 mb-2">
                  Reconnaissance
                </h2>
                <p className="text-lg text-slate-400">
                  An attacker begins collecting your data...
                </p>
              </div>

              {reconList.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {visibleEntities.map((entity, index) => (
                    <ReconCard
                      key={`${entity.label}-${entity.value}-${index}`}
                      label={entity.label}
                      value={entity.value}
                      icon={entity.icon}
                      animationDelay={index * 0.15}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400">No personal data found</p>
                </div>
              )}

              {visibleEntities.length === 0 && reconList.length > 0 && (
                <div className="text-center py-8">
                  <div className="inline-block">
                    <div className="h-12 w-12 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Profiling */}
          {currentStep === 1 && narrative && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-4xl font-bold text-slate-50 mb-2">
                  Profiling
                </h2>
                <p className="text-lg text-slate-400">
                  They build a psychological profile of you...
                </p>
              </div>

              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-8">
                <p className="text-lg leading-relaxed text-slate-300 min-h-48">
                  {narrativeText || narrative}
                  {narrativeText.length < narrative.length && (
                    <span className="animate-pulse text-cyan-400">▮</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Weaponization */}
          {currentStep === 2 && phishing && Object.keys(phishing).length > 0 && (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-4xl font-bold text-slate-50 mb-2">
                  Weaponization
                </h2>
                <p className="text-lg text-slate-400">
                  They craft a targeted phishing attack...
                </p>
              </div>

              {/* Email Preview */}
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden shadow-xl">
                {/* Email Header */}
                <div className="border-b border-slate-700 bg-slate-900/80 px-6 py-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                      A
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-100">
                        no-reply@trusted-service.com
                      </p>
                      <p className="text-xs text-slate-500">Spoofed sender</p>
                    </div>
                  </div>
                </div>

                {/* Email Subject */}
                <div className="border-b border-slate-700 px-6 py-3">
                  <p className="text-sm text-slate-400">Subject:</p>
                  <p className="text-base font-semibold text-slate-100 mt-1">
                    {phishing.email_subject || 'Urgent Action Required'}
                  </p>
                </div>

                {/* Email Body */}
                <div className="px-6 py-6">
                  <p className="text-base leading-relaxed text-slate-300 font-mono whitespace-pre-wrap">
                    {emailBodyText || phishing.email_body || 'Email content loading...'}
                    {emailBodyText.length < (phishing.email_body || '').length && (
                      <span className="animate-pulse text-amber-400">▮</span>
                    )}
                  </p>
                </div>

                {/* Email CTA */}
                <div className="border-t border-slate-700 bg-slate-900/50 px-6 py-4">
                  <button className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 transition-colors">
                    Click bait button
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Impact */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in flex flex-col items-center justify-center min-h-96">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-slate-50 mb-6">
                  Impact
                </h2>
                <p className="text-lg text-slate-400 mb-12">
                  This could realistically happen...
                </p>

                {/* Risk Score Animation */}
                {riskScore > 0 ? (
                  <div className="inline-flex flex-col items-center gap-4">
                    <div className="relative">
                      <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500">
                        {riskScoreDisplay}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xl font-semibold text-red-300">
                        Your Risk Score
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-slate-300">
                    No risk data
                  </div>
                )}

                {/* Warning Message */}
                {explanation && (
                  <div className="mt-12 rounded-lg border-2 border-red-700 bg-red-900/20 px-8 py-6">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">⚠️</div>
                      <div className="text-left">
                        <p className="text-base font-semibold text-red-300 mb-2">
                          Realistic Threat
                        </p>
                        <p className="text-sm leading-relaxed text-red-200/80">
                          {explanation.split('\n\n')[0]?.substring(0, 300)}...
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="mt-8 flex gap-2">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex gap-3 justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-200 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Back
            </button>

            <button
              onClick={handleSkip}
              className="px-4 py-2 rounded-lg border border-slate-600 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-sm"
            >
              Skip animations
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors font-semibold"
            >
              {currentStep === 3 ? 'Close' : 'Next →'}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }

          .animate-slide-in {
            animation: slide-in 0.5s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    );
  } catch (error) {
    console.error('AttackSimulationModal Error:', error);
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="relative z-10 rounded-xl border border-red-700 bg-red-900/20 p-8 text-center">
          <p className="text-red-300 font-semibold mb-4">
            Simulation unavailable for this dataset
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-slate-700 text-slate-50 hover:bg-slate-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
}

export default AttackSimulationModal;
