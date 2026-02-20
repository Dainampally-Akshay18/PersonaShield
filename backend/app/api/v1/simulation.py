"""
Hardening simulation API endpoint.
Simulates risk score before and after removing sensitive fields.
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.simulation_schema import HardeningSimulationRequest, HardeningSimulationResponse
from app.services.simulation_service import run_hardening_simulation


router = APIRouter()


@router.post(
    "/simulate-hardening",
    response_model=HardeningSimulationResponse,
    status_code=status.HTTP_200_OK,
    summary="Simulate Data Hardening Impact",
    tags=["Risk Simulation"],
)
def simulate_hardening(request: HardeningSimulationRequest) -> HardeningSimulationResponse:
    """
    Simulate the impact of removing sensitive fields on privacy risk score.
    
    This endpoint helps users understand which fields have the greatest impact
    on their privacy risk by showing how the risk score changes when those
    fields are removed or redacted.
    
    The simulation reuses all existing risk assessment engines:
    - Correlation engine (identifies data exposure risks)
    - Correlation depth service (measures complexity of exposures)
    - Timeline exposure service (estimates exposure window)
    - Visibility service (measures data accessibility)
    - Scoring engine (calculates overall risk)
    
    **Request Body:**
    - `original_entities`: Dictionary of extracted entities
    - `remove_fields`: List of field names to remove for simulation
      (invalid field names are ignored)
    
    **Response:**
    - `original_score`: Risk score before changes (0-100)
    - `hardened_score`: Risk score after removing selected fields (0-100)
    - `difference`: Risk reduction achieved (original - hardened)
    
    **Validation:**
    - Returns 400 if original_entities is empty or null
    
    **Example Request:**
    ```json
    {
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
    ```
    
    **Example Response:**
    ```json
    {
        "original_score": 75.5,
        "hardened_score": 42.3,
        "difference": 33.2
    }
    ```
    """
    
    try:
        # Validate that entities are not empty
        if not request.original_entities:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="original_entities cannot be empty"
            )
        
        # Run the simulation (invalid field names are simply ignored)
        result = run_hardening_simulation(
            original_entities=request.original_entities,
            remove_fields=request.remove_fields
        )
        
        return HardeningSimulationResponse(**result)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error running hardening simulation: {str(e)}"
        )
