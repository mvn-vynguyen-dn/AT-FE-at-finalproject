const Sites = require('../models/sites');

exports.index = (req, res, next) => {
  Sites.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
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
  const siteRes = req.body;
  const backgroundImg = '';
  
  const listPicture = req.files.map(item => {
    if (item.fieldname === 'listPicture') {
      return item.filename;
    } else {
      backgroundImg = item.filename;
    }
  }).filter(fileName => fileName)

  const siteObj = new Sites({
      name : siteRes.name,
      description: siteRes.description,
      listPicture: listPicture,
      backgroundImg: backgroundImg,
      parentId: siteRes.parentId,
      articleSite: siteRes.articleSite
    });

  Sites.insertMany(siteObj, (err, callback) => {
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
