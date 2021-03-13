"""
Module that contains the command line app.
"""
import os
import argparse
import asyncio

import dataaccess.session as database_session
from utils import data_utils

# Generate the inputs arguments parser
parser = argparse.ArgumentParser(description='Command description.')
parser.add_argument("-o", "--opp", default="default")


async def main(args=None):
    parse_args, unknown = parser.parse_known_args(args=args)
    print("Args:", parse_args)

    try:
        # Connect to database
        await database_session.connect()

        if parse_args.opp == "test_create_mention":
            print("test_create_mention...")
            
        elif parse_args.opp == "load_entity_links":
            print("load_entity_links...")

            # Find the default dataset id
            dataset_id = 1
            await data_utils.load_entity_links(dataset_id)
        else:
            print("No valid op was passed...")
    except:
        # Disconnect from database
        await database_session.disconnect()
    

if __name__ == "__main__":
    #main()
    # loop = asyncio.get_event_loop()
    # loop.run_until_complete(main())
    # loop.close()
    asyncio.run(main())
