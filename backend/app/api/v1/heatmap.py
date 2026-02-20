"""
Heatmap visualization API endpoint.
Generates frontend-ready visualization data from risk scores.
"""

from fastapi import APIRouter, HTTPException, status
from app.schemas.heatmap_schema import HeatmapRequest, HeatmapResponse
from app.services.heatmap_service import generate_heatmap


router = APIRouter()


@router.post(
    "/risk-heatmap",
    response_model=HeatmapResponse,
    status_code=status.HTTP_200_OK,
    summary="Generate Risk Heatmap Visualization",
    tags=["Visualization"],
)
def risk_heatmap(request: HeatmapRequest) -> HeatmapResponse:
    """
    Generate frontend-ready heatmap visualization data from risk score breakdown.
    
    This endpoint transforms risk scores into comprehensive visualization data suitable
    for interactive frontend dashboard display. Generates multiple chart formats
    (bar, radar, pie) and categorized severity breakdowns.
    
    **Request Body:**
    - `score_breakdown.total_risk_score`: Overall risk score (0-100)
    - `score_breakdown.components`: Risk component scores (direct_pii, correlation, etc.)
    - `score_breakdown.data_type_contributions`: Contribution by data type (email, phone, etc.)
    
    **Response:**
    - `summary`: Risk level and severity counts
    - `severity_distribution`: Percentage breakdown of High/Medium/Low severity
    - `risk_category_breakdown`: Detailed per-category risk scores
    - `heatmap`: Per-data-type severity mapping
    - `graph_data`: Ready-to-use bar, radar, and pie chart data
    
    **Risk Levels:**
    - 0-30: Low
    - 31-60: Moderate
    - 61-100: High
    
    **Severity Levels:**
    - Score ≥15: High
    - Score ≥8: Medium
    - Score <8: Low
    
    **Example Request:**
    ```json
    {
        "score_breakdown": {
            "total_risk_score": 72,
            "components": {
                "direct_pii": 20,
                "correlation": 15,
                "inference_depth": 10,
                "employment": 12,
                "location": 5,
                "timeline": 6,
                "public_visibility": 4
            },
            "data_type_contributions": {
                "email": 18,
                "phone": 10,
                "graduation_year": 8,
                "company": 12,
                "location": 9,
                "dob": 15
            }
        }
    }
    ```
    
    **Example Response:**
    ```json
    {
        "summary": {
            "total_score": 72.0,
            "risk_level": "High",
            "high_severity_count": 4,
            "medium_severity_count": 2,
            "low_severity_count": 1
        },
        "severity_distribution": {
            "high": 57.1,
            "medium": 28.6,
            "low": 14.3
        },
        "risk_category_breakdown": [
            {
                "category": "Direct PII",
                "score": 20.0,
                "severity": "High"
            },
            {
                "category": "Employment Exposure",
                "score": 12.0,
                "severity": "High"
            }
        ],
        "heatmap": [
            {
                "data_type": "dob",
                "contribution": 15.0,
                "severity": "High",
                "normalized_score": 0.75
            },
            {
                "data_type": "email",
                "contribution": 18.0,
                "severity": "High",
                "normalized_score": 0.9
            }
        ],
        "graph_data": {
            "bar_chart": {
                "labels": ["Direct Pii", "Employment", "Data Correlation", "Inference Depth", "Public Visibility", "Timeline Exposure", "Location Exposure"],
                "values": [20.0, 12.0, 15.0, 10.0, 4.0, 6.0, 5.0],
                "colors": ["#ff4444", "#ff4444", "#ffaa44", "#ffaa44", "#44aa44", "#44aa44", "#44aa44"]
            },
            "radar_chart": {
                "labels": ["Direct Pii", "Employment", "Data Correlation", "Inference Depth", "Public Visibility", "Timeline Exposure", "Location Exposure"],
                "values": [20.0, 12.0, 15.0, 10.0, 4.0, 6.0, 5.0]
            },
            "pie_chart": {
                "labels": ["dob", "email", "company", "phone", "location", "graduation_year"],
                "values": [15.0, 18.0, 12.0, 10.0, 9.0, 8.0],
                "colors": ["#ff4444", "#ff4444", "#ff4444", "#ffaa44", "#ffaa44", "#ffaa44"]
            }
        }
    }
    ```
    """
    
    try:
        # Validate score breakdown
        if request.score_breakdown.total_risk_score < 0 or request.score_breakdown.total_risk_score > 100:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="total_risk_score must be between 0 and 100"
            )
        
        if not request.score_breakdown.components:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="components cannot be empty"
            )
        
        if not request.score_breakdown.data_type_contributions:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="data_type_contributions cannot be empty"
            )
        
        # Generate heatmap visualization data
        heatmap_data = generate_heatmap(request.score_breakdown.dict())
        
        return HeatmapResponse(**heatmap_data)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Error generating heatmap: {str(e)}"
        )
