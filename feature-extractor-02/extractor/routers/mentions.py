import os
import io
#from pathlib import Path
import pandas as pd
from glob import glob
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

import spacy
from spacy.matcher import Matcher
from spacy.util import filter_spans

router = APIRouter()

# Initialize model here
# Load pretrained model
# any other pre model step

model = spacy.load("en_core_web_sm")

# Spacy patterns

# Noun phrase pattern from recipes/coref.py in Prodigy
pattern_np = [
            {"POS": "DET", "TAG": {"NOT_IN": ["PRP$"]}, "OP": "?"},
            {"POS": "ADJ", "OP": "*"},
            # Proper nouns but no entities, otherwise this custom pattern
            # would overwrite them
            {
                "POS": {"IN": ["PROPN", "NOUN"]},
                "OP": "+",
                "ENT_TYPE": {"NOT_IN": ["PERSON", "ORG"]},
            },
        ]

# Pronouns
pattern_prn = [{'POS':'PRON'}]

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

    doc = model(input['text'])
    # Initialize matcher
    matcher = Matcher(model.vocab)

    spans = []
    # Condition for when we have different patterns to match
    if input['pattern'] == 'coref':

        matcher.add("NP", [pattern_np]) # Add noun phrases pattern
        matcher.add('PRN', [pattern_prn]) # Add pronoun pattern

        matches = matcher(doc)

        # Add noun phrases to spans list
        for match_id, start, end in matches:
            span = doc[start:end]  # The matched span
            spans.append(span)

        # Add entities to spans list
        for ent in doc.ents:
            start = ent.start
            end = ent.end
            span = doc[start:end]
            spans.append(span)

        # Filter by longest span
        spans = [(sp.text, sp.start, sp.end) for sp in filter_spans(spans)]


    return {
        "response": {'test':'testing','output':spans}
    }