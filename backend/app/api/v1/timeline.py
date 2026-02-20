"""
Timeline exposure API endpoint.
Calculates temporal exposure based on graduation year and work history.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.timeline_schema import TimelineRequest, TimelineResponse
from app.services.timeline_service import calculate_timeline_exposure

router = APIRouter(prefix="/timeline", tags=["timeline"])


@router.post("", response_model=TimelineResponse)
async def analyze_timeline_exposure(request: TimelineRequest):
    """
    Analyze timeline exposure from graduation year and work history.
    
    Calculates estimated years of data exposure based on when the person
    graduated and their years of experience.
    
    Request body:
    {
        "graduation_year": 2015,
        "years_of_experience": 8,
        "company_years": 3
    }
    
    Logic:
    exposure_years = max(
        (current_year - graduation_year),
        years_of_experience + company_years
    )
    exposure_years = clamp(exposure_years, 0, 40)
    timeline_risk_weight = min(exposure_years / 2, 10)
    
    Returns:
    {
        "estimated_exposure_years": 8,
        "timeline_risk_weight": 4.0
    }
    """
    try:
        result = calculate_timeline_exposure(
            graduation_year=request.graduation_year,
            years_of_experience=request.years_of_experience,
            company_years=request.company_years
        )
        return TimelineResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
