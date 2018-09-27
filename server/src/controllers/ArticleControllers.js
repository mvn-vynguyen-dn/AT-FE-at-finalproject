const Article = require('../models/article');

exports.index = (req, res, next) => {
  Article.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) =>  {
  condition = {
    _id: req.params.id
  }
  Article.show(condition, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Article.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  console.log(req.body.content);
  const article = new Article({
    content : req.body.content,
    title: req.body.title,
    destinationId: req.body.destinationid,
    siteId: req.body.siteId,
    rating: req.body.rating,
    userId: req.body.userId
  });

  console.log(article);

  Article.create(article, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = {
    'decriptions': req.body.decriptions
};
  Article.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Article.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
