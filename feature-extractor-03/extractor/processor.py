import os
import pandas as pd
from typing import Any, Dict, List

from extractor.session import database
from extractor.models.wiki import scrape_wikipedia_entities, get_wikimapper


async def process_live():

    annotations = ''

    return annotations


async def process(id):

    print(" Processing dataset : ", id)

    # Get dataset info
    query = """
        select ne.cluster_id, me.mention_text
        from named_entities ne
        join coreferences co
        on co.cluster_id=ne.cluster_id and co.annotation_id=ne.annotation_id
        join mentions me
        on me.id=co.mention_id  
        where ne.entity_category_id <= 11 
    """
    result = await database.fetch_all(query)

    named_entities = list(set([entity['mention_text'] for entity in [prep_data(row) for row in result]]))

    """
    wikidump, alias_dict = scrape_wikipedia_entities(named_entities, thread_count=50)

    mapper = get_wikimapper()

    # Create pandas from all dictionaries
    df = pd.DataFrame.from_dict(wikidump).T.dropna().drop(['imgid'], axis=1)
    df = df.reset_index(drop=True)
    df = df.drop_duplicates()
    df = df.rename(columns={'title': 'name', 'summary': 'description', 'pageid': 'wiki_id'})
    # Use WikiMapper to map urls to qids
    df['qid'] = df.url.apply(lambda x: mapper.url_to_id(x))
    df = df[['qid', 'wiki_id', 'name', 'description', 'url']]

    df = df.dropna().reset_index(drop=True)
    """
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