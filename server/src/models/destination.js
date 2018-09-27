const mongoose = require('mongoose');
const Category = require('../models/category');
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
    required: true,
    ref: 'Category'
  },
  siteId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Site'
  },
  description: {
    type: String,
    required: true
  }
}, {
  versionKey: false
})

const Destination = module.exports = mongoose.model('Destination', DestinationSchema);

module.exports.create = (destination, callback) => {
  destination.save(callback);
}

module.exports.index = (callback) => {
  Destination.aggregate(
    [
      {
        $lookup: 
        {
          from: 'pictures',
          localField: '_id',
          foreignField: 'destinationId',
          as: 'listPictures'
        }
      },
      {
        $lookup: 
        {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categorys'
        }
      },
      {
        $lookup: 
        {
          from: 'sites',
          localField: 'siteId',
          foreignField: '_id',
          as: 'sites'
        }
      }
    ], callback)
}

module.exports.show = (id, callback) => {
  Destination.aggregate(
    [
      {
        $match:
        {
          _id: mongoose.Types.ObjectId(id),
        }
      },
      {
        $lookup: 
        {
          from: 'pictures',
          localField: '_id',
          foreignField: 'destinationId',
          as: 'listPictures'
        }
      },
      {
        $lookup: 
        {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categorys'
        }
      },
      {
        $lookup: 
        {
          from: 'sites',
          localField: 'siteId',
          foreignField: '_id',
          as: 'sites'
        }
      }
    ], callback);

  // Destination.find(condition, callback)
  // .populate('categoryId').populate('siteId');
}

module.exports.remove = (Destinationid, callback) => {
  Destination.deleteOne({_id: Destinationid}, callback);
}

module.exports.update = (Destinationid, body, callback) => {
  Destination.findByIdAndUpdate(Destinationid, body, callback);
}
