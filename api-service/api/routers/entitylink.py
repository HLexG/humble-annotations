import os
import io
import pandas as pd
from glob import glob
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import entitylink

router = APIRouter()


@router.get(
    "/entitylinks",
    summary="Get list of entity links for a dataset",
    description="Get list of entity links for a dataset"
)
async def documents_index(dataset_id: int = Query(None, description="Dataset id to filter by"),
                          text_query: str = Query(None, description="Specific text query")):
    return await entitylink.browse(dataset_id=dataset_id, text_query=text_query)


@router.get(
    "/entitylinks_wd/{id}",
    summary="Get list of entity links for a dataset",
    description="Get list of entity links for a dataset"
)
async def documents_index(id: str = Query(None, description="Dataset id to filter by")):
    return await entitylink.get_wd(id=id)