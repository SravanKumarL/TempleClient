var cp = require('child_process');
var path = require('path');
const logger = require(__dirname + path.sep + 'helper').getLogger('buildLog.log');
var child = cp.execSync('node "' + path.join(__dirname, '../scripts/build') + '.js"');

// child.on('message', function (m) {
//     // Receive results from child process
//     console.log('received: ' + m);
// });

// // Send child process some work
// child.send('Please up-case this string');