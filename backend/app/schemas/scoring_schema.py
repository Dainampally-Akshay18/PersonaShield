"""
Schemas for scoring API.
Pydantic models for scoring request and response.
"""

from pydantic import BaseModel, Field
from typing import List, Dict


class ScoringRequest(BaseModel):
    """Schema for scoring API request."""
    entities: dict = Field(...)
    inferred_risks: List[dict] = Field(...)
    correlation_depth: int = Field(default=0, ge=0)
    timeline_years: int = Field(default=0, ge=0)
    visibility_score: float = Field(default=0, ge=0, le=100)

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
                },
                "inferred_risks": [
                    {
                        "risk_type": "Personal Identity Exposure",
                        "severity": 9,
                        "pathway": ["dob", "emails", "phones"]
                    }
                ],
                "correlation_depth": 3,
                "timeline_years": 5,
                "visibility_score": 75
            }
        }


class ScoreBreakdown(BaseModel):
    """Score breakdown by component."""
    pii_exposure: float
    correlation_score: float
    inference_depth_score: float
    employment_exposure: float
    location_exposure: float
    timeline_exposure: float
    visibility_exposure: float

    class Config:
        json_schema_extra = {
            "example": {
                "pii_exposure": 20.0,
                "correlation_score": 18.0,
                "inference_depth_score": 6.0,
                "employment_exposure": 10.0,
                "location_exposure": 5.0,
                "timeline_exposure": 5.0,
                "visibility_exposure": 7.5
            }
        }


class ScoringResponse(BaseModel):
    """Schema for scoring API response."""
    risk_score: float
    risk_level: str
    score_breakdown: ScoreBreakdown

    class Config:
        json_schema_extra = {
            "example": {
                "risk_score": 71.5,
                "risk_level": "High",
                "score_breakdown": {
                    "pii_exposure": 20.0,
                    "correlation_score": 18.0,
                    "inference_depth_score": 6.0,
                    "employment_exposure": 10.0,
                    "location_exposure": 5.0,
                    "timeline_exposure": 5.0,
                    "visibility_exposure": 7.5
                }
            }
        }
