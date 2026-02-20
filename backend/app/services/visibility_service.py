"""
Visibility service.
Calculates data visibility exposure score.
"""

from typing import Dict


def calculate_visibility(entities: Dict) -> Dict:
    """
    Calculate visibility exposure score based on entity types.
    
    High visibility (weight 3):
    emails, company, job_title, location
    
    Medium visibility (weight 2):
    skills, certifications
    
    Low visibility (weight 1):
    family_mentions
    
    visibility_score = weighted sum normalized to 0-10
    
    Args:
        entities: Dictionary of extracted entities
    
    Returns:
        Dictionary with visibility_score and visibility_level
    
    Raises:
        ValueError: If entities is invalid
    """
    if not isinstance(entities, dict):
        raise ValueError("Entities must be a dictionary")
    
    # Define weight mappings
    HIGH_VISIBILITY_WEIGHT = 3
    MEDIUM_VISIBILITY_WEIGHT = 2
    LOW_VISIBILITY_WEIGHT = 1
    
    high_visibility_fields = ["emails", "company", "job_title", "location"]
    medium_visibility_fields = ["skills", "certifications"]
    low_visibility_fields = ["family_mentions"]
    
    total_score = 0
    max_possible_score = 0
    
    # Calculate high visibility contribution
    for field in high_visibility_fields:
        max_possible_score += HIGH_VISIBILITY_WEIGHT
        if field in entities and entities[field]:
            # Check if field has content
            if isinstance(entities[field], list) and len(entities[field]) > 0:
                total_score += HIGH_VISIBILITY_WEIGHT
            elif isinstance(entities[field], str) and entities[field]:
                total_score += HIGH_VISIBILITY_WEIGHT
    
    # Calculate medium visibility contribution
    for field in medium_visibility_fields:
        max_possible_score += MEDIUM_VISIBILITY_WEIGHT
        if field in entities and entities[field]:
            if isinstance(entities[field], list) and len(entities[field]) > 0:
                total_score += MEDIUM_VISIBILITY_WEIGHT
            elif isinstance(entities[field], str) and entities[field]:
                total_score += MEDIUM_VISIBILITY_WEIGHT
    
    # Calculate low visibility contribution
    for field in low_visibility_fields:
        max_possible_score += LOW_VISIBILITY_WEIGHT
        if field in entities and entities[field]:
            if isinstance(entities[field], list) and len(entities[field]) > 0:
                total_score += LOW_VISIBILITY_WEIGHT
            elif isinstance(entities[field], str) and entities[field]:
                total_score += LOW_VISIBILITY_WEIGHT
    
    # Normalize to 0-10 scale
    if max_possible_score > 0:
        visibility_score = (total_score / max_possible_score) * 10
    else:
        visibility_score = 0
    
    # Determine visibility level
    visibility_level = _determine_visibility_level(visibility_score)
    
    return {
        "visibility_score": round(visibility_score, 2),
        "visibility_level": visibility_level
    }


def _determine_visibility_level(visibility_score: float) -> str:
    """
    Determine visibility level based on score.
    0-3.33: Low
    3.34-6.67: Moderate
    6.68-10: High
    """
    if visibility_score <= 3.33:
        return "Low"
    elif visibility_score <= 6.67:
        return "Moderate"
    else:
        return "High"
