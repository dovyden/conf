'use strict';

const express = require('express');
const router = express.Router();

const ConferenceRecordController = require('./confRec');

router.post('/conference', ConferenceRecordController);

module.exports = router;
