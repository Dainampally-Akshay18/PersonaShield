"""
Schemas for extraction API.
Pydantic models for extraction request and response.
"""

from pydantic import BaseModel, Field


class ExtractionRequest(BaseModel):
    """Schema for extraction API request."""
    normalized_text: str = Field(..., min_length=1)

    class Config:
        json_schema_extra = {
            "example": {
                "normalized_text": "John Doe, graduated from IIT Delhi in 2018, works at Amazon as Senior Engineer..."
            }
        }


class ExtractionResponse(BaseModel):
    """Schema for extraction API response."""
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
                    "job_title": ["Senior Engineer"],
                    "location": ["Bangalore"],
                    "family_mentions": [],
                    "skills": ["python", "aws"],
                    "certifications": [],
                    "years_of_experience": 5
                }
            }
        }
