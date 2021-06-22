import os
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse

from dataaccess.types import AnnotationType
from dataaccess import annotations

router = APIRouter()


@router.get(
    "/document/{document_id}/annotations",
    tags=["Annotations"],
    summary="Get list of annotations for a document",
    description="Get list of annotations for a document"
)
async def annotations_index(
    document_id: int = Path(..., description="Document id to filter by"),
    annotation_type: str = Query(
        AnnotationType.entity_mention, description="Annotation type filter"),
):

    return await annotations.browse_annotations(document_id=document_id, annotation_type=annotation_type)
