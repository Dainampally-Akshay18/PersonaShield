"""
Stable analysis orchestrator API endpoints.
Two separate endpoints for text and PDF analysis.
"""

from fastapi import APIRouter, HTTPException, status, UploadFile, File, Form
from typing import List, Optional
from pydantic import BaseModel
from app.services.analyze_service import run_comprehensive_analysis


router = APIRouter()

# Request schemas (no response_model)
class TextAnalysisRequest(BaseModel):
    """Request schema for text analysis."""
    content: str
    persona: Optional[str] = "professional_scammer"
    simulate_hardening: Optional[bool] = False
    fields_to_remove: Optional[List[str]] = None


@router.post(
    "/analyze/text",
    status_code=status.HTTP_200_OK,
    summary="Analyze Text Content",
    tags=["Analysis"],
)
async def analyze_text(request: TextAnalysisRequest) -> dict:
    """
    Analyze text content for privacy risks.
    
    **Request:**
    - `content` (required): Text to analyze
    - `persona`: Optional persona type ('script_kiddie', 'professional_scammer', 'corporate_spy')
    - `simulate_hardening`: Whether to simulate hardening impact (default: false)
    - `fields_to_remove`: List of field names to remove during hardening simulation
    
    **Returns:**
    Complete analysis with risk assessment, attack vectors, and visualizations.
    
    **Example curl:**
    ```bash
    curl -X POST http://localhost:8000/api/v1/analyze/text \\
      -H "Content-Type: application/json" \\
      -d '{
        "content": "Email: john@company.com, Phone: 555-1234",
        "persona": "professional_scammer",
        "simulate_hardening": true,
        "fields_to_remove": ["phones", "graduation_year"]
      }'
    ```
    """
    
    try:
        # Validate persona
        valid_personas = ["script_kiddie", "professional_scammer", "corporate_spy"]
        if request.persona and request.persona not in valid_personas:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"persona must be one of: {', '.join(valid_personas)}"
            )
        
        # Validate content
        if not request.content or not request.content.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="content is required and cannot be empty"
            )
        
        # Run comprehensive analysis
        result = run_comprehensive_analysis(
            input_type="text",
            content=request.content,
            file_bytes=None,
            persona=request.persona,
            simulate_hardening=request.simulate_hardening,
            fields_to_remove=request.fields_to_remove
        )
        
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error analyzing text: {str(e)}"
        )


@router.post(
    "/analyze/upload-pdf",
    status_code=status.HTTP_200_OK,
    summary="Analyze PDF File",
    tags=["Analysis"],
)
async def analyze_pdf(
    file: UploadFile = File(...),
    persona: Optional[str] = Form("professional_scammer"),
    simulate_hardening: Optional[bool] = Form(False),
    fields_to_remove: Optional[str] = Form(None)
) -> dict:
    """
    Analyze PDF file for privacy risks.
    
    **Parameters:**
    - `file` (required): PDF file to analyze
    - `persona`: Optional persona type ('script_kiddie', 'professional_scammer', 'corporate_spy')
    - `simulate_hardening`: Whether to simulate hardening impact (default: false)
    - `fields_to_remove`: Comma-separated field names (e.g., 'phones,graduation_year')
    
    **Returns:**
    Complete analysis with risk assessment, attack vectors, and visualizations.
    
    **Example curl:**
    ```bash
    curl -X POST http://localhost:8000/api/v1/analyze/upload-pdf \\
      -F "file=@resume.pdf" \\
      -F "persona=professional_scammer" \\
      -F "simulate_hardening=true" \\
      -F "fields_to_remove=phones,graduation_year"
    ```
    """
    
    try:
        # Validate file exists
        if not file:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="file is required"
            )
        
        # Validate file extension
        if not file.filename or not file.filename.endswith(".pdf"):
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail="Only PDF files are supported"
            )
        
        # Validate persona
        valid_personas = ["script_kiddie", "professional_scammer", "corporate_spy"]
        if persona and persona not in valid_personas:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"persona must be one of: {', '.join(valid_personas)}"
            )
        
        # Parse fields_to_remove from comma-separated string
        parsed_fields: Optional[List[str]] = None
        if fields_to_remove:
            parsed_fields = [f.strip() for f in fields_to_remove.split(",") if f.strip()]
        
        # Read PDF file
        file_bytes = await file.read()
        
        # Run comprehensive analysis
        result = run_comprehensive_analysis(
            input_type="pdf",
            content=None,
            file_bytes=file_bytes,
            persona=persona,
            simulate_hardening=simulate_hardening,
            fields_to_remove=parsed_fields
        )
        
        return result
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error analyzing PDF: {str(e)}"
        )
