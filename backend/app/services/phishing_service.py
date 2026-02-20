"""
Phishing email generation service.
Creates realistic phishing simulations for educational security awareness training.
"""

import re
from app.llm.langchain_client import generate_text
from app.llm.phishing_prompt import get_phishing_email_prompt


DISCLAIMER = "EDUCATIONAL SIMULATION ONLY: This is a simulated phishing email for cybersecurity awareness training. This simulation demonstrates common phishing tactics used in real attacks. Never provide credentials or sensitive information in response to unsolicited requests."

FALLBACK_SUBJECT = "Security Awareness Example"
FALLBACK_BODY = "This is a simulated phishing example for educational purposes. A real phishing email might impersonate your IT department, company leadership, or trusted service and request verification of account credentials or sensitive information. Always verify requests through official channels before responding."


def generate_phishing_email(entities: dict) -> dict:
    """
    Generate an educational phishing email simulation.
    
    Uses LLM to create a realistic but clearly educational phishing email
    that demonstrates common attack patterns for security awareness training.
    
    Args:
        entities: Extracted entity dictionary with company, role, location, etc.
    
    Returns:
        Dictionary with email_subject, email_body, and disclaimer
        - Returns safe fallback if LLM fails
        - Always includes educational disclaimer
    """
    if not isinstance(entities, dict):
        return _get_fallback_response()
    
    try:
        # Generate prompt
        prompt = get_phishing_email_prompt(entities)
        
        # Call LLM to generate email
        generated_text = generate_text(prompt)
        
        # If LLM failed or returned empty, use fallback
        if not generated_text or len(generated_text) < 50:
            return _get_fallback_response()
        
        # Parse the generated response
        subject, body = _parse_phishing_email(generated_text)
        
        # Validate parsed results
        if not subject or not body:
            return _get_fallback_response()
        
        return {
            "email_subject": subject,
            "email_body": body,
            "disclaimer": DISCLAIMER
        }
    
    except Exception:
        # Any error returns safe fallback
        return _get_fallback_response()


def _parse_phishing_email(generated_text: str) -> tuple:
    """
    Parse generated text to extract subject and body.
    
    Looks for patterns like:
    Email Subject: [subject]
    Email Body: [body]
    
    Args:
        generated_text: Raw LLM output
    
    Returns:
        Tuple of (subject, body)
    """
    # Try to find subject line
    subject_match = re.search(r"(?:Email )?Subject:\s*(.+?)(?:\n|$)", generated_text, re.IGNORECASE)
    subject = subject_match.group(1).strip() if subject_match else FALLBACK_SUBJECT
    
    # Try to find body
    # Look for "Email Body:" or "Body:" and take everything after it
    body_match = re.search(r"(?:Email )?Body:\s*(.+?)(?:\n(?:Email|---)|$)", generated_text, re.IGNORECASE | re.DOTALL)
    
    if body_match:
        body = body_match.group(1).strip()
    else:
        # If no explicit marker, take everything after the first paragraph as body
        parts = generated_text.split("\n\n")
        if len(parts) > 1:
            body = "\n\n".join(parts[1:]).strip()
        else:
            body = generated_text.strip()
    
    # Clean up the body
    body = body.strip()
    if not body:
        body = FALLBACK_BODY
    
    return subject, body


def _get_fallback_response() -> dict:
    """
    Get safe fallback response when LLM is unavailable.
    
    Returns:
        Dictionary with safe default phishing simulation example
    """
    return {
        "email_subject": FALLBACK_SUBJECT,
        "email_body": FALLBACK_BODY,
        "disclaimer": DISCLAIMER
    }
