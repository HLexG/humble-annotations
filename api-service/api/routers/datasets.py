import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query, Depends, File
from starlette.responses import FileResponse
from urllib.parse import urlparse

from api.auth import Auth, OptionalAuth
from api.data_models import DatasetCreate, DatasetUpdate, Pagination
from dataaccess import datasets as dataaccess_datasets
from api.errors import AccessDeniedError
from dataaccess.types import PermissionType
from fileaccess import datasets as fileaccess_datasets

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
    print(len(file),type(file))

    # Get dataset details
    dataset = await dataaccess_datasets.get(id)

    # Save the file
    fileaccess_datasets.save_extract_dataset(file, str(id))