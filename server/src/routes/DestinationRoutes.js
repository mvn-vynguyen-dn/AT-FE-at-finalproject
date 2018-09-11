let  express = require('express');
let router = express.Router();

let destination = require('../controllers/DestinationControllers');

router.post('/', destination.create);
router.get('/', destination.index);
router.get('/:id', destination.show);
router.put('/:id', destination.update);
router.delete('/:id', destination.delete);

module.exports = router;
