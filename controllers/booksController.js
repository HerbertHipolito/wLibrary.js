const express =  require('express');
const router = express.Router();
const tagsController =  require('./tagsController');
const path =  require('path');
const books =  require('../model/books');
const rents = require('../model/rent');
const {format} = require('date-fns');
const moment = require('moment');

const getBooksByAvailability = async (req,res) =>{

    const Allbooks = await books.find({'available':true}).exec();

    var header = 'header';
    if(req.session.authenticated) header = 'headerLogged';

    tagsController([header,'footer']).then(
        (tags)=>{
            res.render(path.join('..','views','mainPage'), {
                header:tags[header],
                footer:tags['footer'],
                inputs:Allbooks
                }
            )
        }
    )
}

const getBestSellers = async (req,res) => {

    const BestSellers = await books.find().sort({salesNumber:-1});
    var header = 'header';

    if(req.session.authenticated) header = 'headerLogged';

    tagsController([header,'footer']).then(
        (tags)=>{
            res.render(path.join('..','views','mainPage'), {
                header:tags[header],
                footer:tags['footer'],
                inputs:BestSellers
                }
            )
        }
    )
}


const getAllBookControllerEmpl = async (req,res) =>{

    if(req.session.authenticated && (req.session.user.role == 1964 || req.session.user.role == 1917)){

        const allBooks = await books.find().exec();
       
        if (!allBooks) return res.status(401).json({'message':'There are no books'});
        
        tagsController(['headerLoggedEmpl','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','mainPage'),{
                    header:tags['headerLoggedEmpl'],
                    inputs:allBooks,
                    footer:tags['footer']
                })
            }
        )
    }else{
        return res.status(400).json({'message':'unauthorized access'});
    }
}

const regBookController = async(req,res)=>{
    
    if(req.session?.authenticated && (req.session?.user?.role === 1964 || req.session?.user?.role === 1917) ){

        const inputs = ['name','author','edition','price','releaseData','stock','salesNumber'];

        tagsController(['headerLogged','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','books'), {
                    header:tags['headerLogged'],
                    footer:tags['footer'],
                    inputs:inputs
                    } 
                )
            }
        )

    }else{
        return res.status(400).json({'message':'unauthorized access'});
    }
}

const postBookController = async (req,res)=>{

    if(req.session?.authenticated && (req.session?.user?.role === 1964 || req.session?.user?.role === 1917) ){
    
        try{

            const duplicate = await books.findOne({name:req.body.name});

            if(duplicate) return res.status(401).json({'message':'that book already exists'});

            const result =  await books.create({
                "name":req.body.name,
                "author":req.body.author,
                "edition":req.body.edition,
                "price":req.body.price,
                "releaseData":moment(req.body.releaseData,'DD/MM/YYYY'),
                "stock":req.body.stock,
                "salesNumber":req.body.salesNumber,
                "available":1
            });    
    
            return res.redirect('/');

        }catch(error){
            console.log(error);
            return res.status(400).json({'message':'error'});
        }

    }else{
        return res.status(400).json({'message':'unauthorized access'});
    }

}

const getMyBooksController = async (req,res) =>{

    if (req.session?.authenticated){

        const myRents = await rents.find({customerName:req.session.user.name});

        if(!myRents) return res.status(401).json({'message':'there is not rent'});

        var myBookName = [];
        var inputs = [];
        
        myRents.forEach((rent)=>{
            myBookName.push(rent.bookName);
        })
        const myBooks =  await books.find({name:myBookName});

        myRents.forEach(
            (rent,index)=>{
                inputs[index] = {"name":myBooks[index].name,"author":myBooks[index].author,"edition":myBooks[index].edition,"price":myBooks[index].price,"returnDate":myRents[index].returnDate};
            }
        )
        tagsController(['headerLogin','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','myBooks'),{
                    header:tags['headerLogin'],
                    footer:tags['footer'],
                    inputs:inputs
                    }
                )
            }
        )

    }else{
        return res.status(400).json({'message':'unauthorized access'});
    }


}

const getBookByName = async (req,res) =>{

    if(!req?.params?.id) return res.status(401).json({'message':'Book id not received'});

    var result = await books.findById(req.params.id);

    if(!result) return res.status(401).json({'message':'book not found'});

    const header = res.session?.authenticated ? 'headerLogged':'header';
    const releaseData = `${format(result.releaseData,'dd/MM/yyyy')}`

    tagsController([header,'footer']).then(

        (tags)=>{
            res.render(path.join('..','views','bookById'),{
                header:tags[header],
                footer:tags['footer'],
                book:result,
                releaseData:releaseData
                }
            )
        }
    )

}
 
module.exports = {getBookByName,getBestSellers,getMyBooksController,getBooksByAvailability,getAllBookControllerEmpl,regBookController,postBookController};