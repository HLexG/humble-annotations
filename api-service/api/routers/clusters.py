import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import clusters

router = APIRouter()

@router.get(
    "/clusters",
    summary="Get list of mentions for a dataset", 
    description="Get list of mentions for a dataset", 
)
async def clusters_browse(dataset_id: int = Query(None, description="Dataset id to filter by")):
    
    return await clusters.browse(dataset_id=dataset_id)



@router.post("/clusters")
async def clusters_new(input: dict):
    dset = 1
    id_num = 1234
    return await clusters.create(dataset_id = dset, document_id=input['document_id'],cluster_name=input['cluster_name'])
