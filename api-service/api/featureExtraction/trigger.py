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

from utils import extract_environment_variable

feat_two_url = extract_environment_variable("FEAT_EXT_TWO_URL")

#feat_two_url = os.environ["FEAT_EXT_TWO_URL"]

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
    ct = 0
    while page == '' and ct <10:
        try:
            page = session.get(url)
            ct+=1
            break
        except:
            print("Connection refused by the server..")
            print("Let me sleep for 5 seconds")
            print("ZZzzzz...")
            time.sleep(5)
            print("Was a nice sleep, now let me continue...")
            ct+=1
            continue
    return page