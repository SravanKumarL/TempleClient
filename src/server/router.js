const Entity = require('./controllers/entity');
const Authentication = require('./controllers/authentication');
const Transaction = require('./controllers/transactions');
const passportService = require('./services/passport');
const passport = require('passport');
const constants = require('./constants/constants');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'Super secret code is ABC123' });
  });
  //Auth routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  // Transaction Routes
  app.post(`/${constants.Transactions}/${constants.add}`, requireAuth, Transaction.addTransaction);
  app.get(`/${constants.Transactions}/${constants.get}`, requireAuth, Transaction.getTransactions);
  app.post(`/${constants.Transactions}/${constants.get}`, requireAuth, Transaction.searchTransactions);
  app.post(`/${constants.Reports}`,requireAuth,Transaction.getReports);

  //Pooja Routes
  let Pooja = Entity.entity(constants.Poojas);
  app.post(`/${constants.Poojas}/${constants.add}`, requireAuth, Pooja.add);
  app.get(`/${constants.Poojas}`, requireAuth, Pooja.get);
  app.get(`/${constants.Poojas}/${constants.Schema}`, requireAuth, Pooja.schema);
  app.delete(`/${constants.Poojas}/:id`, requireAuth, Pooja.delete);
  app.put(`/${constants.Poojas}/:id`, requireAuth, Pooja.update);
}