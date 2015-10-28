#!/usr/bin/env bash



# script runs from "/tools" folder
if [ -d ../admin ]; then
    export PACKAGE_DIRS=`pwd`/../packages
	#export METEOR_SETTINGS="$(cat ../settings.json)"
    (cd ../admin && meteor --port 3002 --settings `pwd`/../settings.json) &
    (cd ../merchants && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3001 --settings `pwd`/../settings.json) &
    (cd ../customers && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3000 --settings `pwd`/../settings.json) &
    echo "Devtools at: http://localhost:3002/devtools"
fi

# script runs from "/" folder
if [ -d admin ]; then
    export PACKAGE_DIRS=`pwd`/packages
	#export METEOR_SETTINGS="$(cat settings.json)"
    (cd admin && meteor --port 3002 --settings `pwd`/../settings.json) &
    (cd merchants && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3001 --settings `pwd`/../settings.json) &
    (cd customers && MONGO_OPLOG_URL='mongodb://localhost:3003/local' MONGO_URL='mongodb://localhost:3003/meteor' meteor --port 3000 --settings `pwd`/../settings.json) &
    echo "Devtools at: http://localhost:3002/devtools"
fi

echo $PACKAGE_DIRS
