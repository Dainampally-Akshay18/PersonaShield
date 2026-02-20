"""
API v1 router.
Version 1 endpoints.
"""

from fastapi import APIRouter
from app.api.v1.ingestion import router as ingestion_router
from app.api.v1.extraction import router as extraction_router
from app.api.v1.correlation import router as correlation_router
from app.api.v1.scoring import router as scoring_router
from app.api.v1.correlation_depth import router as correlation_depth_router
from app.api.v1.timeline import router as timeline_router
from app.api.v1.visibility import router as visibility_router
from app.api.v1.attack_vectors import router as attack_vectors_router
from app.api.v1.persona import router as persona_router
from app.api.v1.phishing import router as phishing_router
from app.api.v1.explanation import router as explanation_router
from app.api.v1.simulation import router as simulation_router
from app.api.v1.heatmap import router as heatmap_router
from app.api.v1.analyze import router as analyze_router

router = APIRouter(prefix="/v1", tags=["v1"])

# Include ingestion endpoints
router.include_router(ingestion_router)

# Include extraction endpoints
router.include_router(extraction_router)

# Include correlation endpoints
router.include_router(correlation_router)

# Include scoring endpoints
router.include_router(scoring_router)

# Include correlation depth endpoints
router.include_router(correlation_depth_router)

# Include timeline endpoints
router.include_router(timeline_router)

# Include visibility endpoints
router.include_router(visibility_router)

# Include attack vectors endpoints
router.include_router(attack_vectors_router)

# Include persona endpoints
router.include_router(persona_router)

# Include phishing simulation endpoints
router.include_router(phishing_router)

# Include risk explanation endpoints
router.include_router(explanation_router)

# Include hardening simulation endpoints
router.include_router(simulation_router)

# Include heatmap visualization endpoints
router.include_router(heatmap_router)

# Include master analysis orchestrator endpoints
router.include_router(analyze_router)
