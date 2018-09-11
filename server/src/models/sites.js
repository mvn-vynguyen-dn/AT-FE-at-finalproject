const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SiteSchema = new Schema({
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
  district:{
    type: Array,
    "default": [],
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
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
  Site.aggregate([
    // {
    //   $match: {
    //     "_id": mongoose.Types.ObjectId(id)
    //   }
    // },
    {
      $match: {
        "parentId": mongoose.Types.ObjectId(id)
      }
    }
  ], callback)
}

module.exports.remove = (Siteid, callback) => {
  Site.deleteOne({_id: Siteid}, callback);
}

module.exports.update = (siteid, body, callback) => {
  Site.findByIdAndUpdate(siteid, body, callback);
}
