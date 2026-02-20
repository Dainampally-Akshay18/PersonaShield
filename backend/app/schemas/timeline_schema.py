"""
Schemas for timeline exposure analysis.
"""

from pydantic import BaseModel, Field


class TimelineRequest(BaseModel):
    """Schema for timeline exposure analysis request."""
    graduation_year: int = Field(default=0, ge=0)
    years_of_experience: int = Field(default=0, ge=0)
    company_years: int = Field(default=0, ge=0)

    class Config:
        json_schema_extra = {
            "example": {
                "graduation_year": 2015,
                "years_of_experience": 8,
                "company_years": 3
            }
        }


class TimelineResponse(BaseModel):
    """Schema for timeline exposure analysis response."""
    estimated_exposure_years: int
    timeline_risk_weight: float

    class Config:
        json_schema_extra = {
            "example": {
                "estimated_exposure_years": 8,
                "timeline_risk_weight": 4.0
            }
        }
