"""
Test script for master analysis orchestrator endpoint.
"""

import json
import requests

# Sample request
request_data = {
    "input_type": "text",
    "content": """
    Name: Rahul Kumar
    Email: rahul@infosys.com, personal: rahul@gmail.com
    Phone: 9876543210
    Date of Birth: 1999-05-10
    Graduated: 2021 from IIT Hyderabad
    Job: Senior Software Engineer at Infosys, Bangalore
    Skills: Python, React, AWS, Docker
    Experience: 3 years
    Certifications: AWS Solutions Architect
    """,
    "persona": "professional_scammer",
    "simulate_hardening": True,
    "fields_to_remove": ["phones", "graduation_year"]
}

print("\n" + "="*80)
print("MASTER ANALYSIS ORCHESTRATOR - COMPREHENSIVE PRIVACY RISK ANALYSIS")
print("="*80)
print("\nRequest URL: POST http://localhost:8000/api/v1/analyze")
print("\nRequest Body:")
print(json.dumps(request_data, indent=2))

try:
    response = requests.post(
        "http://localhost:8000/api/v1/analyze",
        json=request_data,
        timeout=30
    )
    
    print(f"\nResponse Status: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        
        print("\n" + "="*80)
        print("FULL ANALYSIS RESPONSE")
        print("="*80)
        print(json.dumps(result, indent=2))
        
        print("\n" + "="*80)
        print("ANALYSIS SUMMARY")
        print("="*80)
        
        analysis_id = result.get("analysis_id", "N/A")
        print(f"\n📋 Analysis ID: {analysis_id}")
        
        input_summary = result.get("input_summary", {})
        print(f"\n📥 Input Summary:")
        print(f"   Type: {input_summary.get('input_type')}")
        print(f"   Characters: {input_summary.get('character_count')}")
        print(f"   Timestamp: {input_summary.get('timestamp')}")
        
        entities = result.get("entities", {})
        print(f"\n👤 Extracted Entities:")
        print(f"   Emails: {entities.get('emails', [])}")
        print(f"   Phones: {entities.get('phones', [])}")
        print(f"   Job Title: {entities.get('job_title', [])}")
        print(f"   Company: {entities.get('company', [])}")
        print(f"   Location: {entities.get('location', [])}")
        print(f"   Skills: {entities.get('skills', [])}")
        
        risk_assessment = result.get("risk_assessment", {})
        print(f"\n⚠️ Risk Assessment:")
        print(f"   Risk Score: {risk_assessment.get('risk_score')}/100")
        print(f"   Risk Level: {risk_assessment.get('risk_level')}")
        print(f"   Correlation Depth: {risk_assessment.get('correlation_depth')}")
        print(f"   Timeline Years: {risk_assessment.get('timeline_years')}")
        print(f"   Visibility Score: {risk_assessment.get('visibility_score')}")
        
        attack_analysis = result.get("attack_analysis", {})
        print(f"\n🎯 Attack Analysis:")
        print(f"   Attack Vectors: {len(attack_analysis.get('attack_vectors', []))}")
        print(f"   Primary Threats: {attack_analysis.get('primary_threats', [])}")
        
        persona_sim = result.get("persona_simulation", {})
        if persona_sim.get("narrative"):
            print(f"\n🎭 Persona Simulation ({persona_sim.get('persona')}):")
            narrative = persona_sim.get("narrative", "")
            if len(narrative) > 200:
                print(f"   {narrative[:200]}...")
            else:
                print(f"   {narrative}")
        
        phishing_sim = result.get("phishing_simulation", {})
        if phishing_sim.get("email_subject"):
            print(f"\n📧 Phishing Simulation:")
            print(f"   Subject: {phishing_sim.get('email_subject', 'N/A')}")
            body = phishing_sim.get("email_body", "")
            if body:
                if len(body) > 100:
                    print(f"   Body: {body[:100]}...")
                else:
                    print(f"   Body: {body}")
        
        explanation = result.get("explanation", {})
        if explanation.get("explanation"):
            print(f"\n💡 Risk Explanation:")
            exp_text = explanation.get("explanation", "")
            if len(exp_text) > 150:
                print(f"   {exp_text[:150]}...")
            else:
                print(f"   {exp_text}")
        
        hardening = result.get("hardening_simulation")
        if hardening:
            print(f"\n🛡️ Hardening Simulation:")
            print(f"   Original Score: {hardening.get('original_score')}")
            print(f"   Hardened Score: {hardening.get('hardened_score')}")
            print(f"   Risk Reduction: {hardening.get('difference')} points")
        
        viz = result.get("visualization")
        if viz and viz.get("summary"):
            print(f"\n📊 Visualization Available:")
            print(f"   Heatmap categories: {len(viz.get('heatmap', []))}")
            print(f"   Chart data: {len(viz.get('graph_data', {}).get('bar_chart', {}).get('labels', []))} axes")
        
        print("\n" + "="*80)

    else:
        print(f"Error Response: {response.text}")

except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Could not connect to server at localhost:8000")
    print("   Make sure uvicorn is running: uvicorn app.main:app --reload")
except requests.exceptions.Timeout:
    print("\n❌ ERROR: Request timeout - analysis took too long")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
