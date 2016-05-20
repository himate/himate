#!/usr/bin/env bash

# script runs from "/tools" folder
if [ -d ../apps/admin ]; then
    export PACKAGE_DIRS=`pwd`/../packages
    (cd ../apps/admin && meteor --port 3002 --settings `pwd`/../../settings.json) &
    (cd ../apps/merchants && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3001 --settings `pwd`/../../settings.json) &
    (cd ../apps/customers && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3000 --settings `pwd`/../../settings.json) &
    echo "Devtools at: http://localhost:3002/devtools"
fi

# script runs from "/" folder
if [ -d apps/admin ]; then
    export PACKAGE_DIRS=`pwd`/packages
    (cd apps/admin && meteor --port 3002 --settings `pwd`/../../settings.json) &
    (cd apps/merchants && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3001 --settings `pwd`/../../settings.json) &
    (cd apps/customers && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor run android --port 3000 --verbose --settings `pwd`/../../settings.json) &
    echo "Devtools at: http://localhost:3002/devtools"
fi

echo $PACKAGE_DIRS
