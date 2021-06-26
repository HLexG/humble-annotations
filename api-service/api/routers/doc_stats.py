import os
from fastapi import APIRouter, Path, Query, Depends
from starlette.responses import FileResponse

from api.auth import Auth, OptionalAuth
from dataaccess import doc_stats

router = APIRouter()


@router.get(
    "/stats_mentions",
    tags=["Stats - Mentions"],
    summary="Get stats on mentions",
    description="Get stats on mentions"
)
async def mentions_stats_index(auth: OptionalAuth = Depends()):
    return await doc_stats.browse()
