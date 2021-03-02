#!/bin/bash

set -e

# Load the environment file
source ./env.dev

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti --mount type=bind,source="$(pwd)",target=/app -p 9000:9000 -e DEV=1 $IMAGE_NAME