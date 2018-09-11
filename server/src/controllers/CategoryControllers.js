const Category = require('../models/category');

const category = [
  {
    "id": "1",
    "name": "vacation",
    "description": "This is activities related to vaction"
  },
  {
    "id": "2",
    "name": "food",
    "description": "This is activities related to food"
  },
  {
    "id": "3",
    "name": "shopping",
    "description": "This is activities related to shopping"
  },
  {
    "id": "4",
    "name": "sight-seeing",
    "description": "This is activities related to sight-seeing"
  }
]

exports.index = (req, res, next) => {
  Category.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(category);
  })
}

exports.show = (req, res, next) =>  {
  const id = req.params.id;
  const condition = {_id: id};
  Category.show(condition,(err, callback) => {
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
      name : item.name,
      description: item.description,
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
