import os
import io
import pandas as pd
from glob import glob
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import documents

router = APIRouter()

@router.get(
    "/documents",
    summary="Get list of documents for a dataset",
    description="Get list of documents for a dataset"
)
async def documents_index(dataset_id: int = Query(None, description="Dataset id to filter by")):
    
    return await documents.browse(dataset_id=dataset_id)

@router.get(
    "/documents/{id}",
    tags=["Documents"],
    summary="Get information about a document",
    description="Get all information about a specific document.",
    response_description="The document details"
)
async def documents_fetch(
        id: int = Path(..., description="The document id")
):
    result = await documents.get(id)

    return result