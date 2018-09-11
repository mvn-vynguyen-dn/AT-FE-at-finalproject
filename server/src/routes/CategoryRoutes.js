let  express = require('express');
let router = express.Router();

let category = require('../controllers/CategoryControllers');

router.post('/', category.create);
router.get('/', category.index);
router.get('/:id', category.show);
router.put('/:id', category.update);
router.delete('/:id', category.delete);

module.exports = router;
