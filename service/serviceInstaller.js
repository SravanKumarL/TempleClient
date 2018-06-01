var Service = require('node-windows').Service;
var stopService = require('./service').stop;
var logger = require('./helper').getLogger('installLog');
// Create a new service object
var svc = new Service({
  name: 'Temple Starter',
  description: 'Service for Temple Starter',
  script: require('path').join('./service.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
});
svc.on('stop', function () {
  stopService();
  process.exit(0);
});
try {
  logger.trace('Installing Temple starter service...')
  svc.install();
}
catch (error) {
  logger.error('Installing failed...');
  logger.error(error);
}