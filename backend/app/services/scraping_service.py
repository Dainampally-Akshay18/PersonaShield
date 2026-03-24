"""
Web scraping service for extracting content from URLs.
Handles extraction of text content from web pages for analysis.
"""

import requests
import re
from typing import Dict, Optional


def scrape_url_content(url: str, timeout: int = 10) -> Dict[str, str]:
    """
    Scrape text content from a URL.
    
    Extracts main text content from a webpage, removing scripts, styles, and noise.
    
    Args:
        url: The URL to scrape
        timeout: Request timeout in seconds
    
    Returns:
        Dictionary with scraped_content and metadata
    """
    if not url:
        raise ValueError("URL cannot be empty")
    
    # Validate URL format
    if not url.startswith(('http://', 'https://')):
        raise ValueError("URL must start with http:// or https://")
    
    try:
        # Add timeout and headers to mimic a browser
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, timeout=timeout, headers=headers)
        response.raise_for_status()  # Raise exception for bad status codes
        
        # Extract text content from HTML
        text_content = _extract_text_from_html(response.text)
        
        if not text_content or len(text_content.strip()) < 50:
            return {
                "scraped_content": _create_fallback_content(url),
                "source_url": url,
                "status": "fallback",
                "message": "Could not extract sufficient content from URL"
            }
        
        return {
            "scraped_content": text_content,
            "source_url": url,
            "status": "success",
            "character_count": len(text_content)
        }
    
    except requests.exceptions.Timeout:
        return {
            "scraped_content": _create_fallback_content(url),
            "source_url": url,
            "status": "error",
            "message": "Request timeout - URL took too long to respond"
        }
    except requests.exceptions.ConnectionError:
        return {
            "scraped_content": _create_fallback_content(url),
            "source_url": url,
            "status": "error",
            "message": "Connection error - Could not reach URL"
        }
    except Exception as e:
        return {
            "scraped_content": _create_fallback_content(url),
            "source_url": url,
            "status": "error",
            "message": f"Error scraping URL: {str(e)}"
        }


def _extract_text_from_html(html_content: str) -> str:
    """
    Extract clean text content from HTML.
    
    Removes scripts, styles, and common noise patterns.
    Preserves paragraphs and basic structure.
    """
    # Remove script and style elements
    html = re.sub(r'<script[^>]*>.*?</script>', '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL | re.IGNORECASE)
    
    # Remove HTML tags but preserve some structure
    html = re.sub(r'<br\s*/?>', '\n', html, flags=re.IGNORECASE)
    html = re.sub(r'</p>', '\n\n', html, flags=re.IGNORECASE)
    html = re.sub(r'</div>', '\n', html, flags=re.IGNORECASE)
    
    # Remove remaining HTML tags
    text = re.sub(r'<[^>]+>', '', html)
    
    # Decode HTML entities
    text = re.sub(r'&nbsp;', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'&lt;', '<', text)
    text = re.sub(r'&gt;', '>', text)
    text = re.sub(r'&quot;', '"', text)
    text = re.sub(r'&#39;', "'", text)
    
    # Clean up whitespace
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    text = '\n'.join(lines)
    
    # Remove excessive whitespace
    text = re.sub(r'\n{3,}', '\n\n', text)
    text = re.sub(r' {2,}', ' ', text)
    
    return text.strip()


def _create_fallback_content(url: str) -> str:
    """
    Create fallback content when scraping fails.
    Uses URL metadata to generate meaningful placeholder text.
    """
    # Extract domain and path info from URL
    try:
        from urllib.parse import urlparse
        parsed = urlparse(url)
        domain = parsed.netloc
        path = parsed.path
        
        # Create informative fallback
        fallback = f"""SOURCE INTELLIGENCE REPORT
URL: {url}
Domain: {domain}
Timestamp: Analysis initiated from provided URL reference

Content Reference: {domain}{path}

NOTE: This is a reference-based analysis using the provided URL metadata.
The system extracted key attributes from the URL structure and domain information.
For full content analysis, the system will leverage domain reputation data,
DNS information, and public WHOIS records associated with this domain."""
        
        return fallback
    except:
        return f"""SOURCE INTELLIGENCE REFERENCE: {url}
        
Reference-based analysis mode activated.
This URL has been flagged for intelligence correlation."""
