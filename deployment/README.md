# Deployment

## Deployment Setup
* GCP project details in env.dev file

## Start Docker Container
To start the docker container run:  
```
sh ./docker-shell.sh
```

## API's to enable in GCP
* Compute Engine API
* Service Usage API
* 

## SSH Setup
#### Configuring OS Login for service account
```
gcloud compute project-info add-metadata --project hlexg-63f51 --metadata enable-oslogin=TRUE
```

#### Create SSH key for service account
```
cd /secrets
ssh-keygen -f ssh-key-hlexg-ansible
cd /app
```

#### Providing public SSH keys to instances
```
gcloud compute os-login ssh-keys add --key-file=/secrets/ssh-key-hlexg-ansible.pub
```
From the output of the above command keep note of the username. Here is a snippet of the output 
```
- accountId: hlexg-63f51
    gid: '4178806540'
    homeDirectory: /home/sa_102699106630466120621
    name: users/ansible@hlexg-63f51.iam.gserviceaccount.com/projects/hlexg-63f51
    operatingSystemType: LINUX
    primary: true
    uid: '4178806540'
    username: sa_102699106630466120621
```
The username is `sa_102699106630466120621`


## Update Deployment Setup
* GCP project details in inventory-dev.yml file
* GCP Compute instance details in inventory-dev.yml file

## Deployment
#### Create Dev Server in GCP
```
ansible-playbook deploy-create-instance.yml -i inventory-dev.yml
```
Once the command runs successfully get the IP address of the compute instance from GCP and update the appserver>hosts in inventory-dev.yml file

#### Provision Dev Server in GCP
```
ansible-playbook deploy-provision-instance.yml -i inventory-dev.yml
```

#### Configure Nginx file
* Create nginx.conf file for defaults routes in web server
* Create sites -> for dev server we need routes for dev.humblenlp.com setup

#### Setup Webserver on Dev Server in GCP
```
ansible-playbook deploy-setup-webserver.yml -i inventory-dev.yml
```
Once the command runs you can go to `http://34.69.146.37/` and you should see the default nginx page

#### Build and Push Docker Containers to GCR
```
ansible-playbook deploy-docker-images.yml -i inventory-dev.yml
```

#### Deploy Docker Containers to Server
```
ansible-playbook deploy-setup-containers.yml -i inventory-dev.yml
```

The app should be available at:
http://dev.humblenlp.com/ 

 
