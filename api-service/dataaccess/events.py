import os
import requests
from typing import Any, Dict, List
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
#from nltk import pos_tag
from api.auth import Auth, OptionalAuth # auth.user_id

from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError








# sentence of event mentionq


# doc entities 
# async def get_document_entities(
#     *,
#     document_id: int
# ) -> List[Dict[str, Any]]:
#     """
#     Retrieve a list of rows based on filters
#     """
#     
#     query = """
#         select id, annotation_id, document_id, sentence_id, start_token_id, end_token_id, mention_text
#         from mentions
#         where document_id = :document_id
#     """
# 
#     values = {
#         "document_id": document_id
#     }
# 
#     print("query",query)
#     result = await database.fetch_all(query, values)
# 
#     return [prep_data(row) for row in result]


#choose event clusters

# get all mentions in cluster
async def get_event_help(
    *,
    cluster_id: int
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """

    query = """
        select cluster_id, mention_id from coreferences
        where
        cluster_id  = :cluster_id
    """
    values = {
        "cluster_id": cluster_id
    }

    print("query",query)

    result = await database.fetch_all(query, values)

    event_mentions = [prep_data(row) for row in result]



## use mention_id (id = :mention_id) to get all sentences
"""
        select annotation_id, id, document_id, sentence_id, start_token_id, end_token_id,  mention_text
        from mentions
        where id = :mention_id
    """
## use mention_text to bold in sentence for user for CDCR anno

# get all sentences that are in the event coref cluster

# get full sentences to show user for CDCR Anno
"""
        select id, document_id, sentence_id, token_id,  token_text
        from tokens
        where 
        (document_id = :document_id)
        and (sentence_id = :sentence_id)
    """

# get all entity coref clusters that are in the same sentences
"""
        select id, document_id, user_id, type,  status
        from annotations
        where 
        (document_id = :document_id)
        and (type = entity_mention or type = entity_coreference or type = named_entity_recognition )
    """

"""
        select annotation_id, cluster_id, mention_id 
        from coreferences
        where annotation_id = ;id_from_prev_query
    """
##dedupe
# get the named entity of each entity coref clusters












def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result