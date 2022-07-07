const mongoose = require('mongoose');

const seqSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    maxDocumentId: {type: Number, required: true}, 
    maxMessageId: {type: Number, required: true},
    maxContactId: {type: Number, required: true}
});
module.exports = mongoose.model('Sequence', seqSchema);