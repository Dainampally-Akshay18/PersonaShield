"""
Phishing email simulation API endpoint.
Generates educational phishing emails for security awareness training.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.phishing_schema import PhishingSimulationRequest, PhishingSimulationResponse
from app.services.phishing_service import generate_phishing_email

router = APIRouter(prefix="/generate-phishing", tags=["phishing"])


@router.post("", response_model=PhishingSimulationResponse)
async def generate_phishing(request: PhishingSimulationRequest):
    """
    Generate an educational phishing email simulation.
    
    Creates a realistic but clearly educational phishing email that demonstrates
    common attack patterns and tactics used in real social engineering attacks.
    This is intended for cybersecurity awareness training and educational purposes only.
    
    Request body:
    {
        "entities": {
            "emails": [...],
            "company": [...],
            "job_title": [...],
            "location": [...],
            ...
        }
    }
    
    Returns:
    {
        "email_subject": "Simulated phishing subject line",
        "email_body": "Simulated phishing email content",
        "disclaimer": "EDUCATIONAL SIMULATION ONLY: ..."
    }
    
    Note:
    - If LLM is unavailable, returns safe default example
    - Always includes educational disclaimer
    - This is for cybersecurity awareness training only
    - Never use this to actually phish anyone
    """
    try:
        result = generate_phishing_email(request.entities)
        return PhishingSimulationResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error generating phishing simulation: {str(e)}"
        )
