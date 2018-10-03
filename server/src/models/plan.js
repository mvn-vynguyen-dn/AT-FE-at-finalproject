const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
  datetime: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  peoples: {
    type: Array,
    "default": [],
  },
  timeline: {
    type: Array,
    "default": [],
  }
}, {
  versionKey: false,
})

const Plan = module.exports = mongoose.model('Plan', PlanSchema);

module.exports.create = (plan, callback) => {
  plan.save(callback);
}

module.exports.delete = (PlanId, callback) => {
  Plan.deleteOne({_id: PlanId}, callback);
}

module.exports.update = (PlanId, body, callback) => {
  Plan.findByIdAndUpdate(PlanId, body, callback);
}

module.exports.show = (userId, callback) => {
  Plan.aggregate(
    [
      {
        $match: {
          userId: mongoose.Types.ObjectId(id),
        }
      },
      {
        $sort: {
          _id: -1
        }
      }
    ], callback)
}

module.exports.get = (callback) => {
  Plan.find(callback);
}
