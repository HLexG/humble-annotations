import os
from typing import Any, Dict, List
from dataaccess.session import database
from dataaccess.types import AnnotationType
from dataaccess.errors import RecordNotFoundError


async def browse_user_annotations(
    *,
    document_id: int,
    annotation_type: AnnotationType,
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """

    query = """
        select a.id,a.document_id,a.user_id,a.type,a.status, u.username,u.full_name
        from annotations a
        inner join users u on (a.user_id = u.id)
        where 1=1
        and a.document_id =:document_id
        and a.type = :annotation_type
    """

    values = {
        "document_id": document_id,
        "annotation_type": annotation_type
    }

    print("query", query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]


async def create(*,
                 document_id: int,
                 user_id: int,
                 annotation_type: AnnotationType,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "document_id": document_id,
        "user_id": user_id,
        "type": annotation_type
    }

    # if the id was passed
    if id is not None:
        values["id"] = id

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


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result
