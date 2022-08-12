const express = require('express');
const router = express.Router();
const path = require('path');
const getAccountController = require('../controllers/accountController');
const {getMyBooksController} = require('../controllers/booksController');

router.get('/',getAccountController);

router.get('/books',getMyBooksController);

module.exports = router;