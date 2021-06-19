
import os
from typing import Any, Dict, List

from extractor.session import database

import spacy_alignments

def process_clusters(doc, tokens):
    """
    Function to transform mentions given by SpaCy into our database format
    :param doc: Document processed by SpaCy
    :param spans: Filtered spans matched through pattern
    :return: Dictionary of mentions
    """

    spacy_tokens = [token.text for token in doc]
    text_tokens = [tok['token_text'] for tok in tokens]

    a2b, b2a = spacy_alignments.get_alignments(spacy_tokens, text_tokens)

    mentions = []
    for mention_id, mention in enumerate(doc.noun_chunks):
        ent_label = ''
        if len(mention.ents) > 0:
            if mention.ents[0].text == mention.text:
                ent_label = mention.ents[0].label_


        try:
            mention_text = ' '.join(text_tokens[a2b[mention.start][0]:a2b[mention.end-1][0]+1])
            start_token_id = tokens[a2b[mention.start][0]]['token_id']
            sentence_id = tokens[a2b[mention.start][0]]['sentence_id']
            end_token_id = tokens[a2b[mention.end-1][0]]['token_id']

            mentions.append({
                "cluster_id": mention_id,
                "start_token_id": start_token_id,
                "end_token_id": end_token_id,
                'mention_text': mention_text,
                "sentence_id": sentence_id,
                "ent_label": ent_label,
            })

        # Bad alignment
        except IndexError:
            pass

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

        # Add entities to spans list

        annotations = process_clusters(spacy_doc, tokens)

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
            insert into mentions(annotation_id, document_id, sentence_id, start_token_id, end_token_id, mention_text)
            values (:annotation_id, :document_id, :sentence_id, :start_token_id, :end_token_id, :mention_text)
        """

        values = [{'annotation_id': annotation_id,
                     'document_id': doc["id"],
                     'sentence_id': mention['sentence_id'],
                  'start_token_id': mention['start_token_id'],
                    'end_token_id': mention['end_token_id'],
                   'mention_text': mention['mention_text']} for mention in annotations['mentions']]

        await database.execute_many(query=query, values=values)

        # Insert clusters
        query = """
            insert into clusters(annotation_id, cluster_name)
            values (:annotation_id, :cluster_name)
        """

        num_clusters = max([mention['cluster_id'] for mention in annotations['mentions']])+1
        values = [{'annotation_id': annotation_id,
                   'cluster_name': str(n_cluster)} for n_cluster in range(num_clusters)]

        await database.execute_many(query=query, values=values)

        # Get cluster ids
        query = """
                select id from clusters
                where annotation_id = :annotation_id 
            """

        values = {
            "annotation_id": annotation_id
        }

        result = await database.fetch_all(query, values)
        cluster_ids = [cl['id'] for cl in [prep_data(row) for row in result]]
        cluster_ids_dict = {i: cl for i, cl in enumerate(cluster_ids)}

        # Get mention ids
        query = """
                select id from mentions
                where annotation_id = :annotation_id 
            """

        result = await database.fetch_all(query, values)
        mention_ids = [me['id'] for me in [prep_data(row) for row in result]]
        mention_ids_dict = {i: me for i, me in enumerate(mention_ids)}

        values = [{'annotation_id': annotation_id,
                   'cluster_id': cluster_ids_dict[annot['cluster_id']],
                   'mention_id': mention_ids_dict[i]} for i, annot in enumerate(annotations['mentions'])]

        # Insert coreferences
        query = """
                insert into coreferences(annotation_id, cluster_id, mention_id)
                values (:annotation_id, :cluster_id, :mention_id)
            """

        await database.execute_many(query=query, values=values)

        # Get NER categories
        query = """
                    select id, category_code
                    from entity_categories
                """

        result = await database.fetch_all(query)
        categories = [prep_data(row) for row in result]
        categories_dict = {cat['category_code']: cat['id'] for cat in categories}

        values = [{'annotation_id': annotation_id,
                   'cluster_id': mention['cluster_id']+1,
                   'entity_category_id': categories_dict[mention['ent_label']],
                   } for mention in annotations['mentions'] if mention['ent_label'] != '']

        query = """
            insert into named_entities(annotation_id, cluster_id, entity_category_id)
            values (:annotation_id, :cluster_id, :entity_category_id)
        """

        await database.execute_many(query=query, values=values)

    print('Done!')




def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result