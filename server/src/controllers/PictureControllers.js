const Pictures = require('../models/pictures');

exports.index = (req, res, next) => {
  Pictures.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  Pictures.show( (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Pictures.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const picArr = req.body;
  var picObj = [];
  picObj = picArr.map(item => {
    return new Pictures({
      "planId": item.planId,
      "destinationId": item.destinationId,
    });
  });
  Pictures.insertMany(picObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Pictures.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Pictures.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
