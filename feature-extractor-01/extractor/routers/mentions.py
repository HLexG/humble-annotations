#import os
#import io
#from pathlib import Path
#import pandas as pd
#from glob import glob
from fastapi import APIRouter, Path, Query
#from starlette.responses import FileResponse
#from urllib.parse import urlparse

from extractor import processor
from extractor.routers.utils import download_file

import sys
sys.path.append("extractor/models/spanbert")

from inference.inference import Inference

router = APIRouter()

# Download SpanBERT model for longer texts
download_file("https://storage.googleapis.com/hlexg/models/spanbert_model.pth", base_path="extractor/models/spanbert")
# Initialize SpanBERT model (this step will download SpanBERT from Huggingface)
model = Inference("extractor/models/spanbert/spanbert_model.pth")


@router.post(
    "/find_mentions",
    summary="Find mentions in given text",
    description="Find mentions in given text"
)
async def find_mentions(
        input: dict
):

    annotations = processor.process_live(input['doc'], input['tokens'], model)

    return annotations


@router.get(
    "/process_dataset/{id}",
    summary="Process a dataset",
    description="Process a dataset"
)
async def find_mentions(
    id: int = Path(..., description="The dataset id"),
):
    print("process_dataset")

    await processor.process(id, model)