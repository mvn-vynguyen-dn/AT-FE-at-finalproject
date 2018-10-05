var express = require('express');
var router = express.Router();

var article = require('../controllers/ArticleControllers');

router.post('/', article.create);
router.get('/', article.index);
router.get('/:id', article.show);
router.put('/:id', article.update);
router.delete('/:id', article.delete);

module.exports = router;
