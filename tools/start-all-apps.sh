#!/usr/bin/env bash

# script runs from "/tools" folder
if [ -d ../admin ]; then
    (cd ../admin && meteor --port 3002) &
    (cd ../merchants && MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3001) &
    (cd ../customers && MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3000)
fi

# script runs from "/" folder
if [ -d admin ]; then
    (cd admin && meteor --port 3002) &
    (cd merchants && MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3001) &
    (cd customers && MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3000)
fi
