"""
Schemas for correlation API.
Pydantic models for correlation request and response.
"""

from pydantic import BaseModel, Field
from typing import List


class InferredRisk(BaseModel):
    """Schema for a single inferred risk."""
    risk_type: str
    severity: int
    pathway: List[str]

    class Config:
        json_schema_extra = {
            "example": {
                "risk_type": "Personal Identity Exposure",
                "severity": 9,
                "pathway": ["dob", "emails", "phones"]
            }
        }


class CorrelationRequest(BaseModel):
    """Schema for correlation API request."""
    entities: dict = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "entities": {
                    "emails": ["john@example.com"],
                    "phones": ["9876543210"],
                    "dob": ["15/06/1995"],
                    "graduation_year": [2018],
                    "college": ["IIT Delhi"],
                    "company": ["Amazon"],
                    "job_title": ["engineer"],
                    "location": ["Bangalore"],
                    "family_mentions": [],
                    "skills": ["python", "aws"],
                    "certifications": [],
                    "years_of_experience": 5
                }
            }
        }


class CorrelationResponse(BaseModel):
    """Schema for correlation API response."""
    inferred_risks: List[InferredRisk]
    inference_chains_count: int

    class Config:
        json_schema_extra = {
            "example": {
                "inferred_risks": [
                    {
                        "risk_type": "Personal Identity Exposure",
                        "severity": 9,
                        "pathway": ["dob", "emails", "phones"]
                    },
                    {
                        "risk_type": "Government ID Reconstruction Risk",
                        "severity": 9,
                        "pathway": ["dob", "phones", "location"]
                    }
                ],
                "inference_chains_count": 2
            }
        }
