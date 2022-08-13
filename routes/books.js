const express = require('express');
const router = express.Router();
const {getBooksByAvailability,getBestSellers,getBookByName} = require('../controllers/booksController');

router.get('/',getBooksByAvailability);
router.get('/sorted',getBestSellers);
router.get('/:id',getBookByName);
router.get('/books/:id',(req,res)=>{
    res.redirect(`/books/${req.params.id}`);
});


module.exports = router;