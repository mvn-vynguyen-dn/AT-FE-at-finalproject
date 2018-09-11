let  express = require('express');
let router = express.Router();

let pictures = require('../controllers/PictureControllers');

router.post('/', pictures.create);
router.get('/', pictures.index);
router.get('/:id', pictures.show);
router.put('/:id', pictures.update);
router.delete('/:id', pictures.delete);

module.exports = router;
