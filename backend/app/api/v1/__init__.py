"""
API v1 router.
Version 1 endpoints.
"""

from fastapi import APIRouter
from app.api.v1.ingestion import router as ingestion_router
from app.api.v1.extraction import router as extraction_router

router = APIRouter(prefix="/v1", tags=["v1"])

# Include ingestion endpoints
router.include_router(ingestion_router)

# Include extraction endpoints
router.include_router(extraction_router)
