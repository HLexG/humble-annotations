from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from starlette.staticfiles import StaticFiles

from extractor.routers import mentions
import extractor.session as database_session



prefix = "/v1"

# Setup FastAPI app
app = FastAPI(
    title="API Service",
    description="API Service",
    version="v1"
)

# Enable CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom exception hooks

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "message": str(exc)
        }
    )

# Application start/stop hooks

@app.on_event("startup")
async def startup():
    await database_session.connect()

@app.on_event("shutdown")
async def shutdown():
    await database_session.disconnect()


# Routes
@app.get(
    "/",
    summary="Index",
    description="Root api"
)
async def get_index():
    return {
        "message": "Welcome to the Feature Extractor Service"
    }

# Additional routers here
app.include_router(mentions.router, prefix=prefix)