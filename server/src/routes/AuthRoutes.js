var express = require('express');
var router = express.Router();

var auth = require('../controllers/UserControllers')

router.post('/login', auth.login);
router.post('/forgot', auth.forgot);
router.post('/reset/:token', auth.reset);

module.exports = router;
