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

from allennlp.predictors.predictor import Predictor

model = Predictor.from_path("https://storage.googleapis.com/allennlp-public-models/coref-spanbert-large-2021.03.10.tar.gz")

import sys


router = APIRouter()

@router.post(
    "/find_mentions",
    summary="Find mentions in given text",
    description="Find mentions in given text"
)
async def find_mentions(
        input: dict
):

    annotations = ""

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