const Plan = require('../models/plan');

exports.index = (req, res, next) => {
  Plan.get((err, callback) => {
    if (err) throw err;
    res.status(200).json(callback);
  })
}

exports.show = (req, res, next) => {
  id = req.params.id;
  Plan.show(id, (err, callback) => {
    if(err) throw err;
    res.status(200).send(callback);
  });
}

// exports.remove = (req, res, next) => {
  

//   Plan.remove(planId, (err, callback) => {
//     if(err) throw err;
//     res.status(200).send(callback);
//   });
// }

exports.create = (req, res, next) => {
  datetime = new Date();
  
  plan = new Plan({
      datetime: datetime,
      userId: req.body.userId,
      timeline: req.body.plans,
  });
  
  Plan.create(plan, (err, callback) => {
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
  Plan.delete(id, (err, callback) => {
    if (err) throw err;
    res.status(200).send(callback);
  });
}
