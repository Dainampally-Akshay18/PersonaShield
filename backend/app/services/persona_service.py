"""
Persona simulation service.
Generates attack strategy narratives from different attacker perspectives.
"""

from app.llm.langchain_client import generate_text
from app.llm.persona_prompts import get_persona_prompt


def generate_persona_narrative(persona: str, analysis_summary: dict) -> dict:
    """
    Generate a persona-based attack narrative.
    
    Uses LangChain to generate educational narratives describing how
    a specific attacker archetype would exploit the exposed data.
    
    Args:
        persona: Type of attacker ("script_kiddie", "professional_scammer", "corporate_spy")
        analysis_summary: Dictionary with entities, attack_vectors, risk_score
    
    Returns:
        Dictionary with persona and narrative (uses fallback if LLM fails)
    
    Raises:
        ValueError: If persona type is invalid
    """
    # Validate persona type
    valid_personas = ["script_kiddie", "professional_scammer", "corporate_spy"]
    if persona not in valid_personas:
        raise ValueError(f"Invalid persona: {persona}. Must be one of: {', '.join(valid_personas)}")
    
    # Get the appropriate prompt
    try:
        prompt = get_persona_prompt(persona, analysis_summary)
    except ValueError as e:
        raise ValueError(str(e))
    
    # Generate narrative using LLM (with fallback)
    try:
        narrative = generate_text(prompt)
        if narrative and len(narrative.strip()) > 20:
            return {
                "persona": persona,
                "narrative": narrative
            }
    except Exception as e:
        print(f"[WARNING] Persona narrative generation failed: {str(e)}")
    
    # Fallback narratives
    fallback_narratives = {
        "script_kiddie": "This target presents moderate opportunity for opportunistic attacks. The exposed contact information and employment details create vectors for credential stuffing and basic phishing campaigns. A script kiddie would leverage existing exploit frameworks and automated tools to attempt account compromise.",
        
        "professional_scammer": "This profile offers rich social engineering potential. The professional background, employment history, and identified interests create multiple trust-building angles for a sophisticated phishing campaign. A social engineer would craft a highly personalized pretext leveraging industry terminology and mutual connections to extract sensitive information.",
        
        "corporate_spy": "This individual's technical skills and organizational affiliation make them a valuable intelligence target. The exposed professional connections and certifications indicate access to proprietary information. A corporate operative would initiate a long-term relationship-building approach targeting professional networks and industry forums for gradual information extraction."
    }
    
    return {
        "persona": persona,
        "narrative": fallback_narratives.get(persona, "Narrative generation unavailable.")
    }
