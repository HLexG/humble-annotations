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