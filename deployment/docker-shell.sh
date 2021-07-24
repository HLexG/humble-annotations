#!/bin/bash

# Read the settings file
source ./env.dev

docker build -t $IMAGE_NAME -f Dockerfile .
docker run --rm --name $IMAGE_NAME -ti \
-v /var/run/docker.sock:/var/run/docker.sock \
--mount type=bind,source="$(pwd)",target=/app \
--mount type=bind,source=$(pwd)/../../secrets/,target=/secrets \
--mount type=bind,source=$HOME/.ssh,target=/home/app/.ssh \
--mount type=bind,source=$(pwd)/../annotations-frontend,target=/annotations-frontend \
--mount type=bind,source=$(pwd)/../api-service,target=/api-service \
--mount type=bind,source=$(pwd)/../database-server,target=/database-server \
--mount type=bind,source=$(pwd)/../feature-extractor-01,target=/feature-extractor-01 \
--mount type=bind,source=$(pwd)/../feature-extractor-02,target=/feature-extractor-02 \
--mount type=bind,source=$(pwd)/../feature-extractor-03,target=/feature-extractor-03 \
--mount type=bind,source=$(pwd)/../feature-extractor-04,target=/feature-extractor-04 \
--mount type=bind,source=$(pwd)/../feature-extractor-05,target=/feature-extractor-05 \
-e GOOGLE_APPLICATION_CREDENTIALS=$GOOGLE_APPLICATION_CREDENTIALS \
-e GCP_PROJECT=$GCP_PROJECT \
-e GCP_ZONE=$GCP_ZONE $IMAGE_NAME

