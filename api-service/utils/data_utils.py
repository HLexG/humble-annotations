
from dataaccess import datasets, documents

async def load_entity_links(dataset_id):
    print("Loading Entity Links...")

    # Dataset
    dataset = await datasets.get(dataset_id)

    # Read documents for dataset_id
    documents = await documents.browse(dataset_id=dataset_id)

    # For each document parse text and find entities

    # Find suggestive entity links for each entities

    # Delete all rows from entitylinks

    # Create entitylinks