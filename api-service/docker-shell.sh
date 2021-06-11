#!/bin/bash

set -e

# Load the environment file
source ./env.dev

# Create the network if we don't have it yet
docker network inspect hlexg >/dev/null 2>&1 || docker network create hlexg

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app --mount type=bind,source="$DATASTORE_DIR",target=/datastore -p 9100:9000 -e DEV=1 -e DATASTORE_BUCKET=$DATASTORE_BUCKET --network hlexg $IMAGE_NAME