"""
Test script for risk heatmap visualization.
"""

import json
import requests

# Sample request from specification
request_data = {
    "score_breakdown": {
        "total_risk_score": 72,
        "components": {
            "direct_pii": 20,
            "correlation": 15,
            "inference_depth": 10,
            "employment": 12,
            "location": 5,
            "timeline": 6,
            "public_visibility": 4
        },
        "data_type_contributions": {
            "email": 18,
            "phone": 10,
            "graduation_year": 8,
            "company": 12,
            "location": 9,
            "dob": 15
        }
    }
}

print("\n" + "="*70)
print("RISK HEATMAP VISUALIZATION TEST")
print("="*70)
print("\nRequest URL: POST http://localhost:8000/api/v1/risk-heatmap")
print("\nRequest Body:")
print(json.dumps(request_data, indent=2))

try:
    response = requests.post(
        "http://localhost:8000/api/v1/risk-heatmap",
        json=request_data
    )
    
    print(f"\nResponse Status: {response.status_code}")
    print("\nFull Response Body:")
    response_json = response.json()
    print(json.dumps(response_json, indent=2))
    
    if response.status_code == 200:
        print("\n" + "="*70)
        print("VISUALIZATION DATA SUMMARY")
        print("="*70)
        
        summary = response_json.get("summary", {})
        print(f"\n📊 SUMMARY:")
        print(f"   Total Score:        {summary.get('total_score')}/100")
        print(f"   Risk Level:         {summary.get('risk_level')}")
        print(f"   High Severity:      {summary.get('high_severity_count')} items")
        print(f"   Medium Severity:    {summary.get('medium_severity_count')} items")
        print(f"   Low Severity:       {summary.get('low_severity_count')} items")
        
        severity_dist = response_json.get("severity_distribution", {})
        print(f"\n📈 SEVERITY DISTRIBUTION:")
        print(f"   High:    {severity_dist.get('high')}%")
        print(f"   Medium:  {severity_dist.get('medium')}%")
        print(f"   Low:     {severity_dist.get('low')}%")
        
        categories = response_json.get("risk_category_breakdown", [])
        print(f"\n📋 RISK CATEGORIES (Top 3):")
        for i, cat in enumerate(categories[:3], 1):
            print(f"   {i}. {cat.get('category')}: {cat.get('score')} ({cat.get('severity')})")
        
        heatmap = response_json.get("heatmap", [])
        print(f"\n🔥 HEATMAP - DATA TYPE CONTRIBUTIONS (Top 3):")
        for i, item in enumerate(heatmap[:3], 1):
            print(f"   {i}. {item.get('data_type')}: {item.get('contribution')} ({item.get('severity')})")
        
        graph = response_json.get("graph_data", {})
        bar = graph.get("bar_chart", {})
        print(f"\n📊 CHART DATA:")
        print(f"   Bar Chart Labels:  {', '.join(bar.get('labels', [])[:3])}...")
        print(f"   Radar Chart Size:  {len(graph.get('radar_chart', {}).get('labels', []))} axes")
        print(f"   Pie Chart Slices:  {len(graph.get('pie_chart', {}).get('labels', []))} segments")
        
        print("\n" + "="*70)

except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Could not connect to server at localhost:8000")
    print("   Make sure uvicorn is running: uvicorn app.main:app --reload")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")
