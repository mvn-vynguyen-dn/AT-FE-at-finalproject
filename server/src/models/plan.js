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

module.exports.create = (obj, callback) => {
  Plan.insertMany(obj, callback);
}

module.exports.remove = (PlanId, callback) => {
  Plan.deleteOne({_id: PlanId}, callback);
}

module.exports.update = (PlanId, body, callback) => {
  Plan.findByIdAndUpdate(PlanId, body, callback);
}

module.exports.show = (condition, callback) => {
  Plan.findById(condition, callback);
}

module.exports.index = (callback) => {
  Plan.find(callback);
}
