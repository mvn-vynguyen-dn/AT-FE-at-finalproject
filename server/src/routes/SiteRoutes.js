let  express = require('express');
let router = express.Router();

let site = require('../controllers/SiteControllers');

router.post('/', site.create);
router.get('/', site.index);
router.get('/:id', site.show);
router.put('/:id', site.update);
router.delete('/:id', site.delete);

module.exports = router;
