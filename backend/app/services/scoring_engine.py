"""
Scoring engine service.
Deterministic weighted risk scoring calculation.
"""

import json
import os
from typing import Dict


def load_risk_weights() -> Dict:
    """
    Load risk weights from JSON configuration file.
    
    Returns:
        Dictionary with risk weights
    
    Raises:
        FileNotFoundError: If weights file not found
        json.JSONDecodeError: If weights file is invalid JSON
    """
    weights_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "rules",
        "risk_weights.json"
    )
    
    with open(weights_path, 'r') as f:
        weights = json.load(f)
    
    return weights


def calculate_risk_score(
    entities: Dict,
    inferred_risks: list,
    correlation_depth: int = 0,
    timeline_years: int = 0,
    visibility_score: float = 0
) -> Dict:
    """
    Calculate weighted risk score from entities and inferred risks.
    
    Args:
        entities: Extracted entities dictionary
        inferred_risks: List of inferred risk objects
        correlation_depth: Depth of correlation chains
        timeline_years: Number of years exposed
        visibility_score: Visibility exposure score (0-100)
    
    Returns:
        Dictionary with risk_score, risk_level, and score_breakdown
    
    Raises:
        ValueError: If inputs are invalid
    """
    if not isinstance(entities, dict):
        raise ValueError("Entities must be a dictionary")
    
    if not isinstance(inferred_risks, list):
        raise ValueError("Inferred risks must be a list")
    
    # Load weights
    try:
        weights = load_risk_weights()
    except Exception as e:
        raise ValueError(f"Failed to load risk weights: {str(e)}")
    
    # Calculate score components
    pii_exposure = _calculate_pii_exposure(entities, weights)
    correlation_score = _calculate_correlation_score(inferred_risks, weights)
    inference_depth_score = _calculate_inference_depth_score(correlation_depth, weights)
    employment_exposure = _calculate_employment_exposure(entities, weights)
    location_exposure = _calculate_location_exposure(entities, weights)
    timeline_exposure = _calculate_timeline_exposure(timeline_years, weights)
    visibility_exposure = _calculate_visibility_exposure(visibility_score, weights)
    
    # Sum all components
    total_score = (
        pii_exposure +
        correlation_score +
        inference_depth_score +
        employment_exposure +
        location_exposure +
        timeline_exposure +
        visibility_exposure
    )
    
    # Normalize to max score
    max_score = weights.get("max_score", 100)
    normalized_score = min(total_score, max_score)
    
    # Determine risk level
    risk_level = _determine_risk_level(normalized_score)
    
    return {
        "risk_score": round(normalized_score, 2),
        "risk_level": risk_level,
        "score_breakdown": {
            "pii_exposure": round(pii_exposure, 2),
            "correlation_score": round(correlation_score, 2),
            "inference_depth_score": round(inference_depth_score, 2),
            "employment_exposure": round(employment_exposure, 2),
            "location_exposure": round(location_exposure, 2),
            "timeline_exposure": round(timeline_exposure, 2),
            "visibility_exposure": round(visibility_exposure, 2)
        }
    }


def _calculate_pii_exposure(entities: Dict, weights: Dict) -> float:
    """
    Calculate PII exposure score.
    For each present entity (emails, phone, dob), add weight.
    """
    pii_weights = weights.get("pii_weights", {})
    score = 0
    
    # Check emails
    if entities.get("emails") and len(entities["emails"]) > 0:
        score += pii_weights.get("email", 0)
    
    # Check phones
    if entities.get("phones") and len(entities["phones"]) > 0:
        score += pii_weights.get("phone", 0)
    
    # Check DOB
    if entities.get("dob") and len(entities["dob"]) > 0:
        score += pii_weights.get("dob", 0)
    
    return score


def _calculate_correlation_score(inferred_risks: list, weights: Dict) -> float:
    """
    Calculate correlation score.
    Sum of severities from inferred risks * correlation_weight
    """
    correlation_weight = weights.get("correlation_weight", 0)
    
    total_severity = 0
    for risk in inferred_risks:
        if isinstance(risk, dict) and "severity" in risk:
            severity = risk["severity"]
            if isinstance(severity, (int, float)):
                total_severity += severity
    
    return total_severity * correlation_weight


def _calculate_inference_depth_score(correlation_depth: int, weights: Dict) -> float:
    """
    Calculate inference depth score.
    correlation_depth * depth_weight
    """
    depth_weight = weights.get("depth_weight", 0)
    return correlation_depth * depth_weight


def _calculate_employment_exposure(entities: Dict, weights: Dict) -> float:
    """
    Calculate employment exposure score.
    If company + job_title present → employment_weight * 5
    """
    employment_weight = weights.get("employment_weight", 0)
    
    has_company = entities.get("company") and len(entities["company"]) > 0
    has_job_title = entities.get("job_title") and len(entities["job_title"]) > 0
    
    if has_company and has_job_title:
        return employment_weight * 5
    
    return 0


def _calculate_location_exposure(entities: Dict, weights: Dict) -> float:
    """
    Calculate location exposure score.
    If location present → location_weight * 5
    """
    location_weight = weights.get("location_weight", 0)
    
    has_location = entities.get("location") and len(entities["location"]) > 0
    
    if has_location:
        return location_weight * 5
    
    return 0


def _calculate_timeline_exposure(timeline_years: int, weights: Dict) -> float:
    """
    Calculate timeline exposure score.
    timeline_years * timeline_weight (clamp max 10 years)
    """
    timeline_weight = weights.get("timeline_weight", 0)
    
    # Clamp timeline_years to max 10
    clamped_years = min(timeline_years, 10)
    
    return clamped_years * timeline_weight


def _calculate_visibility_exposure(visibility_score: float, weights: Dict) -> float:
    """
    Calculate visibility exposure score.
    visibility_score * visibility_weight
    """
    visibility_weight = weights.get("visibility_weight", 0)
    
    # Ensure visibility_score is between 0 and 100
    clamped_visibility = max(0, min(visibility_score, 100))
    
    return (clamped_visibility / 100) * visibility_weight


def _determine_risk_level(risk_score: float) -> str:
    """
    Determine risk level based on score.
    0-30: Low
    31-60: Moderate
    61-100: High
    """
    if risk_score <= 30:
        return "Low"
    elif risk_score <= 60:
        return "Moderate"
    else:
        return "High"
