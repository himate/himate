#!/usr/bin/env bash

# script runs from "/tools" folder
if [ -d ../apps/admin ]; then
    (cd ../apps/admin && meteor reset) &&
    (cd ../apps/merchants && meteor reset) &&
    (cd ../apps/customers && meteor reset)
fi

# script runs from "/" folder
if [ -d apps/admin ]; then
    (cd apps/admin && meteor reset) &&
    (cd apps/merchants && meteor reset) &&
    (cd apps/customers && meteor reset)
fi
