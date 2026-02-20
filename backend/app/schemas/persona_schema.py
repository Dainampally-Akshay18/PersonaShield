"""
Schemas for persona simulation endpoint.
"""

from pydantic import BaseModel, Field
from typing import List


class AnalysisSummary(BaseModel):
    """Analysis summary containing entities and risks."""
    entities: dict = Field(...)
    attack_vectors: List[dict] = Field(default=[])
    risk_score: float = Field(default=0, ge=0, le=100)


class PersonaSimulationRequest(BaseModel):
    """Schema for persona simulation request."""
    persona: str = Field(..., pattern="^(script_kiddie|professional_scammer|corporate_spy)$")
    analysis_summary: AnalysisSummary = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "persona": "professional_scammer",
                "analysis_summary": {
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
                    "attack_vectors": [
                        {
                            "category": "Spear Phishing Risk",
                            "severity": "High",
                            "contributing_factors": ["company", "job_title", "emails"]
                        }
                    ],
                    "risk_score": 75
                }
            }
        }


class PersonaSimulationResponse(BaseModel):
    """Schema for persona simulation response."""
    persona: str
    narrative: str

    class Config:
        json_schema_extra = {
            "example": {
                "persona": "professional_scammer",
                "narrative": "As a professional social engineer, I would leverage the detailed profile information to craft a highly personalized phishing campaign. Starting with the company domain and role details, I would create a convincing email impersonating an internal systems administrator requesting credential verification..."
            }
        }
