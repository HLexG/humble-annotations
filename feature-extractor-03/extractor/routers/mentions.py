#import os
#import io
#from pathlib import Path
#import pandas as pd
#from glob import glob
from fastapi import APIRouter, Path, Query
#from starlette.responses import FileResponse
#from urllib.parse import urlparse

from extractor import processor

router = APIRouter()


@router.post(
    "/find_mentions",
    summary="Find mentions in given text with SpaCy",
    description="Find mentions in given text with SpaCy"
)
async def find_mentions(
        input: dict
):
    """
    :param input: Dictionary with keys:
               "text": String representing the text to be processed
               "pattern": Pattern to match with SpaCy, with choices:
                   "coref": Entity mentions

    :return: response
    """

    print("find_mentions")
    print("input", input)

    annotations = ''

    return {
        "response": {'annotations':annotations}
    }

@router.get(
    "/process_dataset/{id}",
    summary="Process a dataset",
    description="Process a dataset"
)
async def find_mentions(
    id: int = Path(..., description="The dataset id"),
):
    print("process_dataset")

    await processor.process(id)