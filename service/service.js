const buildProcess = require('child_process');
const buildProc = buildProcess.spawn('node', ['../scripts/build.js']);
const logger = require('./helper').getLogger('buildLog');
let server = undefined;
new Promise((resolve, reject) => {
    buildProc.on('exit', (code, signal) => {
        if (code === 0) {
            logger.info('Build completed');
            resolve('complete');
        }
        else {
            logger.error('Build Failed. See Logs for More details');
            reject('failed');
        }
    });
}).then((value) => {
    const express = require('express');
    const app = express();
    // const directory= process.cwd();
    app.get('/', (req, res) => {
        res.sendfile('../build/index.html');
    });
    app.use(express.static('../build/static'));
    server = app.listen(3000, () => logger.info('Temple starter listening to port 3000'));
});
module.exports.stop = () => server && server.close();