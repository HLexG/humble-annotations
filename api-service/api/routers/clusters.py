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
                        #dataset_id: int,
                        #ocument_id: int,
                        #sentence_id: int,
                        #start_token_id: int,
                        #end_token_id: int,
                        #cluster_id: int
                        #id: int = None
    return await clusters.create(dataset_id=input['dataset_id'],
                                    document_id=input['document_id'],
                                    cluster_name=input['cluster_name'])
