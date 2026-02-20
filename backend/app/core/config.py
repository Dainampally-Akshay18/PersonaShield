"""
Configuration module for PersonaShield backend.
Loads environment variables from .env file.
"""

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""
    
    CHATGROQ_API_KEY: str = os.getenv("CHATGROQ_API_KEY", "")
    
    def __init__(self):
        """Initialize settings from environment variables."""
        pass


# Create settings instance
settings = Settings()
