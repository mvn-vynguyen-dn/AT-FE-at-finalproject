let  express = require('express');
let router = express.Router();

let plan = require('../controllers/PlanControllers');

router.post('/', plan.create);
router.get('/', plan.index);
router.get('/:id', plan.show);
router.put('/:id', plan.update);
router.delete('/:id', plan.delete);

module.exports = router;
