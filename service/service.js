const path = require('path');
const logger = require(__dirname + path.sep + 'helper').getLogger('serviceLog.log');
const stopService = (code) => {
    logger.fatal('Stopping Temple Client service...');
    if (buildProc)
        buildProc.kill();
    if (server) {
        server.close();
        logger.fatal('Temple client serving at port 3000 is closed');
    }
    logger.fatal('Process exited with code ' + code);
};
process.on('exit', (code) => stopService(code));
process.on('beforeExit', (code) => stopService(code));
const killHandler = () => {
    stopService(128);
    logger.fatal('Killing the process...');
    setTimeout(() => process.exit(128), 100);
}
process.on('SIGKILL', killHandler);
process.on('SIGINT', killHandler);
process.on('SIGTERM', killHandler);
process.on('uncaughtException', (err) => {
    logger.error(err);
    process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at:', p + 'with reason :\n' + reason);
    process.exit(1);
});
logger.info('Starting Temple Client Service ...');
let server = undefined;
const buildProcess = require('child_process');
const buildProc = buildProcess.spawn('node', [path.join(__dirname, '../scripts/build.js')]);
buildProc.on('message', (message) => {
    if (message === 'kill') {
        killHandler();
    }
});
buildProc.on('error', (error) => {
    logger.error(error);
    buildProc.send('kill');
    buildProc.kill();
});
new Promise((resolve, reject) => {
    const closeHandler = (code, signal) => {
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
    }
    buildProc.on('exit', closeHandler);
    // buildProc.on('close', closeHandler);
}).then((value) => {
    console.log('server is going to start');
    const express = require('express');
    const app = express();
    const http = require('http');
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../build/index.html'));
    });
    app.use('/static', express.static(path.join(__dirname, '../build/static')));
    app.use(express.static(path.join(__dirname, '../build')));
    server = app.listen(3000, () => logger.info('Temple Client listening to port 3000'));
}, (err) => {
    buildProc.send('kill');
});