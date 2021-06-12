import os
import requests
from typing import Any, Dict, List

from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError

async def create(*,
                 document_id: int,
                 sentence_id: int,
                 token_id: int,
                 token_text: str,
                 token_pos_tag: str,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "document_id": document_id,
        "sentence_id": sentence_id,
        "token_id": token_id,
        "token_text": token_text,
        "token_pos_tag": token_pos_tag
    }

    # if the id was passed
    if id is not None:
        values["id"] = id

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO tokens (
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

    return result