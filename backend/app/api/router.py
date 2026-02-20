"""
Main API router.
Includes versioned routers under /api.
"""

from fastapi import APIRouter
from app.api.v1 import router as v1_router

router = APIRouter(prefix="/api")

# Include v1 router
router.include_router(v1_router)
