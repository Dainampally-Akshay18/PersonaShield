"""
Correlation depth API endpoint.
Analyzes the depth of risk correlation chains.
"""

from fastapi import APIRouter, HTTPException
from app.schemas.depth_schema import CorrelationDepthRequest, CorrelationDepthResponse
from app.services.correlation_depth_service import calculate_correlation_depth

router = APIRouter(prefix="/correlation-depth", tags=["correlation-depth"])


@router.post("", response_model=CorrelationDepthResponse)
async def analyze_correlation_depth(request: CorrelationDepthRequest):
    """
    Analyze correlation depth from inferred risks.
    
    Calculates how deeply connected the inferred risks are based on
    the number of risks and the average pathway length.
    
    Request body:
    {
        "inferred_risks": [
            {
                "risk_type": "...",
                "severity": 0-10,
                "pathway": ["field1", "field2", ...]
            },
            ...
        ]
    }
    
    Returns:
    {
        "correlation_depth_score": depth_score,
        "chain_count": number_of_risks,
        "average_chain_length": avg_pathway_length
    }
    """
    try:
        result = calculate_correlation_depth(request.inferred_risks)
        return CorrelationDepthResponse(**result)
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
