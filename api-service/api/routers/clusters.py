import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import clusters

router = APIRouter()

@router.post("/clusters")
async def clusters_new(input: dict):
    dset = 1
    return await clusters.create(dataset_id = dset, document_id=input['document_id'],cluster_name=input['cluster_name'])
