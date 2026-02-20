"""
Heatmap visualization service.
Pure transformation logic to convert risk scores into frontend-ready visualization data.
"""

from typing import Dict, List, Any


def generate_heatmap(score_breakdown: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate frontend-ready heatmap visualization data from risk scores.
    
    Args:
        score_breakdown: Dictionary with total_risk_score, components, and data_type_contributions
    
    Returns:
        Dictionary with summary, severity_distribution, risk_category_breakdown, heatmap, and graph_data
    """
    
    total_score = score_breakdown.get("total_risk_score", 0)
    components = score_breakdown.get("components", {})
    data_type_contributions = score_breakdown.get("data_type_contributions", {})
    
    # Generate summary
    summary = _generate_summary(total_score, components, data_type_contributions)
    
    # Generate severity distribution
    severity_dist = _calculate_severity_distribution(components, data_type_contributions)
    
    # Generate risk category breakdown
    category_breakdown = _generate_category_breakdown(components)
    
    # Generate heatmap data
    heatmap = _generate_heatmap_data(data_type_contributions)
    
    # Generate graph data
    graph_data = _generate_graph_data(components, data_type_contributions)
    
    return {
        "summary": summary,
        "severity_distribution": severity_dist,
        "risk_category_breakdown": category_breakdown,
        "heatmap": heatmap,
        "graph_data": graph_data
    }


def _get_risk_level(score: float) -> str:
    """
    Determine risk level from score.
    0-30: Low
    31-60: Moderate
    61-100: High
    """
    if score <= 30:
        return "Low"
    elif score <= 60:
        return "Moderate"
    else:
        return "High"


def _get_severity(score: float) -> str:
    """
    Determine severity from score.
    >=15: High
    >=8: Medium
    else: Low
    """
    if score >= 15:
        return "High"
    elif score >= 8:
        return "Medium"
    else:
        return "Low"


def _severity_to_color(severity: str) -> str:
    """Map severity to color hex code."""
    color_map = {
        "High": "#ff4444",      # Red
        "Medium": "#ffaa44",    # Orange
        "Low": "#44aa44"        # Green
    }
    return color_map.get(severity, "#888888")


def _generate_summary(
    total_score: float,
    components: Dict[str, float],
    data_type_contributions: Dict[str, float]
) -> Dict[str, Any]:
    """Generate summary statistics."""
    
    risk_level = _get_risk_level(total_score)
    
    # Count severity levels across all items
    all_scores = list(components.values()) + list(data_type_contributions.values())
    high_count = sum(1 for score in all_scores if score >= 15)
    medium_count = sum(1 for score in all_scores if 8 <= score < 15)
    low_count = sum(1 for score in all_scores if score < 8)
    
    return {
        "total_score": round(total_score, 1),
        "risk_level": risk_level,
        "high_severity_count": high_count,
        "medium_severity_count": medium_count,
        "low_severity_count": low_count
    }


def _calculate_severity_distribution(
    components: Dict[str, float],
    data_type_contributions: Dict[str, float]
) -> Dict[str, float]:
    """Calculate percentage distribution of severity levels."""
    
    all_scores = list(components.values()) + list(data_type_contributions.values())
    total_items = len(all_scores)
    
    if total_items == 0:
        return {"high": 0.0, "medium": 0.0, "low": 0.0}
    
    high_count = sum(1 for score in all_scores if score >= 15)
    medium_count = sum(1 for score in all_scores if 8 <= score < 15)
    low_count = sum(1 for score in all_scores if score < 8)
    
    return {
        "high": round((high_count / total_items) * 100, 1),
        "medium": round((medium_count / total_items) * 100, 1),
        "low": round((low_count / total_items) * 100, 1)
    }


def _generate_category_breakdown(components: Dict[str, float]) -> List[Dict[str, Any]]:
    """Generate risk category breakdown."""
    
    breakdown = []
    
    # Format component names for display
    display_names = {
        "direct_pii": "Direct PII",
        "correlation": "Data Correlation",
        "inference_depth": "Inference Depth",
        "employment": "Employment Exposure",
        "location": "Location Exposure",
        "timeline": "Timeline Exposure",
        "public_visibility": "Public Visibility"
    }
    
    for component, score in components.items():
        display_name = display_names.get(component, component.replace("_", " ").title())
        severity = _get_severity(score)
        
        breakdown.append({
            "category": display_name,
            "score": round(score, 1),
            "severity": severity
        })
    
    # Sort by score descending for better visualization
    breakdown.sort(key=lambda x: x["score"], reverse=True)
    
    return breakdown


def _generate_heatmap_data(data_type_contributions: Dict[str, float]) -> List[Dict[str, Any]]:
    """Generate per-data-type heatmap."""
    
    heatmap = []
    
    for data_type, contribution in data_type_contributions.items():
        severity = _get_severity(contribution)
        # Normalize contribution to 0-1 scale (assuming max 20)
        normalized_score = min(contribution / 20.0, 1.0)
        
        heatmap.append({
            "data_type": data_type,
            "contribution": round(contribution, 1),
            "severity": severity,
            "normalized_score": round(normalized_score, 2)
        })
    
    # Sort by contribution descending
    heatmap.sort(key=lambda x: x["contribution"], reverse=True)
    
    return heatmap


def _generate_graph_data(
    components: Dict[str, float],
    data_type_contributions: Dict[str, float]
) -> Dict[str, Any]:
    """Generate graph visualization data (bar, radar, pie charts)."""
    
    # Prepare component data for charts
    component_labels = [
        name.replace("_", " ").title()
        for name in components.keys()
    ]
    component_values = list(components.values())
    component_colors = [
        _severity_to_color(_get_severity(score))
        for score in component_values
    ]
    
    # Bar chart: component scores
    bar_chart = {
        "labels": component_labels,
        "values": [round(v, 1) for v in component_values],
        "colors": component_colors
    }
    
    # Radar chart: component radar visualization
    radar_chart = {
        "labels": component_labels,
        "values": [round(v, 1) for v in component_values]
    }
    
    # Pie chart: data type contributions
    data_type_labels = list(data_type_contributions.keys())
    data_type_values = list(data_type_contributions.values())
    data_type_colors = [
        _severity_to_color(_get_severity(score))
        for score in data_type_values
    ]
    
    pie_chart = {
        "labels": data_type_labels,
        "values": [round(v, 1) for v in data_type_values],
        "colors": data_type_colors
    }
    
    return {
        "bar_chart": bar_chart,
        "radar_chart": radar_chart,
        "pie_chart": pie_chart
    }
