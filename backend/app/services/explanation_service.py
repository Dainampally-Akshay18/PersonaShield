"""
Risk explanation service.
Generates educational explanations of privacy risks using LLM.
"""

from typing import Dict, List, Any
from app.llm.langchain_client import generate_text
from app.llm.explanation_prompt import get_explanation_prompt


def generate_risk_explanation(
    risk_score: float,
    score_breakdown: Dict[str, Any],
    inferred_risks: List[Dict[str, Any]]
) -> str:
    """
    Generate a non-technical explanation of privacy risks.
    
    Args:
        risk_score: Overall risk score (0-100)
        score_breakdown: Dictionary of score components
        inferred_risks: List of inferred privacy risks
    
    Returns:
        Plain text explanation of privacy risks
        Returns fallback text if LLM fails
    """
    
    try:
        # Generate the prompt
        prompt = get_explanation_prompt(risk_score, score_breakdown, inferred_risks)
        
        # Call LLM to generate explanation
        explanation = generate_text(prompt)
        
        # If LLM returned empty string, use fallback
        if not explanation or explanation.strip() == "":
            return _get_fallback_explanation()
        
        return explanation.strip()
    
    except Exception as e:
        # Log the error (in production, use proper logging)
        print(f"Error generating risk explanation: {str(e)}")
        return _get_fallback_explanation()


def _get_fallback_explanation() -> str:
    """
    Fallback explanation when LLM is unavailable.
    
    Returns:
        Safe, generic explanation text
    """
    return (
        "Your data exposure creates multiple privacy risks. "
        "Consider removing sensitive personal details."
    )
