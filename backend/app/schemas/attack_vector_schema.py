"""
Schemas for attack vector categorization.
"""

from pydantic import BaseModel, Field
from typing import List


class AttackVectorRequest(BaseModel):
    """Schema for attack vector categorization request."""
    entities: dict = Field(...)
    inferred_risks: List[dict] = Field(default=[])

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
                ]
            }
        }


class AttackVector(BaseModel):
    """Schema for a single attack vector."""
    category: str
    severity: str
    contributing_factors: List[str]

    class Config:
        json_schema_extra = {
            "example": {
                "category": "Spear Phishing Risk",
                "severity": "High",
                "contributing_factors": ["company", "job_title", "emails"]
            }
        }


class AttackVectorResponse(BaseModel):
    """Schema for attack vector categorization response."""
    attack_vectors: List[AttackVector]

    class Config:
        json_schema_extra = {
            "example": {
                "attack_vectors": [
                    {
                        "category": "Spear Phishing Risk",
                        "severity": "High",
                        "contributing_factors": ["company", "job_title", "emails"]
                    },
                    {
                        "category": "Identity Theft Risk",
                        "severity": "High",
                        "contributing_factors": ["dob", "emails", "phones"]
                    }
                ]
            }
        }
