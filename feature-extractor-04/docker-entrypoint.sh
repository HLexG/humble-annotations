#!/bin/bash

echo "Container is running!!!"

uvicorn_server() {
    uvicorn extractor.service:app --host 0.0.0.0 --port 9013 --log-level debug --reload --reload-dir extractor/ "$@"
}

uvicorn_server_production() {
    pipenv run uvicorn api.service:app --host 0.0.0.0 --port 9013 --lifespan on
}

export -f uvicorn_server
export -f uvicorn_server_production

echo -en "\033[92m
The following commands are available:
    uvicorn_server
        Run the Uvicorn Server
\033[0m
"

if [ "${DEV}" = 1 ]; then
  pipenv shell
else
  uvicorn_server_production
fi
