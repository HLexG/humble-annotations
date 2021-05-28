#!/bin/bash

set -e

# Read the settings file
source ./env.dev

docker build -t $IMAGE_NAME -f Dockerfile.dev .
docker run --rm --name $IMAGE_NAME -ti -v "$(pwd)/:/app/" -p 3100:3000 $IMAGE_NAME