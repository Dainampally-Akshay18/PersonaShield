"""
Schemas for correlation depth analysis.
"""

from pydantic import BaseModel, Field
from typing import List


class CorrelationDepthRequest(BaseModel):
    """Schema for correlation depth analysis request."""
    inferred_risks: List[dict] = Field(...)

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
                        "risk_type": "Government ID Risk",
                        "severity": 9,
                        "pathway": ["dob", "phones", "location"]
                    }
                ]
            }
        }


class CorrelationDepthResponse(BaseModel):
    """Schema for correlation depth analysis response."""
    correlation_depth_score: float
    chain_count: int
    average_chain_length: float

    class Config:
        json_schema_extra = {
            "example": {
                "correlation_depth_score": 8.5,
                "chain_count": 2,
                "average_chain_length": 3.0
            }
        }
