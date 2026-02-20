"""
Schemas for visibility exposure analysis.
"""

from pydantic import BaseModel, Field


class VisibilityRequest(BaseModel):
    """Schema for visibility exposure analysis request."""
    entities: dict = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "entities": {
                    "emails": ["john@example.com"],
                    "phones": ["9876543210"],
                    "dob": ["15/06/1995"],
                    "graduation_year": [2015],
                    "college": ["IIT Delhi"],
                    "company": ["Amazon"],
                    "job_title": ["engineer"],
                    "location": ["Bangalore"],
                    "family_mentions": [],
                    "skills": ["python", "aws"],
                    "certifications": [],
                    "years_of_experience": 8
                }
            }
        }


class VisibilityResponse(BaseModel):
    """Schema for visibility exposure analysis response."""
    visibility_score: float
    visibility_level: str

    class Config:
        json_schema_extra = {
            "example": {
                "visibility_score": 7.5,
                "visibility_level": "High"
            }
        }
