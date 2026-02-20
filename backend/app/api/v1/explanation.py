"""
Risk explanation API endpoint.
Generates educational explanations of privacy risks for users.
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.explanation_schema import ExplanationRequest, ExplanationResponse
from app.services.explanation_service import generate_risk_explanation


router = APIRouter()


@router.post(
    "/explain-risk",
    response_model=ExplanationResponse,
    status_code=status.HTTP_200_OK,
    summary="Explain Privacy Risk Score",
    tags=["Risk Explanation"],
)
def explain_risk(request: ExplanationRequest) -> ExplanationResponse:
    """
    Generate an educational explanation of privacy risks.
    
    Takes a risk assessment result and generates a non-technical explanation
    suitable for end users. Explains why the score is high or low, mentions
    specific vulnerable data combinations, and describes real-world consequences
    in friendly, balanced language.
    
    **Request Body:**
    - `risk_score`: Overall privacy risk score (0-100)
    - `score_breakdown`: Component-level score breakdown with 7 factors
    - `inferred_risks`: List of identified privacy risks with severity levels
    
    **Response:**
    - `explanation`: Educational explanation (150-250 words, non-technical language)
    
    **Fallback Behavior:**
    If LLM service is unavailable, returns a safe generic explanation rather
    than failing the request.
    
    **Example Request:**
    ```json
    {
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
    ```
    
    **Example Response:**
    ```json
    {
        "explanation": "Your profile contains several pieces of personal information that, when combined, could enable unauthorized account access. Your email and phone are particularly vulnerable because they're commonly used for password recovery. Consider limiting who can see this sensitive contact information."
    }
    ```
    """
    
    try:
        # Validate request data
        if request.risk_score < 0 or request.risk_score > 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="risk_score must be between 0 and 100"
            )
        
        if not isinstance(request.score_breakdown, dict):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="score_breakdown must be a dictionary"
            )
        
        if not isinstance(request.inferred_risks, list):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="inferred_risks must be a list"
            )
        
        # Generate explanation
        explanation = generate_risk_explanation(
            risk_score=request.risk_score,
            score_breakdown=request.score_breakdown,
            inferred_risks=request.inferred_risks
        )
        
        return ExplanationResponse(explanation=explanation)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error generating explanation: {str(e)}"
        )
