const tagsController = require('../controllers/tagsController');
const path = require('path');
const books = require('../model/books')

const rootController = async (req,res)=>{

    var header = 'header';
    
    if(req.session.authenticated){
        header = 'headerLogged';
    }

    const allBooks = await books.find();

    if(!allBooks) return res.status(400).json({'message':'There are not books'});

    tagsController([header,'footer']).then( 
        (tags) =>{
            res.render(path.join('..','views','mainPage'),{
                header:tags[header],
                footer:tags['footer'],
                inputs:allBooks
            });
        }

    )
};


const searchBookController = async (req,res) =>{

    if(!req.body?.msg) return res.status(400).json({'message':'Message not received'});

    const resultSearch = await books.find({$text:{$search:'teste'}});

    console.log(resultSearch);

}

module.exports = {rootController,searchBookController};