const rents = require('../model/rent');
const customers = require('../model/users');
const books = require('../model/books');
const tagsController = require('../controllers/tagsController');
const path = require('path');
const { format, addDays } = require('date-fns');

const getAllRentsController = async (req, res) => {


    const allRents = await rents.find();

    if (!allRents) return res.status(400).json({ 'message': 'No one rent registered' });

    tagsController(['headerLoggedEmpl', 'footer']).then(
        (tags) => {
            res.render(path.join('..', 'views', 'myRents'), {
                header: tags['headerLoggedEmpl'],
                footer: tags['footer'],
                inputs: allRents
            });
        }
    )
}

const getRentController = (req, res) => {

    tagsController(['headerLoggedEmpl', 'footer']).then(
        (tags) => {
            res.render(path.join('..', 'views', 'rentRegister'), {
                header: tags['headerLoggedEmpl'],
                footer: tags['footer']
            })
        }
    )
}

const postRentController = async (req, res) => {


    if (!req.body?.bookName || !req.body?.customerName) res.status(400).json({ 'message': 'Book and customer name are required' });

    try {

        const bookResult = await books.findOne({ name: req.body.bookName });
        const customerResult = await customers.findOne({ fullname: req.body.customerName });
        
        if (!bookResult || !customerResult) return res.status(400).json({ 'message': 'Book or customer not found' });
        if(!bookResult.available) return res.status(400).json({ 'message': 'Book is not available'});

        const dateTime = `${format(new Date(), 'MM/dd/yyyy HH:mm:ss')}`;
        const dateTimeWeek = `${format(addDays(new Date(), 7), 'MM/dd/yyyy HH:mm:ss')}`;
        
        bookResult.available = false;

        const resultUpdate = await bookResult.save();
        const resultRent = await rents.create({
            "date": dateTime,
            "customerName": req.body.customerName,
            "employeeName": req.session.user.name,
            "bookName": req.body.bookName,
            "returnDate": dateTimeWeek
        })

        return res.status(200).redirect('/employee');

    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': error });
    }

}

module.exports = { getRentController, postRentController,getAllRentsController};