let server = undefined;
let buildProc = undefined;
const path = require('path');
module.exports.start = () => {
    const buildProcess = require('child_process');
    const logger = require(__dirname + path.sep + 'helper').getLogger('buildLog.log');
    buildProc = buildProcess.execSync('node "' + path.join(__dirname, '../scripts/build') + '.js"');
    new Promise((resolve, reject) => {
        buildProc.on('exit', (code, signal) => {
            if (buildProc.killed) {
                logger.trace('Process was killed');
                reject('killed');
            }
            else {
                if (code === 0) {
                    logger.info('Build completed');
                    resolve('complete');
                }
                else {
                    logger.error('Build Failed. See Logs for More details');
                    reject('failed');
                }
            }
        });
    }).then((value) => {
        const express = require('express');
        const app = express();
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../build/index.html'));
        });
        app.use('/static', express.static(path.join(__dirname, '../build/static')));
        app.use(express.static(path.join(__dirname, '../build')));
        server = app.listen(3000, () => logger.info('Temple Client listening to port 3000'));
    }, (err) => {
        //Since logging has been done prior
    });
}
module.exports.stop = () => {
    buildProc && buildProc.kill();
    server && server.close();
}