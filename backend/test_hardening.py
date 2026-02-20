"""
Test script for hardening simulation.
Run this to debug the endpoint.
"""

import json
import requests

# Sample request from user
request_data = {
    "original_entities": {
        "emails": ["rahul@gmail.com"],
        "phones": ["9876543210"],
        "dob": ["1999-05-10"],
        "graduation_year": [2021],
        "college": ["IIT Hyderabad"],
        "company": ["Infosys"],
        "job_title": ["Software Engineer"],
        "location": ["Bangalore"],
        "family_mentions": [],
        "skills": ["Python", "React"],
        "certifications": [],
        "years_of_experience": 3
    },
    "remove_fields": ["phones", "graduation_year"]
}

print("\n" + "="*70)
print("HARDENING SIMULATION TEST")
print("="*70)
print("\nRequest URL: POST http://localhost:8000/api/v1/simulate-hardening")
print("\nRequest Body:")
print(json.dumps(request_data, indent=2))

try:
    response = requests.post(
        "http://localhost:8000/api/v1/simulate-hardening",
        json=request_data
    )
    
    print(f"\nResponse Status: {response.status_code}")
    print("Response Body:")
    print(json.dumps(response.json(), indent=2))
    
    if response.status_code == 200:
        result = response.json()
        print("\n" + "="*70)
        print("ANALYSIS")
        print("="*70)
        print(f"Original Score:    {result['original_score']}/100")
        print(f"Hardened Score:    {result['hardened_score']}/100")
        print(f"Risk Reduction:    {result['difference']}")
        print("\nExplanation:")
        print(f"  Removing 'phones' and 'graduation_year' reduced risk by {result['difference']} points")
        print(f"  This is {round((result['difference']/result['original_score']*100), 1)}% improvement")
        print("="*70)

except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Could not connect to server at localhost:8000")
    print("   Make sure uvicorn is running: uvicorn app.main:app --reload")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
