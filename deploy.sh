ubuntu@vps-38929c8c:~/projects/skillmysuccess/skillmysuccess$ cat deploy.sh
#!/bin/bash

# Ensure this script is executable
chmod +x deploy.sh

# Navigate to the project directory
# cd /home/ubuntu/projects/skillmysuccess/skillmysuccess

# Stash local changes
git stash -u

# Pull the latest changes from GitHub
git pull origin staging  # Or your branch

# Rebuild and restart Docker containers
docker-compose down
docker-compose up --build -d

# Apply the stashed changes (optional)
git stash pop  # Reapplies stashed changes

echo "Deployment completed successfully!"
