const stopService = (code) => {
    logger.fatal('Stopping Temple Client service...');
    if (buildProc)
        buildProc.kill();
    if (server)
        server.close();
    logger.fatal('Process exited with code ' + code);
};
process.on('exit', (code) => {
    stopService(code);
});
const killHandler = () => {
    logger.fatal('Killing the process...');
    process.exit(128);
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
let server = undefined;
const path = require('path');
const buildProcess = require('child_process');
const logger = require(__dirname + path.sep + 'helper').getLogger('serviceLog.log');
const buildProc = buildProcess.spawn('node', [path.join(__dirname, '../scripts/build.js')], { detached: true });
buildProc.on('error', (error) => {
    logger.error(error);
    process.exit(1);
})
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