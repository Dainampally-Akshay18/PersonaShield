"""
Extraction service for sensitive data detection.
Deterministic regex-based extraction only.
"""

import re
from datetime import datetime


def extract_entities(text: str) -> dict:
    """
    Extract sensitive data entities from normalized text.
    
    Args:
        text: Normalized text to extract from
    
    Returns:
        Dictionary with all extracted entities
    
    Raises:
        ValueError: If text is empty
    """
    if not text or not text.strip():
        raise ValueError("Text cannot be empty")
    
    text_lower = text.lower()
    
    # Extract all entities
    entities = {
        "emails": _extract_emails(text),
        "phones": _extract_phones(text),
        "dob": _extract_dob(text),
        "graduation_year": _extract_graduation_year(text),
        "college": _extract_college(text),
        "company": _extract_company(text),
        "job_title": _extract_job_title(text),
        "location": _extract_location(text),
        "family_mentions": _extract_family_mentions(text_lower),
        "skills": _extract_skills(text_lower),
        "certifications": _extract_certifications(text_lower),
        "years_of_experience": _extract_years_of_experience(text_lower)
    }
    
    return entities


def _extract_emails(text: str) -> list:
    """Extract email addresses using regex."""
    pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(pattern, text)
    return list(set(matches))  # Remove duplicates


def _extract_phones(text: str) -> list:
    """
    Extract phone numbers (10 digits).
    Ignores numbers that are part of years (e.g., 2018, 1995).
    """
    # Pattern for 10 digit phone numbers with optional separators
    pattern = r'\b(?<![\d])\d{10}(?![\d])\b'
    matches = re.findall(pattern, text)
    
    # Filter out years (1900-2100)
    phones = []
    for match in matches:
        num = int(match)
        # If it's a year-like number (starts with 19 or 20), skip it
        if not (1900 <= num <= 2100):
            phones.append(match)
    
    return list(set(phones))  # Remove duplicates


def _extract_dob(text: str) -> list:
    """
    Extract date of birth in formats:
    DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY
    """
    # DD/MM/YYYY format
    pattern1 = r'(?:0?[1-9]|[12]\d|3[01])/(?:0?[1-9]|1[012])/(?:19|20)\d{2}'
    
    # YYYY-MM-DD format
    pattern2 = r'(?:19|20)\d{2}-(?:0?[1-9]|1[012])-(?:0?[1-9]|[12]\d|3[01])'
    
    # DD-MM-YYYY format
    pattern3 = r'(?:0?[1-9]|[12]\d|3[01])-(?:0?[1-9]|1[012])-(?:19|20)\d{2}'
    
    matches = []
    matches.extend(re.findall(pattern1, text))
    matches.extend(re.findall(pattern2, text))
    matches.extend(re.findall(pattern3, text))
    
    return list(set(matches))  # Remove duplicates


def _extract_graduation_year(text: str) -> list:
    """
    Extract graduation years between 1990 and current year.
    Look for years near keywords like "graduated", "graduation", "batch"
    """
    current_year = datetime.now().year
    
    # Find years and context
    pattern = r'\b(19[89]\d|20\d{2})\b'
    matches = re.findall(pattern, text)
    
    # Filter to reasonable graduation years (1990 to current)
    years = []
    for year_str in matches:
        year = int(year_str)
        if 1990 <= year <= current_year:
            years.append(year)
    
    return sorted(list(set(years)))  # Remove duplicates and sort


def _extract_college(text: str) -> list:
    """
    Extract college/university names.
    Look for lines containing "University", "College", "Institute"
    """
    keywords = r'university|college|institute|iit|nit'
    colleges = []
    
    # Split by common delimiters and find lines with keywords
    lines = re.split(r'[,\n]', text)
    
    for line in lines:
        line_clean = line.strip()
        if re.search(keywords, line_clean, re.IGNORECASE):
            # Extract the college name (first few words before/after keyword)
            words = line_clean.split()
            if len(words) > 0:
                college_name = ' '.join(words[:5])  # Take first 5 words max
                if college_name:
                    colleges.append(college_name)
    
    return list(set(colleges))  # Remove duplicates


