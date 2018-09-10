const Users = require('../models/user');

exports.index = (req, res, next) => {
  Users.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  Users.show( (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Users.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const userArr = req.body;
  var userObj = [];
  userObj = userArr.map(item => {
    return new Users({
      "name":item.name,
      "email": item.email,
      "age": item.age,
      "hobbies": item.hobbies,
      "avatar": item.avatar,
      "listPictures": item.listPictures,
      "listFriends": item.listFriends,
      "password": item.listFriends,
      "username": item.username,
      "role": item.role
    });
  });
  Users.insertMany(userObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Users.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Users.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
