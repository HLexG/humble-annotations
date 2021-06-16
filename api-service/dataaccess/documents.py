import os
import requests
from typing import Any, Dict, List
<<<<<<< HEAD

from dataaccess.session import database
from dataaccess import tokens as dataaccess_tokens
=======
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
import nltk
nltk.download('averaged_perceptron_tagger')
from nltk import pos_tag as pos

from dataaccess.session import database
>>>>>>> 6c3f63a13b817a3d49f1208f43637f19dc6556b0
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
<<<<<<< HEAD
        select id,dataset_id,document_name,filepath 
        from documents 
        where id = :id
=======
        select id,dataset_id,document_name,filepath from documents where id = :id
>>>>>>> 6c3f63a13b817a3d49f1208f43637f19dc6556b0
    """

    values = {
        "id": id
    }

    print("query:",query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with id '{id}'")

    result = prep_data(result)

<<<<<<< HEAD
    # Get document tokens
    tokens = await dataaccess_tokens.get_document_tokens(document_id=id)
    result["tokens"] = tokens

    return result

async def create(*,
                 dataset_id: int,
                 document_name: str,
                 filepath: str,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "dataset_id": dataset_id,
        "document_name": document_name,
        "filepath": filepath
    }

    # if the id was passed
    if id is not None:
        values["id"] = id

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO documents (
            {field_list}
        ) VALUES (
            {param_list}
        ) RETURNING *;
    """, values=values)

    result = prep_data(result)
=======
    # Get the document
    doc_file = requests.get(result["filepath"])
    document = doc_file.text

    # Generate sentences
    sentences = sent_tokenize(document)

    # Generate tokens
    tokens = []
    for s_idx,s in enumerate(sentences):
        words = word_tokenize(s)
        posList = pos(words)
        for w_idx,w in enumerate(words):
            token = {
                "text": w,
                "pos":posList[w_idx][1],
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

>>>>>>> 6c3f63a13b817a3d49f1208f43637f19dc6556b0
    return result

def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    if result["document_name"] == '':
        result["document_name"] = os.path.basename(result["filepath"])

    return result