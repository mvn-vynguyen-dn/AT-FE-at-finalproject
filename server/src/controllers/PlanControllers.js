const Plan = require('../models/plan');

exports.index = (req, res, next) => {
  Plan.index((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  Plan.show( (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.remove = (req, res, next) => {
  Plan.remove((err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.create = (req, res, next) => {
  const planArr = req.body;
  var planObj = [];
  planObj = planArr.map(item => {
    return new Plan({
      datetime:item.datetime,
      userId: item.userId,
      peoples: item.peoples,
      timeline: item.timeline,
    });
  });
  Plan.insertMany(planObj, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

exports.update = (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  Plan.update(id, body, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}

exports.delete = (req, res, next) => {
  const id = req.params.id;
  Plan.remove(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
