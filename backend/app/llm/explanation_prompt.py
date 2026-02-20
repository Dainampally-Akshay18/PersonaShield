"""
Explanation prompt templates for LLM.
"""

from typing import Dict, List, Any
import json


def get_explanation_prompt(
    risk_score: float,
    score_breakdown: Dict[str, Any],
    inferred_risks: List[Dict[str, Any]]
) -> str:
    """
    Generate a prompt for explaining privacy risks in non-technical language.
    
    Args:
        risk_score: Overall risk score (0-100)
        score_breakdown: Dictionary of score components
        inferred_risks: List of inferred privacy risks
    
    Returns:
        Prompt string for LLM
    """
    
    # Format the inferred risks for readability
    risks_summary = []
    for risk in inferred_risks:
        risk_type = risk.get("risk_type", "Unknown").replace("_", " ").title()
        entity_types = ", ".join(risk.get("entity_types", []))
        risks_summary.append(f"- {risk_type}: {entity_types}")
    
    risks_text = "\n".join(risks_summary) if risks_summary else "No specific risks identified"
    
    # Determine risk level description
    if risk_score >= 80:
        risk_level = "high"
        severity_phrase = "significant privacy concerns"
    elif risk_score >= 60:
        risk_level = "moderate-to-high"
        severity_phrase = "notable privacy risks"
    elif risk_score >= 40:
        risk_level = "moderate"
        severity_phrase = "some privacy considerations"
    else:
        risk_level = "low"
        severity_phrase = "minimal privacy exposure"
    
    prompt = f"""You are a privacy education expert. Explain to a non-technical person why their data has a {risk_level} privacy risk score.

RISK SCORE: {risk_score}/100

SCORE BREAKDOWN:
- PII Exposure: {score_breakdown.get('pii_exposure', 0)}/20
- Correlation Score: {score_breakdown.get('correlation_score', 0)}/20
- Inference Depth: {score_breakdown.get('inference_depth', 0)}/20
- Employment Exposure: {score_breakdown.get('employment_exposure', 0)}/20
- Location Exposure: {score_breakdown.get('location_exposure', 0)}/10
- Timeline Exposure: {score_breakdown.get('timeline_exposure', 0)}/10
- Visibility Exposure: {score_breakdown.get('visibility_exposure', 0)}/10

IDENTIFIED RISKS:
{risks_text}

Your explanation must:
1. State in simple language WHY the score is high/low
2. Mention specific data combinations that create risk (e.g., "email + phone + job title")
3. Explain real-world consequences in everyday terms (e.g., "someone could use this to reset your password")
4. Use friendly, balanced tone - educate, don't fear-monger
5. Avoid technical jargon
6. Include practical advice for reducing exposure
7. Be 150-250 words
8. Start with: "Your profile contains [what data] that creates risks because..."

Write the explanation now:"""
    
    return prompt
