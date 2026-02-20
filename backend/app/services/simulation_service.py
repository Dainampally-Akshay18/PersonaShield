"""
Hardening simulation service.
Simulates risk score before and after removing sensitive fields.
"""

from typing import Dict, List, Any
import copy

from app.services.correlation_engine import apply_correlation_rules
from app.services.correlation_depth_service import calculate_correlation_depth
from app.services.timeline_service import calculate_timeline_exposure
from app.services.visibility_service import calculate_visibility
from app.services.scoring_engine import calculate_risk_score


def run_hardening_simulation(
    original_entities: Dict[str, Any],
    remove_fields: List[str],
    debug: bool = False
) -> Dict[str, float]:
    """
    Simulate risk score before and after removing sensitive fields.
    
    Reuses existing engines:
    - Correlation engine
    - Correlation depth service
    - Timeline exposure service
    - Visibility service
    - Scoring engine
    
    Args:
        original_entities: Dictionary of extracted entities
        remove_fields: List of field names to remove in simulation
        debug: If True, print debug information
    
    Returns:
        Dictionary with original_score, hardened_score, and difference
    """
    
    print("\n" + "="*60)
    print("HARDENING SIMULATION STARTED")
    print("="*60)
    print(f"Remove fields: {remove_fields}")
    
    # STEP 1: Compute original score using existing engines
    print("\n--- ORIGINAL SCORE COMPUTATION ---")
    original_score = _compute_risk_score(original_entities, debug=debug)
    
    # STEP 2: Create copy of entities and remove selected fields
    print("\n--- CREATING HARDENED COPY ---")
    hardened_entities = copy.deepcopy(original_entities)
    for field in remove_fields:
        if field in hardened_entities:
            # Set to empty list or 0 depending on field type
            value = hardened_entities[field]
            if isinstance(value, list):
                hardened_entities[field] = []
            elif isinstance(value, str):
                hardened_entities[field] = ""
            elif isinstance(value, (int, float)):
                hardened_entities[field] = 0
            else:
                hardened_entities[field] = None
            print(f"[HARDENED] {field}: {value} → {hardened_entities[field]}")
    
    # STEP 3: Recompute risk score using same pipeline
    print("\n--- HARDENED SCORE COMPUTATION ---")
    hardened_score = _compute_risk_score(hardened_entities, debug=debug)
    
    # Calculate difference (original - hardened)
    difference = max(0, original_score - hardened_score)
    
    print("\n" + "="*60)
    print("HARDENING SIMULATION RESULTS")
    print("="*60)
    print(f"Original Score:   {original_score}")
    print(f"Hardened Score:   {hardened_score}")
    print(f"Risk Reduction:   {difference}")
    print("="*60 + "\n")
    
    return {
        "original_score": round(original_score, 1),
        "hardened_score": round(hardened_score, 1),
        "difference": round(difference, 1)
    }


def _compute_risk_score(
    entities: Dict[str, Any],
    debug: bool = False
) -> float:
    """
    Internal helper to compute risk score using existing engines.
    
    Args:
        entities: Entity dictionary
        debug: If True, print debug information
    
    Returns:
        Risk score (0-100)
    """
    
    try:
        if debug:
            print(f"\n[DEBUG] Computing risk score for entities:")
            for key, value in entities.items():
                print(f"  {key}: {value}")
        
        # Apply correlation rules
        correlation_result = apply_correlation_rules(entities)
        inferred_risks = correlation_result.get("inferred_risks", [])
        if debug:
            print(f"[DEBUG] Inferred risks ({len(inferred_risks)} total):")
            for risk in inferred_risks:
                print(f"  - {risk.get('risk_type')}: severity {risk.get('severity')}")
        
        # Calculate correlation depth
        correlation_depth_result = calculate_correlation_depth(inferred_risks)
        correlation_depth = correlation_depth_result.get("correlation_depth_score", 0)
        if debug:
            print(f"[DEBUG] Correlation depth: {correlation_depth}")
        
        # Calculate timeline exposure
        # Extract individual fields from entities
        graduation_year = 0
        years_of_experience = 0
        company_years = 0
        
        # Handle graduation_year (could be list or single value)
        if "graduation_year" in entities and entities["graduation_year"]:
            grad_year = entities["graduation_year"]
            graduation_year = grad_year[0] if isinstance(grad_year, list) else grad_year
        
        # Handle years_of_experience
        if "years_of_experience" in entities and entities["years_of_experience"]:
            yoe = entities["years_of_experience"]
            years_of_experience = yoe if isinstance(yoe, (int, float)) else (yoe[0] if isinstance(yoe, list) else 0)
        
        timeline_result = calculate_timeline_exposure(
            graduation_year=graduation_year,
            years_of_experience=years_of_experience,
            company_years=company_years
        )
        timeline_years = timeline_result.get("estimated_exposure_years", 0)
        if debug:
            print(f"[DEBUG] Timeline years: {timeline_years}")
        
        # Calculate visibility
        visibility_result = calculate_visibility(entities)
        visibility_score = visibility_result.get("visibility_score", 0)
        if debug:
            print(f"[DEBUG] Visibility score: {visibility_score}")
        
        # Calculate overall risk score
        score_result = calculate_risk_score(
            entities=entities,
            inferred_risks=inferred_risks,
            correlation_depth=correlation_depth,
            timeline_years=timeline_years,
            visibility_score=visibility_score
        )
        
        final_score = score_result.get("risk_score", 0)
        if debug:
            print(f"[DEBUG] Final risk score: {final_score}")
            breakdown = score_result.get("score_breakdown", {})
            print(f"[DEBUG] Score breakdown: {breakdown}")
        
        return final_score
    
    except Exception as e:
        # If any service fails, return 0
        print(f"[ERROR] Error computing risk score: {str(e)}")
        import traceback
        traceback.print_exc()
        return 0
