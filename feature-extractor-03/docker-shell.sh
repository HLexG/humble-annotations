#!/bin/bash

set -e

# Load the environment file
source ./env.dev

# Create the network if we don't have it yet
docker network inspect hlexg >/dev/null 2>&1 || docker network create hlexg

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti \
--mount type=bind,source="$(pwd)",target=/app \
--mount type=bind,source=$(pwd)/../../secrets/,target=/secrets \
-p 9112:9012 \
-e DEV=1 \
-e GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS \
-e GCP_PROJECT=$GCP_PROJECT \
-e GCP_ZONE=$GCP_ZONE \
--network hlexg $IMAGE_NAME