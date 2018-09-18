const Destination = require('../models/destination');

const destination = [
  {
    "_id" : "1",
    "name": "Bánh Xèo Bà Dưỡng",
    "address": "280/23 Hoàng Diệu",
    "rating": 100,
    "categoryId": "5b9c5847b16a2d3504ff0cfb",
    "siteId": ["5b9d0574006c771874703fe5", "5b9d484a89641af910f67f5d", "5b9d567889641af910f67f5e"],
    "listPicture": [
      'http://dathanhtravel.vn/data/news/default/banh-xeo-ba-duong-mon-ngon-da-nang.jpg',
      'https://images.foody.vn/res/g1/6081/prof/s576x330/foody-mobile-foody-banh-xeo-ba-du-315-635739618189627907.jpg',
      'https://diadiem.danang.gov.vn/Portals/0/Photo/5584_20131105093234_Banh%20Xeo%20Ba%20Duong.jpg'
    ]
  },
]

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
