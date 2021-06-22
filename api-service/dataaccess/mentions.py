import os
import requests
from typing import Any, Dict, List
from nltk.tokenize import sent_tokenize
from nltk.tokenize import word_tokenize
#from nltk import pos_tag
from api.auth import Auth, OptionalAuth  # auth.user_id

from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError


async def browse(
    *,
    document_id: int,
    annotation_id: int,
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """

    query = """
        select m.id, m.document_id,m.annotation_id, m.sentence_id, m.start_token_id, m.end_token_id,m.mention_text
        from mentions m
        where 1=1
        and m.document_id = :document_id
        and m.annotation_id = :annotation_id
    """

    values = {
        "document_id": document_id,
        "annotation_id": annotation_id
    }

    print("query", query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]


async def get_document_mentions(
    *,
    document_id: int
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """

    query = """
        select id,annotation_id,document_id,sentence_id,start_token_id,end_token_id
        from mentions
        where document_id = :document_id
    """

    values = {
        "document_id": document_id
    }

    print("query", query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]

# async def pull():


async def retp(*, qu) -> Dict[str, Any]:
    result = await database.fetch_all(qu, values)
    result = prep_data(result)
    return result


async def create(*,
                 dataset_id: int,
                 document_id: int,
                 sentence_id: int,
                 start_token_id: int,
                 end_token_id: int,
                 cluster_id: int = None,
                 pos: str,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "dataset_id": dataset_id,
        "document_id": document_id,
        "sentence_id": sentence_id,
        "start_token_id": start_token_id,
        "end_token_id": end_token_id,
        "cluster_id": cluster_id,
        "pos": pos,
        # "created_by": auth.user_id
    }

    # if the id was passed
    if id is not None:
        values["id"] = id

    if cluster_id is not None:
        values["id"] = cluster_id

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO mentions (
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
                 sentence_id: int = None,
                 start_token_id: int = None,
                 end_token_id: int = None,
                 cluster_id: int = None) -> Dict[str, Any]:
    """
    Updates an existing row. Keyword arguments left at None will not be
    changed in the database. Returns the updated record as a dict. Raises if
    the record was not found.
    """

    values = {
        "dataset_id": dataset_id,
        "document_id": document_id,
        "id": id,
        "updated_by": auth.user_id
    }

    changes: Dict[str, Any] = {
    }

    if start_token_id is not None:
        changes["start_token_id"] = start_token_id

    if start_token_id is not None:
        changes["start_token_id"] = start_token_id

    if end_token_id is not None:
        changes["end_token_id"] = end_token_id

    if cluster_id is not None:
        changes["cluster_id"] = cluster_id

    change_list = ", ".join(key + " = :" + key for key in changes.keys())
    change_list += ", updated_at = EXTRACT(EPOCH FROM clock_timestamp()) * 1000"

    result = await database.fetch_one(f"""
        UPDATE mentions
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
        DELETE FROM mentions
            WHERE dataset_id = :dataset_id and document_id = :document_id;
    """, values=values)


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result
