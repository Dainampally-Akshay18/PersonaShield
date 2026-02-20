"""
API v1 router.
Version 1 endpoints.
"""

from fastapi import APIRouter
from app.api.v1.ingestion import router as ingestion_router
from app.api.v1.extraction import router as extraction_router
from app.api.v1.correlation import router as correlation_router
from app.api.v1.scoring import router as scoring_router

router = APIRouter(prefix="/v1", tags=["v1"])

# Include ingestion endpoints
router.include_router(ingestion_router)

# Include extraction endpoints
router.include_router(extraction_router)

# Include correlation endpoints
router.include_router(correlation_router)

# Include scoring endpoints
router.include_router(scoring_router)
