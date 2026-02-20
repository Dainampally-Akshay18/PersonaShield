"""
Hardening explanation prompt templates for LLM.
"""


def get_hardening_explanation_prompt(
    removed_fields: list,
    original_score: float,
    hardened_score: float,
    risk_reduction: float
) -> str:
    """
    Generate a prompt for explaining hardening impact in non-technical language.
    
    Args:
        removed_fields: List of field names that were removed
        original_score: Original risk score
        hardened_score: Risk score after hardening
        risk_reduction: Difference (original - hardened)
    
    Returns:
        Prompt string for LLM
    """
    
    # Format removed fields for readability
    fields_str = ", ".join(f"'{field}'" for field in removed_fields)
    
    # Determine impact level
    reduction_percent = round((risk_reduction / original_score * 100), 1) if original_score > 0 else 0
    
    if reduction_percent >= 50:
        impact = "significant"
    elif reduction_percent >= 25:
        impact = "moderate"
    else:
        impact = "meaningful"
    
    prompt = f"""You are a privacy and cybersecurity awareness educator. Explain to a non-technical person why removing certain data fields reduces their privacy risk.

HARDENING ACTION TAKEN:
Removed fields: {fields_str}

RISK CHANGE:
- Original Risk Score: {original_score}/100
- New Risk Score: {hardened_score}/100
- Risk Reduction: {risk_reduction} points ({reduction_percent}% improvement)

Your explanation must:
1. Be clear and educational - written for someone without cybersecurity background
2. Specifically mention the removed fields: {fields_str}
3. Explain which attack risks become harder when these fields are removed
4. Include concrete examples of how attackers would use this removed data
5. Use friendly, balanced tone - educate don't scare
6. Be 80-150 words
7. Avoid technical jargon - use everyday language
8. Start with: "Removing {fields_str} significantly reduces your risk because..."

Write the explanation now:"""
    
    return prompt
