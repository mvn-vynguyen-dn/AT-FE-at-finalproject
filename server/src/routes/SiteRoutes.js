let  express = require('express');
let router = express.Router();

let site = require('../controllers/SiteControllers');

var multer = require('multer');

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

router.post('/', upload.any(), site.create);
router.get('/', site.index);
router.get('/:id', site.show);
router.put('/:id', site.update);
router.delete('/:id', site.delete);

module.exports = router;
