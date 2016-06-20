# HiMate

The project contains three separate meteor apps, which will share one database.

## System requirements
- meteor 1.2

- ubuntu, mac osx or windows 7

- imagemagick or graphicsmagick

      http://www.imagemagick.org/script/binary-releases.php

- nodejs bindings for imagemagick

	  npm install -g imagemagick

- at least 1GB free ram

- multi core cpu recommended

## Create settings.json
The Apps need config values from a `settings.json`, which is not part of the repository. Please create the `settings.json` at the top dir of this repository (`.`) . This file should contain the following json object (adjust to your needs).

    {
        "translation": {
            "MsTokenUrl": "%YOURTOKENURL%",
            "MsClientId": "%YOURCLIENTID%",
            "MsClientSecret": "%YOURSECRET%",
            "MsTokenScope": "http://api.microsofttranslator.com",
            "MsTokenGrantType": "client_credentials",
            "MsTranslatorUrl": "http://api.microsofttranslator.com/v2/Http.svc/Translate"
        },

        "mandrill": {
            "smtp": {
                "server": "%YOURSMTPSERVER%",
                "port": "%YOURSMTPSERVERPORT%"
            },
            "username": "%YOURUSERNAME%",
            "apiKey": "%YOURAPIKEY%"
        },

        "contacts": {
            "noreply": "%YOURNOREPLAYADRESS%"
        }
    }

The [himate-config](https://github.com/himate/himate-config) repository contains encrypted `settings.json` files for different stages. 

## Start / stop servers

The database is controlled by the admin app. To ensure that all instances are running on the same database, you should use the two scripts inside of the `./tools` directory.

### Start all apps (tested on Ubuntu and Mac OS X)

    ./tools/start-all-apps.sh

This will start
- the customers app on http://localhost:3000
- the merchants app on http://localhost:3001
- the admin app on http://localhost:3002
- the mongo db on http://localhost:3003

### Stop all apps (tested on Ubuntu and Mac OS X)

Abort the running script, then run:

    ./tools/stop-all-apps.sh

This will stop all running nodejs and mongodd processes.

## Reset projects / initial data

Run

    ./tools/reset-all-apps.sh

to delete the local database and clear meteor cache. Once you restart the apps the admin app will load the fixtures located in `/admin/server/fixtures/*`.

A newly created database will contain:

- a customer:
    - usr: customer@example.com
    - pwd: customer

- a merchant:
    - usr: merchant@example.com
    - pwd: merchant

- an admin:
    - usr: admin@example.com
    - pwd: admin

There will also be some example categories and vouchers. Feel free to delete those data from the admin app.

## Running "meteor" commands

If you want to run "meteor" commands, e.g. "meteor add ..." from bash, please execute the following command in your project's root directory:

	export PACKAGE_DIRS=`pwd`/packages

This ensures, that meteor is aware of the project's `./packages` folder.
