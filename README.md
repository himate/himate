# waslchiraa

The project contains three separate meteor apps, which will share one database.

## system requirements
- meteor 1.2
- ubuntu, mac osx or windows 7
- imagemagick or graphicsmagick
      http://www.imagemagick.org/script/binary-releases.php
- nodejs bindings for imagemagick
      npm install -g imagemagick
- at least 1GB free ram
- multi core cpu recommended

## start / stop servers

The database is controlled by the admin app. To ensure that all instances are
running on the same database, you should use the two scripts inside of the 
./tools directory.

### settings.json
The Apps need config values from a `settings.json`. 
Please place the `settings.json` at the top dir of 
this repository (`.`) .

### start all apps (tested on ubuntu)

    ./tools/start-all-apps.sh

This will start
- the customers app on http://localhost:3000
- the merchants app on http://localhost:3001
- the admin app on http://localhost:3002
- the mongo db on http://localhost:3003

### stop all apps (tested on ubuntu)

Abort the running script, OR run:

    ./tools/stop-all-apps.sh

This will stop all running nodejs processes.

### reset projects / initial data

Run

    ./tools/reset-all-apps.sh

to delete the local database and clear meteor cache. Once you restart the apps
the admin app will load the fixtures located in /admin/server/fixtures/*.

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

There will also be some example categories and vouchers. Feel free to delete
those data from the admin app.
