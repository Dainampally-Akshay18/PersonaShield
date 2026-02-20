"""
Correlation engine service.
Loads rules from JSON and applies deterministic correlation logic.
"""

import json
import os
from typing import List, Dict


def load_correlation_rules() -> List[Dict]:
    """
    Load correlation rules from JSON configuration file.
    
    Returns:
        List of correlation rules
    
    Raises:
        FileNotFoundError: If rules file not found
        json.JSONDecodeError: If rules file is invalid JSON
    """
    rules_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "rules",
        "correlation_rules.json"
    )
    
    with open(rules_path, 'r') as f:
        rules_data = json.load(f)
    
    return rules_data.get("correlation_rules", [])


def apply_correlation_rules(entities: Dict) -> Dict:
    """
    Apply correlation rules to extracted entities.
    
    For each rule, if ALL required fields exist and are not empty,
    create a risk entry.
    
    Args:
        entities: Dictionary of extracted entities
    
    Returns:
        Dictionary with inferred_risks list and inference_chains_count
    
    Raises:
        ValueError: If entities is invalid
    """
    if not isinstance(entities, dict):
        raise ValueError("Entities must be a dictionary")
    
    if not entities:
        raise ValueError("Entities cannot be empty")
    
    # Load rules
    try:
        rules = load_correlation_rules()
    except Exception as e:
        raise ValueError(f"Failed to load correlation rules: {str(e)}")
    
    inferred_risks = []
    
    # Apply each rule
    for rule in rules:
        # Check if rule has required structure
        if "condition" not in rule or "required_fields" not in rule["condition"]:
            continue
        
        required_fields = rule["condition"]["required_fields"]
        
        # Check if all required fields exist and are not empty
        all_fields_present = True
        
        for field in required_fields:
            if field not in entities:
                all_fields_present = False
                break
            
            field_value = entities[field]
            
            # Handle different data types
            if isinstance(field_value, list):
                # For lists, check if they're not empty
                if not field_value:
                    all_fields_present = False
                    break
            elif isinstance(field_value, int):
                # For numbers (like years_of_experience), only check if > 0
                # (but we allow 0 as it's still a presence of data)
                # Actually, let's check if the field exists and is not None
                if field_value is None:
                    all_fields_present = False
                    break
            elif isinstance(field_value, str):
                # For strings, check if not empty
                if not field_value:
                    all_fields_present = False
                    break
            else:
                # For other types, check if not None
                if field_value is None:
                    all_fields_present = False
                    break
        
        # If all fields are present, add risk
        if all_fields_present:
            risk = {
                "risk_type": rule.get("risk_type", "Unknown Risk"),
                "severity": rule.get("severity", 0),
                "pathway": rule.get("pathway", [])
            }
            inferred_risks.append(risk)
    
    # Sort risks by severity (descending) for deterministic ordering
    inferred_risks.sort(key=lambda x: x["severity"], reverse=True)
    
    return {
        "inferred_risks": inferred_risks,
        "inference_chains_count": len(inferred_risks)
    }
