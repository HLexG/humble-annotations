import os
from typing import Any, Dict, List

from dataaccess.session import database
from dataaccess.errors import RecordNotFoundError

async def browse(
    *,
    page_number: int = 0,
    page_size: int = 20
) -> List[Dict[str, Any]]:
    """
    Retrieve a list of rows based on filters
    """
    
    query = """
        select id,username,email,full_name,hashed_password
        from users
    """

    # order by

    # offset/limit
    query += data_utils.build_pagination(page_number,page_size)

    values = []

    print("query",query)
    result = await database.fetch_all(query)

    return [prep_data(row) for row in result]

async def get(id: int) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict. 
    Raises if the record was not found.
    """

    query = """
        select id,username,email,full_name,hashed_password from users where id = :id
    """

    values = {
        "id": id
    }

    print("query:",query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with id '{id}'")

    return prep_data(result)

async def get_by_name(username: str) -> Dict[str, Any]:
    """
    Retrieve one row based by its name. Return object is a dict. 
    Raises if the record was not found.
    """

    username = username.lower()

    query = """
        select id,username,email,full_name,hashed_password from users where username = :username
    """

    values = {
        "username": username
    }

    print("query:",query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with username '{username}'")

    return prep_data(result)

async def create(*,
                 username: str,
                 email: str = None,
                 full_name: str = None,
                 hashed_password: str = None,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    username = username.lower()

    # Set the values
    values = {
        "username": username
    }

    # if the id was passed
    if id is not None:
        values["id"] = id
    if email is not None:
        values["email"] = email
    if full_name is not None:
        values["full_name"] = full_name
    if hashed_password is not None:
        values["hashed_password"] = hashed_password

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO users (
            {field_list}
        ) VALUES (
            {param_list}
        ) RETURNING *;
    """, values=values)

    result = prep_data(result)
    return result

async def update(id: int,
                 username: str = None,
                 email: str = None,
                 full_name: str = None,
                 hashed_password: str = None) -> Dict[str, Any]:
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

    if username is not None:
        username = username.lower()
        changes["username"] = username
    if email is not None:
        changes["email"] = email
    if full_name is not None:
        changes["full_name"] = full_name
    if hashed_password is not None:
        changes["hashed_password"] = hashed_password

    change_list = ", ".join(key + " = :" + key for key in changes.keys())
    change_list += ", updated_at = EXTRACT(EPOCH FROM clock_timestamp()) * 1000"

    print(change_list)

    result = await database.fetch_one(f"""
        UPDATE users
        SET {change_list}
        WHERE id = :id
        RETURNING *;
    """, values={**values, **changes})

    if result is None:
        raise RecordNotFoundError(f"Could not update row with id '{id}'")

    result = prep_data(result)
    return result

def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)
    return result