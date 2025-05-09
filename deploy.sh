#!/bin/bash

# Update system
sudo apt update
sudo apt upgrade -y

# Install Node.js if not installed
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
fi

# Install PM2 if not installed
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

# Install MongoDB if not installed
if ! command -v mongod &> /dev/null; then
    curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
       sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg \
       --dearmor
    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo systemctl start mongod
    sudo systemctl enable mongod
fi

# Create .env file
cat > .env << EOL
MONGODB_URI="mongodb://localhost:27017/proveeksamen"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://your-server-ip"
RESEND_API_KEY="your-resend-api-key"
EOL

# Install dependencies
npm install

# Build the application
npm run build

# Start the application with PM2
pm2 start npm --name "proveeksamen" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot 