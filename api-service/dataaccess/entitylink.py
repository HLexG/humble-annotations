import os
import requests
from typing import Any, Dict, List
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
from api.auth import Auth, OptionalAuth # auth.user_id
from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError
import nltk
########### Attn EP
from mediawiki import MediaWiki
nltk.download('punkt')


async def browse(
        *,
        dataset_id: int,
        text_query: str = None,
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """

    query = """
        SELECT id,alt_id,dataset_id,entity_name,description,url 
        FROM entitylink
        WHERE dataset_id = :dataset_id
    """

    values = {
        "dataset_id": dataset_id
    }

    if text_query is not None:

        text_query = '%' + text_query + '%'
        query += """ 
                  AND LOWER(entity_name) LIKE LOWER(:text_query) 
                 ORDER BY LENGTH(entity_name)
                 LIMIT 5
                 """

        values["text_query"] = text_query

    print("query", query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]


async def get(id: int) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict.
    Raises  if the record was not found.
    """

    query = """
        select id,alt_id,dataset_id,entity_name,description,url 
        from entitylink
        where id = :id
    """

    values = {
        "id": id
    }

    print("query:", query, "values:", values)
    result = await database.fetch_one(query, values)

    return prep_data(result)


async def create(*,
                 alt_id: str,
                 dataset_id: int,
                 entity_name: str,
                 description: str,
                 url: str,
                 id: str = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "alt_id": alt_id,
        "dataset_id": dataset_id,
        "entity_name": entity_name,
        "description": description,
        "url": url,
        #"created_by": auth.user_id
    }

    # if the id was passed
    if id is not None:
        values["id"] = id

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    query = f"""
        INSERT INTO entitylink (
            {field_list}
        ) VALUES (
            {param_list}
        ) RETURNING *;
    """
    print(query, values)

    result = await database.fetch_one(query, values=values)

    print(result)

    result = prep_data(result)
    return result


async def delete_all(dataset_id: int) -> None:
    """
    Deletes existing records
    """

    values = {"dataset_id": dataset_id}

    await database.execute_many("""
        DELETE FROM entitylink
            WHERE dataset_id = :dataset_id;
    """, values=values)


async def get_wd(id: str) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict.
    Raises  if the record was not found.
    """

    query = """
        select id,alt_id,dataset_id,entity_name,description,url 
        from wikidata
        where id = :id
    """

    values = {
        "id": id
    }

    print("query:", query, "values:", values)
    result = await database.fetch_one(query, values)

    return prep_data(result)


async def tbnamed(dataset_id) -> Dict[str, Any]:
    """
    Input: Dataset Id
    SQL Output: entity mentions grouped by coref cluster
    Py Transform: filter out pronouns, choose named entity


    """

    # funcs common
    ## result = await database.fetch_all(query, values)
    ## [prep_data(row) for row in result]

    ### Steps ###
    # get docs by dataset id
    query1 = """
        select id 
        from documents
        where dataset_id = :dataset_id
    """

    values1 = {
        "dataset_id": int(dataset_id)
    }

    result1 = await database.fetch_all(query1, values1)

    doc_ids = [prep_data(row) for row in result1]
    print(doc_ids)
    doc_id_list = [str(i['id']) for i in doc_ids]

    document_id_list =', '.join(doc_id_list)
    print("yo")
    print(document_id_list)
    

    # get mentions by coref cluster, include pos

    query2 = """
        select cluster_id, annotation_id, count(mention_id) 
        from coreferences 
        where annotation_id in (select id from annotations where document_id in (""" + document_id_list + """)) 
        group by cluster_id, annotation_id 
        having count(mention_id) >1 
        order by count(mention_id) desc;
    """
    values2 = {
        "document_id": document_id_list,
    }

    print(query2)

    result2 = await database.fetch_all(query2)
    out2 = [prep_data(row) for row in result2]
    print(out2)
    cluster_id_list = [str(i['cluster_id']) for i in out2]
    print(cluster_id_list)
    clust_id_list = ', '.join(cluster_id_list)


    query3 = """
        select mention_id, n1.document_id, n1.annotation_id, n1.mention_text, n2.token_id, n2.token_text, n2.token_pos_tag, n1.cluster_id
        from (select id as mention_id, annotation_id, document_id, sentence_id, start_token_id, end_token_id, mention_text, (select cluster_id from coreferences where mentions.id=coreferences.mention_id) as cluster_id
          from mentions
          where id in (select mention_id from coreferences where cluster_id in (""" + clust_id_list+ """))
        ) n1
        inner join 
        (select document_id, sentence_id, token_id, token_text, token_pos_tag
          from tokens
          where token_pos_tag in ('NNP','NNPS')         
         ) n2
        on (n2.sentence_id = n1.sentence_id and n2.document_id = n1.document_id and n2.token_id >= n1.start_token_id and n2.token_id <= n1.end_token_id)
    """

    result3 = await database.fetch_all(query3)
    out3 = [prep_data(row) for row in result3]
    print(out3)

    print("dedupe")
    cluster_id = set([i['cluster_id'] for i in out3])
    dedupe_dict = [{'id':i, 'mentions' : set([j['mention_text'] for j in out3 if j['cluster_id'] == i])} for i in cluster_id]
    print(dedupe_dict)


    ## pos
    ## token_pos_tag from tokens 
    ## NNP NNPS > NNS
    return dedupe_dict

########### Attn EP
async def open_text_qry(mentions) -> Dict[str, Any]:
    """
    Input: mention or a list of them
    SQL Output: entity name, entity summary description
    Ideal: picture, multiple candidates

    """
    print('open_text_qry started')
    wiki = MediaWiki()
    candidates = wiki.search(mentions)
    candidates = candidates[:3]
    dicOut = []
    print('first candidates')
    print(candidates)
    for i in candidates:
            p = wiki.page(i)
            tempDict = {'title': p.title,
            'summary': p.summary,
            'images': p.images,
            'pageid': p.pageid,
            'url': p.url}
            dicOut.append(tempDict)
            print('completed '+str(i))

    print(dicOut)
    #dicOut = dict(dicOut)
    
    return dicOut

async def link_insert(cluster_id, pageid, currentDoc, summary_title) -> Dict[str, Any]:
    """
    Input: mention or a list of them
    SQL Output: entity name, entity summary description
    Ideal: picture, multiple candidates

    pageid = wikidata.alt_id

    """

    query = """
            insert into annotations(document_id, user_id, type, status)
            values (:document_id, :user_id, :type, :status)
            returning *
        """

    # Get annotation id
    values = {"document_id": int(currentDoc),
              "user_id": 4, # user_id 2 is SpanBERT
              "type": "entity_linking",
              "status":"commit"}

    print('insert into anno table')
    result = await database.fetch_one(query=query, values=values)
    annotation_id = result['id']

    values2 = {
        "id": str(pageid), 
        "alt_id": str(pageid), 
        "dataset_id": int(2), 
        "entity_name": summary_title, 
        "description": summary_title
    }
    param_list = ", ".join(":" + key for key in values2.keys())
    query2 =f"""
    insert into wikidata(id, alt_id, dataset_id, entity_name, description)
    values ({param_list})
    returning *
    """
    print('insert into wd table')
    print(query2)
    result = await database.fetch_one(query2, values=values2)
    db_id = result['db_id']

    values3 = {
        "annotation_id":int(annotation_id),
        "cluster_id": int(cluster_id), 
        "wikidata_id": int(db_id)
    }
    param_list = ", ".join(":" + key for key in values3.keys())
    query3 =f"""
    insert into entity_links(annotation_id, cluster_id, wikidata_id)
    values ({param_list})
    """

    
    print('insert into EL table')
    result = await database.fetch_one(query3, values=values3)

    return result


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result






    