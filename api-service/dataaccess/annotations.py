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
        select a.id,a.document_id,a.user_id,a.type,a.status, u.username,u.full_name,
        count(m.id) as entity_mention,count(c.id) as entity_coreference
        from annotations a
        inner join users u on (a.user_id = u.id)
        left join mentions m on (a.id = m.annotation_id)
        left join clusters c on (a.id = c.annotation_id)
        where 1=1
        and a.document_id =:document_id
        group by a.id,a.document_id,a.user_id,a.type,a.status, u.username,u.full_name
    """

    values = {
        "document_id": document_id
    }

    print("query", query)
    result = await database.fetch_all(query, values)

    return [prep_data(row) for row in result]


async def get_user_annotation(
    *,
    document_id: int,
    user_id: int
) -> List[Dict[str, Any]]:
    """
    Retrieve a row based on filters
    """

    query = """
        select a.id,a.document_id,a.user_id,a.status, u.username,u.full_name
        from annotations a
        inner join users u on (a.user_id = u.id)
        where 1=1
        and a.document_id =:document_id
        and a.user_id =:user_id
    """

    values = {
        "document_id": document_id,
        "user_id": user_id
    }

    print("query", query, values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with "+str(values))

    return prep_data(result)


async def get(id: int) -> Dict[str, Any]:
    """
    Retrieve one row based by its id. Return object is a dict. 
    Raises if the record was not found.
    """

    query = """
        select a.id,a.document_id,a.user_id,a.status
        from annotations a
        where id = :id
    """

    values = {
        "id": id
    }

    print("query:", query, "values:", values)
    result = await database.fetch_one(query, values)

    if result is None:
        raise RecordNotFoundError(f"Could not find row with id '{id}'")

    return prep_data(result)


async def create(*,
                 document_id: int,
                 user_id: int,
                 id: int = None) -> Dict[str, Any]:
    """
    Create a new row. Returns the created record as a dict.
    """

    # Set the values
    values = {
        "document_id": document_id,
        "user_id": user_id,
        "type": AnnotationType.entity_mention
    }

    # if the id was passed
    if id is not None:
        values["id"] = id

    # Generate the field and values list
    field_list = ", ".join(values.keys())
    param_list = ", ".join(":" + key for key in values.keys())

    result = await database.fetch_one(f"""
        INSERT INTO annotations (
            {field_list}
        ) VALUES (
            {param_list}
        ) RETURNING *;
    """, values=values)

    result = prep_data(result)
    return result


async def copy(*,
               from_id: int,
               to_id: int,
               annotation_type: AnnotationType,
               id: int = None) -> Dict[str, Any]:
    """
    Copy annotations
    """

    mention_query = """
    WITH deletions AS (
    delete from mentions where annotation_id={to_id} 
    ) 
    insert into mentions(annotation_id,document_id,sentence_id,start_token_id,end_token_id,mention_text)
    select {to_id} as annotation_id,document_id,sentence_id,start_token_id,end_token_id,mention_text
    from mentions where annotation_id={from_id};
    """

    mention_query = mention_query.format(to_id=to_id, from_id=from_id)

    print(mention_query)

    if annotation_type == AnnotationType.entity_mention:
        print("Copy:", annotation_type)
        # Copy mentions
        await database.execute(query=mention_query)

    elif annotation_type == AnnotationType.entity_coreference:
        print("Copy:", annotation_type)
        # Copy mentions

        # Copy Clusters & Coreferences
    elif annotation_type == AnnotationType.named_entity_recognition:
        print("Copy:", annotation_type)
        # Copy mentions

        # Copy Clusters & Coreferences

        # Copy NER
    elif annotation_type == AnnotationType.entity_linking:
        print("Copy:", annotation_type)
        # Copy mentions

        # Copy Clusters & Coreferences

        # Copy Entity links


def prep_data(result) -> Dict[str, Any]:
    if result is None:
        raise ValueError("Tried to prepare null result")

    result = dict(result)

    return result
