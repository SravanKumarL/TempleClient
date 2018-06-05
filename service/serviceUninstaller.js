const Service = require('node-windows').Service;
const logger = require('./helper').getLogger('installLog.log');
// Create a new service object
var svc = new Service({
    name: 'Temple Client',
    description: 'Service for Temple Client',
    script: __dirname + '/service.js',
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ],
});
// Check if service was uninstalled correctly
svc.on('uninstall', () => logger.info('Temple Client service uninstalling complete.'));

try {
    logger.info('Uninstalling Temple Client service...');
    svc.uninstall();
}
catch (error) {
    logger.error('Uninstalling Temple Client service failed!');
    logger.error(error);
}