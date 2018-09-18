const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
  hobbies: {
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
  userName: {
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

module.exports.create = (user, callback) => {
  user.save(callback);
}

module.exports.remove = (userId, callback) => {
  User.deleteOne({_id: userId}, callback);
}

module.exports.update = (userId, callback) => {
  User.findByIdAndUpdate({_id: userId}, callback);
}

module.exports.show = (condition, callback) => {
  User.find(condition, callback);
}

module.exports.index = (callback) => {
  User.find(callback);
}

module.exports.hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, callback);
}
