const Destination = require('../models/destination');
const mongoose = require('mongoose');

exports.index = (req, res, next) => {
  Destination.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  const id = req.params.id;
  conditon = {
    _id: mongoose.Types.ObjectId(id),
  };
  Destination.show(id, (err, callback) => {
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
  const destination = new Destination({
      name:req.body.name,
      address: req.body.address,
      rating: req.body.rating,
      categoryId: req.body.categoryId,
      siteId: req.body.siteId,
      description: req.body.description
    });

  Destination.insertMany(destination, (err, callback) => {
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

exports.search = (req, res, next) => {
  const name = req.body.name;
  const site = req.body.site;
  const category = req.body.category;
  if(name) {
    Destination.search(req.body, (err, callback) => {
      if(err) throw err;
      res.status(200).send(callback);
    })
  } else {
    res.status(200).send("asdasdasd")
  }
}
