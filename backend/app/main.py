"""
PersonaShield Backend - Main Entry Point
FastAPI application with versioned routing.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import router as api_router
from app.core.config import settings

# Initialize FastAPI application
app = FastAPI(
    title="PersonaShield Backend",
    description="Backend API for PersonaShield",
    version="1.0.0"
)

# Enable CORS (allow all for now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router under /api
app.include_router(api_router)


# Health check endpoint
@app.get("/")
async def health_check():
    """Health check endpoint."""
    return {"status": "PersonaShield backend running"}


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
