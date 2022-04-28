#!/bin/bash
git pull --dry-run | grep -q -v 'Already up-to-date.' || exit 1
git pull
docker build -t hello-world:latest .
docker rm -f marina
docker run -d -p 8999:80 --name marina hello-world:latest

