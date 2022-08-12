const express = require('express');
const router = express.Router();
const path = require('path');
const tagsController = require('../controllers/tagsController');
const {getLoginController,postLoginController} = require('../controllers/loginController');
const {getBooksByAvailability,getBestSellers} = require('../controllers/booksController');

router.get('/',getLoginController)
.post('/',postLoginController);

router.get('/',getBooksByAvailability);

router.get('/sorted',getBestSellers);


module.exports = router;