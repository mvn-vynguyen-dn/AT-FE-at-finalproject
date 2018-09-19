let  express = require('express');
let router = express.Router();

let user = require('../controllers/UserControllers');

router.post('/', user.forgot);

module.exports = router;
