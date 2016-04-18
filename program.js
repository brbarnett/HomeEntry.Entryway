var http = require('http');
// http.post = require('http-post');
var needle = require('needle');

var sp = require('serialport')
var PythonShell = require('python-shell');

// get xbee port
var SerialPort = sp.SerialPort;
var port = new SerialPort('/dev/ttyUSB0', { baudrate: 9600 });

run();

function run() {
  var pyshell = new PythonShell('rfid.py', { mode: 'text' });
  console.log('started up rfid.py, waiting on RFID/NFC card');

  pyshell.on('message', handleMessage);
  pyshell.end(handleScriptEnded);

  function handleMessage(data) {
    console.log('received: ' + data);

    needle.post('https://entry.1128wnewport.com/api/entry/authenticate', { uid: data }, { multipart: false, json: true }, function (err, resp, body) {
      console.log(body);
      //if (!err && resp.statusCode == 200)
      //console.log(resp.body); // here you go, mister.
    });
  }

  function handleScriptEnded(err) {
    if (err) {
      console.log(err)

      console.log('waiting 5 seconds before restarting');
      setTimeout(function () {
        run();
      }, 5000);
    } else {
      run();
    };
  }
}


// xbee

// xbeeport.on('open', function () {
//   xbeeport.write('open the door!\n', function (err, bytesWritten) {
//     if (err) {
//       return console.log('Error: ', err.message);
//     }
//     console.log(bytesWritten, 'bytes written');
//   });
// });
