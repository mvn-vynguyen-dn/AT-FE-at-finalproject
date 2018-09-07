const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  age: {
    type: Number,
  },
  hobie: {
    type: String,
  },
  avatar: {
    type: String,
  },
  listPictures: {
    type: Array,
    "default": [],
  },
  listFriends: {
    type: Array,
    "default": [],
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  }
}, {
  versionKey: false,
})

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.create = (obj, callback) => {
  User.insertMany(obj, callback);
}

module.exports.remove = (userId, callback) => {
  User.deleteOne({_id: userId}, callback);
}

module.exports.update = (userId, callback) => {
  User.findByIdAndUpdate({_id: userId}, callback);
}

module.exports.show = (condition, callback) => {
  User.findById(condition, callback);
}
