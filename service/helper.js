var log4js = require('log4js');
var Path = require('path');
module.exports.getLogger = (logFileName, logFilePath) => {
    const loggerName = logFileName.substring(0, logFileName.indexOf('.log'));
    log4js.configure({
        appenders: { [loggerName]: { type: 'file', filename: logFilePath ? Path.join(logFilePath, logFileName) : logFileName } },
        categories: { default: { appenders: [loggerName], level: 'all' } }
    });
    let logger = log4js.getLogger(loggerName);
    logger.level = 'ALL';
    return logger;
}