var express = require('express');
var router = express.Router();

var search = require('../controllers/DestinationControllers');

router.post('/', search.search);

module.exports = router;
