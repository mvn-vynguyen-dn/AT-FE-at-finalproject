const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  listComment: {
    type: Array,
    "default": true,
  },
  time: {
    type: Date,
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  pictures: {
    type: Array,
    "default": []
  }
})

const Comment = module.exports = mongoose.model('Comment', CommentSchema);

module.exports.create = (obj, callback) => {
  Comment.insertMany(obj, callback);
}

module.exports.index = (callback) => {
  Comment.find(callback);
}

module.exports.show = (condition, callback) => {
  Comment.findById(condition, callback);
}

module.exports.update = (commentid, body, callback) => {
  Comment.findByIdAndUpdate(commentid, body, callback);
}

module.exports.remove = (commentid, callback) => {
  Comment.deleteOne({_id: commentid}, callback);
}
