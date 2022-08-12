const express = require('express');
const router = express.Router();
const {getAllBookControllerEmpl,regBookController,postBookController} = require('../controllers/booksController');

router.get('/',getAllBookControllerEmpl);

router.get('/register',regBookController).post('/register',postBookController);

module.exports = router;