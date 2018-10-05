let  express = require('express');
let router = express.Router();

let user = require('../controllers/UserControllers');
var multer = require('multer');
const Validation = require('../lib/Validation');
const Validate = require('express-validation');
const folderName = 'uploads';

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, `./${folderName}/`);
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(null, false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/', upload.array('avatar'), user.create);
router.get('/', user.index);
router.get('/:id', user.show);
router.put('/:id',upload.array('avatar'), user.update);
router.delete('/:id', user.delete);

module.exports = router;
