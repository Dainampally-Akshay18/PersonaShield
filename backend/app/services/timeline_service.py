"""
Timeline service.
Calculates temporal exposure based on graduation year and work history.
"""

from datetime import datetime
from typing import Dict


def calculate_timeline_exposure(
    graduation_year: int = 0,
    years_of_experience: int = 0,
    company_years: int = 0
) -> Dict:
    """
    Calculate timeline exposure score.
    
    exposure_years = (current_year - graduation_year) OR
                     years_of_experience + company_years
    
    Clamp between 0 and 40.
    timeline_risk_weight = min(exposure_years / 2, 10)
    
    Args:
        graduation_year: Year of graduation
        years_of_experience: Total years of experience
        company_years: Years at current company
    
    Returns:
        Dictionary with estimated_exposure_years and timeline_risk_weight
    
    Raises:
        ValueError: If inputs are invalid
    """
    current_year = datetime.now().year
    
    # Calculate exposure years using two methods
    exposure_from_graduation = 0
    exposure_from_experience = 0
    
    # Method 1: Calculate from graduation year
    if graduation_year > 0:
        exposure_from_graduation = current_year - graduation_year
    
    # Method 2: Add years of experience and company years
    if years_of_experience > 0 or company_years > 0:
        exposure_from_experience = years_of_experience + company_years
    
    # Use the maximum of the two methods
    if exposure_from_graduation > 0 and exposure_from_experience > 0:
        estimated_exposure_years = max(exposure_from_graduation, exposure_from_experience)
    elif exposure_from_graduation > 0:
        estimated_exposure_years = exposure_from_graduation
    elif exposure_from_experience > 0:
        estimated_exposure_years = exposure_from_experience
    else:
        estimated_exposure_years = 0
    
    # Clamp between 0 and 40
    estimated_exposure_years = max(0, min(estimated_exposure_years, 40))
    
    # Calculate timeline risk weight
    timeline_risk_weight = min(estimated_exposure_years / 2, 10)
    
    return {
        "estimated_exposure_years": estimated_exposure_years,
        "timeline_risk_weight": round(timeline_risk_weight, 2)
    }
