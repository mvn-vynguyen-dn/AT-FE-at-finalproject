let  express = require('express');
let router = express.Router();

let pictures = require('../controllers/PictureControllers');

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

router.post('/', upload.array('listPicture'),pictures.create);
router.get('/', pictures.index);
router.get('/:id', pictures.show);
router.put('/:id', pictures.update);
router.delete('/:id', pictures.delete);

module.exports = router;
