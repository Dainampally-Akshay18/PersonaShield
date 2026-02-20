"""
Correlation API endpoints.
Rule-based risk correlation from extracted entities.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.correlation_schema import CorrelationRequest, CorrelationResponse
from app.services.correlation_engine import apply_correlation_rules

router = APIRouter(prefix="/correlate", tags=["correlation"])


@router.post("", response_model=CorrelationResponse)
async def correlate(request: CorrelationRequest):
    """
    Correlate extracted entities using rule-based logic.
    
    Applies deterministic correlation rules to identify data privacy risks.
    
    Request body:
    {
        "entities": {
            "emails": [...],
            "phones": [...],
            "dob": [...],
            "graduation_year": [...],
            "college": [...],
            "company": [...],
            "job_title": [...],
            "location": [...],
            "family_mentions": [...],
            "skills": [...],
            "certifications": [...],
            "years_of_experience": 0
        }
    }
    
    Returns:
    {
        "inferred_risks": [
            {
                "risk_type": "...",
                "severity": 0-10,
                "pathway": ["data", "inference", ...]
            }
        ],
        "inference_chains_count": 0
    }
    """
    try:
        result = apply_correlation_rules(request.entities)
        
        return CorrelationResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
