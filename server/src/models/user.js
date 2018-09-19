const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

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
  },
  token: {
    type: Array,
    "default": [],
  }
}, {
  versionKey: false,
})

const User = module.exports = mongoose.model('User', UserSchema);

UserSchema.methods.generateJWT = () => {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 1);
  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime()/1000)
  }, secret)
};

UserSchema.methods.toAuthJSON = () => {
  return {
    username: this.username,
    email: this.email,
    image: this.image,
    token: this.generateJWT()
  };
};

module.exports.hashPassword = (password, callback) => {
  bcrypt.hash(password, 10, callback);
}

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, callback);
}

module.exports.create = (obj, callback) => {
  User.insertMany(obj, callback);
}


module.exports.remove = (userId, callback) => {
  User.deleteOne({_id: userId}, callback);
}

module.exports.update = (userId, body, callback) => {
  User.findByIdAndUpdate(userId, body, callback);
}

module.exports.show = (condition, callback) => {
  User.find(condition, callback);
}

module.exports.index = (callback) => {
  User.find(callback);
}

module.exports.updateField = (id, body, callback) => {
  User.findByIdAndUpdate(
    { _id: id},
    { $push: {
      token: {
        $each: [body],
        $position: 1
      }
    }}
  , callback)
}
