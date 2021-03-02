# Humble Annotations App

## Prerequisites
### Install Docker 
Install `Docker Desktop`

#### Ensure Docker Memory
- To make sure we can run multiple container go to Docker>Preferences>Resources and in "Memory" make sure you have selected > 4GB

### Install VSCode  
Follow the [instructions](https://code.visualstudio.com/download) for your operating system.  
If you already have a preferred text editor, skip this step.  

### Clone the github repository
- Clone [this repository](https://github.com/HLexG/humble-annotations)

## API Service
-  `cd api-service`
- Start docker shell `sh ./docker-shell.sh`

To install a new python package use `pipenv install requests` from the docker shell

To run development api service run `uvicorn_server` from the docker shell

To test the service go to `http://0.0.0.0:9000/`

## Feature Extractor 01
-  `cd feature-extractor-01`
- Start docker shell `sh ./docker-shell.sh`

To install a new python package use `pipenv install requests` from the docker shell

To run development api service run `uvicorn_server` from the docker shell

To test the service go to `http://0.0.0.0:9010/`

## Database Server
-  `cd database-server`
- Start docker shell `sh ./docker-shell.sh`


DB Migrations tool link: https://github.com/amacneil/dbmate