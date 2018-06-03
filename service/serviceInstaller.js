const Service = require('node-windows').Service;
const templeService = require('./service');
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
// svc.on('start', function () {
//     templeService.start();
//     logger.info('Starting Temple Client service...');
// });
// svc.on('stop', function () {
//     templeService.stop();
//     logger.info('Stopping Temple Client service...');
//     process.exit(0);
// });
// //Check if service was installed correctly
// svc.on('install', function () {
//     logger.info('Starting Temple Client service...');
//     templeService.start();
// });

// try {
//     logger.info('Installing Temple Client service...');
//     svc.install();
// }
// catch (error) {
//     logger.error('Installing Temple Client service failed...');
//     logger.error(error);
// }


svc.uninstall(); // Uninstall service. Comment the above code.