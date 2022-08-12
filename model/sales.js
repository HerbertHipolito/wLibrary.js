const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const salesSchema = new Schema({
    date:{
        type:Date,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    book:{
        type:String,
        required:true
    },
    qtd:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    customer:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('sales',salesSchema);