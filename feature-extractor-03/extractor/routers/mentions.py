#import os
#import io
#from pathlib import Path
#import pandas as pd
#from glob import glob
from fastapi import APIRouter, Path, Query
#from starlette.responses import FileResponse
#from urllib.parse import urlparse

from extractor.routers.utils import download_file, process_clusters

import sys
sys.path.append("extractor/models/wikiPull")

from inference.inference import Inference

router = APIRouter()

# Download !!!!!!!!!!!!!!!
download_file("https://storage.googleapis.com/hlexg/models/spanbert_model.pth", base_path="extractor/models/spanbert")
# Initialize SpanBERT model (this step will download SpanBERT from Huggingface)
model = Inference("extractor/models/spanbert/spanbert_model.pth")

@router.post(
    "/find_entity_links",
    summary="Find entity links in given text",
    description="Find entity links in given text"
)
async def find_entity_links(
        input: dict
):
    print("find_entity_links")
    print("input", input)

    # Find entity links
    model_output = model.perform_coreference(input['text'])

    # Format output mentions /clusters
    annotations = process_clusters(input['text'], model_output)
    

    return annotations