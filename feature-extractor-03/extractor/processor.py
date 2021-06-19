import os
import pandas as pd
from typing import Any, Dict, List

from extractor.session import database


async def process_live():

    annotations = ''

    return annotations


async def process(id):

    print(" Processing dataset : ", id)

    df = pd.read_csv('entities.csv')

    entity_links =[]
    for record in df.to_dict('records'):

        entity_links.append({
            "id": record['qid'],
            "alt_id": str(record['wiki_id']),
            "dataset_id": id,
            'entity_name': record['name'],
            "description": record['description'],
            "url": record['url'],
        })

    # Insert mentions
    query = """
        insert into wikidata(id, alt_id, dataset_id, entity_name, description, url)
        values (:id, :alt_id, :dataset_id, :entity_name, :description, :url)
    """
    await database.execute_many(query=query, values=entity_links)

    print('Done!')


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result