"""
Persona prompt templates for attack vector simulation.
Educational templates for different attacker archetypes.
"""


def get_script_kiddie_prompt(analysis_summary: dict) -> str:
    """
    Generate prompt for script kiddie persona.
    Naive, opportunistic attacker using existing tools/exploits.
    """
    entities = analysis_summary.get("entities", {})
    attack_vectors = analysis_summary.get("attack_vectors", [])
    risk_score = analysis_summary.get("risk_score", 0)
    
    threat_list = ", ".join([v.get("category", "") for v in attack_vectors[:3]]) if attack_vectors else "personal data exposure"
    
    prompt = f"""You are an educational cybersecurity analyst explaining how an inexperienced attacker (script kiddie) would exploit exposed personal data.

Exposed data includes:
- {len(entities.get('emails', []))} email(s) {'found' if entities.get('emails') else 'not found'}
- {len(entities.get('phones', []))} phone number(s) {'found' if entities.get('phones') else 'not found'}
- DOB {('found' if entities.get('dob') else 'not found')}
- Work details: {', '.join(entities.get('company', [])[:1])} {('found' if entities.get('company') else 'not found')}

Primary attack vectors: {threat_list}
Overall risk score: {risk_score}/100

Write a brief, educational explanation (2-3 sentences) of how a typical script kiddie would attempt to exploit this data using common tools like password cracking, phishing templates, or credential stuffing. Focus on the opportunistic nature and reliance on existing exploits. This is for cybersecurity education only."""
    
    return prompt


def get_professional_scammer_prompt(analysis_summary: dict) -> str:
    """
    Generate prompt for professional scammer persona.
    Sophisticated social engineer using targeted psychological manipulation.
    """
    entities = analysis_summary.get("entities", {})
    attack_vectors = analysis_summary.get("attack_vectors", [])
    risk_score = analysis_summary.get("risk_score", 0)
    
    target_role = ", ".join(entities.get("job_title", [])[:1]) if entities.get("job_title") else "professional"
    target_company = ", ".join(entities.get("company", [])[:1]) if entities.get("company") else "their employer"
    threat_list = ", ".join([v.get("category", "") for v in attack_vectors[:2]]) if attack_vectors else "identity fraud"
    
    prompt = f"""You are an educational cybersecurity analyst explaining how a professional social engineer would exploit exposed personal data.

Target profile:
- Role: {target_role}
- Organization: {target_company}
- Location: {', '.join(entities.get('location', [])[:1]) if entities.get('location') else 'Unknown'}
- Education: {entities.get('graduation_year', [None])[0] if entities.get('graduation_year') else 'Unknown'}
- Skills: {', '.join(entities.get('skills', [])[:2]) if entities.get('skills') else 'Unspecified'}

Primary attack vectors: {threat_list}
Overall risk score: {risk_score}/100

Write a brief, educational explanation (2-3 sentences) of how a professional social engineer would craft a personalized, convincing phishing or pretexting attack using this information. Explain how they would leverage the target's role, organization, and interests to build rapport and extract sensitive information. This is for cybersecurity education only."""
    
    return prompt


def get_corporate_spy_prompt(analysis_summary: dict) -> str:
    """
    Generate prompt for corporate spy persona.
    Targeted intelligence gathering with strategic focus.
    """
    entities = analysis_summary.get("entities", {})
    attack_vectors = analysis_summary.get("attack_vectors", [])
    risk_score = analysis_summary.get("risk_score", 0)
    
    target_company = ", ".join(entities.get("company", [])[:1]) if entities.get("company") else "target organization"
    skills = ", ".join(entities.get("skills", [])[:3]) if entities.get("skills") else "technical capabilities"
    threat_list = ", ".join([v.get("category", "") for v in attack_vectors[:2]]) if attack_vectors else "data access"
    
    prompt = f"""You are an educational cybersecurity analyst explaining how a corporate intelligence gatherer would exploit exposed professional data.

Target profile:
- Organization: {target_company}
- Technical skills: {skills}
- Certifications: {', '.join(entities.get('certifications', [])[:2]) if entities.get('certifications') else 'None listed'}
- Experience: {entities.get('years_of_experience', 0)} years
- Network: {', '.join(entities.get('location', [])[:1]) if entities.get('location') else 'Unspecified'}

Primary attack vectors: {threat_list}
Overall risk score: {risk_score}/100

Write a brief, educational explanation (2-3 sentences) of how a corporate intelligence operative would approach this target. Focus on how they would identify this person's value, establish trust through professional channels, and strategically extract proprietary or competitive information. Explain the long-term relationship-building aspect. This is for cybersecurity education only."""
    
    return prompt


def get_persona_prompt(persona_type: str, analysis_summary: dict) -> str:
    """
    Get appropriate prompt template for the specified persona type.
    
    Args:
        persona_type: One of "script_kiddie", "professional_scammer", "corporate_spy"
        analysis_summary: Analysis data including entities and risks
    
    Returns:
        Formatted prompt string
    
    Raises:
        ValueError: If persona_type is invalid
    """
    persona_type = persona_type.lower().strip()
    
    if persona_type == "script_kiddie":
        return get_script_kiddie_prompt(analysis_summary)
    elif persona_type == "professional_scammer":
        return get_professional_scammer_prompt(analysis_summary)
    elif persona_type == "corporate_spy":
        return get_corporate_spy_prompt(analysis_summary)
    else:
        raise ValueError(f"Invalid persona type: {persona_type}. Must be one of: script_kiddie, professional_scammer, corporate_spy")
