"""
Attack vector categorization API endpoint.
Maps extracted entities to real-world attack vectors.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.attack_vector_schema import AttackVectorRequest, AttackVectorResponse
from app.services.attack_vector_service import categorize_attack_vectors

router = APIRouter(prefix="/attack-vectors", tags=["attack-vectors"])


@router.post("", response_model=AttackVectorResponse)
async def identify_attack_vectors(request: AttackVectorRequest):
    """
    Categorize extracted entities into real-world attack vectors.
    
    Identifies potential attack vectors based on extracted personal data.
    
    Request body:
    {
        "entities": {...},
        "inferred_risks": [...]  (optional)
    }
    
    Attack Vector Categories:
    1. Spear Phishing Risk: company + job_title + email
    2. Identity Theft Risk: dob + email OR dob + phone
    3. Social Engineering Risk: family_mentions + location
    4. Corporate Espionage Risk: company + skills + certifications
    5. Credential Guessing Risk: email + graduation_year
    
    Severity Levels:
    1-2 contributing factors → Low
    3 contributing factors → Moderate
    4+ contributing factors → High
    
    Returns:
    {
        "attack_vectors": [
            {
                "category": "Attack Vector Name",
                "severity": "Low|Moderate|High",
                "contributing_factors": ["field1", "field2", ...]
            }
        ]
    }
    """
    try:
        result = categorize_attack_vectors(
            entities=request.entities,
            inferred_risks=request.inferred_risks
        )
        return AttackVectorResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
