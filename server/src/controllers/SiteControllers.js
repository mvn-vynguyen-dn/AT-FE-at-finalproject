const Sites = require('../models/sites');

exports.index = (req, res, next) => {
  Sites.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) =>  {
  Sites.show((err, callback) => {
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
  const siteArr = req.body;
  var siteObj = [];
  siteObj = siteArr.map(item => {
    return new Sites({
      "name" : item.name,
      "description": item.description,
      "listPicture": item.listPicture,
      "backgroundImg": item.backgroundImg,
      "district": item.district
    });
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
