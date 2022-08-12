const books = require('../model/books');
const path  =  require('path');
const tagsController =  require('./tagsController');
const sales =  require('../model/sales');
const { format } = require('date-fns');

const getSalesController = async (req,res) =>{

    if(req.session.authenticated && (req.session?.user?.role === 1964 || req.session?.user?.role === 1997)){

        const allBooks = await books.find();

        if (!allBooks) return res.status(400).json({'message':'there are no books registered '});

        var acquiredMoney = 0
        var qtd = 0
        var mostProfitable = 0;
        var mostProfitableProductName = '';

        allBooks.forEach((book,index)=>{
            acquiredMoney+=book.price*book.salesNumber;
            qtd+=book.salesNumber;

            if(mostProfitable<=book.price*book.salesNumber) {

                mostProfitable = book.price*book.salesNumber;
                mostProfitableProductName = book.name
            }

            })

        tagsController(['headerLoggedEmpl','footer']).then(
            (tag)=>{
                res.render(path.join('..','views','sellsData'),{
                    header:tag['headerLoggedEmpl'],
                    footer:tag['footer'],
                    money:acquiredMoney,
                    qtd:qtd,
                    bestProdut:mostProfitable,
                    name:mostProfitableProductName
                })
            }
        )

    }else{
        return res.status(400).json({'message':'unauthorized access'});
    }

}

const postRegisterSalesController = async (req,res) =>{

    if(req.session.authenticated && (req.session?.user?.role === 1964 || req.session?.user?.role === 1997)){

        if(!req.body?.customer || !req.body?.bookName || !req.body?.qtd) return res.status(400).json({'message':'some input is missing'});
   
        const book = await books.findOne({name:req.body.bookName}).exec();

        if(!book) return res.status(400).json({'message':'The book does not exist'});
        if((books.stock-req.body.qtd) <0 ) return res.status(400).json({'message':'Product sold out'});
        
        const dateTime = `${format(new Date(), 'dd/MM/yyyy HH:mm:ss')}`;

        book.salesNumber=parseInt(book.salesNumber)+parseInt(req.body.qtd);
        book.stock-=req.body.qtd;

        const resultSales = await sales.create({
            date:dateTime,
            customer:req.body.customer,
            seller:req.session.user.name,
            book:req.body.bookName,
            qtd:req.body.qtd,
            amount:req.body.qtd*book.price,
        });

        const resultBook = await book.save();

        return res.status(200).redirect('/employee');

    }

}


const getRegisterSalesController = (req,res) =>{

    if (req.session.authenticated && (req.session?.user?.role === 1964 || req.session?.user?.role === 1997)){

        tagsController(['headerLoggedEmpl','footer']).then((tag)=>{
            res.render(path.join('..','views','salesRegister'),{
                header:tag['headerLoggedEmpl'],
                footer:tag['footer']
            })
        })

    }else{
        return res.status(400).json({'message':'unauthorized access'});
    }

}

module.exports = {getSalesController,postRegisterSalesController,getRegisterSalesController};