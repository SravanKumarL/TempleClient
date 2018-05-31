var Service = require('node-windows').Service;
var log4js= require('log4js');
log4js.configure({
  appenders: { installLogger: { type: 'file', filename: 'install.log' } },
  categories: { default: { appenders: ['installLogger'], level: 'error' } }
});
const logger = log4js.getLogger('installLogger');
// Create a new service object
var svc = new Service({
  name:'Temple Starter',
  description: 'Service for Temple Starter',
  script: require('path').join('./scripts/start.js'),
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ],
});
svc.on('stop',function(){
    process.exit(0);
});
try{
  logger.trace('Installing Temple starter service...')
  svc.install();
}
catch(error){
  logger.error('Installing failed...');
  logger.error(error);
}