"""
Master analysis orchestrator schema.
"""

from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional
from datetime import datetime


class AnalyzeRequest(BaseModel):
    """Request model for master analysis."""
    
    input_type: str = Field(
        ...,
        description="Input type: 'text' or 'pdf'"
    )
    content: Optional[str] = Field(
        None,
        description="Text content (required if input_type='text')"
    )
    file: Optional[bytes] = Field(
        None,
        description="PDF file (required if input_type='pdf')"
    )
    persona: Optional[str] = Field(
        None,
        description="Optional persona for simulation: 'script_kiddie', 'professional_scammer', 'corporate_spy'"
    )
    simulate_hardening: bool = Field(
        False,
        description="Whether to simulate hardening impact"
    )
    fields_to_remove: List[str] = Field(
        default_factory=list,
        description="Fields to remove for hardening simulation"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "input_type": "text",
                "content": "Email: john@example.com, Phone: 555-1234, Worked at TechCorp for 5 years",
                "persona": "professional_scammer",
                "simulate_hardening": True,
                "fields_to_remove": ["phones", "graduation_year"]
            }
        }


class InputSummary(BaseModel):
    """Summary of input data."""
    
    input_type: str
    character_count: int
    timestamp: str


class RiskAssessment(BaseModel):
    """Complete risk assessment."""
    
    risk_score: float
    risk_level: str
    score_breakdown: Dict[str, float]
    inferred_risks: List[Dict[str, Any]]
    correlation_depth: float
    timeline_years: float
    visibility_score: float


class AttackAnalysis(BaseModel):
    """Attack vector analysis."""
    
    attack_vectors: List[Dict[str, Any]]
    primary_threats: List[str]


class PersonaSimulation(BaseModel):
    """Persona simulation result."""
    
    persona: Optional[str]
    narrative: Optional[str]


class PhishingSimulation(BaseModel):
    """Phishing simulation result."""
    
    email_subject: Optional[str]
    email_body: Optional[str]
    disclaimer: Optional[str]


class ExplanationResult(BaseModel):
    """Risk explanation."""
    
    explanation: Optional[str]


class HardeningResult(BaseModel):
    """Hardening simulation result."""
    
    original_score: Optional[float]
    hardened_score: Optional[float]
    difference: Optional[float]
    explanation: Optional[str]


class VisualizationData(BaseModel):
    """Heatmap visualization data."""
    
    summary: Optional[Dict[str, Any]]
    severity_distribution: Optional[Dict[str, float]]
    risk_category_breakdown: Optional[List[Dict[str, Any]]]
    heatmap: Optional[List[Dict[str, Any]]]
    graph_data: Optional[Dict[str, Any]]


class AnalyzeResponse(BaseModel):
    """Response model for comprehensive analysis."""
    
    analysis_id: str = Field(
        ...,
        description="Unique analysis ID"
    )
    input_summary: InputSummary
    entities: Dict[str, Any] = Field(
        ...,
        description="Extracted entities"
    )
    risk_assessment: RiskAssessment
    attack_analysis: AttackAnalysis
    persona_simulation: PersonaSimulation
    phishing_simulation: PhishingSimulation
    explanation: ExplanationResult
    hardening_simulation: Optional[HardeningResult] = None
    visualization: Optional[VisualizationData] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "analysis_id": "550e8400-e29b-41d4-a716-446655440000",
                "input_summary": {
                    "input_type": "text",
                    "character_count": 156,
                    "timestamp": "2026-02-20T10:30:00Z"
                },
                "entities": {
                    "emails": ["john@example.com"],
                    "phones": ["5551234567"],
                    "job_title": ["Senior Engineer"],
                    "company": ["TechCorp"]
                },
                "risk_assessment": {
                    "risk_score": 72.5,
                    "risk_level": "High",
                    "score_breakdown": {"direct_pii": 20},
                    "inferred_risks": [{"risk_type": "Personal Identity"}]
                },
                "attack_analysis": {
                    "attack_vectors": [{"vector": "Spear Phishing"}],
                    "primary_threats": ["Credential harvesting"]
                },
                "persona_simulation": {
                    "persona": "professional_scammer",
                    "narrative": "This victim would be a high-value target..."
                },
                "phishing_simulation": {
                    "email_subject": "Important: Verify Your TechCorp Account",
                    "email_body": "Click here to verify...",
                    "disclaimer": "This is an educational simulation..."
                },
                "explanation": {
                    "explanation": "Your profile contains several pieces of personal information..."
                },
                "hardening_simulation": {
                    "original_score": 72.5,
                    "hardened_score": 45.0,
                    "difference": 27.5,
                    "explanation": "Removing phone numbers..."
                },
                "visualization": {
                    "summary": {"total_score": 72.5, "risk_level": "High"}
                }
            }
        }
