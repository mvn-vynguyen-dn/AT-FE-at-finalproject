const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  listFriend: {
    type: Array,
    "default": [],
  }
}, {
  versionKey: false,
})

const Event = module.exports = mongoose.model('Event', EventSchema);

module.exports.create = (obj, callback) => {
  Event.insertMany(obj, callback);
}

module.exports.remove = (EventId, callback) => {
  Event.deleteOne({_id: EventId}, callback);
}

module.exports.update = (EventId, callback) => {
  Event.findByIdAndUpdate({_id: EventId}, callback);
}

module.exports.show = (condition, callback) => {
  Event.findById(condition, callback);
}
