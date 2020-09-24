const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema ({
    applicantId:{
        type: String,
        required: true
    },
    postingId:{
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'Posting'},
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
});

module.exports = Application= mongoose.model('Application', ApplicationSchema);