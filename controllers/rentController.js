const rents = require('../model/rent');
const customers = require('../model/users');
const books = require('../model/books');
const tagsController = require('../controllers/tagsController');
const path = require('path');
const { format,addDays} = require('date-fns');

const getAllRentsController = async (req,res) =>{

    if(req.session?.authenticated && (req.session?.user?.role === 1917 || req.session?.user?.role === 1964)){
    
        const allRents = await rents.find();

        if(!allRents) return res.status(400).json({'message':'Rent not found'});

        tagsController(['headerLoggedEmpl','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','myAccount'),{
                    header:tags['headerLoggedEmpl'],
                    footer:tags['footer'],
                    books:allRents
                });
            }
        )

    }
}

const getRentController = (req,res)=>{

    if(req.session?.authenticated && (req.session?.user?.role === 1917 || req.session?.user?.role === 1964)){

        tagsController(['headerLoggedEmpl','footer']).then(
            (tags)=>{
                res.render(path.join('..','views','rentRegister'),{
                    header:tags['headerLoggedEmpl'],
                    footer:tags['footer']
                })
            }
        )

    }else{
        res.status(400).json({'message':'unauthorized access'});
    }


}

const postRentController = async (req,res) =>{

    if(req.session?.authenticated && (req.session?.user?.role === 1917 || req.session?.user?.role === 1964)){

        if(!req.body?.bookName || !req.body?.customerName) res.status(400).json({'message':'Book and customer name are required'});
        
        try{

            const bookResult = await books.findOne({name:req.body.bookName});
            const customerResult = await customers.findOne({fullname:req.body.customerName});

            if(!bookResult || !customerResult) return res.status(400).json({'message':'Book or customer not found'});
            
            const dateTime = `${format(new Date(), 'MM/dd/yyyy HH:mm:ss')}`;
            const dateTimeWeek = `${ format(addDays(new Date(),7), 'MM/dd/yyyy HH:mm:ss') }`;

            console.log(dateTime,dateTimeWeek)

            const resultRent = await rents.create({
                "date":dateTime,
                "customerName":req.body.customerName,
                "employeeName":req.session.user.name,
                "bookName":req.body.bookName,
                "returnDate":dateTimeWeek
            })

            return res.status(400).redirect('/employee');

        }catch(error){
            console.log(error);
            return res.status(400).json({'message':error});
        }

    }else{
        res.status(400).json({'message':'unauthorized access'});
    }
}

module.exports = {getRentController,postRentController};