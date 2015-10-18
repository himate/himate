#!/usr/bin/env bash

# script runs from "/tools" folder
if [ -d ../admin ]; then
    (cd ../admin && meteor reset) &&
    (cd ../merchants && meteor reset) &&
    (cd ../customers && meteor reset)
fi

# script runs from "/" folder
if [ -d admin ]; then
    (cd admin && meteor reset) &&
    (cd merchants && meteor reset) &&
    (cd customers && meteor reset)
fi
