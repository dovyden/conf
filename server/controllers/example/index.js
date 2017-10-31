'use strict';

const express = require('express');
const router = express.Router();

const RootController = require('./root');

router.get('/', RootController);

module.exports = router;
