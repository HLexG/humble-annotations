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

    #query = """
    #        select type, document_id, count(*) as iters, sum(mentions_count) as count
    #        from
    #       (select type, document_id, id, (select count(*) from mentions where annotations.id = mentions.annotation_id) as mentions_count from annotations) as x
    #        group by type, document_id;
    #        """

    query = """
            SELECT
            	ment.type, ment.document_id,
            	mention_iters, mention_count,
            	clusters_iters, clusters_count
            FROM
            	(select type, document_id, count(*) as clusters_iters, sum(clusters_count) as clusters_count
                from
                (select type, document_id, id, (select count(distinct cluster_id) as clusters_count from coreferences where annotations.id = coreferences.annotation_id) as clusters_count from annotations) as clus
                group by type, document_id) clus
            FULL OUTER JOIN (select type, document_id, count(*) as mention_iters, sum(mentions_count) as mention_count
                            from
                            (select type, document_id, id, 
                            (select count(distinct mention_id) as mentions_count from coreferences where annotations.id = coreferences.annotation_id) as mentions_count,
                            (select count(distinct cluster_id) as clusters_count from coreferences where annotations.id = coreferences.annotation_id) as clusters_count from annotations) as ment
                            group by type, document_id) ment 
                    ON ment.document_id = clus.document_id AND ment.type = clus.type
            """

    print("query", query)
    result = await database.fetch_all(query)
    indic = [prep_data(row) for row in result]
    print(indic)

    nd = {}
    en = [indic[i] for i in range(len(indic)) if indic[i]['type'] =='entity_mention']
    ev = [indic[i] for i in range(len(indic)) if indic[i]['type'] =='event_mention']

    doc_id_list = [i['document_id'] for i in en]

    doc_id_tuple = tuple(doc_id_list)

    q2 = f"""SELECT type, COUNT(*) FROM annotations WHERE document_id IN {doc_id_tuple} GROUP BY type;"""

    
    result2 = await database.fetch_all(q2)
    indic2 = [prep_data(row) for row in result2]
    print(indic2)


    nd['entity'] = [{'id':i['document_id'],'mentions':{'iters': i['mention_iters'], 'count': i['mention_count']},'idc':{'iters': i['clusters_iters'], 'count': i['clusters_count']}} for i in en]
    nd['event'] = [{'id':i['document_id'],'mentions':{'iters': i['mention_iters'], 'count': i['mention_count']},'idc':{'iters': i['clusters_iters'], 'count': i['clusters_count']}} for i in ev]

    nd['xdoc'] = indic2
    
    return nd


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result
