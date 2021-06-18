#import os
#import io
#from pathlib import Path
#import pandas as pd
#from glob import glob
from fastapi import APIRouter, Path, Query
#from starlette.responses import FileResponse
#from urllib.parse import urlparse

from extractor.routers.utils import process_clusters
from extractor.routers.patterns import pattern_vrb

from extractor import processor


import spacy
from spacy.matcher import Matcher
from spacy.util import filter_spans


router = APIRouter()

# Initialize model here
# Load pretrained model
# any other pre model step

model = spacy.load("en_core_web_sm")


@router.post(
    "/find_mentions_event",
    summary="Find event mentions in given text with SpaCy",
    description="Find event mentions in given text with SpaCy"
)
async def find_mentions_event(
        input: dict
):
    """
    :param input: Dictionary with keys:
               "text": String representing the text to be processed
               "pattern": Pattern to match with SpaCy, with choices:
                   "coref": Event mentions

    :return: response
    """

    print("find_mentions_event")
    print("input", input)

    # Run text through Spacy pipeline
    doc = model(input['text'])

    # Initialize matcher
    matcher = Matcher(model.vocab)

    spans = []

    # Condition for when we have different patterns to match
    # Coref pattern
    #if input['pattern'] == 'coref':
    if True:

        matcher.add('VRB', [pattern_vrb]) # Add verb pattern
        matches = matcher(doc) # Match tokens with pattern defined above

        # Add verb phrases to spans list
        for match_id, start, end in matches:
            span = doc[start:end]  # The matched span
            spans.append(span)

        # Add triggers to spans list
        for ent in doc.ents:
            start = ent.start
            end = ent.end
            span = doc[start:end]
            spans.append(span)

        # Filter by longest span
        spans = filter_spans(spans)

        annotations = process_clusters(doc, spans)
        print(annotations)

    return {
        "response": {'annotations':annotations}
    }


# Get method for Dataset Processing
@router.get(
    "/process_dataset_event/{id}",
    summary="Process a dataset",
    description="Process a dataset"
)
async def find_event_mentions(
    id: int = Path(..., description="The dataset id"),
):
    print("process_dataset")

    await processor.process(id, model)
