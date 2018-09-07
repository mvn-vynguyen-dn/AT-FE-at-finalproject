const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  listPicture: {
    type: Array,
    "default": [],
  },
  backgroundImg: {
    type: String
  },
  cityImg: {
    type: Array,
    "default" : [],
  }
})

const City = module.exports = mongoose.model('City', CitySchema);

module.exports.create = (city, callback) => {
  city.save(callback);
}

module.exports.index = (callback) => {
  City.find(callback);
}

module.exports.show = (condition, callback) => {
  City.findById(condition, callback);
}

module.exports.remove = (cityid, callback) => {
  City.deleteOne({_id: cityid}, callback);
}
