const express = require('express');
const router = express.Router();
const {getBooksByAvailability,getBestSellers} = require('../controllers/booksController');

router.get('/',getBooksByAvailability);
router.get('/sorted',getBestSellers);

module.exports = router;