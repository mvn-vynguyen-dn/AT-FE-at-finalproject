var express = require('express');
var router = express.Router();

var auth = require('../controllers/UserControllers');
var VerifyToken = require('../controllers/VerifyToken');

router.post('/login', auth.login);
router.post('/forgot', auth.forgot);
router.get('/logout', VerifyToken.verifyToken, auth.logout);
router.post('/reset/:token', auth.reset);
router.get('/me', VerifyToken.verifyToken, auth.showMe);

module.exports = router;
