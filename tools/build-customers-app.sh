#!/usr/bin/env bash

# script should run from "/" folder
# himateTEST
if [ -d apps/customers ]; then
    export PACKAGE_DIRS=`pwd`/packages
    echo "Building meteor apps..."
    (cd apps/customers && meteor build ../../build/customers/ --server=https://app.himate.org)

    echo "Signing..."
    (cd build/customers/android/ && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 release-unsigned.apk himate-app)

    echo "Zipalign..."
    (cd build/customers/android/ && rm production.apk && $ANDROID_HOME/build-tools/23.0.1/zipalign 4 release-unsigned.apk production.apk)
fi

