
import os
from typing import Any, Dict, List

from extractor.session import database

from extractor.routers.patterns import pattern_np, pattern_prn, spacy_entities

import spacy
from spacy.matcher import Matcher
from spacy.util import filter_spans


def process_clusters(doc, spans):
    """
    Function to transform mentions given by SpaCy into our database format
    :param doc: Document processed by SpaCy
    :param spans: Filtered spans matched through pattern
    :return: Dictionary of mentions
    """
    mentions = []
    # Process Spacy candiate mentions into dictionaries with our database format
    for mention_id, mention in enumerate(spans):
        for n_sent, sent in enumerate(doc.sents):
            if mention.sent.start == sent.start:
                curr_sent = n_sent
                continue

        mentions.append({
            "cluster_id": mention_id,
            "start_token_id": mention.start,
            "end_token_id": mention.end - 1,
            "sentence_id": curr_sent,
        })
    # Return dictionary
    annotations = {
        "mentions": mentions
    }

    return annotations


async def process_live(doc, tokens, model):

    # Find mentions
    model_output = model.perform_coreference(doc['document_text'])

    # Format output mentions /clusters
    annotations = process_clusters(tokens, model_output)

    return annotations


async def process(id, model):
    print(" Processing dataset : ", id)

    # Get dataset info
    query = """
        select id,dataset_name ,dataset_description
        from datasets where id = :id
    """
    values = {
        "id": id
    }
    result = await database.fetch_one(query, values)
    dataset = prep_data(result)
    print("Dataset:",dataset)

    # Get all documents
    query = """
        select id,dataset_id,document_name,filepath ,document_text
        from documents
        where dataset_id = :dataset_id
    """

    values = {
        "dataset_id": id
    }

    result = await database.fetch_all(query, values)
    documents = [prep_data(row) for row in result]

    # Get Tokens
    for doc in documents:

        print("Processing document: ", doc['document_name'])

        query = """
            select id,document_id,sentence_id,token_id,token_text,token_pos_tag 
            from tokens
            where document_id = :document_id
        """

        values = {
            "document_id": doc["id"]
        }

        result = await database.fetch_all(query, values)
        tokens = [prep_data(row) for row in result]

        spacy_doc = model(doc['document_text'])

        # Initialize matcher
        matcher = Matcher(model.vocab)

        spans = []

        matcher.add("NP", [pattern_np])  # Add noun phrases pattern
        matcher.add('PRN', [pattern_prn])  # Add pronoun pattern
        matches = matcher(spacy_doc)  # Match tokens with pattern defined above

        # Add noun phrases to spans list
        for match_id, start, end in matches:
            span = spacy_doc[start:end]  # The matched span
            spans.append(span)

        # Add entities to spans list
        for ent in spacy_doc.ents:
            print(ent.label_)
            start = ent.start
            end = ent.end
            span = spacy_doc[start:end]
            spans.append(span)

        # Filter by longest span
        spans = filter_spans(spans)

        annotations = process_clusters(spacy_doc, spans)

        # Insert annotations
        query = """
            insert into annotations(document_id, user_id, type, status)
            values (:document_id, :user_id, :type, :status)
            returning *
        """

        # Get annotation id
        values = {"document_id": doc["id"],
                  "user_id": 1, # user_id 1 is Spacy
                  "type": "entity_mention",
                  "status":"commit"}

        result = await database.fetch_one(query=query, values=values)
        annotation_id = result['id']

        # Insert mentions
        query = """
            insert into mentions(annotation_id, sentence_id, start_token_id, end_token_id)
            values (:annotation_id, :sentence_id, :start_token_id, :end_token_id)
        """

        values = [{'annotation_id': annotation_id,
                   'sentence_id': mention['sentence_id'],
                   'start_token_id': mention['start_token_id'],
                   'end_token_id': mention['end_token_id']} for mention in annotations['mentions']]

        await database.execute_many(query=query, values=values)


    print('Done!')


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result