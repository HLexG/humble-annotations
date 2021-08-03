from api.feature_extraction import trigger
from fileaccess import datasets as fileaccess_datasets
from dataaccess.types import PermissionType
from api.errors import AccessDeniedError
from dataaccess import tokens as dataaccess_tokens
from dataaccess import documents as dataaccess_documents
from dataaccess import datasets as dataaccess_datasets
from api.data_models import DatasetCreate, DatasetUpdate, Pagination
from api.auth import Auth, OptionalAuth
from nltk.tokenize import word_tokenize
from nltk.tokenize import sent_tokenize
from nltk import pos_tag
import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query, Depends, File
from starlette.responses import FileResponse
from urllib.parse import urlparse

import nltk

nltk.download('averaged_perceptron_tagger')


router = APIRouter()


@router.get(
    "/datasets",
    tags=["Datasets"],
    summary="Get list of datasets",
    description="Get list of datasets"
)
async def datasets_index(
        q: str = Query(None, description="An optional search query"),
        pagination: Pagination = Depends(),
        auth: OptionalAuth = Depends()
):
    return await dataaccess_datasets.browse(
        q=q,
        page_number=pagination.page_number,
        page_size=pagination.page_size
    )


@router.post(
    "/datasets",
    tags=["Datasets"],
    summary="Create a new dataset",
    description="Create a new dataset using the provided metadata.",
    response_description="The created dataset"
)
async def datasets_create(
        dataset: DatasetCreate,
        auth: Auth = Depends()
):
    # Create dataset
    dataset_db = await dataaccess_datasets.create(
        dataset_name=dataset.dataset_name,
        dataset_description=dataset.dataset_description
    )

    # Assign the user to the dataset
    project_user_db = await dataaccess_datasets.create_dataset_user(
        dataset_id=dataset_db["id"],
        user_id=auth.user_id,
        permission_type=PermissionType.owner)

    return dataset_db


@router.put(
    "/datasets/{id}",
    tags=["Datasets"],
    summary="Update dataset information",
    description="Update dataset information",
    response_description="The dataset information"
)
async def datasets_update(
        dataset: DatasetUpdate,
        id: int = Path(..., description="The dataset id"),
        auth: Auth = Depends()
):
    # Update
    dataset_db = await dataaccess_datasets.update(
        id=id,
        dataset_name=dataset.dataset_name,
        dataset_description=dataset.dataset_description
    )

    return dataset_db


@router.get(
    "/datasets/{id}",
    tags=["Datasets"],
    summary="Get information about a dataset",
    description="Get all information about a specific dataset.",
    response_description="The dataset"
)
async def datasets_fetch(
        id: int = Path(..., description="The dataset id")
):
    result = await dataaccess_datasets.get(id)

    return result


@router.post(
    "/datasets/{id}/upload",
    tags=["Datasets"],
    summary="Upload a zip file of documents",
    description="Upload a zip file of documents"
)
async def datasets_upload_with_id(
        file: bytes = File(...),
        id: int = Path(..., description="The dataset id"),
        auth: Auth = Depends()
):
    print(len(file), type(file))

    # Get dataset details
    dataset = await dataaccess_datasets.get(id)

    # Save/Extract the file
    document_list = fileaccess_datasets.save_extract_dataset(file, str(id))

    for document_path in document_list:
        print("Saving document:", document_path)

        # Read the document
        with open(document_path) as f:
            document = f.read()

            # Save Document into DB
            document_db = await dataaccess_documents.create(
                dataset_id=id,
                document_name=os.path.basename(document_path),
                filepath=document_path,
                document_text=document
            )

            # Generate sentences
            sentences = sent_tokenize(document)

            # Tokenize document content
            tokens = []
            for s_idx, s in enumerate(sentences):
                words = word_tokenize(s)
                pos_tags = pos_tag(words)

                for w_idx, w in enumerate(words):
                    # Save tokens
                    token_db = await dataaccess_tokens.create(
                        document_id=document_db["id"],
                        sentence_id=s_idx,
                        token_id=w_idx,
                        token_text=w,
                        token_pos_tag=pos_tags[w_idx][1]
                    )

    # Preprocessing Trigger for FE2

    trigger.preprocesses_entities(id)


@router.get(
    "/call_feature_extractor/{id}",
    tags=["Datasets"],
    summary="Call feature extractor",
    description="Call feature extractor"
)
async def call_feature_extractor(
    id: int = Path(..., description="The dataset id"),
    feat_extractor: str = Query(
        None, description="Feature extractor env variable"),
):
    trigger.preprocess(id, feat_extractor)

    return {"done"}


@router.delete(
    "/datasets/{id}",
    tags=["Datasets"],
    summary="Delete a dataset",
    description="Delete a dataset"
)
async def datasets_delete(
    id: int = Path(..., description="The dataset id"),
    auth: Auth = Depends()
):
    await dataaccess_datasets.delete(
        id=id
    )
