import os
from typing import Any, Dict, List
from dataaccess.session import database
from dataaccess.types import AnnotationType
from dataaccess.errors import RecordNotFoundError


async def browse_annotations(
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


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result
