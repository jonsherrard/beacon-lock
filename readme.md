t# Beacon Lock

## Use a bluetooth beacon to lock your Mac when you leave its proximity

Use your Google Bluetooth LE beacon to lock your Mac screen.  Probably very insecure and crap. I wrote it in about half an hour.

`npm install`

`node app.js`

Find your devices id from the list that is printed out.

Copy your device id into config.example.json, and rename it config.json

Re-run the app.

When your beacon's distance falls below the threshold (default -50), the Mac screensaver app will be executed.

[Instagram video demo](http://instagram.com/p/vT22OQibkB)
