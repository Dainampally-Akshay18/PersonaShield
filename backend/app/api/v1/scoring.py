"""
Scoring API endpoints.
Weighted risk scoring based on entities and inferred risks.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.scoring_schema import ScoringRequest, ScoringResponse
from app.services.scoring_engine import calculate_risk_score

router = APIRouter(prefix="/score", tags=["scoring"])


@router.post("", response_model=ScoringResponse)
async def score(request: ScoringRequest):
    """
    Calculate weighted risk score from extracted entities and inferred risks.
    
    Request body:
    {
        "entities": {...},
        "inferred_risks": [...],
        "correlation_depth": 0,
        "timeline_years": 0,
        "visibility_score": 0
    }
    
    Scoring Components:
    1. PII Exposure: emails, phones, DOB
    2. Correlation Score: sum of risk severities
    3. Inference Depth: correlation chain depth
    4. Employment Exposure: company + job_title
    5. Location Exposure: location presence
    6. Timeline Exposure: years of exposure (max 10)
    7. Visibility Exposure: visibility score (0-100)
    
    Returns:
    {
        "risk_score": 0-100,
        "risk_level": "Low|Moderate|High",
        "score_breakdown": {...}
    }
    """
    try:
        result = calculate_risk_score(
            entities=request.entities,
            inferred_risks=request.inferred_risks,
            correlation_depth=request.correlation_depth,
            timeline_years=request.timeline_years,
            visibility_score=request.visibility_score
        )
        
        return ScoringResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
