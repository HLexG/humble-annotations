import os
# import io
# import pandas as pd
# from glob import glob
# from fastapi import APIRouter, Path, Query
# from starlette.responses import FileResponse
# from urllib.parse import urlparse
import requests

feat_two_url = os.environ["FEAT_EXT_TWO_URL"]

def preprocesses_entities(id):

    """
    summary="Entity pre-annotations upon the upload of a dataset",
    description="Entity pre-annotations upon the upload of a dataset"
    """
    r = requests.get(feat_two_url+'/v1/process_dataset/'+str(id))
    return r.status_code