import os
import io
#from pathlib import Path
import pandas as pd
from glob import glob
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from extractor.routers.utils import download_file, process_clusters

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
    print("find_mentions")
    print("input", input)

    # Find mentions
    model_output = model.perform_coreference(input['text'])

    # Format output mentions /clusters
    annotations = process_clusters(input['text'], model_output['clusters'])
    

    return {
        "response": {'annotations':annotations}
    }