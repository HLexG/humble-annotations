import os
import io
#from pathlib import Path
import pandas as pd
from glob import glob
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

import spacy

router = APIRouter()

# Initialize model here
# Load pretrained model
# any other pre model step

model = spacy.load("en_core_web_sm")

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
    #model_output = model...

    # Format output mentions /clusters
    

    return {
        "response": {'test':'testing','output':input}
    }