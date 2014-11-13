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
    console.log(buff, parseInt(data.rssi));
    if ((data.rssi < -50) && (buff.indexOf('jshez') > -1)) {
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
