import os
import requests
from typing import Any, Dict, List
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from api.auth import Auth, OptionalAuth # auth.user_id
from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError




#mentions, count and iter
async def browse() -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """

    query = """
            select type, document_id, count(*) as iters, sum(mentions_count) as count
            from
            (select type, document_id, id, (select count(*) from mentions where annotations.id = mentions.annotation_id) as mentions_count from annotations) as x
            group by type, document_id;
            """


    print("query", query)
    result = await database.fetch_all(query)
    indic = [prep_data(row) for row in result]

    nd = {}
    en = [indic[i] for i in range(len(indic)) if indic[i]['type'] =='entity_mention']
    ev = [indic[i] for i in range(len(indic)) if indic[i]['type'] =='event_mention']

    nd['entity'] = [{'id':i['document_id'],'mentions':{'iters': i['iters'], 'count': i['count']}} for i in en]
    nd['event'] = [{'id':i['document_id'],'mentions':{'iters': i['iters'], 'count': i['count']}} for i in ev]
    
    return nd


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result
