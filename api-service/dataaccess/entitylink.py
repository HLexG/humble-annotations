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


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result

