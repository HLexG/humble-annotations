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
feat_three_url = extract_environment_variable("FEAT_EXT_THREE_URL")
feat_four_url = extract_environment_variable("FEAT_EXT_FOUR_URL")

feat_1 = extract_environment_variable("FEATURE_EXTRACTOR_01")
feat_2 = extract_environment_variable("FEATURE_EXTRACTOR_02")
feat_3 = extract_environment_variable("FEATURE_EXTRACTOR_03")
feat_4 = extract_environment_variable("FEATURE_EXTRACTOR_04")
feat_5 = extract_environment_variable("FEATURE_EXTRACTOR_05")


#feat_two_url = os.environ["FEAT_EXT_TWO_URL"]

def preprocess(id, feat_extractor):
    feat = extract_environment_variable(feat_extractor)
    url = feat+'/v1/process_dataset/'+str(id)

    response = requests.get(url)
    print(response)


def preprocesses_entities(id):
    # url = 'http://hlexg-feature-extractor-02:9011/v1/process_dataset/'+str(id)
    # url2 = 'http://hlexg-feature-extractor-04:9013/v1/process_dataset_event/'+str(id)
    # url3 = 'http://hlexg-feature-extractor-01:9010/v1/process_dataset/'+str(id)
    # url4 = 'http://hlexg-feature-extractor-03:9012/v1/process_dataset/'+str(id)
    #urls = [url3, url,url2, url4]

    url1 = feat_1+'/v1/process_dataset/'+str(id)
    url2 = feat_2+'/v1/process_dataset/'+str(id)
    url3 = feat_3+'/v1/process_dataset/'+str(id)
    url4 = feat_4+'/v1/process_dataset_event/'+str(id)

    lurl2 = feat_two_url+'/v1/process_dataset/'+str(id)
    lurl3 = 'http://0.0.0.0:9112/v1/process_dataset/'+str(id)
    lurl4 = 'http://0.0.0.0:9013/v1/process_dataset_event/'+str(id)


    urls = [ lurl2, lurl3, lurl4]

    for i in urls:
        print(i)

    session = requests.Session()
    retry = Retry(connect=3, backoff_factor=0.5)
    adapter = HTTPAdapter(max_retries=retry)

    for i in urls:
        page = session.get(i)
 #        print(i)
 #        page = ''
 #        ct = 0
 #        while page == '' and ct < 10:
 #            try:
 #                page = session.get(i)
 #                ct += 1
 #                break
 #            except:
 #                print("Connection refused by the server..")
 #                print("Let me sleep for 5 seconds")
 #                print("ZZzzzz...")
 #                time.sleep(5)
 #                print("Was a nice sleep, now let me continue...")
 #                ct += 1
 #                continue
    return page
