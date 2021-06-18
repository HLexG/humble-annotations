import os
import requests
from typing import Any, Dict, List
from api.auth import Auth, OptionalAuth # auth.user_id
from dataaccess.session import database
from dataaccess import tokens as dataaccess_tokens
from dataaccess import mentions as dataaccess_mentions
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

    print("query", query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]


async def get(id: int) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict.
    Raises if the record was not found.
    """

    query = """
        select id,dataset_id,document_name,filepath 
        from documents 
        where id = :id
    """

    values = {
        "id": id
    }

    print("query:", query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with id '{id}'")

    result = prep_data(result)

    # Get document tokens
    tokens = await dataaccess_tokens.get_document_tokens(document_id=id)
    result["tokens"] = tokens

    return result


async def create(*,
                 dataset_id: int,
                 document_name: str,
                 filepath: str,
                 document_text: str,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "dataset_id": dataset_id,
        "document_name": document_name,
        "filepath": filepath,
        "document_text": document_text,
        #"created_by": auth.user_id
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
    return result


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    if result["document_name"] == '':
        result["document_name"] = os.path.basename(result["filepath"])

    return result