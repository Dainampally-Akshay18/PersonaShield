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
        Dictionary with persona and narrative (narrative is empty string on LLM failure)
    
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
    
    # Generate narrative using LLM (with fallback to empty string)
    narrative = generate_text(prompt)
    
    return {
        "persona": persona,
        "narrative": narrative
    }
