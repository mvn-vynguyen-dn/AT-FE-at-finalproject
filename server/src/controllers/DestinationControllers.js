const Destination = require('../models/destination');

exports.index = (req, res, next) => {
  Destination.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  Destination.show( (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Destination.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const DestinationArr = req.body;
  var DestinationObj = [];
  DestinationObj = DestinationArr.map(item => {
    return new Destination({
      "name":item.name,
      "address": item.address,
      "rating": item.rating,
      "categoryId": item.categoryId,
      "siteId": item.siteId,
    });
  });
  Destination.insertMany(DestinationObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Destination.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Destination.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
