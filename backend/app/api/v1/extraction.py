"""
Extraction API endpoints.
Sensitive data extraction using regex patterns.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.extraction_schema import ExtractionRequest, ExtractionResponse
from app.services.extraction_service import extract_entities

router = APIRouter(prefix="/extract", tags=["extraction"])


@router.post("", response_model=ExtractionResponse)
async def extract(request: ExtractionRequest):
    """
    Extract sensitive data entities from normalized text.
    
    Request body:
    {
        "normalized_text": "Text to extract entities from"
    }
    
    Returns:
    {
        "entities": {
            "emails": [...],
            "phones": [...],
            "dob": [...],
            "graduation_year": [...],
            "college": [...],
            "company": [...],
            "job_title": [...],
            "location": [...],
            "family_mentions": [...],
            "skills": [...],
            "certifications": [...],
            "years_of_experience": 0
        }
    }
    """
    try:
        entities = extract_entities(request.normalized_text)
        
        return ExtractionResponse(entities=entities)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
