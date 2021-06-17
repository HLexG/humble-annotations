import os
# import io
# import pandas as pd
# from glob import glob
# from fastapi import APIRouter, Path, Query
# from starlette.responses import FileResponse
from urllib.parse import urlparse
import requests
from requests.adapters import HTTPAdapter
from requests.packages.urllib3.util.retry import Retry
import time




feat_two_url = os.environ["FEAT_EXT_TWO_URL"]

def preprocesses_entities(id):
    """
    summary="Entity pre-annotations upon the upload of a dataset",
    description="Entity pre-annotations upon the upload of a dataset"
    """
    url = feat_two_url+'/v1/process_dataset/'+str(id)

    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)

    page = ''
    while page == '':
        try:
            page = session.get(url)
            break
        except:
            print("Connection refused by the server..")
            print("Let me sleep for 5 seconds")
            print("ZZzzzz...")
            time.sleep(5)
            print("Was a nice sleep, now let me continue...")
            continue
    return page.status_code