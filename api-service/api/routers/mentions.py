import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from dataaccess import mentions

router = APIRouter()


@router.get(
    "/mentions",
    summary="Get list of mentions for a document",
    description="Get list of mentions for a dataset",
)
async def mentions_index(
    document_id: int = Query(..., description="Document id to filter by"),
    annotation_id: int = Query(..., description="Annotation id to filter by")
):

    return await mentions.browse(document_id=document_id, annotation_id=annotation_id)


@router.post("/mentions")
async def mentions_new(input: dict):
    # dataset_id: int,
    # document_id: int,
    # sentence_id: int,
    # start_token_id: int,
    # end_token_id: int,
    #cluster_id: int
    #id: int = None
    return await mentions.create(dataset_id=input['dataset_id'],
                                 document_id=input['document_id'],
                                 sentence_id=input['sentence_id'],
                                 start_token_id=input['start_token_id'],
                                 end_token_id=input['end_token_id'],
                                 cluster_id=input['cluster_id'],
                                 pos=input['pos'])


@router.get(
    "/mentionsdoc/{document_id}",
    summary="Get list of mentions for a document",
    description="Get list of mentions for a document",
)
async def mentions_doc_index(document_id: int = Query(None, description="Document id to filter by")):

    return await mentions.get_document_mentions(document_id=document_id)
