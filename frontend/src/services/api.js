// API layer - Dual input support (file + text)

const BASE_URL = 'http://127.0.0.1:8000';

/**
 * Configuration for analysis pipeline
 * Persona options: 'script_kiddie', 'professional_scammer', 'corporate_spy'
 */
const DEFAULT_PERSONA = 'professional_scammer';
const DEFAULT_SIMULATE_HARDENING = true;

/**
 * Analyze PDF file for privacy risks
 * @param {File} file - PDF file to analyze
 * @param {string} persona - Type of threat actor (optional)
 * @param {boolean} simulateHardening - Run hardening simulation (default: true)
 * @param {Array<string>} fieldsToRemove - Fields to test in hardening (optional)
 * @returns {Promise<Object>} Complete analysis results
 */
export async function analyzePDF(
  file,
  persona = DEFAULT_PERSONA,
  simulateHardening = DEFAULT_SIMULATE_HARDENING,
  fieldsToRemove = []
) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('persona', persona);
  // Convert boolean to string for form data compatibility (FastAPI Form expects strings)
  formData.append('simulate_hardening', simulateHardening ? 'true' : 'false');
  
  // Format fields_to_remove as comma-separated string (API expects this format)
  if (fieldsToRemove && fieldsToRemove.length > 0) {
    formData.append('fields_to_remove', fieldsToRemove.join(','));
  }

  const response = await fetch(`${BASE_URL}/api/v1/analyze/upload-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Analyze text content for privacy risks
 * @param {string} content - Text content to analyze (resume, bio, profile, etc.)
 * @param {string} persona - Type of threat actor (optional)
 * @param {boolean} simulateHardening - Run hardening simulation (default: true)
 * @param {Array<string>} fieldsToRemove - Fields to test in hardening (optional)
 * @returns {Promise<Object>} Complete analysis results
 */
export async function analyzeText(
  content,
  persona = DEFAULT_PERSONA,
  simulateHardening = DEFAULT_SIMULATE_HARDENING,
  fieldsToRemove = []
) {
  const payload = {
    content: content.trim(),
    persona: persona,
    simulate_hardening: simulateHardening,
    fields_to_remove: fieldsToRemove && fieldsToRemove.length > 0 ? fieldsToRemove : null,
  };

  const response = await fetch(`${BASE_URL}/api/v1/analyze/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Scrape and analyze content from a URL
 * @param {string} url - URL to scrape and analyze
 * @param {string} persona - Type of threat actor (optional)
 * @param {boolean} analyze - Whether to perform full analysis (default: true)
 * @returns {Promise<Object>} Scraped content and analysis results
 */
export async function analyzeURL(
  url,
  persona = DEFAULT_PERSONA,
  analyze = true
) {
  const payload = {
    url: url.trim(),
    analyze: analyze,
    persona: persona,
  };

  const response = await fetch(`${BASE_URL}/api/v1/scrape/url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Legacy: uploadResume - now maps to analyzePDF for backward compatibility
 * @deprecated Use analyzePDF instead
 */
export async function uploadResume(file) {
  return analyzePDF(file);
}
