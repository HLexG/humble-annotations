import os
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse

from api.auth import Auth, OptionalAuth
from dataaccess.types import AnnotationType
from dataaccess import annotations

router = APIRouter()


@router.get(
    "/annotations",
    tags=["Annotations"],
    summary="Get list of annotations for a document",
    description="Get list of annotations for a document"
)
async def annotations_index(
    document_id: int = Query(..., description="Document id to filter by"),
    annotation_type: str = Query(
        AnnotationType.entity_mention, description="Annotation type filter"),
):
    return await annotations.browse_user_annotations(document_id=document_id, annotation_type=annotation_type)


@router.post(
    "/annotations/{id}/copy",
    tags=["Annotations"],
    summary="Copy annotations",
    description="Copy annotations",
    response_description="Status message"
)
async def annotations_copy(
        id: int = Path(..., description="Annotation id to copy from "),
        annotation_type: str = Query(...,
                                     description="Annotation type filter"),
        auth: Auth = Depends()
):
    # Check if annotation exists for user for the document

    # Create a new annotation if needed

    # Copy over annotation based on annotation type

    return {
        "created": True
    }
