import os
import requests
from typing import Any, Dict, List
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize

from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError

async def browse(
    *,
    dataset_id: int,
    page_number: int = 0,
    page_size: int = 20
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """
    
    query = """
        select id,dataset_id,document_name,filepath 
        from documents
        where dataset_id = :dataset_id
    """

    values = {
        "dataset_id": dataset_id
    }

    print("query",query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]

async def get(id: int) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict. 
    Raises if the record was not found.
    """

    query = """
        select id,dataset_id,document_name,filepath from documents where id = :id
    """

    values = {
        "id": id
    }

    print("query:",query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with id '{id}'")

    result = prep_data(result)

    # Get the document
    doc_file = requests.get(result["filepath"])
    document = doc_file.text

    # Generate sentences
    sentences = sent_tokenize(document)

    # Generate tokens
    tokens = []
    for s_idx,s in enumerate(sentences):
        words = word_tokenize(s)
        for w_idx,w in enumerate(words):
            token = {
                "text": w,
                "token_id": w_idx,
                "sentence_id": s_idx,
                "document_id": result["id"]
            }
            tokens.append(token)
    
    result["text"] = document
    result["tokens"] = tokens

    # Get any existing annotations for the document
    result["annotations"] = {
        "mentions":[],
        "clusters":[]
    }

    return result

def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    if result["document_name"] == '':
        result["document_name"] = os.path.basename(result["filepath"])

    return result