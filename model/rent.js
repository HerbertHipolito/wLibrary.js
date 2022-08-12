const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema = new Schema({
    date:{
        type:Date,
        required:true
    },
    customerName:{
        type:String,
        required:true
    },
    employeeName:{
        type:String,
        required:true
    },
    bookName:{
        type:String,
        required:true
    },
    returnDate:{
        type:Date,
        required:true
    }
});

module.exports = mongoose.model('rent',rentSchema);