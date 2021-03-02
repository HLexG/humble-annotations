#!/bin/bash

set -e

# Read the settings file
source ./env.dev

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app -p 9010:9010 -e DEV=1 $IMAGE_NAME