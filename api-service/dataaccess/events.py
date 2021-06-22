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

    print("Query",query)

    result = await database.fetch_all(query, values)

    event_mentions = [prep_data(row) for row in result]
    # mention_id = event_mentions['mention_id']
    
    ## use mention_id (id = :mention_id) to get all sentences
    print(event_mentions[0]['mention_id'])
    
    query2 = """
        select annotation_id, id, document_id, sentence_id, start_token_id, end_token_id,  mention_text
        from mentions
        where id = :mention_id
    """

    values2 = {
        "mention_id": event_mentions[0]['mention_id']
    }
    print("query2",query2)
    result2 = await database.fetch_all(query2, values2)

    event_sents = [prep_data(row) for row in result2]

    print(event_sents)

    
    
    condsList = []
    
    for i in event_sents:
        itemConcat = ' (document_id = '+ str(i['document_id']) +' AND sentence_id = ' + str(i['sentence_id']) + ") "
        condsList.append(itemConcat)
    #dedupe
    condsList = set(condsList)

    cond_list = " OR ".join(condsList)

    # get full sentences to show user for CDCR Anno
    query3 = f"""
        select id, document_id, sentence_id, token_id,  token_text
        from tokens
        where 
         (
            {cond_list}
        )
        
    """
    print("query3",query3)

    values3 = {
        "document_id": event_sents[0]['document_id'],
        "sentence_id": event_sents[0]['sentence_id']
    }

    result3 = await database.fetch_all(query3)

    res3Prep = [prep_data(row) for row in result3]
    print(res3Prep)

    for i in res3Prep:
        i['mention_check']='no'

    for i in event_sents:
     for j in res3Prep:
             if (i['document_id'] == j['document_id'] and i['sentence_id'] == j['sentence_id'] and j['token_id'] >= i['start_token_id'] and j['token_id'] <= i['end_token_id']):
                     j['mention_check']='yes'



    return res3Prep

## use mention_text to bold in sentence for user for CDCR anno

# get all sentences that are in the event coref cluster



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