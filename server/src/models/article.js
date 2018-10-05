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
  },
  description: {
    type: String,
    required: true
  }
},
{
  versionKey: false
})

const Article = module.exports = mongoose.model('Article', ArticleSchema);

module.exports.create = (Article, callback) => {
  Article.save(callback);
}

module.exports.index = (callback) => {
  Article.aggregate(
    [
      {
        $lookup: 
        {
          from: 'pictures',
          localField: '_id',
          foreignField: 'articleId',
          as: 'listPictures'
        },
      },
      {
        $project: 
        {
          listPictures: {
            _id: 0,
            articleId: 0
          }
        }
      }
    ], callback);
}

module.exports.show = (condition, callback) => {
  Article.findById(condition, callback);
}

module.exports.remove = (ArticleId, callback) => {
  Article.deleteOne({_id: ArticleId}, callback);
}

module.exports.update = (ArticleId, body, callback) => {
  Article.findByIdAndUpdate(ArticleId, body, callback);
}
