const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const booksSchema = new Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    author:{
        type:String,
        required:true
    },
    edition:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    releaseData:{
        type:Date,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    salesNumber:{
        type:Number,
        required:true
    },available:{
        type:Boolean,
        required:true
    }
});

booksSchema.index({$name:"text"});

module.exports = mongoose.model('books',booksSchema);