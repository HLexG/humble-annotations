import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse
from api.data_models import CreateMentions

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
async def mentions_new(
    new_mentions: CreateMentions,
    document_id: int = Query(..., description="Document id to filter by"),
    # annotation_id: int = Query(..., description="Annotation id to filter by")
):
    # Clear existing mentions
    #     _ = await mentions.delete_all_for_annotation(document_id=document_id, annotation_id=annotation_id)

    # _ = await mentions.delete_all_for_annotation(document_id=document_id)

    # Create new mentions
    #     await mentions.create_multi_mentions(document_id=document_id, annotation_id=annotation_id, mentions=new_mentions.mentions)

    await mentions.create_multi_mentions(document_id=document_id, mentions=new_mentions.mentions)


@router.get(
    "/mentionsdoc/{document_id}",
    summary="Get list of mentions for a document",
    description="Get list of mentions for a document",
)
async def mentions_doc_index(document_id: int = Query(None, description="Document id to filter by")):

    return await mentions.get_document_mentions(document_id=document_id)
