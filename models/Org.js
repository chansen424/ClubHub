const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgSchema = new Schema ({
    name:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    description:{
        type: String
    }
});

module.exports = Org= mongoose.model('Org', OrgSchema);