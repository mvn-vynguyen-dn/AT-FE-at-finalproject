const Album = require('../models/article');

exports.index = (req, res, next) => {
  Album.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) =>  {
  Album.show(userName, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Album.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const artArr = req.body;
  var artObj = [];
  artObj = artArr.map(item => {
    return new Album({
      content : item.content,
      title: item.title,
      destinationId: item.destinationid,
      siteId: item.siteId
    });
  });
  Album.insertMany(artObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Album.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Album.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
