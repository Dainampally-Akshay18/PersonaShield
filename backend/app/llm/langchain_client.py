"""
LangChain client for text generation.
Provides resilient interface to ChatGroq with fallback handling.
"""

from langchain_groq import ChatGroq
from langchain_core.messages import HumanMessage
import os


def get_llm_client():
    """
    Initialize and return ChatGroq LLM client.
    
    Returns:
        ChatGroq client instance
    
    Raises:
        ValueError: If CHATGROQ_API_KEY not found in environment
    """
    api_key = os.getenv("CHATGROQ_API_KEY")
    
    if not api_key:
        raise ValueError("CHATGROQ_API_KEY environment variable not set")
    
    return ChatGroq(
        api_key=api_key,
        model="llama-3.1-8b-instant",
        temperature=0.3,
        max_tokens=400
    )


def generate_text(prompt: str) -> str:
    """
    Generate text from a prompt using LangChain ChatGroq.
    
    Includes robust error handling - returns empty string on any failure
    to prevent API crashes.
    
    Args:
        prompt: The prompt to generate text from
    
    Returns:
        Generated text string (empty string if generation fails)
    """
    try:
        if not prompt or not isinstance(prompt, str):
            return ""
        
        # Get LLM client
        try:
            llm = get_llm_client()
        except ValueError:
            # API key not configured
            return ""
        
        # Generate text
        message = HumanMessage(content=prompt)
        response = llm.invoke([message])
        
        # Extract and return content
        if response and hasattr(response, 'content'):
            generated_text = response.content.strip()
            if generated_text:
                return generated_text
        
        return ""
    
    except Exception as e:
        # Log silently and return empty string
        # In production, this could be logged to monitoring system
        return ""
