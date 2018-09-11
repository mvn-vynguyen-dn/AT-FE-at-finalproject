let  express = require('express');
let router = express.Router();

let user = require('../controllers/UserControllers');

router.post('/', user.create);
router.get('/', user.index);
router.get('/:id', user.show);
router.put('/:id', user.update);
router.delete('/:id', user.delete);

module.exports = router;
