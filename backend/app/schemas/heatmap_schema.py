"""
Heatmap visualization schema.
"""

from pydantic import BaseModel, Field
from typing import Dict, List, Any


class ScoreBreakdownInput(BaseModel):
    """Input score breakdown structure."""
    
    total_risk_score: float = Field(
        ...,
        ge=0,
        le=100,
        description="Total risk score (0-100)"
    )
    components: Dict[str, float] = Field(
        ...,
        description="Risk component scores"
    )
    data_type_contributions: Dict[str, float] = Field(
        ...,
        description="Contribution by data type"
    )


class HeatmapRequest(BaseModel):
    """Request model for heatmap visualization."""
    
    score_breakdown: ScoreBreakdownInput = Field(
        ...,
        description="Risk score breakdown"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
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
        }


class HeatmapSummary(BaseModel):
    """Summary statistics for heatmap."""
    
    total_score: float
    risk_level: str
    high_severity_count: int
    medium_severity_count: int
    low_severity_count: int


class SeverityDistribution(BaseModel):
    """Severity distribution percentages."""
    
    high: float
    medium: float
    low: float


class RiskCategoryBreakdown(BaseModel):
    """Risk category breakdown."""
    
    category: str
    score: float
    severity: str


class DataTypeHeatmap(BaseModel):
    """Heatmap for individual data types."""
    
    data_type: str
    contribution: float
    severity: str
    normalized_score: float


class BarChart(BaseModel):
    """Bar chart data."""
    
    labels: List[str]
    values: List[float]
    colors: List[str]


class RadarChart(BaseModel):
    """Radar chart data."""
    
    labels: List[str]
    values: List[float]


class PieChart(BaseModel):
    """Pie chart data."""
    
    labels: List[str]
    values: List[float]
    colors: List[str]


class GraphData(BaseModel):
    """Graph visualization data."""
    
    bar_chart: BarChart
    radar_chart: RadarChart
    pie_chart: PieChart


class HeatmapResponse(BaseModel):
    """Response model for heatmap visualization."""
    
    summary: HeatmapSummary
    severity_distribution: SeverityDistribution
    risk_category_breakdown: List[RiskCategoryBreakdown]
    heatmap: List[DataTypeHeatmap]
    graph_data: GraphData
    
    class Config:
        json_schema_extra = {
            "example": {
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
                        "category": "direct_pii",
                        "score": 20.0,
                        "severity": "High"
                    }
                ],
                "heatmap": [
                    {
                        "data_type": "email",
                        "contribution": 18.0,
                        "severity": "High",
                        "normalized_score": 0.9
                    }
                ],
                "graph_data": {
                    "bar_chart": {
                        "labels": ["Direct PII", "Correlation"],
                        "values": [20.0, 15.0],
                        "colors": ["#ff4444", "#ffaa44"]
                    },
                    "radar_chart": {
                        "labels": ["Direct PII", "Correlation"],
                        "values": [20.0, 15.0]
                    },
                    "pie_chart": {
                        "labels": ["Direct PII", "Correlation"],
                        "values": [20.0, 15.0],
                        "colors": ["#ff4444", "#ffaa44"]
                    }
                }
            }
        }
