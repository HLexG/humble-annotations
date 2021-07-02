#!/bin/bash

set -e

# Create the network if we don't have it yet
docker network inspect hlexg >/dev/null 2>&1 || docker network create hlexg

# Run Postgres DB and DBMate
docker-compose run --rm --service-ports hlexgdb-client
