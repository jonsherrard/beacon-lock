// Run the script to start logging nearby devices and find your device ID
// Then cp config.example.json to config.json and enter your device ID
// Rerun the app.
var deviceId;

try {
  var config = require('./config.json');
  deviceId = config.deviceId;
  console.log('Searching for device with id: ', deviceId);
} catch (e) {
  console.warn("Couldn't find a config file - Searching for nearby devices");
}


var exec = require('child_process').exec,
    child;

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var scanStart = function(data) {
  console.log('scan start data: ', data);
};

var discoverCallback = function(data) {
  if (data.advertisement.serviceData.length) {
    var buff = data.advertisement.serviceData[0].data;
    buff = decoder.write(buff);
    buff = buff.substring(2);
    if (!deviceId) {
      console.log('\nAdvertised name: ', buff +'\n', 'Distance: ', parseInt(data.rssi) + '\n', 'Device identifier: ', data.uuid);
    } else if (data.uuid == deviceId) {
      console.log('Device: ', buff, '\n', 'Distance: ', data.rssi, '\n');
    }
    if ((data.rssi < -50) && (data.uuid == deviceId)) {
      child = exec('open -a /System/Library/Frameworks/ScreenSaver.framework/Versions/A/Resources/ScreenSaverEngine.app',
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      });
    }
  } 
};

var noble = require('noble');
noble.startScanning([], true);
noble.on('scanStart', scanStart);

noble.on('discover', discoverCallback);
