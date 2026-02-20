"""
Hardening simulation schema.
"""

from pydantic import BaseModel, Field
from typing import Dict, List, Any


class HardeningSimulationRequest(BaseModel):
    """Request model for hardening simulation."""
    
    original_entities: Dict[str, Any] = Field(
        ...,
        description="Extracted entities from data ingestion"
    )
    remove_fields: List[str] = Field(
        default_factory=list,
        description="List of entity field names to remove/redact for simulation"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "original_entities": {
                    "emails": ["john.doe@company.com"],
                    "phones": ["555-123-4567"],
                    "date_of_birth": ["1990-05-15"],
                    "job_title": ["Senior Engineer"],
                    "company": ["Tech Corp"],
                    "location": ["New York, NY"],
                    "skills": ["Python", "AWS"],
                    "years_of_experience": 8
                },
                "remove_fields": ["emails", "phones", "date_of_birth"]
            }
        }


class HardeningSimulationResponse(BaseModel):
    """Response model for hardening simulation."""
    
    original_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Risk score before hardening (0-100)"
    )
    hardened_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Risk score after removing sensitive fields (0-100)"
    )
    difference: float = Field(
        ...,
        ge=0,
        description="Risk reduction from hardening (original - hardened)"
    )
    explanation: str = Field(
        ...,
        description="LLM-generated explanation of hardening impact (fallback available if LLM unavailable)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "original_score": 75.5,
                "hardened_score": 42.3,
                "difference": 33.2,
                "explanation": "Removing phones and graduation year significantly reduces your risk because these fields are commonly used to target and verify your identity. Phone numbers are frequently used for account recovery and two-factor authentication, making them high-value targets for attackers. Graduation year combined with other personal data like email and location makes it easier to reconstruct sensitive information. Without these fields, social engineers find it harder to craft convincing phishing attempts or impersonate you."
            }
        }

