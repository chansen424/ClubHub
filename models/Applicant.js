const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema ({
    netId:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String
    }
});

module.exports = Applicant= mongoose.model('Applicant', ApplicantSchema);