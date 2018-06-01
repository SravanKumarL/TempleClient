var log4js = require('log4js');
var Path = require('path');
module.exports.getLogger = (logFileName, logFilePath) => {
    log4js.configure({
        appenders: { file: { type: 'file', filename: logFilePath ? Path.join(logFilePath, logFileName) : logFileName } },
        categories: { default: { appenders: ['file'], level: 'all' } }
    });
    return log4js.getLogger(logFileName);
}