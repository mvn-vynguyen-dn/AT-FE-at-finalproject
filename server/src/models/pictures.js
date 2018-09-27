const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  articleId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    require: true,
  }
},
{
  versionKey: false
})

const Picture = module.exports = mongoose.model('Picture', PictureSchema);

module.exports.create = (picture, callback) => {
  Picture.insertMany(picture, callback);
}

module.exports.index = (callback) => {
  Picture.find(callback);
}

module.exports.show = (condition, callback) => {
  Picture.find(condition, callback);
}

module.exports.remove = (Pictureid, callback) => {
  Picture.deleteOne({_id: Pictureid}, callback);
}

module.exports.update = (Pictureid, body, callback) => {
  Picture.findByIdAndUpdate(Pictureid, body, callback);
}