def _extract_company(text: str) -> list:
    """
    Extract company names.
    Look for keywords: Ltd, Pvt, Inc, Technologies, Solutions, etc.
    """
    keywords = r'ltd|pvt|inc|technologies|solutions|systems|corp|corporation|company'
    companies = []
    
    # Split by common delimiters
    lines = re.split(r'[,\n]', text)
    
    for line in lines:
        line_clean = line.strip()
        if re.search(keywords, line_clean, re.IGNORECASE):
            words = line_clean.split()
            if len(words) > 0:
                company_name = ' '.join(words[:5])
                if company_name:
                    companies.append(company_name)
    
    return list(set(companies))  # Remove duplicates


def _extract_job_title(text: str) -> list:
    """
    Extract job titles.
    Look for keywords: Engineer, Developer, Analyst, Manager, Lead, Architect
    """
    keywords = r'\b(engineer|developer|analyst|manager|lead|architect|consultant|specialist|administrator|officer|executive|director|coordinator|designer|scientist)\b'
    
    matches = re.findall(keywords, text, re.IGNORECASE)
    
    # Standardize the titles
    titles = [match.lower() for match in matches]
    
    return list(set(titles))  # Remove duplicates


def _extract_location(text: str) -> list:
    """
    Extract locations.
    Look for words after "in " or "at "
    """
    locations = []
    
    # Pattern: "in [Capital Word]" or "at [Capital Word]"
    pattern = r'(?:in|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)'
    
    matches = re.findall(pattern, text)
    
    locations = list(set(matches))  # Remove duplicates
    
    return locations


def _extract_family_mentions(text_lower: str) -> list:
    """
    Extract family-related mentions.
    Look for keywords: father, mother, brother, sister, wife, husband
    """
    family_keywords = [
        'father', 'mother', 'brother', 'sister', 'wife', 'husband',
        'son', 'daughter', 'parent', 'sibling'
    ]
    
    mentions = []
    for keyword in family_keywords:
        if keyword in text_lower:
            mentions.append(keyword)
    
    return sorted(list(set(mentions)))  # Remove duplicates and sort


def _extract_skills(text_lower: str) -> list:
    """
    Extract technical skills from predefined list.
    """
    tech_skills = [
        'python', 'java', 'c++', 'javascript', 'typescript',
        'react', 'node', 'nodejs', 'angular', 'vue',
        'sql', 'mysql', 'postgresql', 'mongodb',
        'aws', 'azure', 'gcp', 'google cloud',
        'docker', 'kubernetes', 'jenkins',
        'git', 'linux', 'windows',
        'html', 'css', 'spring', 'django', 'flask',
        'rest', 'graphql', 'microservices',
        'machine learning', 'ml', 'deep learning', 'ai'
    ]
    
    found_skills = []
    for skill in tech_skills:
        # Use word boundaries to avoid partial matches
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.append(skill.lower())
    
    return sorted(list(set(found_skills)))  # Remove duplicates and sort


def _extract_certifications(text_lower: str) -> list:
    """
    Extract certifications.
    Look for lines containing "certified" or "certification"
    """
    lines = re.split(r'[,\n]', text_lower)
    certifications = []
    
    for line in lines:
        line_clean = line.strip()
        if 'certifi' in line_clean:  # Matches "certified", "certification"
            certifications.append(line_clean)
    
    return list(set(certifications))  # Remove duplicates


def _extract_years_of_experience(text_lower: str) -> int:
    """
    Extract years of experience from text.
    Patterns:
    "X years experience"
    "X+ years"
    "experience of X years"
    """
    # Pattern 1: "X years experience" or "X years of experience"
    pattern1 = r'(\d+)\s*\+?\s*years\s+(?:of\s+)?experience'
    
    # Pattern 2: "experience of X years"
    pattern2 = r'experience\s+of\s+(\d+)\s*\+?\s*years'
    
    # Pattern 3: "X+ years" (with + sign)
    pattern3 = r'(\d+)\s*\+\s*years'
    
    matches = []
    matches.extend(re.findall(pattern1, text_lower))
    matches.extend(re.findall(pattern2, text_lower))
    
    # Extract numbers
    years_list = []
    for match in matches:
        try:
            years = int(match)
            years_list.append(years)
        except (ValueError, IndexError):
            continue
    
    # Return the maximum years found, or 0 if none found
    if years_list:
        return max(years_list)
    
    return 0
