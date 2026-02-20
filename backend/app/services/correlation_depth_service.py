"""
Correlation depth service.
Analyzes the depth of risk correlation chains.
"""

from typing import List, Dict


def calculate_correlation_depth(inferred_risks: List[Dict]) -> Dict:
    """
    Calculate correlation depth score based on inferred risks.
    
    depth_score = number_of_risks + average_pathway_length
    
    Args:
        inferred_risks: List of inferred risk objects
    
    Returns:
        Dictionary with correlation_depth_score, chain_count, average_chain_length
    
    Raises:
        ValueError: If inferred_risks is invalid
    """
    if not isinstance(inferred_risks, list):
        raise ValueError("Inferred risks must be a list")
    
    if len(inferred_risks) == 0:
        return {
            "correlation_depth_score": 0.0,
            "chain_count": 0,
            "average_chain_length": 0.0
        }
    
    # Count risks (chains)
    chain_count = len(inferred_risks)
    
    # Calculate pathway lengths
    pathway_lengths = []
    for risk in inferred_risks:
        if isinstance(risk, dict) and "pathway" in risk:
            pathway = risk["pathway"]
            if isinstance(pathway, list):
                pathway_lengths.append(len(pathway))
            else:
                pathway_lengths.append(0)
        else:
            pathway_lengths.append(0)
    
    # Calculate average pathway length
    if pathway_lengths:
        average_chain_length = sum(pathway_lengths) / len(pathway_lengths)
    else:
        average_chain_length = 0.0
    
    # Calculate depth score
    correlation_depth_score = chain_count + average_chain_length
    
    return {
        "correlation_depth_score": round(correlation_depth_score, 2),
        "chain_count": chain_count,
        "average_chain_length": round(average_chain_length, 2)
    }
