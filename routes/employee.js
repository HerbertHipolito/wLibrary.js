const express = require('express');
const router = express.Router();
const {getAllBookControllerEmpl} = require('../controllers/booksController')
const books = require('../model/books');

router.get('/',getAllBookControllerEmpl);


module.exports = router;