#!/bin/bash

if [ "$(whoami)" == "root" ]; then
    echo "Please run this script as a non-root user"
    exit 1
fi

source .env

if [ "$NODE_ENV" == "development" ]; then 
	sed -i 's/CMD \["npm","start"\]/CMD \["npm","run","dev"\]/g' Dockerfile

elif [ "$NODE_ENV" == "production" ] ; then 
	sed -i 's/CMD \["npm","run","dev"\]/CMD \["npm","start"\]/g' Dockerfile

else 
	echo "NODE_ENV is not set to development or production"
	exit 1
fi

echo -e "\n[!] Starting containers\n"
sudo docker-compose up -d 1>/dev/null
sleep 1
echo -e "\n[!] Containers started\n"
