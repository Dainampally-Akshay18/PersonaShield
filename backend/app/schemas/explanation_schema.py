"""
Explanation API schema.
"""

from pydantic import BaseModel, Field
from typing import Dict, List, Any


class ExplanationRequest(BaseModel):
    """Request model for risk explanation."""
    
    risk_score: float = Field(
        ..., 
        ge=0, 
        le=100,
        description="Overall risk score (0-100)"
    )
    score_breakdown: Dict[str, Any] = Field(
        ...,
        description="Breakdown of score components"
    )
    inferred_risks: List[Dict[str, Any]] = Field(
        default_factory=list,
        description="List of inferred privacy risks"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "risk_score": 75.5,
                "score_breakdown": {
                    "pii_exposure": 15,
                    "correlation_score": 20,
                    "inference_depth": 18,
                    "employment_exposure": 12,
                    "location_exposure": 5,
                    "timeline_exposure": 3,
                    "visibility_exposure": 2
                },
                "inferred_risks": [
                    {
                        "risk_type": "PERSONAL_IDENTITY_RISK",
                        "entity_types": ["email", "phone"],
                        "severity": 9
                    }
                ]
            }
        }


class ExplanationResponse(BaseModel):
    """Response model for risk explanation."""
    
    explanation: str = Field(
        ...,
        description="Educational explanation of privacy risks (non-technical)"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "explanation": "Your profile contains several pieces of personal information that, when combined, could be used to target you. Your email and phone number are particularly vulnerable because they're commonly used to reset account passwords. A person with access to both could potentially gain unauthorized access to your important accounts. Consider removing or limiting access to this sensitive contact information, especially on public profiles."
            }
        }
