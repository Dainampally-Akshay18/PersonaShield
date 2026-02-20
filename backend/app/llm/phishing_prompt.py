"""
Phishing email prompt template.
Generates educational phishing simulations for security awareness training.
"""


def get_phishing_email_prompt(entities: dict) -> str:
    """
    Generate a prompt for creating an educational phishing email simulation.
    
    The email should:
    - Be realistic but clearly educational
    - Include specific extracted details (role, company, location)
    - Avoid harmful instructions
    - Avoid direct links
    - Avoid asking for passwords directly
    - Sound like common corporate phishing
    - Include subtle red flags
    
    Args:
        entities: Extracted entity dictionary
    
    Returns:
        Formatted prompt string
    """
    company = ", ".join(entities.get("company", ["their company"])[:1])
    job_title = ", ".join(entities.get("job_title", ["professional"])[:1])
    location = ", ".join(entities.get("location", [])[:1]) if entities.get("location") else "their location"
    email_domain = entities.get("emails", ["user@company.com"])[0].split("@")[1] if entities.get("emails") else "company.com"
    
    prompt = f"""You are a cybersecurity educator creating a SIMULATED PHISHING EMAIL for educational awareness training purposes ONLY. This simulation must demonstrate real phishing tactics while being clearly educational.

TARGET PROFILE:
- Company: {company}
- Role: {job_title}
- Location: {location}
- Email domain: {email_domain}

Create a realistic phishing email that a {job_title} at {company} might receive. The email should:

1. STRUCTURE:
   - Create a realistic subject line that creates urgency (e.g., "Verify Your Account", "Security Alert", "Action Required")
   - Write a convincing email body (3-4 paragraphs) that mimics legitimate corporate communication
   - Avoid actual URLs or links - use generic placeholders like "[Company Portal Link]"
   - Do NOT explicitly ask for password or credentials

2. TACTICS (realistic but educational):
   - Create urgency or fear (account suspension, security breach)
   - Reference specific company ({company}) or role details
   - Use authoritative language (IT Department, Security Team)
   - Request verification or simple action
   - Include subtle inconsistencies (email tone, generic greeting) as red flags
   - Maybe misspell the company domain by 1 letter or use similar domain hint

3. RED FLAGS TO INCLUDE (educational):
   - Generic greeting ("Dear User" instead of name)
   - Urgency without clear reason
   - Request for verification without proper context
   - Grammar hints that might indicate non-native speaker
   - Misalignment between sender and content

4. DO NOT:
   - Include actual malicious URLs
   - Ask directly for password
   - Provide step-by-step attack instructions
   - Include any harmful payload descriptions
   - Be graphic or threatening in tone

OUTPUT FORMAT:
Email Subject: [subject line]
Email Body:
[email body - use [Company Portal Link] or [Action Required Link] instead of real URLs]

Make it realistic so it serves as effective training material."""
    
    return prompt
