from typing import Any, Dict, List
from dataaccess.session import database

async def browse(
    *,
    page_number: int = 0,
    page_size: int = 20
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of datasets based on filters
    """

    query = """
        select * from datasets
    """

    values = []

    result = await database.fetch_all(query, values=values)

    return [prep_data(row) for row in result]

def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result