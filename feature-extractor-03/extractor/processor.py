import os
from typing import Any, Dict, List

from extractor.session import database


async def process_live():

    annotations = ''

    return annotations


async def process(id):
    print(" Processing dataset : ", id)

    print('Done!')


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result