const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostingSchema = new Schema ({
    postingName:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    deadline:{
        type: String,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    orgId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Org',
        required: true
    }
});

module.exports = Posting = mongoose.model('Posting', PostingSchema);