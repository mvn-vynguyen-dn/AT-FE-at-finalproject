const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

const Picture = module.exports = mongoose.model('Picture', PictureSchema);

module.exports.create = (Picture, callback) => {
  Picture.save(callback);
}

module.exports.index = (callback) => {
  Picture.find(callback);
}

module.exports.show = (condition, callback) => {
  Picture.findById(condition, callback);
}

module.exports.remove = (Pictureid, callback) => {
  Picture.deleteOne({_id: Pictureid}, callback);
}

module.exports.update = (Pictureid, body, callback) => {
  Picture.findByIdAndUpdate(Pictureid, body, callback);
}
