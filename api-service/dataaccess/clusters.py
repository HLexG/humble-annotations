import os
import requests
from typing import Any, Dict, List
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize

from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError

async def browse(
    *,
    dataset_id: int
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """
    
    query = """
        select id,dataset_id,document_id
        from clusters
        where dataset_id = :dataset_id
    """

    values = {
        "dataset_id": dataset_id
    }

    print("query",query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]



async def create(*,
                dataset_id: int,
                document_id: int,
                cluster_name: str) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "dataset_id": dataset_id,
        "document_id": document_id,
        "cluster_name": cluster_name
    }

    # if the id was passed
    #if id is not None:
    #    values["id"] = id

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(" " + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO clusters (
            {field_list}
        ) VALUES (
            {param_list}
        ) RETURNING *;
    """, values=values)

    result = prep_data(result)
    return result

async def update(id: int,
                 dataset_id: int,
                 document_id: int,
                 cluster_name: str = None) -> Dict[str, Any]:
    """
    Updates an existing row. Keyword arguments left at None will not be
    changed in the database. Returns the updated record as a dict. Raises if
    the record was not found.
    """

    values = {
        "dataset_id": dataset_id,
        "document_id": document_id,
        "id": id
    }

    changes: Dict[str, Any] = {
    }
               
    change_list = ", ".join(key + " = :" + key for key in changes.keys())
    change_list += ", updated_at = EXTRACT(EPOCH FROM clock_timestamp()) * 1000"

    result = await database.fetch_one(f"""
        UPDATE clusters
        SET {change_list}
        WHERE id = :id and dataset_id = :dataset_id and document_id = :document_id
        RETURNING *;
    """, values={**values, **changes})

    if result is None:
        raise RecordNotFoundError(f"Could not update row with id '{id}'")

    result = prep_data(result)
    return result

async def delete_all_for_document(dataset_id: int, document_id: int) -> None:
    """
    Deletes existing records
    """

    values = {"dataset_id": dataset_id, "document_id": document_id}

    await database.execute_many("""
        DELETE FROM clusters
            WHERE dataset_id = :dataset_id and document_id = :document_id;
    """, values=values)

def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result