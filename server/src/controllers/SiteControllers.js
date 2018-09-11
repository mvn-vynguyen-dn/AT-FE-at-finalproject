const Sites = require('../models/sites');

const sites = [
  {
    "_id": "1",
    "name": "da nang",
    "description": "da nang mong mo ",
  },
  {
    "_id": "2",
    "name": "hue",
    "description": "hue is the best"
  },
  {
    "_id": "3",
    "name": "Thanh Khe",
    "description": "1 dia diem cua da nang",
  }
]

exports.index = (req, res, next) => {
  Sites.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(sites);
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
  const siteArr = req.body;
  var siteObj = [];
  siteObj = siteArr.map(item => {
    return new Sites({
      name : item.name,
      description: item.description,
      listPicture: item.listPicture,
      backgroundImg: item.backgroundImg,
      district: item.district,
      parentId: item.parentId
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
