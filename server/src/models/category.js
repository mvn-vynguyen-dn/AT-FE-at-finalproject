const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
})

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.create = (Category, callback) => {
  Category.save(callback);
}

module.exports.index = (callback) => {
  Category.find(callback);
}

module.exports.show = (condition, callback) => {
  Category.findById(condition, callback);
}

module.exports.remove = (Categoryid, callback) => {
  Category.deleteOne({_id: Categoryid}, callback);
}
