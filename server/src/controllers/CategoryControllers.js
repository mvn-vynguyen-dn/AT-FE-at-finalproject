const Category = require('../models/category');

exports.index = (req, res, next) => {
  Category.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) =>  {
  Category.show((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Category.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const cateArr = req.body;
  var cateObj = [];
  cateObj = cateArr.map(item => {
    return new Category({
      "name" : item.name,
      "description": item.description,
    });
  });
  Category.insertMany(cateObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Category.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Category.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
