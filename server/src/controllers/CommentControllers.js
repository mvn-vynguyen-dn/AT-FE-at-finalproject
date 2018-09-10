const Comment = require('../models/comment');

exports.index = (req, res, next) => {
  Comment.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  Comment.show( (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Comment.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const CommentArr = req.body;
  var CommentObj = [];
  CommentObj = CommentArr.map(item => {
    return new Comment({
      "content":item.content,
      "listComment": item.listComment,
      "time": item.time,
      "planId": item.planId,
      "userId": item.userId,
      "pictures": item.pictures
    });
  });
  Comment.insertMany(CommentObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Comment.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Comment.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
