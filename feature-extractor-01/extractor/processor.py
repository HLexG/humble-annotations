
import os
from typing import Any, Dict, List

from extractor.session import database


async def process(id):
    print(id)

    # Get dataset info
    query = """
        select id,dataset_name ,dataset_description
        from datasets where id = :id
    """
    values = {
        "id": id
    }
    print("query:",query, "values:", values)
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

    print("query",query)
    result = await database.fetch_all(query, values)
    documents = [prep_data(row) for row in result]
    print("Document:",documents)

    # Get Tokens
    for doc in documents[:2]:
        query = """
            select id,document_id,sentence_id,token_id,token_text,token_pos_tag 
            from tokens
            where document_id = :document_id
        """

        values = {
            "document_id": doc["id"]
        }

        print("query",query)
        result = await database.fetch_all(query, values)
        tokens = [prep_data(row) for row in result]
        print("Tokens:",tokens)


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result