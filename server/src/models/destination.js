const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  rating: {
    type: Number
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
  }
})

const Destination = module.exports = mongoose.model('Destination', DestinationSchema);

module.exports.create = (Destination, callback) => {
  Destination.save(callback);
}

module.exports.index = (callback) => {
  Destination.find(callback);
}

module.exports.show = (condition, callback) => {
  Destination.findById(condition, callback);
}

module.exports.remove = (Destinationid, callback) => {
  Destination.deleteOne({_id: Destinationid}, callback);
}
