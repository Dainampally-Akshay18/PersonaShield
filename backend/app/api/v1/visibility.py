"""
Visibility exposure API endpoint.
Calculates data visibility based on entity types.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.visibility_schema import VisibilityRequest, VisibilityResponse
from app.services.visibility_service import calculate_visibility

router = APIRouter(prefix="/visibility", tags=["visibility"])


@router.post("", response_model=VisibilityResponse)
async def analyze_visibility(request: VisibilityRequest):
    """
    Analyze visibility exposure from extracted entities.
    
    Calculates a visibility score based on what types of personal data
    have been extracted. Different data types have different visibility weights:
    
    High visibility (weight 3): email, company, job_title, location
    Medium visibility (weight 2): skills, certifications
    Low visibility (weight 1): family_mentions
    
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
        "visibility_score": 7.5,
        "visibility_level": "High"
    }
    """
    try:
        result = calculate_visibility(request.entities)
        return VisibilityResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
