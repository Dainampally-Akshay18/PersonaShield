"""
Persona simulation API endpoint.
Generates educational attack narratives from attacker perspectives.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.persona_schema import PersonaSimulationRequest, PersonaSimulationResponse
from app.services.persona_service import generate_persona_narrative

router = APIRouter(prefix="/persona-simulation", tags=["persona"])


@router.post("", response_model=PersonaSimulationResponse)
async def simulate_persona(request: PersonaSimulationRequest):
    """
    Generate an educational attack narrative from a specific persona perspective.
    
    Uses LangChain to generate realistic but educational narratives describing
    how different types of attackers would exploit the identified vulnerabilities.
    
    Request body:
    {
        "persona": "script_kiddie|professional_scammer|corporate_spy",
        "analysis_summary": {
            "entities": {...},
            "attack_vectors": [...],
            "risk_score": 0-100
        }
    }
    
    Returns:
    {
        "persona": "professional_scammer",
        "narrative": "As a professional scammer I would..."
    }
    
    Note:
    - If LLM is unavailable, returns empty narrative string (API still succeeds)
    - Temperature: 0.3 (deterministic)
    - Max tokens: 400
    - Uses ChatGroq model via LangChain
    """
    try:
        result = generate_persona_narrative(
            persona=request.persona,
            analysis_summary=request.analysis_summary.dict()
        )
        return PersonaSimulationResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
