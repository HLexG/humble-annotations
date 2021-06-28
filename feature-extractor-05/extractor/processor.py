
import os
from typing import Any, Dict, List

from extractor.session import database

import spacy_alignments


def process_clusters(tokens, output):
    """
    Function to transform clusters given by SpanBERT into our database format
    :param tokens: List[str] List of tokens
    :param output: output from SpanBERT
    :return: Dictionary of mentions
    """

    bert_tokens = output['document']

    # Align tokens from both models
    text_tokens = [tok['token_text'] for tok in tokens]

    a2b, b2a = spacy_alignments.get_alignments(bert_tokens, text_tokens)

    mentions = []
    for c_idx, cluster in enumerate(output['clusters']):
        for mention in cluster:

            try:
                mention_text = ' '.join(text_tokens[a2b[mention[0]][0]:a2b[mention[1]][0]+1])
                start_token_id = tokens[a2b[mention[0]][0]]['token_id']
                sentence_id = tokens[a2b[mention[0]][0]]['sentence_id']
                end_token_id = tokens[a2b[mention[1]][0]]['token_id']

                mentions.append({
                    "cluster_id": c_idx,
                    "start_token_id": start_token_id,
                    "end_token_id": end_token_id,
                    'mention_text': mention_text,
                    "sentence_id": sentence_id,
                })

            # Bad alignment
            except IndexError:
                pass

    annotations = {"mentions": mentions}

    return annotations


async def process(id, model):

    print("allennlp")
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

        print(len(tokens))
        if len(tokens) > 400:
            print('Document exceeds maximum token size')
        else:
            model_output = model.predict(doc['document_text'])
            annotations = process_clusters(tokens, model_output)

            # Insert annotations
            query = """
                insert into annotations(document_id, user_id, type, status)
                values (:document_id, :user_id, :type, :status)
                returning *
            """

            # Get annotation id
            values = {"document_id": doc["id"],
                      "user_id": 4,  # user_id 4 is AllenNLP
                      "type": "entity_mention",
                      "status": "commit"}

            result = await database.fetch_one(query=query, values=values)
            annotation_id = result['id']

            # Insert mentions
            query = """
                insert into mentions(annotation_id, document_id, sentence_id, start_token_id, end_token_id, mention_text)
                values (:annotation_id, :document_id, :sentence_id, :start_token_id, :end_token_id, :mention_text)
            """

            values = [{'annotation_id': annotation_id,
                       'document_id': doc['id'],
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

            num_clusters = max([mention['cluster_id'] for mention in annotations['mentions']]) + 1
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

    print('Done!')


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result