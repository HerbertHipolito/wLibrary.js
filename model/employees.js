const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeesSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        required:true
    },
    job:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('employees',employeesSchema);