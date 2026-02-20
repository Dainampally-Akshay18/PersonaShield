"""
Attack vector categorization service.
Maps inferred risks to real-world attack categories.
"""

from typing import Dict, List


def categorize_attack_vectors(entities: Dict, inferred_risks: List[Dict] = None) -> Dict:
    """
    Categorize extracted entities into real-world attack vectors.
    
    Attack Vector Categories:
    1. Spear Phishing Risk: company + job_title + email
    2. Identity Theft Risk: dob + email OR dob + phone
    3. Social Engineering Risk: family_mentions + location
    4. Corporate Espionage Risk: company + skills + certifications
    5. Credential Guessing Risk: email + graduation_year
    
    Severity determined by contributing factors count:
    1-2 factors → Low
    3 factors → Moderate
    4+ factors → High
    
    Args:
        entities: Dictionary of extracted entities
        inferred_risks: List of inferred risks (optional, for future enhancement)
    
    Returns:
        Dictionary with attack_vectors list
    
    Raises:
        ValueError: If entities is invalid
    """
    if not isinstance(entities, dict):
        raise ValueError("Entities must be a dictionary")
    
    attack_vectors = []
    
    # Check Spear Phishing Risk
    spear_phishing = _check_spear_phishing(entities)
    if spear_phishing:
        attack_vectors.append(spear_phishing)
    
    # Check Identity Theft Risk
    identity_theft = _check_identity_theft(entities)
    if identity_theft:
        attack_vectors.append(identity_theft)
    
    # Check Social Engineering Risk
    social_engineering = _check_social_engineering(entities)
    if social_engineering:
        attack_vectors.append(social_engineering)
    
    # Check Corporate Espionage Risk
    corporate_espionage = _check_corporate_espionage(entities)
    if corporate_espionage:
        attack_vectors.append(corporate_espionage)
    
    # Check Credential Guessing Risk
    credential_guessing = _check_credential_guessing(entities)
    if credential_guessing:
        attack_vectors.append(credential_guessing)
    
    # Sort by severity (High, Moderate, Low) for deterministic ordering
    severity_order = {"High": 0, "Moderate": 1, "Low": 2}
    attack_vectors.sort(key=lambda x: (severity_order.get(x["severity"], 3), x["category"]))
    
    return {
        "attack_vectors": attack_vectors
    }


def _has_field(entities: Dict, field: str) -> bool:
    """Check if a field exists and has content."""
    if field not in entities:
        return False
    
    value = entities[field]
    
    if isinstance(value, list):
        return len(value) > 0
    elif isinstance(value, int):
        return value > 0
    elif isinstance(value, str):
        return len(value) > 0
    
    return value is not None


def _determine_severity(factor_count: int) -> str:
    """Determine severity based on contributing factors count."""
    if factor_count >= 4:
        return "High"
    elif factor_count == 3:
        return "Moderate"
    else:
        return "Low"


def _check_spear_phishing(entities: Dict) -> dict or None:
    """
    Spear Phishing Risk: company + job_title + email
    """
    contributing_factors = []
    
    if _has_field(entities, "company"):
        contributing_factors.append("company")
    if _has_field(entities, "job_title"):
        contributing_factors.append("job_title")
    if _has_field(entities, "emails"):
        contributing_factors.append("emails")
    
    if len(contributing_factors) >= 2:  # At least 2 factors
        return {
            "category": "Spear Phishing Risk",
            "severity": _determine_severity(len(contributing_factors)),
            "contributing_factors": sorted(contributing_factors)
        }
    
    return None


def _check_identity_theft(entities: Dict) -> dict or None:
    """
    Identity Theft Risk: dob + email OR dob + phone
    """
    has_dob = _has_field(entities, "dob")
    has_email = _has_field(entities, "emails")
    has_phone = _has_field(entities, "phones")
    
    if has_dob and (has_email or has_phone):
        contributing_factors = []
        
        if has_dob:
            contributing_factors.append("dob")
        if has_email:
            contributing_factors.append("emails")
        if has_phone:
            contributing_factors.append("phones")
        
        return {
            "category": "Identity Theft Risk",
            "severity": _determine_severity(len(contributing_factors)),
            "contributing_factors": sorted(contributing_factors)
        }
    
    return None


def _check_social_engineering(entities: Dict) -> dict or None:
    """
    Social Engineering Risk: family_mentions + location
    """
    contributing_factors = []
    
    if _has_field(entities, "family_mentions"):
        contributing_factors.append("family_mentions")
    if _has_field(entities, "location"):
        contributing_factors.append("location")
    
    if len(contributing_factors) >= 2:
        return {
            "category": "Social Engineering Risk",
            "severity": _determine_severity(len(contributing_factors)),
            "contributing_factors": sorted(contributing_factors)
        }
    
    return None


def _check_corporate_espionage(entities: Dict) -> dict or None:
    """
    Corporate Espionage Risk: company + skills + certifications
    """
    contributing_factors = []
    
    if _has_field(entities, "company"):
        contributing_factors.append("company")
    if _has_field(entities, "skills"):
        contributing_factors.append("skills")
    if _has_field(entities, "certifications"):
        contributing_factors.append("certifications")
    
    if len(contributing_factors) >= 2:
        return {
            "category": "Corporate Espionage Risk",
            "severity": _determine_severity(len(contributing_factors)),
            "contributing_factors": sorted(contributing_factors)
        }
    
    return None


def _check_credential_guessing(entities: Dict) -> dict or None:
    """
    Credential Guessing Risk: email + graduation_year
    """
    contributing_factors = []
    
    if _has_field(entities, "emails"):
        contributing_factors.append("emails")
    if _has_field(entities, "graduation_year"):
        contributing_factors.append("graduation_year")
    
    if len(contributing_factors) >= 2:
        return {
            "category": "Credential Guessing Risk",
            "severity": _determine_severity(len(contributing_factors)),
            "contributing_factors": sorted(contributing_factors)
        }
    
    return None
