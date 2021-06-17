#!/bin/bash

set -e

# Load the environment file
source ./env.dev

# Create the network if we don't have it yet
docker network inspect hlexg >/dev/null 2>&1 || docker network create hlexg

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app -p 9111:9011 -e DEV=1 --network hlexg $IMAGE_NAME