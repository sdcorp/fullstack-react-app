const express = require('express');
const { param } = require('express-validator');

const { catchAsyncErrors } = require('../helpers/errorHandlers');
const { getData, getSingleDoc } = require('../controllers/testController');

const router = express.Router();

router.route('/test').get(catchAsyncErrors(getData));

router.route('/test/:id').get([param('id', 'Invalid id parameter').isMongoId()], catchAsyncErrors(getSingleDoc));

module.exports = router;
