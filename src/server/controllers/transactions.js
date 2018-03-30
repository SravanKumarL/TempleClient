const { reportMapping } = require('../constants/constants');
const Transaction = require('../models/transactions');
exports.addTransaction = function (req, res, next) {
  // Extract the required data
  const phoneNumber = req.body.phoneNumber;
  const names = req.body.names;
  const gothram = req.body.gothram;
  const nakshatram = req.body.nakshatram;
  const pooja = req.body.pooja;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;
  const numberOfDays = req.body.numberOfDays;
  const amount = req.body.amount;
  const createdBy = req.body.createdBy;
  const { id, bankName, chequeNo, createdDate } = req.body;
  //Validate different cases
  if (!names || !pooja || !phoneNumber) {
    return res.status(422).send({ error: 'You must provide phone number names and pooja' });
  }
  // Create new model instance
  const transaction = new Transaction({
    id, bankName, chequeNo, createdDate,
    phoneNumber: phoneNumber,
    names: names,
    gothram: gothram,
    nakshatram: nakshatram,
    pooja: pooja,
    fromDate: fromDate,
    toDate: toDate,
    numberOfDays: numberOfDays,
    amount: amount,
    createdBy: createdBy,
  });

  //save it to the db
  transaction.save(function (err) {
    if (err) { return next(err); }
    //Respond to request indicating the transaction was created
    res.json({ message: 'Transaction was saved successfully' });
  });
}

exports.getTransactions = function (req, res, next) {
  Transaction.find().exec((err, transactions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ transactions });
  });
}

exports.searchTransactions = function (req, res, next) {
  const searchValue = req.body.searchValue;
  let searchObject = { phoneNumber: searchValue };
  if (searchValue.length === 0) {
    return res.json({ transactions: [] });
  }
  if (isNaN(Number(searchValue))) {
    const regex = new RegExp(".*" + searchValue.toLowerCase() + ".*", 'i');
    searchObject = { names: { $regex: regex } };
  }
  Transaction.find(searchObject, (err, transactions) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ transactions });
  });
}

exports.getReports = function (req, res, next) {
  const searchCriteria = req.body;
  const { ReportName, Date, fromDate, toDate } = searchCriteria;
  if (!ReportName || !Date)
    res.json({ error: 'Search criteria is invalid' });
  const report = reportMapping[ReportName];
  if (!report)
    res.json({ error: 'Invalid report name' });
  // find({createdDate:{$gte:fromDate,$lte:toDate}})
  const model = Transaction.schema.obj;
  const slice = (array, obj) => {
    let slicedObj = {};
    array.forEach(x => slicedObj[x] = obj[x]);
    return slicedObj;
  }
  Transaction.find({ createdDate: Date }).select(report.join(' ')).exec(function (error, results) {
    if (error) res.json({ error });
    results = results.map(result => {
      return slice(report, result);
    });
    res.json(results);
  });
}