const path = require('path');
const users = require('../model/users');
//const employee = require('../model/employees');
const tagsController = require('../controllers/tagsController');
const employees = require('../model/employees');
const rents = require('../model/rent');
const books = require('../model/books');

const getAccountController = async (req,res) =>{
    
    var userData = null;
    var condition = false;
    var conditionRents = false;
    var myRentedBooks = null;
    var myRents = null;
    var userSelected = null;

    if(req.session.authenticated){
        if(req.session.user.role === 1997){

            userSelected = await users.findOne({login:req.session.user.login});

            if(!userSelected) return res.status(400).json({'message':'The login not found'});
           
            userData = [userSelected.fullname,userSelected.login,userSelected.country,userSelected.adress];
            condition = true;
            
            myRents = await rents.find({customerName:req.session.user.name});
          
            if(!myRents){
                console.log('there are no books rented');
            }else{
                var myRentedBookName = [];
                conditionRents = true; //Modify the code to deal with multiple rents.
                myRents.forEach(rents =>myRentedBookName.push(rents.bookName) );
                //myRentedBooks = await books.find({name:myRents[0].bookName});
                myRentedBooks = await books.find({name:myRentedBookName});
            }
        }
        if(req.session.user.role === 1964) {
            const employee =  await employees.findOne({login:req.session.user.login}).exec();
            if(!employee) return res.status(400).json({'message':'The login not found'});
            userData = [employee.fullname,employee.login,employee.job]
        }
        
        tagsController(['headerLogin','footer']).then(
            (tag) => {
                res.render(path.join('..','views','myAccount'),{
                    header:tag['headerLogin'],
                    footer:tag['footer'],
                    inputNames: userData,
                    condition: condition,
                    conditionRents:conditionRents,
                    books:myRentedBooks,
                    rents:myRents
                })
            }
        )

    }else{
        console.log('You need to log in.');
        return res.redirect('/');
    }
}

module.exports = getAccountController;
