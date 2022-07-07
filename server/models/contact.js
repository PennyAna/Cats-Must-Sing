const mongoose = require('mongoose');

const conSchema = mongoose.Schema({
   _id: {type: mongoose.Schema.Types.ObjectId},
   id: {type: String, required: true}, 
   name: {type: String},
   email: {type: String},
   phone: {type: String},
   imageUrl: {type: String},
   group: {type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}
});
module.exports = mongoose.model('Contact', conSchema);