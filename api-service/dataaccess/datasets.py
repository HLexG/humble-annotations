import os
from typing import Any, Dict, List

from dataaccess import utils as data_utils
from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError, NoAccessError
from dataaccess.types import PermissionType

async def browse(
    *,
    q: str = None,
    page_number: int = 0,
    page_size: int = 20
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """
    
    query = """
        select id,dataset_name ,dataset_description
        from datasets
        where 1=1
    """

    if q is not None:
        query += " and (dataset_name like'%"+q+"%' or dataset_description like '%"+q+"%')"

    print("query",query)
    result = await database.fetch_all(query)

    return [prep_data(row) for row in result]

async def get(id: int) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict. 
    Raises if the record was not found.
    """

    query = """
        select id,dataset_name ,dataset_description
        from datasets where id = :id
    """

    values = {
        "id": id
    }

    print("query:",query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with id '{id}'")

    return prep_data(result)

async def create(*,
                 dataset_name: str,
                 dataset_description: str = None,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "dataset_name": dataset_name
    }

    # if the id was passed
    if id is not None:
        values["id"] = id
    if dataset_description is not None:
        values["dataset_description"] = dataset_description

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO datasets (
            {field_list}
        ) VALUES (
            {param_list}
        ) RETURNING *;
    """, values=values)

    result = prep_data(result)
    return result

async def update(id: int,
                 dataset_name: str = None,
                 dataset_description: str = None,
                 ) -> Dict[str, Any]:
    """
    Updates an existing row. Keyword arguments left at None will not be
    changed in the database. Returns the updated record as a dict. Raises if
    the record was not found.
    """

    values = {
        "id": id
    }

    changes: Dict[str, Any] = {
    }

    if dataset_name is not None:
        changes["dataset_name"] = dataset_name
    if dataset_description is not None:
        changes["dataset_description"] = dataset_description

    change_list = ", ".join(key + " = :" + key for key in changes.keys())
    change_list += ", updated_at = EXTRACT(EPOCH FROM clock_timestamp()) * 1000"

    print(change_list)

    result = await database.fetch_one(f"""
        UPDATE datasets
        SET {change_list}
        WHERE id = :id
        RETURNING *;
    """, values={**values, **changes})

    if result is None:
        raise RecordNotFoundError(f"Could not update row with id '{id}'")

    result = prep_data(result)
    return result

async def create_dataset_user(*,
        dataset_id: int,
        user_id: int,
        permission_type: PermissionType,
        id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "dataset_id": dataset_id,
        "user_id":user_id,
        "permission_type":permission_type
    }

    # if the id was passed
    if id is not None:
        values["id"] = id


    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO datasets_users (
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