import os
import io
#from pathlib import Path
import pandas as pd
from glob import glob
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

from extractor.routers.utils import download_file

import sys
sys.path.append("extractor/models/spanbert")

from inference.inference import Inference

router = APIRouter()

# Initialize model here
# Load pretrained model
# any other pre model step

download_file("https://storage.googleapis.com/hlexg/models/spanbert_model.pth", base_path="extractor/models/spanbert")

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
    output = model_output["clusters"][0][0][1]

    # Format output mentions /clusters
    

    return {
        "response": {'test':'testing','output':output}
    }