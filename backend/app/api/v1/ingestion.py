"""
Ingestion API endpoints.
Separate endpoints for text and PDF input normalization.
"""

from fastapi import APIRouter, HTTPException, File, UploadFile
from app.schemas.ingestion_schema import TextIngestionRequest, IngestionResponse
from app.services.ingestion_service import normalize_text, extract_text_from_pdf

router = APIRouter(prefix="/ingest", tags=["ingestion"])

# Constants
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


@router.post("/text", response_model=IngestionResponse)
async def ingest_text(request: TextIngestionRequest):
    """
    Ingest and normalize text input.
    
    Request body:
    {
        "content": "text content (minimum 10 characters)"
    }
    """
    try:
        normalized_text = normalize_text(request.content)
        
        return IngestionResponse(
            normalized_text=normalized_text,
            input_type_detected="text",
            character_count=len(normalized_text)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.post("/pdf", response_model=IngestionResponse)
async def ingest_pdf(file: UploadFile = File(...)):
    """
    Ingest and normalize PDF input.
    
    Form data:
    file: PDF file (required, max 5MB)
    """
    
    # Validate file type
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=415,
            detail="Only PDF files are allowed. Received: " + (file.content_type or "unknown")
        )
    
    # Read file content
    try:
        file_content = await file.read()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to read file: {str(e)}"
        )
    
    # Validate file size
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size exceeds maximum allowed size of 5MB"
        )
    
    # Validate file is not empty
    if len(file_content) == 0:
        raise HTTPException(
            status_code=400,
            detail="File is empty"
        )
    
    try:
        normalized_text = extract_text_from_pdf(file_content)
        
        return IngestionResponse(
            normalized_text=normalized_text,
            input_type_detected="pdf",
            character_count=len(normalized_text)
        )
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
