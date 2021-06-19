from fastapi import APIRouter

from dataaccess.types import AnnotationType

router = APIRouter()


@router.get(
    "/enums",
    tags=["Enums"],
    summary="Get all enums",
    description="Get all enums"
)
async def get_enums():

    annotation_types = {
        AnnotationType.entity_mention: "Entity Mentions",
        AnnotationType.entity_coreference: "Entity Coreferences",
        AnnotationType.named_entity_recognition: "Named Entity Recognition",
        AnnotationType.entity_linking: "Entity Linking",
        AnnotationType.event_mention: "Event Mention",
        AnnotationType.event_coreference: "Event Coreference"
    }

    return {
        "annotation_types": annotation_types
    }
