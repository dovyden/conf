'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const jsonBodyParser = bodyParser.json();

const ConferenceRecordController = require('./record');

router.post('/conference', jsonBodyParser, ConferenceRecordController);

module.exports = router;
