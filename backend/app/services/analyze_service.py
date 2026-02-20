"""
Master analysis orchestrator service.
Orchestrates all analysis phases into a single comprehensive pipeline.
"""

from typing import Dict, List, Any, Optional
import uuid
from datetime import datetime

# Import all service functions
from app.services.ingestion_service import normalize_text, extract_text_from_pdf
from app.services.extraction_service import extract_entities
from app.services.correlation_engine import apply_correlation_rules
from app.services.correlation_depth_service import calculate_correlation_depth
from app.services.timeline_service import calculate_timeline_exposure
from app.services.visibility_service import calculate_visibility
from app.services.scoring_engine import calculate_risk_score
from app.services.attack_vector_service import categorize_attack_vectors
from app.services.persona_service import generate_persona_narrative
from app.services.phishing_service import generate_phishing_email
from app.services.explanation_service import generate_risk_explanation
from app.services.simulation_service import run_hardening_simulation
from app.services.heatmap_service import generate_heatmap


def run_comprehensive_analysis(
    input_type: str,
    content: Optional[str] = None,
    file_bytes: Optional[bytes] = None,
    persona: Optional[str] = None,
    simulate_hardening: bool = False,
    fields_to_remove: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Run comprehensive analysis pipeline on input data.
    
    Pipeline steps:
    1. Normalize input (ingestion_service)
    2. Extract entities (extraction_service)
    3. Correlate risks (correlation_engine)
    4. Compute correlation depth (correlation_depth_service)
    5. Compute timeline (timeline_service)
    6. Compute visibility (visibility_service)
    7. Compute risk score (scoring_engine)
    8. Categorize attack vectors (attack_vector_service)
    9. Persona narrative (persona_service) - safe fail
    10. Phishing simulation (phishing_service) - safe fail
    11. Explanation (explanation_service) - safe fail
    12. Optional hardening simulation (simulation_service)
    13. Generate heatmap (heatmap_service)
    
    Args:
        input_type: 'text' or 'pdf'
        content: Text content if input_type='text'
        file_bytes: PDF bytes if input_type='pdf'
        persona: Optional persona for simulation
        simulate_hardening: Whether to run hardening simulation
        fields_to_remove: Fields to remove for hardening
    
    Returns:
        Dictionary with complete analysis results
    """
    
    analysis_id = str(uuid.uuid4())
    timestamp = datetime.utcnow().isoformat() + "Z"
    
    try:
        # STEP 1: Normalize input
        print(f"\n[ANALYSIS {analysis_id}] Step 1: Normalizing input...")
        if input_type == "text":
            normalized_text = normalize_text(content)
        elif input_type == "pdf":
            normalized_text = extract_text_from_pdf(file_bytes)
        else:
            raise ValueError(f"Invalid input_type: {input_type}")
        
        # STEP 2: Extract entities
        print(f"[ANALYSIS {analysis_id}] Step 2: Extracting entities...")
        entities = extract_entities(normalized_text)
        
        # STEP 3: Correlate risks
        print(f"[ANALYSIS {analysis_id}] Step 3: Correlating risks...")
        correlation_result = apply_correlation_rules(entities)
        inferred_risks = correlation_result.get("inferred_risks", [])
        
        # STEP 4: Compute correlation depth
        print(f"[ANALYSIS {analysis_id}] Step 4: Computing correlation depth...")
        correlation_depth_result = calculate_correlation_depth(inferred_risks)
        correlation_depth = correlation_depth_result.get("correlation_depth_score", 0)
        
        # STEP 5: Compute timeline
        print(f"[ANALYSIS {analysis_id}] Step 5: Computing timeline exposure...")
        graduation_year = 0
        years_of_experience = 0
        if "graduation_year" in entities and entities["graduation_year"]:
            grad_year = entities["graduation_year"]
            graduation_year = grad_year[0] if isinstance(grad_year, list) else grad_year
        if "years_of_experience" in entities and entities["years_of_experience"]:
            yoe = entities["years_of_experience"]
            years_of_experience = yoe if isinstance(yoe, (int, float)) else (yoe[0] if isinstance(yoe, list) else 0)
        
        timeline_result = calculate_timeline_exposure(
            graduation_year=graduation_year,
            years_of_experience=years_of_experience,
            company_years=0
        )
        timeline_years = timeline_result.get("estimated_exposure_years", 0)
        
        # STEP 6: Compute visibility
        print(f"[ANALYSIS {analysis_id}] Step 6: Computing visibility score...")
        visibility_result = calculate_visibility(entities)
        visibility_score = visibility_result.get("visibility_score", 0)
        
        # STEP 7: Compute risk score
        print(f"[ANALYSIS {analysis_id}] Step 7: Computing risk score...")
        score_result = calculate_risk_score(
            entities=entities,
            inferred_risks=inferred_risks,
            correlation_depth=correlation_depth,
            timeline_years=timeline_years,
            visibility_score=visibility_score
        )
        risk_score = score_result.get("risk_score", 0)
        risk_level = score_result.get("risk_level", "Unknown")
        score_breakdown = score_result.get("score_breakdown", {})
        
        # STEP 8: Categorize attack vectors
        print(f"[ANALYSIS {analysis_id}] Step 8: Categorizing attack vectors...")
        attack_vector_result = categorize_attack_vectors(entities, inferred_risks)
        attack_vectors = attack_vector_result.get("attack_vectors", [])
        
        # STEP 9: Persona narrative (safe fail)
        print(f"[ANALYSIS {analysis_id}] Step 9: Generating persona narrative...")
        persona_narrative = ""
        if persona:
            try:
                persona_result = generate_persona_narrative(
                    persona=persona,
                    analysis_summary=f"Risk Score: {risk_score}, Attack Vectors: {len(attack_vectors)}"
                )
                persona_narrative = persona_result.get("narrative", "")
            except Exception as e:
                print(f"[WARNING] Persona narrative failed: {str(e)}")
        
        # STEP 10: Phishing simulation (safe fail)
        print(f"[ANALYSIS {analysis_id}] Step 10: Generating phishing simulation...")
        phishing_subject = ""
        phishing_body = ""
        phishing_disclaimer = ""
        try:
            phishing_result = generate_phishing_email(entities)
            phishing_subject = phishing_result.get("email_subject", "")
            phishing_body = phishing_result.get("email_body", "")
            phishing_disclaimer = phishing_result.get("disclaimer", "")
        except Exception as e:
            print(f"[WARNING] Phishing simulation failed: {str(e)}")
        
        # STEP 11: Risk explanation (safe fail)
        print(f"[ANALYSIS {analysis_id}] Step 11: Generating explanation...")
        explanation_text = ""
        try:
            explanation_result = generate_risk_explanation(
                risk_score=risk_score,
                score_breakdown=score_breakdown,
                inferred_risks=inferred_risks
            )
            explanation_text = explanation_result
        except Exception as e:
            print(f"[WARNING] Explanation generation failed: {str(e)}")
        
        # STEP 12: Optional hardening simulation
        print(f"[ANALYSIS {analysis_id}] Step 12: Optional hardening simulation...")
        hardening_result = None
        if simulate_hardening and fields_to_remove:
            try:
                hardening_data = run_hardening_simulation(
                    original_entities=entities,
                    remove_fields=fields_to_remove
                )
                hardening_result = {
                    "original_score": hardening_data.get("original_score"),
                    "hardened_score": hardening_data.get("hardened_score"),
                    "difference": hardening_data.get("difference"),
                    "explanation": hardening_data.get("explanation", "")
                }
            except Exception as e:
                print(f"[WARNING] Hardening simulation failed: {str(e)}")
        
        # STEP 13: Generate heatmap
        print(f"[ANALYSIS {analysis_id}] Step 13: Generating heatmap...")
        visualization_data = None
        try:
            heatmap_data = generate_heatmap(score_breakdown)
            visualization_data = {
                "summary": heatmap_data.get("summary"),
                "severity_distribution": heatmap_data.get("severity_distribution"),
                "risk_category_breakdown": heatmap_data.get("risk_category_breakdown"),
                "heatmap": heatmap_data.get("heatmap"),
                "graph_data": heatmap_data.get("graph_data")
            }
        except Exception as e:
            print(f"[WARNING] Heatmap generation failed: {str(e)}")
        
        print(f"[ANALYSIS {analysis_id}] ✅ Analysis complete. Risk Score: {risk_score}")
        
        return {
            "analysis_id": analysis_id,
            "input_summary": {
                "input_type": input_type,
                "character_count": len(normalized_text),
                "timestamp": timestamp
            },
            "entities": entities,
            "risk_assessment": {
                "risk_score": round(risk_score, 2),
                "risk_level": risk_level,
                "score_breakdown": score_breakdown,
                "inferred_risks": inferred_risks,
                "correlation_depth": round(correlation_depth, 2),
                "timeline_years": round(timeline_years, 2),
                "visibility_score": round(visibility_score, 2)
            },
            "attack_analysis": {
                "attack_vectors": attack_vectors,
                "primary_threats": [av.get("attack_vector", "") for av in attack_vectors[:3]]
            },
            "persona_simulation": {
                "persona": persona,
                "narrative": persona_narrative
            },
            "phishing_simulation": {
                "email_subject": phishing_subject,
                "email_body": phishing_body,
                "disclaimer": phishing_disclaimer
            },
            "explanation": {
                "explanation": explanation_text
            },
            "hardening_simulation": hardening_result,
            "visualization": visualization_data
        }
    
    except Exception as e:
        # Critical error - still return valid response with risk score
        print(f"[ERROR] Analysis {analysis_id} failed: {str(e)}")
        return {
            "analysis_id": analysis_id,
            "input_summary": {
                "input_type": input_type,
                "character_count": 0,
                "timestamp": timestamp
            },
            "entities": {},
            "risk_assessment": {
                "risk_score": 0.0,
                "risk_level": "Unknown",
                "score_breakdown": {},
                "inferred_risks": [],
                "correlation_depth": 0.0,
                "timeline_years": 0.0,
                "visibility_score": 0.0
            },
            "attack_analysis": {
                "attack_vectors": [],
                "primary_threats": []
            },
            "persona_simulation": {
                "persona": None,
                "narrative": ""
            },
            "phishing_simulation": {
                "email_subject": "",
                "email_body": "",
                "disclaimer": ""
            },
            "explanation": {
                "explanation": ""
            },
            "hardening_simulation": None,
            "visualization": None
        }
