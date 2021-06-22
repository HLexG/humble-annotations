import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import events

router = APIRouter()

@router.get(
    "/ev_cl_mentions/{cluster_id}",
    summary="Get list of mentions for a cluster", 
    description="Get list of mentions for a cluster", 
)
async def cdcr_event_help(cluster_id: int = Query(None, description="cluster_id to filter by")):
    
    return await events.get_event_help(cluster_id=cluster_id)


