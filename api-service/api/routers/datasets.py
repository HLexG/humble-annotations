import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import datasets

router = APIRouter()

@router.get(
    "/datasets",
    summary="Get list of datasets",
    description="Get list of datasets"
)
async def datasets_index():
    
    return await datasets.browse()

@router.get(
    "/datasets/{id}",
    tags=["Datasets"],
    summary="Get information about a dataset",
    description="Get all information about a specific dataset.",
    response_description="The dataset"
)
async def datasets_detail(
        id: int = Path(..., description="The dataset id")
):
    result = await datasets.get(id)

    return result