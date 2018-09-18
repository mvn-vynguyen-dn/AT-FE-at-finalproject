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
    required: true,
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
  Site.find(callback);
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
