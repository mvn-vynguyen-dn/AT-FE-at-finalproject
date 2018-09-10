var express = require('express');
var router = express.Router();

var album = require('../controllers/ArticleControllers');

router.post('/', album.create);
router.get('/', album.index);
router.get('/:id', album.show);
router.put('/:id', album.update);
router.delete('/:id', album.delete);

module.exports = router;
