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


@router.get(
    "/entitylinks_nl/{dataset_id}",
    summary="Get list of entity links for a dataset",
    description="Get list of entity links for a dataset"
)
async def documents_index(dataset_id: int = Query(None, description="Dataset id to filter by")):
    return await entitylink.tbnamed(dataset_id=dataset_id)



@router.get(
    "/entitylinks_open/{mentions}",
    summary="Get list of entity links for a dataset",
    description="Get list of entity links for a dataset"
)
async def documents_index(mentions: str = Query(None, description="Dataset id to filter by")):
    return await entitylink.open_text_qry(mentions=mentions)


@router.post(
    "/entitylinks_add/{cluster_id}/{pageid}/{currentDoc}",
    summary="add entity links pairing to a cluster",
    description="add entity links pairing to a cluster"
)
async def documents_index(cluster_id,
                          pageid,
                          currentDoc):
    return await entitylink.link_insert(cluster_id=cluster_id,pageid=pageid, currentDoc=currentDoc )

