"""
Schemas for ingestion API.
Pydantic models for input validation.
"""

from pydantic import BaseModel, Field


class TextIngestionRequest(BaseModel):
    """Schema for text-based ingestion."""
    content: str = Field(..., min_length=10)

    class Config:
        json_schema_extra = {
            "example": {
                "content": "Resume or document text with at least 10 characters"
            }
        }


class IngestionResponse(BaseModel):
    """Schema for ingestion API response."""
    normalized_text: str
    input_type_detected: str
    character_count: int

    class Config:
        json_schema_extra = {
            "example": {
                "normalized_text": "Normalized text content here",
                "input_type_detected": "text",
                "character_count": 1234
            }
        }
