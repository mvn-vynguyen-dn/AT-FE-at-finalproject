let  express = require('express');
let router = express.Router();

let comment = require('../controllers/CommentControllers');

router.post('/', comment.create);
router.get('/', comment.index);
router.get('/:id', comment.show);
router.put('/:id', comment.update);
router.delete('/:id', comment.delete);

module.exports = router;
