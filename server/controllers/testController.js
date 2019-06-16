const TestModel = require('../models/Test');
const { catchExpressValidatorErrors } = require('../helpers/customValidators');
const { checkIfExist } = require('../helpers/customHandlers');

// TODO Make check if exist also a separate handler (mb combine with Express Validator)

exports.getData = async (req, res) => {
  const docs = await TestModel.find();
  if (docs.length === 0) {
    const err = new Error('No Docs in DB');
    err.status = 404;
    throw err;
  }
  res.json({ docs });
};

exports.getSingleDoc = async (req, res) => {
  // validation params.id
  catchExpressValidatorErrors(req);
  const { id } = req.params;
  const doc = await checkIfExist(id, TestModel);
  res.status(200).json({ doc });
};
