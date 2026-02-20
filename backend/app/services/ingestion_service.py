"""
Ingestion service for text normalization and PDF processing.
Stateless, in-memory processing only.
"""

import re
from io import BytesIO
from pypdf import PdfReader


def normalize_text(text: str) -> str:
    """
    Normalize text by:
    - Removing null characters
    - Stripping leading/trailing whitespace
    - Collapsing multiple spaces into single space
    
    Args:
        text: Raw text to normalize
    
    Returns:
        Normalized text
    
    Raises:
        ValueError: If text is empty after normalization
    """
    if not text:
        raise ValueError("Text cannot be empty")
    
    # Remove null characters
    text = text.replace('\x00', '')
    
    # Strip leading/trailing whitespace
    text = text.strip()
    
    # Collapse multiple spaces and whitespace into single space
    text = re.sub(r'\s+', ' ', text)
    
    if not text:
        raise ValueError("Text cannot be empty after normalization")
    
    return text


def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extract text from PDF and normalize it.
    
    Args:
        file_content: PDF file bytes
    
    Returns:
        Normalized text extracted from PDF
    
    Raises:
        ValueError: If PDF is invalid or cannot be read
    """
    if not file_content:
        raise ValueError("File content cannot be empty")
    
    try:
        pdf_file = BytesIO(file_content)
        reader = PdfReader(pdf_file)
        
        # Handle empty PDF - return empty string instead of crashing
        if len(reader.pages) == 0:
            return ""
        
        # Extract text from all pages
        extracted_text = ""
        for page in reader.pages:
            try:
                text = page.extract_text()
                if text:
                    extracted_text += text + " "
            except Exception:
                # Skip pages that fail to extract
                continue
        
        # Normalize the extracted text
        if extracted_text.strip():
            normalized_text = normalize_text(extracted_text)
        else:
            normalized_text = ""
        
        return normalized_text
    
    except Exception as e:
        raise ValueError(f"Failed to process PDF: {str(e)}")
