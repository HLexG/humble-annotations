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
feat_1 = extract_environment_variable("FEATURE_EXTRACTOR_01")
feat_2 = extract_environment_variable("FEATURE_EXTRACTOR_02")
feat_3 = extract_environment_variable("FEATURE_EXTRACTOR_03")
feat_4 = extract_environment_variable("FEATURE_EXTRACTOR_04")






#feat_two_url = os.environ["FEAT_EXT_TWO_URL"]

def preprocesses_entities(id):
    url = 'http://hlexg-feature-extractor-02:9111/v1/process_dataset/'+str(id)
    url2 = 'http://hlexg-feature-extractor-04:9013/v1/process_dataset_event/'+str(id)
    url3 = 'http://hlexg-feature-extractor-01:9110/v1/process_dataset/'+str(id)
    url4 = 'http://hlexg-feature-extractor-03:9112/v1/process_dataset/'+str(id)
    urls = [url,url2,url3, url4]
#    x = requests.get(url)
#    return x.status_code
#    """
#    summary="Entity pre-annotations upon the upload of a dataset",
#    description="Entity pre-annotations upon the upload of a dataset"
#    """
#    url = '172.18.0.6'+'/v1/process_dataset/'+str(id)
#
    
    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)
#    session.mount('http://', adapter)
#    session.mount('https://', adapter)
#
    for i in urls:
        page = ''
        ct = 0
        while page == '' and ct <10:
            try:
                page = session.get(i)
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