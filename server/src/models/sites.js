const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  listPicture: {
    type: Array,
  },
  backgroundImg: {
    type: String
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  articleSite: {
    type: String,
  }
}, 
{
  versionKey: false
})

const Site = module.exports = mongoose.model('Site', SiteSchema);

module.exports.create = (site, callback) => {
  site.save(callback);
}

module.exports.index = (callback) => {
  Site.aggregate(
    [
      {
        $lookup: 
        {
          from: 'articles',
          localField: '_id',
          foreignField: 'siteId',
          as: 'listArticle'
        },
      },
      {
        $lookup: 
        {
          from: 'destinations',
          localField: '_id',
          foreignField: 'siteId',
          as: 'listDestinations'
        },
      },
      {
        $project: 
        {
          listArticle: {
            _id: 0,
            content: 0
          }
        }
      }
    ], callback);
}

module.exports.show = (id, callback) => {
  Site.findById(id, callback);
}

module.exports.remove = (Siteid, callback) => {
  Site.deleteOne({_id: Siteid}, callback);
}

module.exports.update = (siteid, body, callback) => {
  Site.findByIdAndUpdate(siteid, body, callback);
}
