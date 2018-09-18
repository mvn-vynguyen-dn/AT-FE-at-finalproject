const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  time: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  }
},{
  versionKey: false
})

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.create = (Article, callback) => {
  Article.save(callback);
}

module.exports.index = (callback) => {
  Article.find(callback);
}

module.exports.show = (condition, callback) => {
  Article.findById(condition, callback);
}

module.exports.remove = (Articleid, callback) => {
  Article.deleteOne({_id: Articleid}, callback);
}

module.exports.update = (Articleid, body, callback) => {
  Article.findByIdAndUpdate(Articleid, body, callback);
}
