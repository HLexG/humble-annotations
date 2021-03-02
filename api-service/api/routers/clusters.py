import os
import io
import pandas as pd
from fastapi import APIRouter, Path, Query
from starlette.responses import FileResponse
from urllib.parse import urlparse

router = APIRouter()