"""
Schemas for phishing email simulation.
"""

from pydantic import BaseModel


class PhishingSimulationRequest(BaseModel):
    """Schema for phishing simulation request."""
    entities: dict

    class Config:
        json_schema_extra = {
            "example": {
                "entities": {
                    "emails": ["john@amazon.com"],
                    "phones": ["9876543210"],
                    "dob": ["15/06/1995"],
                    "graduation_year": [2015],
                    "college": ["IIT Delhi"],
                    "company": ["Amazon"],
                    "job_title": ["engineer"],
                    "location": ["Bangalore"],
                    "family_mentions": [],
                    "skills": ["python", "aws"],
                    "certifications": [],
                    "years_of_experience": 8
                }
            }
        }


class PhishingSimulationResponse(BaseModel):
    """Schema for phishing simulation response."""
    email_subject: str
    email_body: str
    disclaimer: str

    class Config:
        json_schema_extra = {
            "example": {
                "email_subject": "Security Alert: Verify Your AWS Account Access",
                "email_body": "Dear Engineer,\n\nWe have detected unusual login activity on your Amazon corporate account from an unrecognized location. Please verify your access within 24 hours...",
                "disclaimer": "EDUCATIONAL SIMULATION ONLY: This is a simulated phishing email for cybersecurity awareness training. This simulation demonstrates common phishing tactics used in real attacks. Never provide credentials or sensitive information in response to unsolicited requests."
            }
        }
