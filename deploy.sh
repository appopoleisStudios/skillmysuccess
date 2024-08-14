#!/bin/bash

# Ensure this script is executable
chmod +x deploy.sh

# Navigate to the project directory
cd /home/ubuntu/projects/skillmysuccess/skillmysuccess

# Reset local branch to match the remote branch, discarding any local changes
git fetch origin
git reset --hard origin/staging

# Rebuild and restart Docker containers
docker-compose down
docker-compose up --build -d

echo "Deployment completed successfully!"
