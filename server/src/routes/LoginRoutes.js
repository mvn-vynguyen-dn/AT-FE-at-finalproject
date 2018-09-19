let  express = require('express');
let router = express.Router();

let user = require('../controllers/UserControllers');

router.post('/', user.login);

module.exports = router;
