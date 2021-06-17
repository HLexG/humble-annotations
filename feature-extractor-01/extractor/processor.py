
import os
from typing import Any, Dict, List

from extractor.session import database

from transformers import BertTokenizer
import spacy_alignments


def process_clusters(tokens, output):
    """
    Function to transform clusters given by SpanBERT into our database format
    :param tokens: List[str] List of tokens
    :param output: output from SpanBERT
    :return: Dictionary of mentions
    """

    # Load BERT tokenizer
    bert_tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
    # Convert BERT tokens to tokens matching cluster output
    # SpanBERT "sentences" are chunks of 382 tokens
    bert_tokens = []
    for sent in output['tokenized_doc']['sentences']:
      bert_tokens += bert_tokenizer.convert_tokens_to_string(sent).split(' ')

    # Align tokens from both models
    text_tokens = [tok['token_text'] for tok in tokens]
    a2b, b2a = spacy_alignments.get_alignments(bert_tokens, text_tokens)

    # Map text tokens to tokens by sentence
    tokenmap = {}
    for idx, token in enumerate(tokens):
        tokenmap[idx] = {'token_id': token['token_id'], 'sentence_id': token['sentence_id']}

    # Process SpanBERT clusters into dictionaries with our database format
    mentions = []
    for c_idx, cluster in enumerate(output['clusters']):
        for mention in cluster:

            # Handle alignments between tokens where there was no possible mapping
            # Usually happens with symbols like " with NLTK
            try:
                start_token_id = tokenmap[a2b[mention[0][0]][0]]["token_id"]
                sentence_id = tokenmap[a2b[mention[0][0]][0]]["sentence_id"]
            except (IndexError, KeyError):
                start_token_id = tokenmap[a2b[mention[0][0]+1][0]]["token_id"]
                sentence_id = tokenmap[a2b[mention[0][0]+1][0]]["sentence_id"]

            try:
                end_token_id = tokenmap[a2b[mention[0][1]][0] - 1]["token_id"]
            except (IndexError, KeyError):
                end_token_id = tokenmap[a2b[mention[0][1]-1][0] - 1]["token_id"]

            mentions.append({
                "cluster_id": c_idx,
                "start_token_id": start_token_id,
                "end_token_id": end_token_id,
                "sentence_id": sentence_id,
            })


    annotations = {"mentions": mentions}

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

        # Get SpanBERTs predictions
        model_output = model.perform_coreference(doc['document_text'])
        # Format output mentions /clusters
        annotations = process_clusters( tokens, model_output)

        # Insert annotations
        query = """
            insert into annotations(document_id, user_id, type, status)
            values (:document_id, :user_id, :type, :status)
            returning *
        """

        # Get annotation id
        values = {"document_id": doc["id"],
                  "user_id": 2, # user_id 2 is SpanBERT
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
        cluster_ids_dict = {i:cl for i, cl in enumerate(cluster_ids)}

        # Get mention ids
        query = """
            select id from mentions
            where annotation_id = :annotation_id 
        """

        result = await database.fetch_all(query, values)
        mention_ids = [me['id'] for me in [prep_data(row) for row in result]]
        mention_ids_dict = {i:me for i, me in enumerate(mention_ids)}

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