const Sites = require('../models/sites');

exports.index = (req, res, next) => {
  Sites.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) =>  {
  const id = req.params.id;
  Sites.show(id, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Sites.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const listPicture = req.files
  .filter(item => item.fieldname === 'listPicture')
  .map(item => item.filename);

  const backgroundImg = req.files
  .filter(item => item.fieldname === 'backgroundImg')
  .map(item => item.filename);

  const site = new Sites({
    name : req.body.name,
    listPicture: listPicture,
    backgroundImg: backgroundImg,
    parentId: req.body.parentId,
    articleSite: req.body.articleSite
  });

  console.log(site);

  Sites.create(site, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Sites.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Sites.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
