import os
from fastapi import APIRouter, Path, Query, Depends
from starlette.responses import FileResponse

from api.auth import Auth, OptionalAuth
from dataaccess.types import AnnotationType
from dataaccess import annotations
from dataaccess.errors import RecordNotFoundError

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
                                     description="Annotation type"),
        auth: Auth = Depends()
):
    # Get the annotation details
    annotation = await annotations.get(id=id)

    try:
        user_annotation = await annotations.get_user_annotation(document_id=annotation["document_id"], user_id=auth.user_id)
    except RecordNotFoundError:
        # Create a new annotation
        user_annotation = await annotations.create(document_id=annotation["document_id"], user_id=auth.user_id)

    # Copy over annotation to the current user
    _ = await annotations.copy(from_id=id, to_id=user_annotation["id"], annotation_type=annotation_type)

    return user_annotation
