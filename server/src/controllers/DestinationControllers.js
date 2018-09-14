const Destination = require('../models/destination');

const destination = [
  {
    "_id" : "1",
    "name": "quan Tau Khua",
    "address": "Quang Trung",
    "rating": 5,
    "categoryId" : "1",
    "siteId" : [
      "1", "2", "3"
    ]
  },
  {
    "_id" : "2",
    "name": "quan Nhat Ban",
    "address": "Tokyo",
    "rating": 3,
    "categoryId" : "2",
    "siteId" : [
      "1", "3"
    ]
  },
  {
    "_id" : "3",
    "name": "quan Han Quac",
    "address": "Seoul",
    "rating": 3,
    "categoryId" : "3",
    "siteId" : [
      "3"
    ]
  },
  {
    "_id" : "4",
    "name": "quan Viet",
    "address": "Tokyo",
    "rating": 3,
    "categoryId" : "4",
    "siteId" : [
      "2"
    ]
  }
]

exports.index = (req, res, next) => {
  Destination.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(destination);
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
      name:item.name,
      address: item.address,
      rating: item.rating,
      categoryId: item.categoryId,
      siteId: item.siteId,
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
