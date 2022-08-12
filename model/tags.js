const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagSchema = new Schema({
    tag:{
        type:String,
        required:true,
    },
    code:{
        type:String,
        riquired:true
    }
});

module.exports = mongoose.model('tags',tagSchema);