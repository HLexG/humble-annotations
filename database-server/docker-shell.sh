#!/bin/bash

set -e

# Read the settings file
source ./env.dev

# Create the network if we don't have it yet
docker network inspect hlexg >/dev/null 2>&1 || docker network create hlexg

# Run Postgres DB and DBMate
docker-compose run --rm --service-ports --name database-server dbmate