const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const usersSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    country:{
        type:String
    },
    adress:{
        type:String
    },
    login:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('users',usersSchema);