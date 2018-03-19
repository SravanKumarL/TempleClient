const Authentication = require('./controllers/authentication');
const Transaction = require('./controllers/transactions');
const Pooja = require('./controllers/poojaDetails');
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
  app.post(`${constants.Transactions}/${constants.add}`, requireAuth, Transaction.addTransaction);
  app.get(`${constants.Transactions}`, requireAuth, Transaction.getTransactions);
  app.post(`${constants.Transactions}/getTransactionsWithPhoneNumber`, requireAuth, Transaction.searchTransactionWithPhoneNumber);
  
  //Pooja Routes
  app.post(`${constants.Poojas}/${constants.add}`, requireAuth, Pooja.addPooja);
  app.get(`${constants.Poojas}`, requireAuth, Pooja.getPoojas);
}